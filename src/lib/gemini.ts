import { z } from "zod";

const MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.5-flash",
  process.env.GEMINI_FALLBACK_MODEL || "gemini-3.1-flash-lite",
];

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
  if (!key) throw new AIError("The AI engine is temporarily unavailable.", 503);

  const contents = [
    ...(opts.history ?? []).map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: "user", parts: [{ text: opts.prompt }] },
  ];

  const payload = JSON.stringify({
    contents,
    ...(opts.system ? { systemInstruction: { parts: [{ text: opts.system }] } } : {}),
    generationConfig: {
      temperature: opts.temperature ?? 0.4,
      ...(opts.json ? { responseMimeType: "application/json" } : {}),
    },
  });

  let lastErr: AIError | null = null;
  for (const model of MODELS) {
    let res: Response;
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: payload,
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      lastErr = new AIError("The model timed out. Please retry.", 504);
      continue; // try the fallback model
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      lastErr = new AIError(`Model request failed (${res.status}). ${body.slice(0, 160)}`, res.status === 429 ? 429 : 502);
      if ([404, 429, 500, 503].includes(res.status)) continue;
      throw lastErr;
    }
    const data = await res.json();
    const text = ((data?.candidates?.[0]?.content?.parts ?? []) as { text?: string; thought?: boolean }[])
      .filter((p) => !p.thought)
      .map((p) => p.text ?? "")
      .join("");
    if (!text) { lastErr = new AIError("The model returned an empty response.", 502); continue; }
    return text;
  }
  throw lastErr ?? new AIError("The model is unavailable.", 502);
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
