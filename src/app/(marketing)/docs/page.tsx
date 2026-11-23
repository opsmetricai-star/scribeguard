import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Documentation" };

const STEPS = [
  ["1. Create an account", "Sign up with email and password, then confirm your email."],
  ["2. Add knowledge", "Upload .txt, .md or .csv files in Knowledge so agents can reference them."],
  ["3. Write a policy", "In Guardrails, save plain-language rules, for example: never mention pricing."],
  ["4. Run a check", "Paste text to get a verdict, score, findings and a compliant rewrite."],
  ["5. Build an agent", "Give it instructions, attach a policy and run it on real inputs."],
  ["6. Watch usage", "Analytics and Billing show credits used against your plan."],
];

export default function Docs() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Get started in six steps" sub="A quick tour of the app, from first sign-up to your first agent run.">
        <Link href="/signup" className="btn btn-dark">Create account</Link>
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
