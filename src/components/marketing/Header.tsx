"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 xl:flex" onMouseLeave={() => setDd(null)}>
          {NAV.map((g) =>
            g.items ? (
              <div key={g.label} className="relative" onMouseEnter={() => setDd(g.label)}>
                <button
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium hover:bg-mist"
                  aria-expanded={dd === g.label}
                  onFocus={() => setDd(g.label)}
                >
                  {g.label} <ChevronDown size={14} className={dd === g.label ? "rotate-180 transition" : "transition"} />
                </button>
                {dd === g.label && (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="grid w-[460px] gap-1 rounded-3xl border border-line bg-white p-3 shadow-2xl shadow-violet-900/10 sm:grid-cols-1">
                      {g.items.map((i) => (
                        <Link key={i.href} href={i.href} onClick={() => setDd(null)} className="rounded-2xl p-3 hover:bg-lilac/60">
                          <div className="text-[15px] font-semibold">{i.label}</div>
                          <div className="text-sm text-ink/60">{i.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={g.label} href={g.href!} className="rounded-full px-4 py-2 text-[15px] font-medium hover:bg-mist">
                {g.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/login" className="btn btn-light">Log in</Link>
          <Link href="/signup" className="btn btn-dark">Sign up</Link>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/signup" className="btn btn-dark hidden !px-4 !py-2 sm:inline-flex">Sign up</Link>
          <button className="rounded-full p-2" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-8 pt-4 xl:hidden">
          {NAV.map((g) => (
            <div key={g.label} className="border-b border-line/70 py-3">
              {g.items ? (
                <>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">{g.label}</div>
                  <div className="grid gap-1">
                    {g.items.map((i) => (
                      <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="rounded-xl px-2 py-2 font-medium hover:bg-mist">{i.label}</Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={g.href!} onClick={() => setOpen(false)} className="block py-1 font-semibold">{g.label}</Link>
              )}
            </div>
          ))}
          <div className="mt-5 grid gap-3">
            <Link href="/signup" onClick={() => setOpen(false)} className="btn btn-dark">Sign up</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="btn btn-light">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
