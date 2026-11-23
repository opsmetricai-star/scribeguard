import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CTA, Heading, PageHero, Placeholder, Section } from "@/components/marketing/sections";
import { SOLUTIONS } from "@/lib/site";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  return { title: s ? `${s.name} solutions` : "Solutions" };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <PageHero eyebrow={`Solutions · ${s.name}`} title={s.headline} sub={s.intro} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading title="The problems we hear most" />
            <ul className="mt-8 space-y-4">
              {s.pains.map((p) => (<li key={p} className="card p-5 text-[15px]">{p}</li>))}
            </ul>
          </div>
          <Placeholder label={s.name} />
        </div>
      </Section>
      <Section tone="mist">
        <Heading center title="Workflows you can run today" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {s.workflows.map((w) => (
            <div key={w.title} className="card p-7"><h3 className="text-xl font-semibold">{w.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/60">{w.body}</p></div>
          ))}
        </div>
        <div className="mt-6 text-center"><Link href="/app/agents" className="btn btn-dark">Build this agent</Link></div>
      </Section>
      <Section tone="night">
        <div className="grid gap-6 text-center sm:grid-cols-3">
          {s.stat.map((x) => (
            <div key={x.label} className="rounded-3xl border border-white/10 bg-white/5 p-8"><div className="font-display text-5xl font-semibold text-[#c8b8ff]">{x.n}</div><div className="mt-2 text-white/70">{x.label}</div></div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/40">Illustrative targets, not guarantees. Results depend on your workflows.</p>
      </Section>
      <CTA />
    </>
  );
}
