// Structure-aware MCQ extraction from plain text (with optional **bold** markers).

export type ParsedQuestion = {
  number: number | null;
  question: string;
  options: string[];
  boldOptionIndex: number | null;
  answerLetter: string | null;
  answerText: string | null;
  answerSource: "document_explicit" | "document_formatting" | "document_answer_key" | null;
  explanation: string | null;
};

const LETTERS = ["a", "b", "c", "d"];

const QUESTION_START =
  /^\s*(?:q(?:uestion)?\s*[.\-–:]?\s*)?(\d{1,3})\s*[.)\]:\-–]\s*(.*)$/i;
const QUESTION_WORD_ONLY = /^\s*q(?:uestion)?\s*[.\-–:]?\s*(\d{1,3})\s*$/i;
const OPTION_LINE =
  /^\s*[\(\[]?\s*([a-dA-D])\s*[\)\].:\-–]\s*(.+)$/;
const ANSWER_LINE =
  /^\s*\**\s*(?:correct\s*answer|correct\s*option|correct|answer|ans)\s*\**\s*[:\-–—]?\s*(.+)$/i;
const EXPLANATION_LINE = /^\s*\**\s*(?:explanation|solution|reason)\s*\**\s*[:\-–]?\s*(.*)$/i;
const ANSWER_KEY_HEADING = /^\s*\**\s*(answers?\s*(key|s)?|answer\s*sheet|key)\s*\**\s*[:\-–]?\s*$/i;
const NOISE_LINE =
  /^\s*(page\s*\d+|\d+\s*\|\s*page|chapter\s+\d+.*|instructions?\s*[:.]?.*|references?\s*[:.]?\s*|time\s*allowed.*|marks?\s*[:.].*)\s*$/i;

export function stripBold(value: string) {
  return value.replace(/\*\*/g, "").trim();
}

export function normalise(value: string) {
  return stripBold(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Parses "1-B", "1. B", "Q1: B", "1) b", possibly several per line. */
export function parseAnswerKey(text: string): Record<number, string> {
  const map: Record<number, string> = {};
  const pattern = /\b(?:q(?:uestion)?\s*)?(\d{1,3})\s*[-–:.)=]\s*\(?([a-dA-D])\)?(?![a-zA-Z0-9])/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const num = Number(match[1]);
    if (num > 0 && num < 1000) map[num] = match[2].toLowerCase();
  }
  return map;
}

function findAnswerKeySections(lines: string[]) {
  const indexes: number[] = [];
  lines.forEach((line, i) => {
    if (ANSWER_KEY_HEADING.test(stripBold(line))) indexes.push(i);
  });
  return indexes;
}

function letterFromAnswerValue(value: string, options: string[]): { letter: string | null; text: string | null } {
  const clean = stripBold(value).trim();
  const letterMatch = clean.match(/^[\(\[]?\s*([a-dA-D])\s*[\)\].:\-–]?\s*(.*)$/);
  if (letterMatch && (letterMatch[2].trim().length === 0 || clean.length <= 3 || /^[\)\].:\-–]/.test(clean.slice(1).trim()))) {
    return { letter: letterMatch[1].toLowerCase(), text: letterMatch[2].trim() || null };
  }
  const byText = options.findIndex((o) => normalise(o) === normalise(clean));
  if (byText >= 0) return { letter: LETTERS[byText], text: stripBold(options[byText]) };
  if (letterMatch) {
    const idx = LETTERS.indexOf(letterMatch[1].toLowerCase());
    const rest = letterMatch[2].trim();
    if (idx >= 0 && rest && normalise(options[idx] ?? "") === normalise(rest)) {
      return { letter: LETTERS[idx], text: rest };
    }
  }
  const contains = options.findIndex((o) => normalise(clean).length > 3 && normalise(o).includes(normalise(clean)));
  if (contains >= 0) return { letter: LETTERS[contains], text: stripBold(options[contains]) };
  return { letter: null, text: null };
}

