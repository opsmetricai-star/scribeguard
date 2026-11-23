import type { Metadata } from "next";
import { CTA, PageHero, Section } from "@/components/marketing/sections";
import { CUSTOMER_STORIES } from "@/lib/site";

export const metadata: Metadata = { title: "Customers" };

export default function Customers() {
  return (
    <>
      <PageHero eyebrow="Customers" title="What governed AI looks like in practice" sub="Representative scenarios across industries. These are illustrative examples written for this site, not endorsements from named customers." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_STORIES.map((c) => (
            <figure key={c.company} className="card p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink/45">Illustrative scenario · {c.sector}</div>
              <div className="mt-3 font-display text-3xl font-semibold text-accent">{c.metric}</div>
              <blockquote className="mt-4 text-lg leading-relaxed">“{c.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-ink/60">Example: {c.company}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <CTA title="Be the first real story" sub="Run your own workflow on the free plan and see the results." />
    </>
  );
}
