import { redirect } from "next/navigation";
import { createClient, isConfigured } from "@/lib/supabase/server";
import { Sidebar } from "@/components/app/Sidebar";
import { getPlan } from "@/lib/plans";

export const metadata = { title: { default: "App", template: "%s | ScribeGuard" } };
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!isConfigured()) redirect("/login");

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const [{ data: profile }, { count }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("notifications").select("id", { count: "exact", head: true }).eq("read", false),
  ]);
  const plan = getPlan(profile?.plan);

  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar
        email={data.user.email ?? ""}
        planName={plan.name}
        used={profile?.credits_used ?? 0}
        limit={plan.credits}
        unread={count ?? 0}
      />
      <main className="min-w-0 p-5 lg:p-10">{children}</main>
    </div>
  );
}
