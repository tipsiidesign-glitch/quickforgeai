import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { callAi, parseJson, AiError } from "../_shared/ai.ts";
import { getUserClient } from "../_shared/auth.ts";
import { parseQuestions, normalise as normaliseText, type ParsedQuestion } from "../_shared/mcqParser.ts";
import { resolveAnswerFromWeb } from "../_shared/webAnswer.ts";

const BodySchema = z.object({
  document_id: z.string().uuid(),
  difficulty: z.enum(["easy", "medium", "hard", "mixed"]),
  title: z.string().trim().max(120).optional(),
  subject: z.string().trim().max(80).optional(),
});

type AiQuestion = {
  question?: string;
  options?: string[];
  correct_answer?: string | null;
  answer_marked_in_document?: boolean;
  explanation?: string;
  difficulty?: string;
  topic?: string;
};

type AiPayload = { title?: string; subject?: string; mode?: string; questions?: AiQuestion[] };

type BuiltQuestion = {
  question_text: string;
  options: string[];
  correct_index: number | null;
  answer_source: "document_explicit" | "document_formatting" | "document_answer_key" | "web_retrieval" | "ai_fallback";
  answer_confidence: "high" | "medium" | "low";
  answer_source_title: string | null;
  answer_source_url: string | null;
  explanation: string | null;
  topic: string | null;
  difficulty: string | null;
};

const LETTERS = ["a", "b", "c", "d"] as const;
const MAX_WEB_LOOKUPS = 30;

const MODEL_READABLE: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function estimateQuestionCount(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(5, Math.min(40, Math.round(words / 130)));
}

