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
  correct_answer?: string;
  explanation?: string;
  difficulty?: string;
  topic?: string;
};

type AiPayload = { title?: string; subject?: string; mode?: string; questions?: AiQuestion[] };

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

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = await getUserClient(req);
    if (!auth) return json({ error: "Not authenticated." }, 401);
    const { client, userId } = auth;

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid request.", details: parsed.error.flatten().fieldErrors }, 400);
    const { document_id, question_count, difficulty, title, subject } = parsed.data;

    const { data: doc, error: docError } = await client
      .from("documents")
      .select("*")
      .eq("id", document_id)
      .maybeSingle();

    if (docError || !doc) return json({ error: "Document not found." }, 404);

    await client.from("documents").update({ processing_status: "generating", processing_error: null }).eq("id", doc.id);

    const ext = (doc.file_name.split(".").pop() ?? "").toLowerCase();
    const instruction = [
      "You are an exam question writer for students.",
      `Create exactly ${question_count} multiple-choice questions from the provided study material.`,
      `Difficulty preference: ${difficulty}.`,
      "Rules: each question has exactly 4 distinct options and exactly one correct answer;",
      "the correct_answer string must match one option exactly; base questions on the supplied material only;",
      "do not invent facts that are not supported by the material; avoid duplicate questions;",
      "preserve important terminology; keep questions concise.",
      'Respond with STRICT JSON only: {"title": string, "subject": string, "questions": [{"question": string, "options": [string,string,string,string], "correct_answer": string, "explanation": string, "difficulty": "easy"|"medium"|"hard", "topic": string}]}',
      "If the material is too short, generate as many good questions as it genuinely supports.",
    ].join(" ");

    const content: unknown[] = [{ type: "text", text: instruction }];

    if (doc.extracted_text && doc.extracted_text.trim().length > 40) {
      content.push({ type: "text", text: `Study material:\n\n${doc.extracted_text.slice(0, 60000)}` });
    } else if (MODEL_READABLE[ext] && doc.storage_path) {
      const { data: file, error: fileError } = await client.storage.from("documents").download(doc.storage_path);
      if (fileError || !file) {
        await client.from("documents").update({ processing_status: "failed", processing_error: "download_failed" }).eq("id", doc.id);
        return json({ error: "We couldn't read this file." }, 400);
      }
      const base64 = toBase64(new Uint8Array(await file.arrayBuffer()));
      const mime = MODEL_READABLE[ext];
      if (mime === "application/pdf") {
        content.push({ type: "file", file: { filename: doc.file_name, file_data: `data:${mime};base64,${base64}` } });
      } else {
        content.push({ type: "image_url", image_url: { url: `data:${mime};base64,${base64}` } });
      }
    } else {
      await client.from("documents").update({ processing_status: "failed", processing_error: "no_text" }).eq("id", doc.id);
      return json({ error: "We couldn't read useful text from this file." }, 422);
    }

    let payload: AiPayload;
    try {
      const raw = await callAi(
        [
          { role: "system", content: "You output strict JSON only. No markdown, no commentary." },
          { role: "user", content },
        ],
        Math.min(16000, 700 + question_count * 320),
      );
      payload = parseJson<AiPayload>(raw);
    } catch (error) {
      const status = error instanceof AiError ? error.status : 502;
      const message = error instanceof AiError ? error.message : "We couldn't generate the test from this document.";
      await client.from("documents").update({ processing_status: "failed", processing_error: message }).eq("id", doc.id);
      return json({ error: message }, status);
    }

    // ---- validate AI output ----
    const seen = new Set<string>();
    const valid = (payload.questions ?? []).filter((q) => {
      if (!q?.question || typeof q.question !== "string") return false;
      if (!Array.isArray(q.options) || q.options.length !== 4) return false;
      if (q.options.some((o) => typeof o !== "string" || o.trim().length === 0)) return false;
      const optionSet = new Set(q.options.map(normalise));
      if (optionSet.size !== 4) return false;
      if (!q.correct_answer || !q.options.some((o) => normalise(o) === normalise(q.correct_answer!))) return false;
      const key = normalise(q.question);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (valid.length === 0) {
      await client.from("documents").update({ processing_status: "failed", processing_error: "no_valid_questions" }).eq("id", doc.id);
      return json({ error: "We couldn't generate the test from this document." }, 422);
    }

    const limited = valid.slice(0, question_count);
    const testTitle = (title?.trim() || payload.title?.trim() || doc.file_name.replace(/\.[^.]+$/, "")).slice(0, 120);
    const testSubject = (subject?.trim() || payload.subject?.trim() || "General").slice(0, 80);

    const { data: test, error: testError } = await client
      .from("tests")
      .insert({
        user_id: userId,
        document_id: doc.id,
        title: testTitle,
        subject: testSubject,
        difficulty,
        question_count: limited.length,
        status: "ready",
      })
      .select()
      .single();

    if (testError || !test) {
      console.error("test insert failed", testError);
      return json({ error: "We couldn't save your test." }, 500);
    }

    const letters = ["a", "b", "c", "d"] as const;
    const rows = limited.map((q, index) => {
      const correctIndex = q.options!.findIndex((o) => normalise(o) === normalise(q.correct_answer!));
      return {
        test_id: test.id,
        position: index,
        question_text: q.question!.trim(),
        option_a: q.options![0].trim(),
        option_b: q.options![1].trim(),
        option_c: q.options![2].trim(),
        option_d: q.options![3].trim(),
        correct_option: letters[correctIndex],
        explanation: typeof q.explanation === "string" ? q.explanation.trim().slice(0, 600) : null,
        difficulty: ["easy", "medium", "hard"].includes(String(q.difficulty)) ? String(q.difficulty) : (difficulty === "mixed" ? "medium" : difficulty),
        topic: typeof q.topic === "string" ? q.topic.trim().slice(0, 80) : null,
        source_reference: doc.file_name,
      };
    });

    const { error: qError } = await client.from("questions").insert(rows);
    if (qError) {
      console.error("questions insert failed", qError);
      await client.from("tests").delete().eq("id", test.id);
      return json({ error: "We couldn't save your test questions." }, 500);
    }

    await client.from("documents").update({ processing_status: "completed" }).eq("id", doc.id);

    return json({ test_id: test.id, question_count: rows.length, title: testTitle, subject: testSubject });
  } catch (error) {
    console.error("generate-quiz failure", error);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
