"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface N { id: string; title: string; body: string | null; read: boolean; created_at: string }

export default function Notifications() {
  const router = useRouter();
  const [items, setItems] = useState<N[]>([]);

  const load = useCallback(async () => {
    const { data } = await createClient().from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
    setItems(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function markAll() {
    await createClient().from("notifications").update({ read: true }).eq("read", false);
    await load(); router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <button className="btn btn-light" onClick={markAll}>Mark all read</button>
      </div>
      <div className="card mt-6 divide-y divide-line">
        {items.length === 0 && <p className="p-6 text-sm text-ink/55">Nothing yet.</p>}
        {items.map((n) => (
          <div key={n.id} className="p-5">
            <div className="flex items-center gap-2 font-semibold">{!n.read && <span className="h-2 w-2 rounded-full bg-accent" />}{n.title}</div>
            {n.body && <p className="mt-1 text-sm text-ink/60">{n.body}</p>}
            <div className="mt-2 text-xs text-ink/40">{new Date(n.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
