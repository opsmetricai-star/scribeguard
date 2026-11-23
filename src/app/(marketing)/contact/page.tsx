import type { Metadata } from "next";
import { Section } from "@/components/marketing/sections";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-3 text-5xl font-semibold leading-tight">Talk to our team</h1>
          <p className="mt-5 max-w-md text-lg text-ink/65">Tell us about your use case and we will show you how ScribeGuard fits.</p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
