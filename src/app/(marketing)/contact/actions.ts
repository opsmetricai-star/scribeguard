"use server";
import { z } from "zod";
import { createAdmin, isConfigured } from "@/lib/supabase/server";

const Schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(4000),
});

export async function sendContact(_prev: { ok?: boolean; error?: string } | null, form: FormData) {
  const parsed = Schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "Please complete all fields with a valid email and a message of at least 10 characters." };
  if (!isConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { error: "The contact form is not connected to a database yet." };
  const { error } = await createAdmin().from("contact_messages").insert(parsed.data);
  if (error) return { error: "Could not send your message. Please try again." };
  return { ok: true };
}