export function parseQuestions(rawText: string): { questions: ParsedQuestion[]; mode: "question_paper" | "notes" } {
  const text = rawText.replace(/\r/g, "\n");
  const lines = text.split("\n").map((l) => l.trimEnd());

  // Answer key sections are parsed separately and excluded from the question body.
  const keyIndexes = findAnswerKeySections(lines);
  let bodyEnd = lines.length;
  let answerKey: Record<number, string> = {};
  for (const idx of keyIndexes) {
    const section = lines.slice(idx + 1, idx + 400).join("\n");
    const parsed = parseAnswerKey(section);
    if (Object.keys(parsed).length >= 2) {
      answerKey = { ...answerKey, ...parsed };
      bodyEnd = Math.min(bodyEnd, idx);
    }
  }

  const body = lines.slice(0, bodyEnd);
  const blocks: ParsedQuestion[] = [];
  let current: ParsedQuestion | null = null;
  let pendingNumber: number | null = null;
  let capturingExplanation = false;

  const push = () => {
    if (current && current.question.trim().length > 0) blocks.push(current);
    current = null;
    capturingExplanation = false;
  };

  for (const rawLine of body) {
    const line = rawLine.trim();
    if (!line) { capturingExplanation = false; continue; }
    if (NOISE_LINE.test(stripBold(line))) continue;

    const wordOnly = stripBold(line).match(QUESTION_WORD_ONLY);
    if (wordOnly) {
      push();
      pendingNumber = Number(wordOnly[1]);
      continue;
    }

    const optionMatch = line.match(OPTION_LINE);
    const startMatch = stripBold(line).match(QUESTION_START);

    if (startMatch && !(current && current.options.length > 0 && optionMatch)) {
      // A numbered line starts a new question block.
      push();
      current = {
        number: Number(startMatch[1]),
        question: startMatch[2].trim(),
        options: [],
        boldOptionIndex: null,
        answerLetter: null,
        answerText: null,
        answerSource: null,
        explanation: null,
      };
      pendingNumber = null;
      continue;
    }

    const answerMatch = stripBold(line).match(ANSWER_LINE);
    if (current && answerMatch) {
      const resolved = letterFromAnswerValue(answerMatch[1], current.options);
      if (resolved.letter) {
        current.answerLetter = resolved.letter;
        current.answerText = resolved.text;
        current.answerSource = "document_explicit";
      }
      capturingExplanation = false;
      continue;
    }

    const explanationMatch = line.match(EXPLANATION_LINE);
    if (current && explanationMatch) {
      current.explanation = stripBold(explanationMatch[1]).trim();
      capturingExplanation = true;
      continue;
    }

    if (optionMatch && current) {
      const letter = optionMatch[1].toLowerCase();
      const expected = LETTERS[current.options.length];
      if (letter === expected || current.options.length < 4) {
        const value = optionMatch[2].trim();
        const bold = /^\*\*[\s\S]+\*\*$/.test(value) || /^\*\*/.test(rawLine.trim());
        if (bold) current.boldOptionIndex = current.options.length;
        current.options.push(stripBold(value));
        capturingExplanation = false;
        continue;
      }
    }

    if (current) {
      if (capturingExplanation) {
        current.explanation = `${current.explanation ?? ""} ${stripBold(line)}`.trim();
      } else if (current.options.length === 0) {
        current.question = `${current.question} ${stripBold(line)}`.trim();
      }
      continue;
    }

    if (pendingNumber !== null) {
      current = {
        number: pendingNumber,
        question: stripBold(line),
        options: [],
        boldOptionIndex: null,
        answerLetter: null,
        answerText: null,
        answerSource: null,
        explanation: null,
      };
      pendingNumber = null;
    }
  }
  push();

  // Apply the answer key and formatting hints, then validate.
  const seen = new Set<string>();
  const questions: ParsedQuestion[] = [];
  for (const q of blocks) {
    q.question = q.question.replace(/\s+/g, " ").trim();
    q.options = q.options.map((o) => o.replace(/\s+/g, " ").trim()).filter(Boolean);
    if (q.question.length < 8) continue;
    if (q.options.length !== 4) continue;
    if (new Set(q.options.map(normalise)).size !== 4) continue;
    if (q.options.some((o) => o.length === 0)) continue;

    if (!q.answerLetter && q.number !== null && answerKey[q.number]) {
      q.answerLetter = answerKey[q.number];
      q.answerText = q.options[LETTERS.indexOf(q.answerLetter)] ?? null;
      q.answerSource = "document_answer_key";
    }
    if (!q.answerLetter && q.boldOptionIndex !== null) {
      // Only trust formatting when exactly one option was emphasised.
      q.answerLetter = LETTERS[q.boldOptionIndex];
      q.answerText = q.options[q.boldOptionIndex];
      q.answerSource = "document_formatting";
    }

    const key = normalise(q.question);
    if (seen.has(key)) continue;
    seen.add(key);
    questions.push(q);
  }

  return { questions, mode: questions.length >= 3 ? "question_paper" : "notes" };
}