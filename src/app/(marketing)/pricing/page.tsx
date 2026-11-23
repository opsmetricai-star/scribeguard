import type { Metadata } from "next";
import Link from "next/link";
import { CTA, Heading, PageHero, PlanCards, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Pricing" };

const COMPARE = [
  ["AI credits per month", "50", "500", "2,000", "8,000"],
  ["Agents", "1", "3", "10", "50"],
  ["Guardrail checks", "Included", "Included", "Included", "Included"],
  ["Knowledge library", "Included", "Included", "Included", "Included"],
  ["Analytics and run history", "Included", "Included", "Included", "Included"],
  ["Support", "Community", "Email", "Priority", "Dedicated manager"],
];

const FAQ = [
  ["How does payment work?", "Sign up, then complete checkout from the billing page using the same email as your account. Your plan activates once the payment is confirmed. Returning from checkout does not change your plan on its own."],
  ["What happens when credits run out?", "AI actions pause until credits refresh next month or you upgrade. Nothing is charged beyond your plan."],
  ["How are credits consumed?", "An assistant message costs 1 credit, a guardrail check costs 1 and an agent run costs 2. Failed model calls are returned."],
];

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Plans scaled to the volume of decisions you automate" sub="Every plan includes the full platform: models, guardrails, knowledge, agents and analytics. You choose how much AI capacity to run.">
        <Link href="/signup" className="btn btn-dark">Sign up</Link>
        <Link href="/login" className="btn btn-light">Log in</Link>
      </PageHero>
      <Section><PlanCards /></Section>
      <Section tone="mist">
        <Heading title="Compare plans" />
        <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-mist/60">
                {["", "Explorer", "Starter", "Pro", "Business"].map((h) => <th key={h} className="p-4 font-display font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r[0]} className="border-b border-line last:border-0">
                  {r.map((c, i) => <td key={i} className={`p-4 ${i === 0 ? "font-medium" : "text-ink/70"}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <Heading title="Billing questions" />
        <div className="mt-8 max-w-3xl divide-y divide-line rounded-3xl border border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="p-6">
              <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:hidden">{q}</summary>
              <p className="mt-3 text-ink/65">{a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
