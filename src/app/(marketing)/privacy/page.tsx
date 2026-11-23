import type { Metadata } from "next";
import { Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold">Privacy</h1>
      <p className="mt-6 max-w-2xl text-ink/65">This is a template placeholder. Replace it with a privacy policy reviewed by legal counsel before launch.</p>
    </Section>
  );
}
