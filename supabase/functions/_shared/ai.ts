const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

export const AI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "google/gemini-3.5-flash";

export class AiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Message = { role: "system" | "user"; content: unknown };

export async function callAi(messages: Message[], maxTokens: number): Promise<string> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new AiError("AI is not configured.", 500);

  const body = JSON.stringify({
    model: AI_MODEL,
    messages,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  let lastError: AiError | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body,
    });

    if (response.ok) {
      const json = await response.json();
      const content = json?.choices?.[0]?.message?.content;
      if (typeof content === "string" && content.trim().length > 0) return content;
      lastError = new AiError("The AI returned an empty response.", 502);
      continue;
    }

    const text = await response.text();
    console.error("AI gateway error", response.status, text.slice(0, 500));
    if (response.status === 429) throw new AiError("AI is temporarily busy. Please try again in a moment.", 429);
    if (response.status === 402) throw new AiError("AI credits are exhausted. Please add credits to continue.", 402);
    lastError = new AiError("The AI request failed.", 502);
    if (response.status < 500) break;
  }
  throw lastError ?? new AiError("The AI request failed.", 502);
}

export function parseJson<T>(raw: string): T {
  const cleaned = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const candidate = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;
  return JSON.parse(candidate) as T;
}
