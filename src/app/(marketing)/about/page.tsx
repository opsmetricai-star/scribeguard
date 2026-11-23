import type { Metadata } from "next";
import { CTA, Heading, PageHero, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "About" };

const PRINCIPLES = [
  ["Governance is a feature", "Policy, privacy and audit are built into the product, not bolted on."],
  ["Show the work", "Every result comes with its verdict, findings and history."],
  ["Be honest about limits", "We document what is automated, what is not, and where a human should review."],
  ["Respect the data", "Your documents and runs belong to you and are isolated by design."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We build AI that teams are allowed to use" sub="Capable models are everywhere. The hard part is trust. ScribeGuard exists to make governed, auditable AI the default." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Heading title="Our principles" />
          <div className="space-y-5">
            {PRINCIPLES.map(([t, b]) => (
              <div key={t} className="card p-6"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-ink/60">{b}</p></div>
            ))}
          </div>
        </div>
      </Section>
      <CTA />
    </>
  );
}
