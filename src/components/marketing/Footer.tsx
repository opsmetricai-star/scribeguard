import Link from "next/link";
import { FOOTER } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              The governed AI platform for teams that need agents they can trust: models, guardrails and knowledge in one place.
            </p>
            <Link href="/signup" className="btn btn-accent mt-6">Start free</Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-display text-sm font-semibold text-white">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/60 transition hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} ScribeGuard. All rights reserved.</span>
          <span>Built for secure, governed AI.</span>
        </div>
      </div>
    </footer>
  );
}
