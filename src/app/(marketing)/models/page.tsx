import type { Metadata } from "next";
import { FeaturePage } from "@/components/marketing/FeaturePage";
import { FEATURES } from "@/lib/features";

export const metadata: Metadata = { title: "Models" };
export default function Page() {
  return <FeaturePage d={FEATURES.models} />;
}
