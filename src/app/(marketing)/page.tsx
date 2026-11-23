import Link from "next/link";
import { BarChart3, Bot, BookOpen, Cpu, Lock, ShieldCheck, Plug } from "lucide-react";
import { CTA, Heading, Placeholder, PlanCards, Section } from "@/components/marketing/sections";
import { SOLUTIONS } from "@/lib/site";

const INDUSTRIES = ["Financial services", "Healthcare", "Insurance", "Retail", "Education", "Logistics", "Legal", "Public sector", "Technology", "Media"];

const PILLARS = [
  { icon: Cpu, title: "Models", body: "A reasoning layer that analyzes content, scores risk and drafts the response.", href: "/models" },
  { icon: ShieldCheck, title: "Guardrails", body: "Automated pass, warn or block decisions on every input and output.", href: "/guardrails" },
  { icon: BookOpen, title: "Knowledge", body: "Your documents as evidence, so decisions rest on your facts.", href: "/knowledge" },
  { icon: Bot, title: "Agents", body: "Autonomous workflows that carry a task from instruction to finished output.", href: "/agents" },
];

const LOOP = [
  ["Analyze", "The engine reads each input against your policies and documents."],
  ["Score", "Every item receives a 0 to 100 compliance score and ranked findings."],
  ["Decide", "Pass, warn or block, applied consistently at any volume."],
  ["Automate", "Compliant rewrites and finished drafts are produced without a handoff."],
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <div className="grad-hero overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-accent" /> The AI decision engine for business
            </span>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] sm:text-[4rem]">
              AI that decides, automates and <span className="text-accent">answers for the result</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              ScribeGuard runs your workflows through a reasoning engine that analyzes every input, scores risk, enforces policy and completes the work. Cut review cost, compress cycle time and keep every decision on the record.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-dark">Sign up</Link>
              <Link href="/login" className="btn btn-light">Log in</Link>
            </div>
          </div>
          <div className="floaty"><Placeholder label="Guardrail decision" /></div>
        </div>
      </div>

      {/* 2. Industries */}
      <div className="overflow-hidden border-y border-line bg-white py-9">
        <p className="mb-6 text-center text-sm font-medium text-ink/50">Built for industries where one wrong answer carries a cost</p>
        <div className="marquee flex w-[200%] gap-16">
          {[...INDUSTRIES, ...INDUSTRIES].map((l, i) => (
            <span key={i} className="font-display text-2xl font-semibold text-ink/30">{l}</span>
          ))}
        </div>
      </div>

      {/* 3. How the engine works */}
      <Section>
        <Heading eyebrow="The engine" title="One loop. Analyze, score, decide, automate." sub="Most AI stalls between the pilot and production because nothing governs the output. ScribeGuard makes the decision step part of the model loop itself." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP.map(([t, b], i) => (
            <div key={t} className="card p-7">
              <div className="font-display text-sm font-semibold text-accent">0{i + 1}</div>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Platform pillars */}
      <Section tone="mist">
        <Heading eyebrow="The platform" title="Four layers that turn model output into business output" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Link key={p.title} href={p.href} className="card card-hover p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac text-accent"><p.icon size={22} /></span>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. Agents */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Placeholder label="Agent runtime" />
          <div>
            <Heading eyebrow="Agents" title="Replace manual handoffs with agents that finish the job" sub="Write the instruction once. The agent reasons over each input, applies your policy and your documents, and returns a finished output. Every run is metered and logged." />
            <ul className="mt-8 space-y-3 text-[15px]">
              {["Instructions, policy and knowledge combined in one runtime", "Run history with inputs, outputs and verdicts", "Spend tracked against your plan in real time"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. Guardrails */}
      <Section tone="mist">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Heading eyebrow="Guardrails" title="Decide at machine speed what clears policy" sub="The engine returns a verdict, a compliance score, ranked findings and a compliant rewrite for every item. Human reviewers handle the exceptions, not the volume." />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["pass", "Release", "bg-mint"], ["warn", "Review", "bg-amber-100"], ["block", "Stop", "bg-red-100"]].map(([k, l, c]) => (
                <div key={k} className={`rounded-2xl ${c} p-4 text-center`}><div className="text-xs uppercase tracking-wider text-ink/50">{k}</div><div className="mt-1 font-display font-semibold">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2"><Placeholder label="Findings and rewrite" /></div>
        </div>
      </Section>

      {/* 7. Solutions */}
      <Section tone="lilac">
        <Heading eyebrow="Solutions" title="Deployed where review, response and risk collide" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="card card-hover p-7">
              <div className="text-sm font-semibold text-accent">{s.name}</div>
              <h3 className="mt-2 text-xl font-semibold leading-snug">{s.headline}</h3>
              <p className="mt-3 line-clamp-3 text-sm text-ink/60">{s.intro}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 8. Outcomes */}
      <Section tone="night">
        <Heading light center eyebrow="Outcomes" title="Four business results the engine is built to move" />
        <div className="mt-14 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[["Cost", "Automated first-pass review removes routine work from expert queues."], ["Speed", "Drafts and rewrites arrive in seconds instead of passing between teams."], ["Risk", "Every output is scored and screened before it leaves the platform."], ["Decisions", "A stored verdict and score back each approval, ready for audit."]].map(([n, l]) => (
            <div key={n} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="font-display text-3xl font-semibold text-[#c8b8ff]">{n}</div>
              <div className="mt-3 text-sm leading-relaxed text-white/70">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. Security */}
      <Section tone="mist">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Heading eyebrow="Security" title="Enterprise controls from the first request" sub="Row-level isolation, private storage, server-side credentials and a complete audit trail are part of the foundation." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[[Lock, "Account isolation", "Every record is scoped to its owner by database policy."], [ShieldCheck, "Private storage", "Documents live in private buckets with per-account access."], [BarChart3, "Audit trail", "Each run records input, output, verdict and credits."], [Plug, "Server-side keys", "Model credentials never reach the browser."]].map(([I, t, b]) => {
              const Icon = I as typeof Lock;
              return (
                <div key={t as string} className="card p-6"><Icon className="text-accent" size={22} /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-ink/60">{b as string}</p></div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 10. Pricing */}
      <Section>
        <Heading center eyebrow="Pricing" title="Priced on decisions made, scaled to your volume" />
        <div className="mt-12"><PlanCards /></div>
      </Section>

      {/* 11. CTA */}
      <CTA />
    </>
  );
}
