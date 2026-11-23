import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/app/AuthForm";

export const metadata: Metadata = { title: "Forgot password" };

export default function Page() {
  return <Suspense><AuthForm mode="forgot" /></Suspense>;
}
