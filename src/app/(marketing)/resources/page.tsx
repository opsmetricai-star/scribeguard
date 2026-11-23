import type { Metadata } from "next";
import { CTA, PageHero, Section } from "@/components/marketing/sections";
import { RESOURCES } from "@/lib/site";

export const metadata: Metadata = { title: "Resource center" };

export default function Resources() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Guides and playbooks for governed AI" sub="Practical material for teams rolling out agents. Full articles are coming soon." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <article key={r.title} className="card overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-lilac to-mint/70" />
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">{r.type} · {r.read}</div>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{r.title}</h3>
                <span className="mt-4 inline-block rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink/60">Coming soon</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
