"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "forgot" | "reset";

const COPY: Record<Mode, { title: string; cta: string }> = {
  login: { title: "Welcome back", cta: "Log in" },
  signup: { title: "Create your account", cta: "Create account" },
  forgot: { title: "Reset your password", cta: "Send reset link" },
  reset: { title: "Choose a new password", cta: "Update password" },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setInfo(null);
    if (!supabaseConfigured()) { setError("Sign-in is temporarily unavailable. Please try again shortly."); return; }
    if ((mode === "signup" || mode === "reset") && password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    setBusy(true);
    const sb = createClient();
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = params.get("next");
        router.push(next && next.startsWith("/app") ? next : "/app");
        router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { full_name: name }, emailRedirectTo: `${origin}/auth/callback?next=/app/billing${params.get("plan") ? `&plan=${params.get("plan")}` : ""}` },
        });
        if (error) throw error;
        if (data.session) { router.push("/app"); router.refresh(); }
        else setInfo("Check your work email for a confirmation link, then log in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setInfo("If that email belongs to an account, a reset link is on its way.");
      } else {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.push("/app"); router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="card w-full max-w-md space-y-4 p-8">
      <h1 className="text-3xl font-semibold">{COPY[mode].title}</h1>
      {mode === "signup" && <input className="field" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />}
      {mode !== "reset" && <input className="field" type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />}
      {mode !== "forgot" && <input className="field" type="password" placeholder={mode === "reset" ? "New password" : "Password"} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={mode === "login" ? "current-password" : "new-password"} />}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {info && <p role="status" className="rounded-xl bg-mint/60 p-3 text-sm text-emerald-900">{info}</p>}
      <button className="btn btn-dark w-full" disabled={busy}>{busy ? "Please wait…" : COPY[mode].cta}</button>
      <div className="flex justify-between text-sm text-ink/60">
        {mode === "login" && (<><Link href="/forgot-password" className="hover:text-ink">Forgot password?</Link><Link href="/signup" className="font-semibold text-accent">Create account</Link></>)}
        {mode === "signup" && <span>Already have an account? <Link href="/login" className="font-semibold text-accent">Log in</Link></span>}
        {mode === "forgot" && <Link href="/login" className="font-semibold text-accent">Back to log in</Link>}
      </div>
    </form>
  );
}
