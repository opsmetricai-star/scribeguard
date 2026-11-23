"use client";
import { useActionState } from "react";
import { sendContact } from "./actions";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, null);
  if (state?.ok) return <div className="card p-8 text-lg">Thanks! We received your message and will reply by email.</div>;
  return (
    <form action={action} className="card grid gap-4 p-8">
      <input name="name" required placeholder="Full name" className="field" />
      <input name="email" type="email" required placeholder="Work email" className="field" />
      <input name="company" placeholder="Company (optional)" className="field" />
      <textarea name="message" required minLength={10} rows={5} placeholder="How can we help?" className="field" />
      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      <button className="btn btn-dark" disabled={pending}>{pending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
