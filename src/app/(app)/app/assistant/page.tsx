"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { callAI } from "@/lib/callAI";

type Msg = { role: "user" | "model"; text: string };

export default function Assistant() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const end = useRef<HTMLDivElement>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setError(null); setInput(""); setBusy(true);
    const history = msgs.slice(-12);
    setMsgs((m) => [...m, { role: "user", text }]);
    try {
      const { output } = await callAI<{ output: string }>({ kind: "chat", message: text, history });
      setMsgs((m) => [...m, { role: "model", text: output }]);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setBusy(false);
      setTimeout(() => end.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-3xl flex-col">
      <h1 className="text-3xl font-semibold">Assistant</h1>
      <p className="mt-1 text-sm text-ink/60">Each message uses 1 credit.</p>
      <div className="card mt-6 flex-1 space-y-4 overflow-y-auto p-5">
        {msgs.length === 0 && <p className="text-sm text-ink/50">Ask for a draft, a summary or an analysis to begin.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
            <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-ink text-white" : "bg-mist"}`}>{m.text}</div>
          </div>
        ))}
        {busy && <div className="text-sm text-ink/50">Thinking…</div>}
        <div ref={end} />
      </div>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input className="field" placeholder="Message the assistant" value={input} onChange={(e) => setInput(e.target.value)} maxLength={8000} />
        <button className="btn btn-dark" disabled={busy || !input.trim()} aria-label="Send"><Send size={16} /></button>
      </form>
    </div>
  );
}
