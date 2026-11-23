"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { callAI } from "@/lib/callAI";
import { createAgent } from "./actions";

interface Agent { id: string; name: string; description: string | null; instructions: string; policy_id: string | null }
interface Policy { id: string; name: string }

export default function Agents() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [form, setForm] = useState({ name: "", description: "", instructions: "", policy_id: "" });
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const sb = createClient();
    const [a, p] = await Promise.all([
      sb.from("agents").select("id,name,description,instructions,policy_id").order("created_at", { ascending: false }),
      sb.from("policies").select("id,name"),
    ]);
    setAgents(a.data ?? []); setPolicies(p.data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    const res = await createAgent({ ...form, policy_id: form.policy_id || null });
    if (res.error) { setError(res.error); return; }
    setForm({ name: "", description: "", instructions: "", policy_id: "" }); load();
  }

  async function run() {
    if (!active) return;
    setBusy(true); setError(null); setOutput(null);
    try {
      const { output } = await callAI<{ output: string }>({ kind: "agent", agentId: active, input });
      setOutput(output); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Failed."); } finally { setBusy(false); }
  }

  async function remove(id: string) {
    await createClient().from("agents").delete().eq("id", id);
    if (active === id) { setActive(null); setOutput(null); }
    load();
  }

  const current = agents.find((a) => a.id === active);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="text-3xl font-semibold">Agents</h1>
        <form onSubmit={create} className="card mt-6 space-y-3 p-5">
          <input className="field" placeholder="Agent name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={80} />
          <input className="field" placeholder="Short description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={200} />
          <textarea className="field" rows={5} placeholder="Instructions: what should this agent do, and how?" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} required minLength={10} maxLength={4000} />
          <select className="field" value={form.policy_id} onChange={(e) => setForm({ ...form, policy_id: e.target.value })} aria-label="Policy">
            <option value="">Base policy only</option>
            {policies.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="btn btn-dark w-full">Create agent</button>
        </form>
        <div className="mt-4 space-y-3">
          {agents.map((a) => (
            <div key={a.id} className={`card flex items-center justify-between gap-3 p-4 ${active === a.id ? "border-accent" : ""}`}>
              <button className="min-w-0 flex-1 text-left" onClick={() => { setActive(a.id); setOutput(null); }}>
                <div className="font-semibold">{a.name}</div>
                <div className="truncate text-sm text-ink/55">{a.description || a.instructions}</div>
              </button>
              <button aria-label={`Delete ${a.name}`} onClick={() => remove(a.id)} className="rounded-lg p-2 hover:bg-mist"><Trash2 size={16} /></button>
            </div>
          ))}
          {agents.length === 0 && <p className="text-sm text-ink/55">No agents yet.</p>}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">{current ? `Run: ${current.name}` : "Run an agent"}</h2>
        <div className="card mt-6 space-y-4 p-5">
          {!current ? <p className="text-sm text-ink/55">Select an agent to run it. Each run uses 2 credits.</p> : (
            <>
              <textarea className="field" rows={7} placeholder="Input for the agent" value={input} onChange={(e) => setInput(e.target.value)} maxLength={8000} />
              <button className="btn btn-accent" onClick={run} disabled={busy || !input.trim()}><Play size={15} />{busy ? "Running…" : "Run agent"}</button>
            </>
          )}
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {output && <div className="whitespace-pre-wrap rounded-2xl bg-mist p-4 text-sm leading-relaxed">{output}</div>}
        </div>
      </div>
    </div>
  );
}
