import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Documentation" };

const STEPS = [
  ["1. Create your workspace", "Sign up with a work email and confirm it from the message we send."],
  ["2. Load your knowledge", "Upload .txt, .md or .csv files so agents can use them as evidence."],
  ["3. Encode your policy", "In Guardrails, save plain-language rules such as: never state a guaranteed return."],
  ["4. Run a decision", "Paste text to receive a verdict, a score, ranked findings and a compliant rewrite."],
  ["5. Deploy an agent", "Give it instructions, attach a policy and run it on real inputs."],
  ["6. Track the impact", "Analytics and Billing show volume, verdicts and credits against your plan."],
];

export default function Docs() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Deploy your first governed agent in six steps" sub="From a new workspace to a metered, audited agent run.">
        <Link href="/signup" className="btn btn-dark">Sign up</Link>
        <Link href="/login" className="btn btn-light">Log in</Link>
      </PageHero>
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([t, b]) => (
            <div key={t} className="card p-7"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-ink/60">{b}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
