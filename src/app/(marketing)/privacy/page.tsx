import type { Metadata } from "next";
import { Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Privacy" };

const BLOCKS: [string, string][] = [
  ["Information we collect", "Account details you provide (name, work email, company), content you submit to the platform (text for checks, agent inputs, uploaded documents, policies and agent instructions), and usage records (run type, verdict, credits and timestamps)."],
  ["How we use it", "To operate the service, authenticate you, run the AI features you request, meter usage against your plan, protect the platform from abuse and communicate about your account. We do not sell your information."],
  ["AI processing", "Text you submit for AI features is sent to our model provider, Google Gemini, to generate results. It is transmitted over encrypted connections and used to return your result."],
  ["Storage and isolation", "Account data is stored with our database and storage provider, Supabase. Access to your records is restricted to your account through database-level policies, and uploaded documents are held in private storage."],
  ["Payments", "Payments are processed by our payment provider, Selar. We receive confirmation of a payment and your plan, and we do not store card details."],
  ["Retention and deletion", "We keep your data while your account is active. You can delete documents, policies and agents in the app at any time."],
  ["Your rights", "Depending on your location you may have rights to access, correct, export or delete your information. Use your account to manage what you can, and contact us through your account for anything else."],
  ["Changes", "We will update this page when our practices change and revise the date below."],
];

export default function Page() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
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
