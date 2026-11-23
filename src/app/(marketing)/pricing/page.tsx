import type { Metadata } from "next";
import Link from "next/link";
import { CTA, Heading, PageHero, PlanCards, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Pricing" };

const COMPARE = [
  ["AI credits / month", "50", "500", "2,000", "8,000"],
  ["Agents", "1", "3", "10", "50"],
  ["Guardrail checks", "Yes", "Yes", "Yes", "Yes"],
  ["Support", "Community", "Email", "Priority", "Dedicated manager"],
];

const FAQ = [
  ["How does payment work?", "Choose a plan, pay at the secure checkout, and your account is upgraded once the payment is confirmed. A redirect alone does not change your plan."],
  ["What happens if I run out of credits?", "AI actions pause until credits refresh next month or you upgrade."],
  ["Do you offer an enterprise plan?", "For larger deployments, contact us and we will scope it with you."],
];

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans that grow with your team" sub="Every plan includes the full platform. Pick the amount of usage that fits.">
        <Link href="/signup" className="btn btn-dark">Start free</Link>
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
        <p className="mt-4 text-sm text-ink/55">Credits: assistant message = 1, guardrail check = 1, agent run = 2. Credits refresh monthly.</p>
      </Section>
      <Section>
        <Heading title="Pricing questions" />
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
