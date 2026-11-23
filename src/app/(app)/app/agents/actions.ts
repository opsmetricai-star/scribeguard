"use server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getPlan } from "@/lib/plans";

const Schema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(200).optional(),
  instructions: z.string().trim().min(10).max(4000),
  policy_id: z.string().uuid().nullable().optional(),
});

/** Plan limits are enforced here, server-side, not just in the UI. */
export async function createAgent(input: unknown): Promise<{ ok?: true; error?: string }> {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { error: "Give the agent a name and instructions of at least 10 characters." };

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { error: "Not signed in." };

  const [{ data: profile }, { count }] = await Promise.all([
    supabase.from("profiles").select("plan").eq("id", auth.user.id).single(),
    supabase.from("agents").select("id", { count: "exact", head: true }),
  ]);
  const plan = getPlan(profile?.plan);
  if ((count ?? 0) >= plan.agents) return { error: `Your ${plan.name} plan allows ${plan.agents} agent${plan.agents === 1 ? "" : "s"}. Upgrade to add more.` };

  const { error } = await supabase.from("agents").insert({ ...parsed.data, user_id: auth.user.id });
  if (error) return { error: "Could not save the agent." };
  return { ok: true };
}
