import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { callAi, parseJson, AiError } from "../_shared/ai.ts";
import { getUserClient } from "../_shared/auth.ts";

const BodySchema = z.object({
  question_id: z.string().uuid(),
  user_answer: z.enum(["a", "b", "c", "d"]).nullable().optional(),
});

type Explanation = {
  explanation: string;
  why_user_is_wrong: string;
  why_correct_is_right: string;
  memory_tip: string;
  topic: string;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = await getUserClient(req);
    if (!auth) return json({ error: "Not authenticated." }, 401);
    const { client, userId } = auth;

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid request." }, 400);
    const { question_id } = parsed.data;
    const userAnswer = parsed.data.user_answer ?? null;

    // cached?
    const cacheQuery = client
      .from("answer_explanations")
      .select("explanation")
      .eq("question_id", question_id)
      .eq("user_id", userId);
    const { data: cached } = userAnswer
      ? await cacheQuery.eq("user_answer", userAnswer).maybeSingle()
      : await cacheQuery.is("user_answer", null).maybeSingle();

    if (cached?.explanation) return json({ explanation: cached.explanation, cached: true });

    const { data: question, error } = await client
      .from("questions")
      .select("question_text, option_a, option_b, option_c, option_d, correct_option, explanation, topic, difficulty")
      .eq("id", question_id)
      .maybeSingle();

    if (error || !question) return json({ error: "Question not found." }, 404);

    const options: Record<string, string> = {
      a: question.option_a,
      b: question.option_b,
      c: question.option_c,
      d: question.option_d,
    };

    const prompt = [
      "A student answered a multiple choice question incorrectly. Help them understand it.",
      `Question: ${question.question_text}`,
      `Options: A) ${options.a} | B) ${options.b} | C) ${options.c} | D) ${options.d}`,
      `Correct answer: ${options[question.correct_option]}`,
      userAnswer ? `Student's answer: ${options[userAnswer]}` : "The student left this question unanswered.",
      question.explanation ? `Reference note: ${question.explanation}` : "",
      "Reply in strict JSON with keys: explanation, why_user_is_wrong, why_correct_is_right, memory_tip, topic.",
      "Keep the total length between 50 and 120 words, student-friendly and encouraging.",
    ].filter(Boolean).join("\n");

    let result: Explanation;
    try {
      const raw = await callAi(
        [
          { role: "system", content: "You output strict JSON only. No markdown." },
          { role: "user", content: prompt },
        ],
        700,
      );
      result = parseJson<Explanation>(raw);
    } catch (aiError) {
      const status = aiError instanceof AiError ? aiError.status : 502;
      const message = aiError instanceof AiError ? aiError.message : "AI explanation is temporarily unavailable. Try again.";
      return json({ error: message }, status);
    }

    if (!result?.explanation) {
      return json({ error: "AI explanation is temporarily unavailable. Try again." }, 502);
    }

    const payload: Explanation = {
      explanation: String(result.explanation),
      why_user_is_wrong: String(result.why_user_is_wrong ?? ""),
      why_correct_is_right: String(result.why_correct_is_right ?? ""),
      memory_tip: String(result.memory_tip ?? ""),
      topic: String(result.topic ?? question.topic ?? ""),
    };

    await client.from("answer_explanations").upsert(
      { question_id, user_id: userId, user_answer: userAnswer, explanation: payload },
      { onConflict: "question_id,user_id,user_answer" },
    );

    return json({ explanation: payload, cached: false });
  } catch (error) {
    console.error("explain-answer failure", error);
    return json({ error: "AI explanation is temporarily unavailable. Try again." }, 500);
  }
});
