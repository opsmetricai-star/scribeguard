"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, Bell, BookOpen, Bot, CreditCard, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, ShieldCheck, X } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { createClient } from "@/lib/supabase/client";

const LINKS = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/assistant", label: "Assistant", icon: MessageSquare },
  { href: "/app/guardrails", label: "Guardrails", icon: ShieldCheck },
  { href: "/app/agents", label: "Agents", icon: Bot },
  { href: "/app/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ email, planName, used, limit, unread }: { email: string; planName: string; used: number; limit: number; unread: number }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pct = Math.min(100, Math.round((used / limit) * 100));

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const nav = (
    <div className="flex h-full flex-col">
      <div className="px-3 pb-6 pt-1"><Logo href="/app" /></div>
      <nav className="flex-1 space-y-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = href === "/app" ? path === "/app" : path.startsWith(href);
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${active ? "bg-ink text-white" : "text-ink/70 hover:bg-mist"}`}>
              <Icon size={18} /> {label}
              {label === "Notifications" && unread > 0 && <span className="ml-auto rounded-full bg-accent px-2 text-xs text-white">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-2xl bg-lilac p-4">
        <div className="flex justify-between text-xs font-semibold"><span>{planName} plan</span><span>{used}/{limit}</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
        <Link href="/app/billing" className="mt-3 block text-xs font-semibold text-accent">Manage plan</Link>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 px-1 text-xs text-ink/60">
        <span className="truncate">{email}</span>
        <button onClick={signOut} aria-label="Log out" className="rounded-lg p-2 hover:bg-mist"><LogOut size={16} /></button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3 lg:hidden">
        <Logo href="/app" />
        <button aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-b border-line bg-white p-4 lg:hidden">{nav}</div>}
      <aside className="sticky top-0 hidden h-screen border-r border-line bg-white p-5 lg:block">{nav}</aside>
    </>
  );
}
