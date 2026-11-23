"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { callAI } from "@/lib/callAI";
import type { GuardrailResultT } from "@/lib/gemini";

interface Policy { id: string; name: string; rules: string }

const TONE = { pass: "bg-mint text-emerald-900", warn: "bg-amber-100 text-amber-900", block: "bg-red-100 text-red-800" } as const;

export default function Guardrails() {
  const router = useRouter();
  const sb = createClient();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policyId, setPolicyId] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<GuardrailResultT | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pName, setPName] = useState("");
  const [pRules, setPRules] = useState("");

  const load = useCallback(async () => {
    const { data } = await createClient().from("policies").select("id,name,rules").order("created_at", { ascending: false });
    setPolicies(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function check() {
    setBusy(true); setError(null); setResult(null);
    try {
      const { result } = await callAI<{ result: GuardrailResultT }>({ kind: "guardrail", text, ...(policyId ? { policyId } : {}) });
      setResult(result);
      router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Failed."); } finally { setBusy(false); }
  }

  async function savePolicy(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { data: u } = await sb.auth.getUser();
    const { error } = await sb.from("policies").insert({ user_id: u.user!.id, name: pName.trim(), rules: pRules.trim() });
    if (error) { setError(error.message); return; }
    setPName(""); setPRules(""); load();
  }

  async function removePolicy(id: string) {
    await sb.from("policies").delete().eq("id", id);
    if (policyId === id) setPolicyId("");
    load();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h1 className="text-3xl font-semibold">Guardrail check</h1>
        <p className="mt-1 text-sm text-ink/60">Paste content to review it against a policy. Uses 1 credit.</p>
        <div className="card mt-6 space-y-4 p-5">
          <select className="field" value={policyId} onChange={(e) => setPolicyId(e.target.value)} aria-label="Policy">
            <option value="">Base policy only</option>
            {policies.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <textarea className="field" rows={9} maxLength={12000} placeholder="Paste the text to review…" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-dark" onClick={check} disabled={busy || !text.trim()}>{busy ? "Checking…" : "Run check"}</button>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {result && (
          <div className="card mt-6 space-y-5 p-5">
            <div className="flex items-center gap-4">
              <span className={`rounded-full px-4 py-1.5 text-sm font-semibold uppercase ${TONE[result.verdict]}`}>{result.verdict}</span>
              <span className="font-display text-2xl font-semibold">{Math.round(result.score)}<span className="text-sm text-ink/50"> / 100</span></span>
            </div>
            {result.findings.length === 0 && <p className="text-sm text-ink/60">No issues found.</p>}
            {result.findings.map((f, i) => (
              <div key={i} className="rounded-2xl border border-line p-4 text-sm">
                <div className="flex justify-between font-semibold"><span>{f.rule}</span><span className="text-xs uppercase text-ink/50">{f.severity}</span></div>
                <p className="mt-2 rounded-lg bg-mist px-3 py-2 italic">“{f.excerpt}”</p>
                <p className="mt-2 text-ink/70">{f.explanation}</p>
                <p className="mt-1 text-accent">Fix: {f.suggestion}</p>
              </div>
            ))}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold">Compliant rewrite
                <button className="text-xs text-accent" onClick={() => navigator.clipboard.writeText(result.rewritten)}>Copy</button></div>
              <p className="whitespace-pre-wrap rounded-2xl bg-lilac/50 p-4 text-sm">{result.rewritten}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold">Your policies</h2>
        <form onSubmit={savePolicy} className="card mt-4 space-y-3 p-5">
          <input className="field" placeholder="Policy name" value={pName} onChange={(e) => setPName(e.target.value)} required maxLength={80} />
          <textarea className="field" rows={4} placeholder="Rules in plain language, one per line" value={pRules} onChange={(e) => setPRules(e.target.value)} required maxLength={3000} />
          <button className="btn btn-light w-full">Save policy</button>
        </form>
        <div className="mt-4 space-y-3">
          {policies.map((p) => (
            <div key={p.id} className="card flex items-start justify-between gap-3 p-4 text-sm">
              <div><div className="font-semibold">{p.name}</div><div className="mt-1 line-clamp-3 whitespace-pre-wrap text-ink/60">{p.rules}</div></div>
              <button aria-label={`Delete ${p.name}`} onClick={() => removePolicy(p.id)} className="rounded-lg p-2 hover:bg-mist"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
