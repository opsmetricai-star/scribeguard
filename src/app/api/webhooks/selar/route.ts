import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createAdmin } from "@/lib/supabase/server";

/**
 * Trusted plan activation. A redirect from checkout never upgrades an account.
 * Call this endpoint from a verified payment webhook or an admin tool with the
 * header `x-webhook-secret: $SELAR_WEBHOOK_SECRET`.
 * NOTE: confirm your payment provider's real webhook payload/signature scheme and
 * adapt the parsing below; this endpoint only trusts the shared secret.
 */
const Payload = z.object({
  email: z.string().email(),
  plan: z.enum(["starter", "pro", "business"]),
  reference: z.string().max(200).optional(),
});

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(req: Request) {
  const secret = process.env.SELAR_WEBHOOK_SECRET;
  const given = req.headers.get("x-webhook-secret") ?? "";
  if (!secret || !safeEqual(secret, given)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = Payload.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const { email, plan, reference } = parsed.data;

  const admin = createAdmin();
  const { data: updated, error } = await admin
    .from("profiles")
    .update({ plan, credits_used: 0 })
    .ilike("email", email)
    .select("id");
  if (error) return NextResponse.json({ error: "Database error" }, { status: 500 });

  await admin.from("subscription_events").insert({ user_email: email, plan, reference: reference ?? null });
  if (updated?.[0]) {
    await admin.from("notifications").insert({
      user_id: updated[0].id,
      title: `Your ${plan} plan is active`,
      body: "Thanks for subscribing. Your credits have been refreshed.",
    });
  }
  return NextResponse.json({ ok: true, matched: updated?.length ?? 0 });
}
