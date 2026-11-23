import Link from "next/link";
import { Check } from "lucide-react";
import { CTA, Heading, PageHero, Placeholder, Section } from "./sections";

export interface FeatureData {
  eyebrow: string; title: string; sub: string;
  blocks: { title: string; body: string; points: string[] }[];
  grid: { title: string; body: string }[];
  faq: { q: string; a: string }[];

}

export function FeaturePage({ d }: { d: FeatureData }) {
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} sub={d.sub}>
        <Link href="/signup" className="btn btn-dark">Sign up</Link>
        <Link href="/login" className="btn btn-light">Log in</Link>
      </PageHero>

      {d.blocks.map((b, i) => (
        <Section key={b.title} tone={i % 2 ? "mist" : "white"}>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <Heading title={b.title} sub={b.body} />
              <ul className="mt-7 space-y-3">
                {b.points.map((p) => (<li key={p} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-accent" />{p}</li>))}
              </ul>
            </div>
            <div className={i % 2 ? "lg:order-1" : ""}><Placeholder label={b.title} /></div>
          </div>
        </Section>
      ))}

      <Section tone="lilac">
        <Heading center title="Capabilities at a glance" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.grid.map((g) => (
            <div key={g.title} className="card p-7"><h3 className="text-lg font-semibold">{g.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/60">{g.body}</p></div>
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="Frequently asked questions" />
        <div className="mt-10 max-w-3xl divide-y divide-line rounded-3xl border border-line">
          {d.faq.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:hidden">{f.q}</summary>
              <p className="mt-3 leading-relaxed text-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
