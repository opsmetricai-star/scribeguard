import type { Metadata } from "next";
import { Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Terms" };

const BLOCKS: [string, string][] = [
  ["Agreement", "By creating an account or using ScribeGuard you agree to these terms on behalf of yourself and the business you represent. The service is intended for business use only."],
  ["Accounts", "You are responsible for the accuracy of your account information, the security of your credentials and all activity under your account."],
  ["Acceptable use", "Do not use the service to break the law, to process data you have no right to process, to attempt to bypass usage limits or security controls, or to interfere with the platform or other customers."],
  ["Plans, credits and billing", "Each plan includes a monthly allowance of AI credits. Credits reset monthly and do not roll over. Paid plans are activated after payment is confirmed. Fees are set out on the pricing page and are charged through our payment provider."],
  ["AI output", "AI results, including verdicts, scores and rewrites, are generated automatically and can be incorrect or incomplete. They support your decisions and do not constitute legal, compliance or professional advice. You remain responsible for reviewing output before relying on it."],
  ["Your content", "You retain ownership of content you submit. You grant us the limited right to process it to provide the service, including sending it to our model provider to generate results."],
  ["Availability", "We work to keep the service available but do not guarantee uninterrupted operation. We may update, change or discontinue features."],
  ["Limitation of liability", "To the extent permitted by law, the service is provided as is, and our total liability for any claim is limited to the fees you paid in the three months before the claim arose."],
  ["Termination", "You may stop using the service at any time. We may suspend accounts that breach these terms."],
  ["Changes", "We may update these terms. Continued use after an update means you accept the revised terms."],
];

export default function Page() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink/55">Last updated: November 2026</p>
        <div className="mt-10 space-y-8">
          {BLOCKS.map(([t, b]) => (
            <div key={t}><h2 className="text-xl font-semibold">{t}</h2><p className="mt-2 leading-relaxed text-ink/70">{b}</p></div>
          ))}
        </div>
      </div>
    </Section>
  );
}
