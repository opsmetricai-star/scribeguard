"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Settings() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data }) => {
      setEmail(data.user?.email ?? "");
      const { data: p } = await sb.from("profiles").select("full_name,company").eq("id", data.user!.id).single();
      setName(p?.full_name ?? ""); setCompany(p?.company ?? "");
    });
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const sb = createClient();
    const { data } = await sb.auth.getUser();
    const { error } = await sb.from("profiles").update({ full_name: name, company }).eq("id", data.user!.id);
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Profile saved." });
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setMsg({ ok: false, text: "Use at least 8 characters." }); return; }
    const { error } = await createClient().auth.updateUser({ password });
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Password updated." });
    if (!error) setPassword("");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-semibold">Settings</h1>
      {msg && <p role="status" className={`mt-4 rounded-xl p-3 text-sm ${msg.ok ? "bg-mint/60 text-emerald-900" : "bg-red-50 text-red-700"}`}>{msg.text}</p>}
      <form onSubmit={saveProfile} className="card mt-6 space-y-3 p-6">
        <h2 className="font-semibold">Profile</h2>
        <input className="field bg-mist" value={email} disabled aria-label="Email" />
        <input className="field" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
        <input className="field" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={120} />
        <button className="btn btn-dark">Save profile</button>
      </form>
      <form onSubmit={changePassword} className="card mt-6 space-y-3 p-6">
        <h2 className="font-semibold">Change password</h2>
        <input className="field" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        <button className="btn btn-light">Update password</button>
      </form>
    </div>
  );
}
