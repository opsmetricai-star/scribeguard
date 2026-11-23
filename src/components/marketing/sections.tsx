import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/plans";

export function Section({ children, tone = "white", id, className = "" }: { children: React.ReactNode; tone?: "white" | "mist" | "night" | "lilac"; id?: string; className?: string }) {
  const bg = { white: "bg-white", mist: "bg-mist", night: "bg-night text-white", lilac: "bg-lilac" }[tone];
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">{children}</div>
    </section>
  );
}

export function Heading({ eyebrow, title, sub, center = false, light = false }: { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <span className={`eyebrow ${light ? "!text-[#b9a6ff]" : ""}`}>{eyebrow}</span>}
      <h2 className="mt-3 text-[2rem] font-semibold leading-[1.1] sm:text-5xl">{title}</h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink/65"}`}>{sub}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="grad-hero">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 max-w-4xl text-[2.4rem] font-semibold leading-[1.05] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">{sub}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {children ?? (
            <>
              <Link href="/signup" className="btn btn-dark">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CTA({ title = "Put an AI decision engine behind every workflow", sub = "Create an account, load your policies and have agents analyzing, deciding and automating inside your rules today." }: { title?: string; sub?: string }) {
  return (
    <Section tone="night">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2a1a78] via-[#3a22a8] to-[#6c47ff] p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mint/30 blur-3xl" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">{title}</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/75">{sub}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="btn bg-white text-ink">Sign up</Link>
          <Link href="/login" className="btn btn-ghost-inv">Log in</Link>
        </div>
      </div>
    </Section>
  );
}

export function PlanCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {PLANS.map((p) => (
        <div key={p.id} className={`card flex flex-col p-7 ${p.highlight ? "border-accent ring-2 ring-accent/30" : ""}`}>
          {p.highlight && <span className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="mt-2 min-h-[72px] text-sm text-ink/60">{p.blurb}</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-5xl font-semibold">${p.price}</span>
            <span className="text-ink/50">/ month</span>
          </div>
          <ul className="mt-6 flex-1 space-y-3 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5"><Check size={17} className="mt-0.5 shrink-0 text-accent" />{f}</li>
            ))}
          </ul>
          {p.checkoutUrl ? (
            <Link href={`/signup?plan=${p.id}`} className={`btn mt-7 ${p.highlight ? "btn-accent" : "btn-dark"}`}>Sign up</Link>
          ) : (
            <Link href="/signup" className="btn btn-light mt-7">Sign up</Link>
          )}
        </div>
      ))}
    </div>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-lilac via-white to-mint/60">
      <div className="absolute inset-6 rounded-2xl border border-line bg-white/80 p-5 shadow-xl">
        <div className="mb-4 flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-red-300" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><i className="h-2.5 w-2.5 rounded-full bg-green-300" /></div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{label}</div>
        {[80, 95, 60, 88, 40].map((w, i) => (<div key={i} className="mb-2.5 h-2.5 rounded-full bg-ink/10" style={{ width: `${w}%` }} />))}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-emerald-900"><Check size={13} /> Verdict: pass</div>
      </div>
    </div>
  );
}
