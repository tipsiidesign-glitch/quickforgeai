import { callAi, parseJson } from "./ai.ts";

export type WebEvidence = { title: string; url: string; snippet: string };

export type ResolvedAnswer = {
  letter: string | null;
  source: "web_retrieval" | "ai_fallback";
  confidence: "high" | "medium" | "low";
  sourceTitle: string | null;
  sourceUrl: string | null;
  explanation: string | null;
};

const LETTERS = ["a", "b", "c", "d"];

/** Wikipedia REST search — an authoritative, key-free reference source. */
async function searchWikipedia(query: string): Promise<WebEvidence[]> {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srlimit=3&srsearch=" +
    encodeURIComponent(query.slice(0, 300));
  try {
    const response = await fetch(url, { headers: { "User-Agent": "QuickForgeAI/1.0" } });
    if (!response.ok) return [];
    const json = await response.json();
    const results = json?.query?.search ?? [];
    return results.map((r: { title: string; snippet: string }) => ({
      title: r.title,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(String(r.title).replace(/ /g, "_"))}`,
      snippet: String(r.snippet ?? "").replace(/<[^>]+>/g, "").slice(0, 600),
    }));
  } catch (_error) {
    return [];
  }
}

async function searchDuckDuckGo(query: string): Promise<WebEvidence[]> {
  const url =
    "https://api.duckduckgo.com/?no_html=1&skip_disambig=1&format=json&q=" +
    encodeURIComponent(query.slice(0, 300));
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const json = await response.json();
    const out: WebEvidence[] = [];
    if (json?.AbstractText) {
      out.push({
        title: json.Heading || "DuckDuckGo",
        url: json.AbstractURL || "https://duckduckgo.com",
        snippet: String(json.AbstractText).slice(0, 600),
      });
    }
    for (const topic of (json?.RelatedTopics ?? []).slice(0, 2)) {
      if (topic?.Text && topic?.FirstURL) {
        out.push({ title: topic.Text.slice(0, 80), url: topic.FirstURL, snippet: String(topic.Text).slice(0, 400) });
      }
    }
    return out;
  } catch (_error) {
    return [];
  }
}

const evidenceCache = new Map<string, WebEvidence[]>();

async function gatherEvidence(query: string): Promise<WebEvidence[]> {
  const cacheKey = query.toLowerCase().slice(0, 200);
  const cached = evidenceCache.get(cacheKey);
  if (cached) return cached;
  const [wiki, ddg] = await Promise.all([searchWikipedia(query), searchDuckDuckGo(query)]);
  const evidence = [...wiki, ...ddg].filter((e) => e.snippet.trim().length > 20).slice(0, 5);
  evidenceCache.set(cacheKey, evidence);
  return evidence;
}

/**
 * Resolves the answer for a question that carries no answer in the source document.
 * Web evidence is gathered first; the model only judges the evidence. When no usable
 * evidence exists the model reasons alone and the result is flagged as an AI fallback.
 */
export async function resolveAnswerFromWeb(
  question: string,
  options: string[],
): Promise<ResolvedAnswer> {
  const evidence = await gatherEvidence(question);
  const optionBlock = options.map((o, i) => `${LETTERS[i].toUpperCase()}. ${o}`).join("\n");
  const evidenceBlock = evidence.length
    ? evidence.map((e, i) => `[${i + 1}] ${e.title} (${e.url})\n${e.snippet}`).join("\n\n")
    : "NO EVIDENCE AVAILABLE";

  const prompt = [
    "Determine the correct option for this multiple-choice question.",
    "Use the supplied reference evidence when it supports an option. If the evidence does not settle it, reason from established knowledge and say so.",
    `\nQuestion: ${question}\nOptions:\n${optionBlock}`,
    `\nReference evidence:\n${evidenceBlock}`,
    '\nRespond with strict JSON: {"answer":"A"|"B"|"C"|"D","used_evidence":boolean,"evidence_index":number|null,"confidence":"high"|"medium"|"low","explanation":string}',
  ].join("\n");

  try {
    const raw = await callAi(
      [
        { role: "system", content: "You output strict JSON only. No markdown, no commentary." },
        { role: "user", content: prompt },
      ],
      600,
    );
    const parsed = parseJson<{
      answer?: string;
      used_evidence?: boolean;
      evidence_index?: number | null;
      confidence?: string;
      explanation?: string;
    }>(raw);
    const letter = LETTERS.includes(String(parsed.answer ?? "").toLowerCase())
      ? String(parsed.answer).toLowerCase()
      : null;
    const usedEvidence = Boolean(parsed.used_evidence) && evidence.length > 0;
    const chosen = usedEvidence && typeof parsed.evidence_index === "number"
      ? evidence[parsed.evidence_index - 1] ?? evidence[0]
      : null;
    const confidence = ["high", "medium", "low"].includes(String(parsed.confidence))
      ? (parsed.confidence as "high" | "medium" | "low")
      : usedEvidence ? "medium" : "low";
    return {
      letter,
      source: usedEvidence ? "web_retrieval" : "ai_fallback",
      confidence: usedEvidence ? confidence : confidence === "high" ? "medium" : confidence,
      sourceTitle: chosen?.title ?? null,
      sourceUrl: chosen?.url ?? null,
      explanation: typeof parsed.explanation === "string" ? parsed.explanation.slice(0, 600) : null,
    };
  } catch (_error) {
    return { letter: null, source: "ai_fallback", confidence: "low", sourceTitle: null, sourceUrl: null, explanation: null };
  }
}