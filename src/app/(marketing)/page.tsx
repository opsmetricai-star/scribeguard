import Link from "next/link";
import { ArrowRight, Bot, BookOpen, Cpu, Lock, ShieldCheck, Sparkles, Plug, BarChart3 } from "lucide-react";
import { CTA, Heading, Placeholder, PlanCards, Section } from "@/components/marketing/sections";
import { CUSTOMER_STORIES, RESOURCES, SOLUTIONS } from "@/lib/site";

const LOGOS = ["Financial services", "Healthcare", "Insurance", "Retail", "Education", "Logistics", "Legal", "Public sector", "Technology", "Media"];

const PILLARS = [
  { icon: Cpu, title: "Models", body: "Language models tuned for accurate, on-brand business writing and reasoning.", href: "/models" },
  { icon: ShieldCheck, title: "Guardrails", body: "Policies that check every input and output before it reaches a customer.", href: "/guardrails" },
  { icon: BookOpen, title: "Knowledge", body: "Ground answers in your own documents so responses cite what is true.", href: "/knowledge" },
  { icon: Bot, title: "Agents", body: "Assemble agents that carry out multi-step work under your rules.", href: "/agents" },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <div className="grad-hero overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium">
              <Sparkles size={14} className="text-accent" /> Governed AI for the whole enterprise
            </span>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] sm:text-[4rem]">
              AI agents your business can <span className="text-accent">actually trust</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              ScribeGuard brings models, guardrails and knowledge together so every team can build agents that finish real work, inside the rules you set.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-dark">Get started free <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn btn-light">Book a demo</Link>
            </div>
            <p className="mt-5 text-sm text-ink/50">No credit card required. 50 free credits every month.</p>
          </div>
          <div className="floaty"><Placeholder label="Guardrail review" /></div>
        </div>
      </div>

      {/* 2. Logo strip */}
      <div className="overflow-hidden border-y border-line bg-white py-9">
        <p className="mb-6 text-center text-sm font-medium text-ink/50">Built for industries that cannot afford a wrong answer</p>
        <div className="flex w-[200%] marquee gap-16">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="font-display text-2xl font-semibold text-ink/30">{l}</span>
          ))}
        </div>
      </div>

      {/* 3. Platform pillars */}
      <Section>
        <Heading eyebrow="The platform" title="Everything you need to run AI safely, in one system" sub="Most AI projects stall between the demo and production. ScribeGuard closes that gap with four connected layers." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Link key={p.title} href={p.href} className="card card-hover p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac text-accent"><p.icon size={22} /></span>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.body}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">Learn more <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4. Agents feature */}
      <Section tone="mist">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Placeholder label="Agent builder" />
          <div>
            <Heading eyebrow="Agents" title="Describe the job. Get an agent that does it." sub="Write instructions in plain language, attach a policy and a knowledge library, then run the agent on real inputs. Every run is logged and metered." />
            <ul className="mt-8 space-y-3 text-[15px]">
              {["Instructions, policy and knowledge in one builder", "Run history with inputs, outputs and verdicts", "Usage tracked against your plan in real time"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
            <Link href="/agents" className="btn btn-dark mt-9">Explore agents <ArrowRight size={16} /></Link>
          </div>
        </div>
      </Section>

      {/* 5. Guardrails feature */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Heading eyebrow="Guardrails" title="Catch the problem before your customer does" sub="Check any text against your policy. Get a verdict, a compliance score, line-by-line findings and a compliant rewrite you can use right away." />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["pass", "Ship it", "bg-mint"], ["warn", "Review", "bg-amber-100"], ["block", "Stop", "bg-red-100"]].map(([k, l, c]) => (
                <div key={k} className={`rounded-2xl ${c} p-4 text-center`}><div className="text-xs uppercase tracking-wider text-ink/50">{k}</div><div className="mt-1 font-display font-semibold">{l}</div></div>
              ))}
            </div>
            <Link href="/guardrails" className="btn btn-dark mt-9">See guardrails <ArrowRight size={16} /></Link>
          </div>
          <div className="order-1 lg:order-2"><Placeholder label="Policy findings" /></div>
        </div>
      </Section>

      {/* 6. Solutions */}
      <Section tone="lilac">
        <Heading eyebrow="Solutions" title="Built for the teams that write, answer and decide" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="card card-hover p-7">
              <div className="text-sm font-semibold text-accent">{s.name}</div>
              <h3 className="mt-2 text-xl font-semibold leading-snug">{s.headline}</h3>
              <p className="mt-3 text-sm text-ink/60 line-clamp-3">{s.intro}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 7. Stats */}
      <Section tone="night">
        <Heading light center eyebrow="Targets" title="Measured in work finished, not demos shown" sub="Illustrative design targets, not guaranteed results." />
        <div className="mt-14 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[["3x", "faster first drafts"], ["60%", "less compliance review time"], ["45%", "faster support responses"], ["100%", "of runs logged and auditable"]].map(([n, l]) => (
            <div key={l} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="font-display text-5xl font-semibold text-[#c8b8ff]">{n}</div>
              <div className="mt-2 text-white/70">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Customers */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Scenarios" title="What teams use it for" sub="Illustrative scenarios, not named customer endorsements." />
          <Link href="/customers" className="btn btn-light">All customer stories</Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CUSTOMER_STORIES.slice(0, 3).map((c) => (
            <figure key={c.company} className="card p-8">
              <div className="font-display text-3xl font-semibold text-accent">{c.metric}</div>
              <blockquote className="mt-4 text-lg leading-relaxed">“{c.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-ink/60">Example scenario · {c.sector}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* 9. Security */}
      <Section tone="mist">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Heading eyebrow="Security" title="Enterprise controls from day one" sub="Row-level isolation, private storage, server-side keys and a complete audit trail are part of the foundation, not an add-on." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[[Lock, "Tenant isolation", "Every record is scoped to its owner with database policies."], [ShieldCheck, "Private storage", "Documents live in private buckets with per-user access."], [BarChart3, "Audit trail", "Every run records input, output, verdict and credits."], [Plug, "Server-side keys", "Model credentials never reach the browser."]].map(([I, t, b]) => {
              const Icon = I as typeof Lock;
              return (
                <div key={t as string} className="card p-6"><Icon className="text-accent" size={22} /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-ink/60">{b as string}</p></div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 10. Resources */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Resources" title="Learn how leading teams govern AI" />
          <Link href="/resources" className="btn btn-light">Resource center</Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {RESOURCES.slice(0, 3).map((r) => (
            <Link key={r.title} href="/resources" className="card card-hover overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-lilac to-mint/70" />
              <div className="p-6"><div className="text-xs font-semibold uppercase tracking-wider text-accent">{r.type} · {r.read}</div><h3 className="mt-2 text-lg font-semibold leading-snug">{r.title}</h3></div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 11. Pricing */}
      <Section tone="mist">
        <Heading center eyebrow="Pricing" title="Start free. Scale when you are ready." />
        <div className="mt-12"><PlanCards /></div>
      </Section>

      {/* 12. CTA */}
      <CTA />
    </>
  );
}
