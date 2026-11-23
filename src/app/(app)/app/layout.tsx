import { redirect } from "next/navigation";
import { createClient, isConfigured } from "@/lib/supabase/server";
import { Sidebar } from "@/components/app/Sidebar";
import { getPlan } from "@/lib/plans";

export const metadata = { title: { default: "App", template: "%s | ScribeGuard" } };
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!isConfigured()) {
    return (
      <div className="grid min-h-screen place-items-center bg-mist p-6">
        <div className="card max-w-lg p-8">
          <h1 className="text-2xl font-semibold">Connect Supabase to continue</h1>
          <p className="mt-3 text-ink/65">Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>, run <code>supabase/migrations/0001_init.sql</code> in the SQL editor, then restart the dev server.</p>
        </div>
      </div>
    );
  }
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
