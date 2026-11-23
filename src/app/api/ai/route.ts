import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdmin, createClient, isConfigured } from "@/lib/supabase/server";
import { AIError, GuardrailResult, generate, generateStructured } from "@/lib/gemini";
import { CREDIT_COST, getPlan } from "@/lib/plans";

export const maxDuration = 60;

const Body = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("chat"),
    message: z.string().min(1).max(8000),
    history: z.array(z.object({ role: z.enum(["user", "model"]), text: z.string().max(8000) })).max(20).default([]),
  }),
  z.object({
    kind: z.literal("guardrail"),
    text: z.string().min(1).max(12000),
    policyId: z.string().uuid().optional(),
  }),
  z.object({
    kind: z.literal("agent"),
    agentId: z.string().uuid(),
    input: z.string().min(1).max(8000),
  }),
]);

const BASE_POLICY = `Default policy: no personal data (emails, phone numbers, government IDs, card numbers), no unverifiable or absolute claims ("guaranteed", "100%"), no discriminatory or abusive language, no confidential-looking material, professional brand-safe tone.`;

export async function POST(req: Request) {
  if (!isConfigured()) return NextResponse.json({ error: "The service is temporarily unavailable." }, { status: 503 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request.", details: parsed.error.flatten() }, { status: 400 });
  const body = parsed.data;

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", auth.user.id).single();
  const plan = getPlan(profile?.plan);
  const cost = CREDIT_COST[body.kind];

  // Resolve agent / policy before spending credits (RLS scopes these to the user).
  let agent: { id: string; instructions: string; name: string; policy_id: string | null } | null = null;
  let policyRules = BASE_POLICY;
  if (body.kind === "agent") {
    const { data } = await supabase.from("agents").select("id,instructions,name,policy_id").eq("id", body.agentId).single();
    if (!data) return NextResponse.json({ error: "Agent not found." }, { status: 404 });
    agent = data;
  }
  const policyId = body.kind === "guardrail" ? body.policyId : agent?.policy_id ?? undefined;
  if (policyId) {
    const { data } = await supabase.from("policies").select("rules").eq("id", policyId).single();
    if (data) policyRules = `${BASE_POLICY}\nCustom rules:\n${data.rules}`;
  }

  // Atomic credit check + spend.
  const admin = createAdmin();
  const { data: ok, error: spendErr } = await admin.rpc("spend_credits", {
    p_user: auth.user.id,
    p_amount: cost,
    p_limit: plan.credits,
  });
  if (spendErr) return NextResponse.json({ error: "Could not check credits." }, { status: 500 });
  if (!ok) return NextResponse.json({ error: "Monthly credit limit reached. Upgrade your plan to continue.", code: "limit" }, { status: 402 });

  const refund = () => admin.rpc("spend_credits", { p_user: auth.user!.id, p_amount: -cost, p_limit: plan.credits + cost });

  try {
    let output = "";
    let verdict: string | null = null;
    let payload: unknown;

    if (body.kind === "chat") {
      output = await generate({
        system: "You are ScribeGuard Assistant, a careful enterprise writing and analysis assistant. Be accurate, concise and flag uncertainty.",
        prompt: body.message,
        history: body.history,
      });
      payload = { output };
    } else if (body.kind === "guardrail") {
      const result = await generateStructured(GuardrailResult, {
        system: `You are a content-governance reviewer. Evaluate the user's text against this policy and return JSON with keys verdict ("pass"|"warn"|"block"), score (0-100, 100 = fully compliant), findings (array of {rule, severity: "low"|"medium"|"high", excerpt, explanation, suggestion}) and rewritten (a compliant rewrite, or the original text if it already passes).\n\n${policyRules}`,
        prompt: body.text,
      });
      verdict = result.verdict;
      output = JSON.stringify(result);
      payload = { result };
    } else {
      const { data: docs } = await supabase.from("documents").select("name,content_text").not("content_text", "is", null).order("created_at", { ascending: false }).limit(5);
      const knowledge = (docs ?? []).map((d) => `### ${d.name}\n${(d.content_text ?? "").slice(0, 4000)}`).join("\n\n");
      output = await generate({
        system: `You are the agent "${agent!.name}". Follow these instructions exactly:\n${agent!.instructions}\n\nStay within this policy:\n${policyRules}${knowledge ? `\n\nReference material from the user's knowledge library:\n${knowledge}` : ""}`,
        prompt: body.input,
      });
      payload = { output };
    }

    await admin.from("runs").insert({
      user_id: auth.user.id,
      kind: body.kind,
      agent_id: agent?.id ?? null,
      input: body.kind === "chat" ? body.message : body.kind === "guardrail" ? body.text : body.input,
      output,
      verdict,
      credits: cost,
    });
    return NextResponse.json(payload);
  } catch (e) {
    await refund(); // do not charge for failed model calls
    const err = e instanceof AIError ? e : new AIError("Unexpected error.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
