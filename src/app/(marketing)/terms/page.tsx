import type { Metadata } from "next";
import { Section } from "@/components/marketing/sections";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold">Terms</h1>
      <p className="mt-6 max-w-2xl text-ink/65">This is a template placeholder. Replace it with terms of service reviewed by legal counsel before launch.</p>
    </Section>
  );
}
