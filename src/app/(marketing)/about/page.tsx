import type { Metadata } from "next";
import { CTA, Heading, PageHero, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "About" };

const PRINCIPLES = [
  ["Governance belongs inside the model loop", "Policy, privacy and audit are part of how the engine decides, not a review step added afterward."],
  ["Every decision leaves evidence", "Each result carries its verdict, score and findings, so approvals can be defended."],
  ["Automate the routine, escalate the exception", "The engine clears what policy allows and routes the rest to people."],
  ["State the limits plainly", "We document what is automated and where human review is still required."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We build the AI engine that businesses can put their name behind" sub="Capable models are widely available. What most organizations lack is a way to trust their output at volume. ScribeGuard closes that gap with scored, governed and auditable AI." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Heading title="How we build" />
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
