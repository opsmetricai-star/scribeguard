"use client";
import { useCallback, useEffect, useState } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Doc { id: string; name: string; storage_path: string; size_bytes: number; content_text: string | null; created_at: string }

const MAX_BYTES = 5 * 1024 * 1024;
const TEXT_EXT = /\.(txt|md|csv)$/i;

export default function Knowledge() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await createClient().from("documents").select("*").order("created_at", { ascending: false });
    setDocs(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    if (file.size > MAX_BYTES) { setError("Files must be 5 MB or smaller."); return; }
    setBusy(true);
    const sb = createClient();
    try {
      const { data: u } = await sb.auth.getUser();
      const uid = u.user!.id;
      const path = `${uid}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const { error: upErr } = await sb.storage.from("documents").upload(path, file);
      if (upErr) throw upErr;
      const text = TEXT_EXT.test(file.name) ? (await file.text()).slice(0, 60000) : null;
      const { error: dbErr } = await sb.from("documents").insert({ user_id: uid, name: file.name, storage_path: path, size_bytes: file.size, content_text: text });
      if (dbErr) { await sb.storage.from("documents").remove([path]); throw dbErr; }
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally { setBusy(false); }
  }

  async function remove(d: Doc) {
    const sb = createClient();
    await sb.storage.from("documents").remove([d.storage_path]);
    await sb.from("documents").delete().eq("id", d.id);
    load();
  }

  async function download(d: Doc) {
    const { data, error } = await createClient().storage.from("documents").createSignedUrl(d.storage_path, 60);
    if (error || !data) { setError("Could not create a download link."); return; }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold">Knowledge</h1>
      <p className="mt-1 text-sm text-ink/60">Upload reference documents. Text, Markdown and CSV files are read by your agents; other types are stored only.</p>
      <label className="card mt-6 flex cursor-pointer flex-col items-center gap-2 border-dashed p-10 text-center hover:bg-lilac/30">
        <Upload className="text-accent" />
        <span className="font-semibold">{busy ? "Uploading…" : "Choose a file to upload"}</span>
        <span className="text-xs text-ink/50">Up to 5 MB</span>
        <input type="file" className="sr-only" onChange={upload} disabled={busy} />
      </label>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="card mt-6 divide-y divide-line">
        {docs.length === 0 && <p className="p-6 text-sm text-ink/55">No documents yet.</p>}
        {docs.map((d) => (
          <div key={d.id} className="flex items-center gap-4 p-4 text-sm">
            <FileText size={18} className="text-accent" />
            <div className="min-w-0 flex-1"><div className="truncate font-medium">{d.name}</div>
              <div className="text-xs text-ink/50">{(d.size_bytes / 1024).toFixed(1)} KB · {d.content_text ? "used by agents" : "stored only"}</div></div>
            <button aria-label={`Download ${d.name}`} onClick={() => download(d)} className="rounded-lg p-2 hover:bg-mist"><Download size={16} /></button>
            <button aria-label={`Delete ${d.name}`} onClick={() => remove(d)} className="rounded-lg p-2 hover:bg-mist"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
