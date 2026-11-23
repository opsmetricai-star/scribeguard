import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPlan } from "@/lib/plans";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const [{ data: profile }, { data: runs }, { count: agentCount }, { count: docCount }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", auth.user!.id).single(),
    supabase.from("runs").select("id,kind,input,verdict,credits,created_at").order("created_at", { ascending: false }).limit(8),
    supabase.from("agents").select("id", { count: "exact", head: true }),
    supabase.from("documents").select("id", { count: "exact", head: true }),
  ]);
  const plan = getPlan(profile?.plan);
  const used = profile?.credits_used ?? 0;
  const name = profile?.full_name || auth.user?.email?.split("@")[0];

  const tiles = [
    { label: "Credits used", value: `${used} / ${plan.credits}` },
    { label: "Agents", value: `${agentCount ?? 0} / ${plan.agents}` },
    { label: "Documents", value: String(docCount ?? 0) },
    { label: "Plan", value: plan.name },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold">Welcome, {name}</h1>
      <p className="mt-1 text-ink/60">Your workspace at a glance: capacity, agents and the latest decisions.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (<div key={t.label} className="card p-5"><div className="text-sm text-ink/55">{t.label}</div><div className="mt-1 font-display text-2xl font-semibold">{t.value}</div></div>))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[["/app/guardrails", "Run a guardrail decision"], ["/app/agents", "Deploy an agent"], ["/app/assistant", "Open the assistant"]].map(([h, l]) => (<Link key={h} href={h} className="card card-hover p-5 font-semibold">{l}</Link>))}
      </div>
      <h2 className="mt-10 text-xl font-semibold">Recent activity</h2>
      <div className="card mt-4 divide-y divide-line">
        {(runs ?? []).length === 0 && <p className="p-6 text-sm text-ink/55">No activity yet. Run a guardrail decision or deploy an agent to see results here.</p>}
        {(runs ?? []).map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-4 text-sm">
            <span className="w-20 rounded-full bg-lilac px-3 py-1 text-center text-xs font-semibold capitalize text-accent">{r.kind}</span>
            <span className="min-w-0 flex-1 truncate">{r.input}</span>
            {r.verdict && <span className="text-xs font-semibold uppercase text-ink/60">{r.verdict}</span>}
            <span className="hidden text-xs text-ink/45 sm:block">{new Date(r.created_at).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
