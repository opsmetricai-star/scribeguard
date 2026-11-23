import { createClient } from "@/lib/supabase/server";
import { AnalyticsCharts } from "./Charts";

export const metadata = { title: "Analytics" };

export default async function Analytics() {
  const supabase = await createClient();
  const since = new Date(Date.now() - 29 * 86400000).toISOString();
  const { data: runs } = await supabase.from("runs").select("kind,verdict,credits,created_at").gte("created_at", since).order("created_at");

  const days: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) days[new Date(Date.now() - i * 86400000).toISOString().slice(5, 10)] = 0;
  const kinds: Record<string, number> = { chat: 0, guardrail: 0, agent: 0 };
  const verdicts: Record<string, number> = { pass: 0, warn: 0, block: 0 };
  let credits = 0;
  for (const r of runs ?? []) {
    const k = r.created_at.slice(5, 10);
    if (k in days) days[k] += r.credits;
    kinds[r.kind] = (kinds[r.kind] ?? 0) + 1;
    if (r.verdict) verdicts[r.verdict] = (verdicts[r.verdict] ?? 0) + 1;
    credits += r.credits;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-ink/60">Last 30 days · {runs?.length ?? 0} runs · {credits} credits</p>
      <AnalyticsCharts
        daily={Object.entries(days).map(([day, credits]) => ({ day, credits }))}
        kinds={Object.entries(kinds).map(([name, runs]) => ({ name, runs }))}
        verdicts={Object.entries(verdicts).map(([name, count]) => ({ name, count }))}
      />
    </div>
  );
}
