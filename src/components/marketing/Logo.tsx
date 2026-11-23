import Link from "next/link";

export function Logo({ light = false, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="ScribeGuard home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <path d="M16 2 4 7v8c0 7.2 5 12.6 12 15 7-2.4 12-7.8 12-15V7L16 2Z" fill="#6c47ff" />
        <path d="M11 16.5 15 20.5 22 12" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-[21px] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Scribe<span className="text-accent">Guard</span>
      </span>
    </Link>
  );
}
