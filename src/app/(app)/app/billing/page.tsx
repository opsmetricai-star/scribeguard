import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PLANS, getPlan } from "@/lib/plans";

export const metadata = { title: "Billing" };

export default async function Billing() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("plan,credits_used,credits_reset_at").eq("id", auth.user!.id).single();
  const plan = getPlan(profile?.plan);
  const used = profile?.credits_used ?? 0;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold">Billing</h1>
      <div className="card mt-6 p-6">
        <div className="text-sm text-ink/55">Current plan</div>
        <div className="mt-1 flex flex-wrap items-baseline gap-3">
          <span className="font-display text-3xl font-semibold">{plan.name}</span>
          <span className="text-ink/60">{plan.price ? `$${plan.price}/month` : "Free"}</span>
        </div>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, (used / plan.credits) * 100)}%` }} /></div>
        <p className="mt-2 text-sm text-ink/60">{used} of {plan.credits} credits used · resets {profile ? new Date(profile.credits_reset_at).toLocaleDateString() : ""}</p>
      </div>

      <div className="mt-6 rounded-2xl bg-lilac p-5 text-sm">
        <b>How upgrades work.</b> Pay on the secure checkout page using the same email you signed up with ({auth.user!.email}). Your plan is activated after the payment is confirmed on our side, which can take a few minutes. Returning from checkout does not change your plan by itself.
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PLANS.filter((p) => p.checkoutUrl).map((p) => {
          const current = p.id === plan.id;
          return (
            <div key={p.id} className={`card flex flex-col p-6 ${current ? "border-accent ring-2 ring-accent/30" : ""}`}>
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <div className="mt-2 font-display text-4xl font-semibold">${p.price}<span className="text-base font-normal text-ink/50"> /mo</span></div>
              <ul className="mt-5 flex-1 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 text-accent" />{f}</li>)}</ul>
              {current ? <span className="btn btn-light mt-6 cursor-default">Current plan</span> : (
                <a href={p.checkoutUrl!} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6">Upgrade to {p.name}</a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
