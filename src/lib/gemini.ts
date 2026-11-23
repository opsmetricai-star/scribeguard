import { z } from "zod";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

export class AIError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}

interface GenOptions {
  system?: string;
  prompt: string;
  history?: { role: "user" | "model"; text: string }[];
  json?: boolean;
  temperature?: number;
}

/** Calls Gemini over REST from the server. The key never reaches the browser. */
export async function generate(opts: GenOptions): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AIError("GEMINI_API_KEY is not configured on the server.", 503);

  const contents = [
    ...(opts.history ?? []).map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: "user", parts: [{ text: opts.prompt }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents,
        ...(opts.system ? { systemInstruction: { parts: [{ text: opts.system }] } } : {}),
        generationConfig: {
          temperature: opts.temperature ?? 0.4,
          ...(opts.json ? { responseMimeType: "application/json" } : {}),
        },
      }),
      signal: AbortSignal.timeout(45_000),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AIError(`Gemini request failed (${res.status}). ${body.slice(0, 200)}`, res.status === 429 ? 429 : 502);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (!text) throw new AIError("The model returned an empty response.", 502);
  return text;
}

export async function generateStructured<T extends z.ZodTypeAny>(
  schema: T,
  opts: Omit<GenOptions, "json">,
): Promise<z.infer<T>> {
  const raw = await generate({ ...opts, json: true, temperature: 0.1 });
  try {
    return schema.parse(JSON.parse(raw.replace(/^```json\s*|```$/g, "").trim()));
  } catch {
    throw new AIError("The model returned output that failed validation. Please retry.", 502);
  }
}

export const GuardrailResult = z.object({
  verdict: z.enum(["pass", "warn", "block"]),
  score: z.number().min(0).max(100),
  findings: z.array(
    z.object({
      rule: z.string(),
      severity: z.enum(["low", "medium", "high"]),
      excerpt: z.string(),
      explanation: z.string(),
      suggestion: z.string(),
    }),
  ),
  rewritten: z.string(),
});
export type GuardrailResultT = z.infer<typeof GuardrailResult>;