function validate(q: BuiltQuestion) {
  if (!q.question_text || q.question_text.trim().length < 8) return false;
  if (/^(chapter|section|instructions?|answer key|references?)\b/i.test(q.question_text)) return false;
  if (q.options.length !== 4) return false;
  if (q.options.some((o) => !o || o.trim().length === 0)) return false;
  if (new Set(q.options.map(normaliseText)).size !== 4) return false;
  if (q.correct_index === null || q.correct_index < 0 || q.correct_index > 3) return false;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = await getUserClient(req);
    if (!auth) return json({ error: "Not authenticated." }, 401);
    const { client, userId } = auth;

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid request.", details: parsed.error.flatten().fieldErrors }, 400);
    const { document_id, difficulty, title, subject } = parsed.data;

    const { data: doc, error: docError } = await client
      .from("documents")
      .select("*")
      .eq("id", document_id)
      .maybeSingle();
    if (docError || !doc) return json({ error: "Document not found." }, 404);

    const setStage = async (stage: string, extra: Record<string, unknown> = {}) => {
      await client
        .from("documents")
        .update({ processing_status: "processing", processing_stage: stage, processing_error: null, ...extra })
        .eq("id", doc.id);
    };
    const fail = async (message: string, status: number) => {
      await client
        .from("documents")
        .update({ processing_status: "failed", processing_stage: "failed", processing_error: message })
        .eq("id", doc.id);
      return json({ error: message }, status);
    };

    await setStage("extracting");

    const ext = (doc.file_name.split(".").pop() ?? "").toLowerCase();
    const sourceText: string = typeof doc.extracted_text === "string" ? doc.extracted_text : "";
    let built: BuiltQuestion[] = [];
    let mode: "question_paper" | "notes" = "notes";
    let aiTitle: string | undefined;
    let aiSubject: string | undefined;

    // ---------- 1. Structure-based extraction from text ----------
    await setStage("detecting_questions");
    let parsedQuestions: ParsedQuestion[] = [];
    if (sourceText.trim().length > 40) {
      const result = parseQuestions(sourceText);
      parsedQuestions = result.questions;
      mode = result.mode;
    }

    if (parsedQuestions.length >= 3) {
      await setStage("detecting_answers", { document_mode: "question_paper", detected_question_count: parsedQuestions.length });
      built = parsedQuestions.map((q) => ({
        question_text: q.question,
        options: q.options,
        correct_index: q.answerLetter ? LETTERS.indexOf(q.answerLetter as typeof LETTERS[number]) : null,
        answer_source: q.answerSource ?? "ai_fallback",
        answer_confidence: q.answerSource === "document_formatting" ? "medium" : "high",
        answer_source_title: q.answerSource ? doc.file_name : null,
        answer_source_url: null,
        explanation: q.explanation,
        topic: null,
        difficulty: difficulty === "mixed" ? "medium" : difficulty,
      }));
      mode = "question_paper";
    } else {
      // ---------- 2. Model-based extraction / generation ----------
      const readable = MODEL_READABLE[ext] && doc.storage_path;
      if (!readable && sourceText.trim().length < 40) {
        return await fail("We couldn't read useful text from this file.", 422);
      }

      const instruction = [
        "You process study material for an exam-preparation app.",
        "FIRST decide the mode of the material:",
        '"question_paper" when it already contains multiple-choice questions with options, or "notes" when it is study material.',
        "If mode is question_paper: extract EVERY existing question verbatim — do not rewrite, do not invent extra questions, keep the original terminology and option wording, and keep the original order.",
        "For each extracted question, report the correct answer ONLY if the document states it (an answer line, an answer key at the end, or an option that is bold, highlighted, underlined, ticked or otherwise visually marked).",
        "Set answer_marked_in_document to true only when the document itself indicates that answer; otherwise set correct_answer to null and answer_marked_in_document to false. Never guess in question_paper mode.",
        `If mode is notes: write high-quality multiple-choice questions covering the material (difficulty preference: ${difficulty}), each with exactly 4 distinct options, one correct answer, based only on the material.`,
        'Respond with STRICT JSON only: {"mode":"question_paper"|"notes","title":string,"subject":string,"questions":[{"question":string,"options":[string,string,string,string],"correct_answer":string|null,"answer_marked_in_document":boolean,"explanation":string,"difficulty":"easy"|"medium"|"hard","topic":string}]}',
      ].join(" ");

      const content: unknown[] = [{ type: "text", text: instruction }];
      let estimated = 20;
      if (sourceText.trim().length > 40) {
        estimated = estimateQuestionCount(sourceText);
        content.push({ type: "text", text: `Material:\n\n${sourceText.slice(0, 60000)}` });
        content.push({ type: "text", text: `If mode is notes, produce about ${estimated} questions.` });
      } else {
        const { data: file, error: fileError } = await client.storage.from("documents").download(doc.storage_path!);
        if (fileError || !file) return await fail("We couldn't read this file.", 400);
        const base64 = toBase64(new Uint8Array(await file.arrayBuffer()));
        const mime = MODEL_READABLE[ext];
        if (mime === "application/pdf") {
          content.push({ type: "file", file: { filename: doc.file_name, file_data: `data:${mime};base64,${base64}` } });
        } else {
          content.push({ type: "image_url", image_url: { url: `data:${mime};base64,${base64}` } });
        }
        content.push({ type: "text", text: "Pay close attention to bold, highlighted, coloured, underlined or ticked options — they usually mark the correct answer." });
      }

      let payload: AiPayload;
      try {
        const raw = await callAi(
          [
            { role: "system", content: "You output strict JSON only. No markdown, no commentary." },
            { role: "user", content },
          ],
          24000,
        );
        payload = parseJson<AiPayload>(raw);
      } catch (error) {
        const status = error instanceof AiError ? error.status : 502;
        const message = error instanceof AiError ? error.message : "We couldn't create your test from this file.";
        return await fail(message, status);
      }

      mode = payload.mode === "question_paper" ? "question_paper" : "notes";
      aiTitle = payload.title?.trim();
      aiSubject = payload.subject?.trim();

      built = (payload.questions ?? []).map((q) => {
        const options = Array.isArray(q.options) ? q.options.map((o) => String(o ?? "").trim()) : [];
        const answer = typeof q.correct_answer === "string" ? q.correct_answer.trim() : "";
        let index: number | null = null;
        if (answer) {
          index = options.findIndex((o) => normaliseText(o) === normaliseText(answer));
          if (index < 0) {
            const letter = answer.match(/^[\(\[]?\s*([a-dA-D])\s*[\)\].:\-]?\s*$/);
            index = letter ? LETTERS.indexOf(letter[1].toLowerCase() as typeof LETTERS[number]) : -1;
          }
          if (index < 0) index = null;
        }
        const fromDocument = mode === "question_paper" && q.answer_marked_in_document === true && index !== null;
        return {
          question_text: String(q.question ?? "").trim(),
          options,
          correct_index: index,
          answer_source: fromDocument ? "document_explicit" : mode === "notes" ? "ai_fallback" : "ai_fallback",
          answer_confidence: fromDocument ? "high" : mode === "notes" ? "high" : "low",
          answer_source_title: fromDocument || mode === "notes" ? doc.file_name : null,
          answer_source_url: null,
          explanation: typeof q.explanation === "string" ? q.explanation.trim().slice(0, 600) : null,
          topic: typeof q.topic === "string" ? q.topic.trim().slice(0, 80) : null,
          difficulty: ["easy", "medium", "hard"].includes(String(q.difficulty))
            ? String(q.difficulty)
            : difficulty === "mixed" ? "medium" : difficulty,
        } as BuiltQuestion;
      });

      // Notes-generated answers come from the material itself.
      if (mode === "notes") {
        built = built.map((q) => ({ ...q, answer_source: "document_explicit", answer_confidence: "high" }));
      }
      await client
        .from("documents")
        .update({ document_mode: mode, detected_question_count: built.length })
        .eq("id", doc.id);
    }

    // ---------- 3. Deduplicate ----------
    await setStage("validating");
    const seen = new Set<string>();
    built = built.filter((q) => {
      const key = normaliseText(q.question_text);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    built = built.filter((q) => q.options.length === 4 && q.question_text.trim().length >= 8);

    if (built.length === 0) {
      return await fail("No valid MCQ questions were detected in this document.", 422);
    }

    // ---------- 4. Web retrieval for missing answers ----------
    const missing = built.filter((q) => q.correct_index === null);
    if (missing.length > 0) {
      await setStage("retrieving_answers");
      for (const q of missing.slice(0, MAX_WEB_LOOKUPS)) {
        const resolved = await resolveAnswerFromWeb(q.question_text, q.options);
        if (resolved.letter) {
          q.correct_index = LETTERS.indexOf(resolved.letter as typeof LETTERS[number]);
          q.answer_source = resolved.source;
          q.answer_confidence = resolved.confidence;
          q.answer_source_title = resolved.sourceTitle;
          q.answer_source_url = resolved.sourceUrl;
          if (!q.explanation && resolved.explanation) q.explanation = resolved.explanation;
        }
      }
    }

    await setStage("validating");
    const finalQuestions = built.filter(validate);
    if (finalQuestions.length === 0) {
      return await fail("We couldn't verify any answers for this document.", 422);
    }

    // ---------- 5. Persist ----------
    await setStage("creating_test");
    const testTitle = (title?.trim() || aiTitle || doc.file_name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ")).slice(0, 120);
    const testSubject = (subject?.trim() || aiSubject || "General").slice(0, 80);

    const fromDocument = finalQuestions.filter((q) => q.answer_source.startsWith("document")).length;
    const fromWeb = finalQuestions.filter((q) => q.answer_source === "web_retrieval").length;
    const fromAi = finalQuestions.filter((q) => q.answer_source === "ai_fallback").length;

    const { data: test, error: testError } = await client
      .from("tests")
      .insert({
        user_id: userId,
        document_id: doc.id,
        title: testTitle,
        subject: testSubject,
        difficulty,
        question_count: finalQuestions.length,
        status: "ready",
        answers_from_document: fromDocument,
        answers_from_web: fromWeb,
        answers_from_ai: fromAi,
      })
      .select()
      .single();

    if (testError || !test) {
      console.error("test insert failed", testError);
      return await fail("We couldn't save your test.", 500);
    }

    const rows = finalQuestions.map((q, index) => ({
      test_id: test.id,
      position: index,
      question_text: q.question_text,
      option_a: q.options[0],
      option_b: q.options[1],
      option_c: q.options[2],
      option_d: q.options[3],
      correct_option: LETTERS[q.correct_index!],
      correct_answer: q.options[q.correct_index!],
      answer_source: q.answer_source,
      answer_confidence: q.answer_confidence,
      answer_source_title: q.answer_source_title,
      answer_source_url: q.answer_source_url,
      explanation: q.explanation,
      difficulty: q.difficulty,
      topic: q.topic,
      source_reference: doc.file_name,
    }));

    const { error: qError } = await client.from("questions").insert(rows);
    if (qError) {
      console.error("questions insert failed", qError);
      await client.from("tests").delete().eq("id", test.id);
      return await fail("We couldn't save your test questions.", 500);
    }

    await setStage("finalizing");
    await client
      .from("documents")
      .update({
        processing_status: "completed",
        processing_stage: "completed",
        detected_question_count: finalQuestions.length,
        document_mode: mode,
      })
      .eq("id", doc.id);

    return json({
      test_id: test.id,
      question_count: rows.length,
      title: testTitle,
      subject: testSubject,
      mode,
      answers_from_document: fromDocument,
      answers_from_web: fromWeb,
      answers_from_ai: fromAi,
    });
  } catch (error) {
    console.error("generate-quiz failure", error);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
