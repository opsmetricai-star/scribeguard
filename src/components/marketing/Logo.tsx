import Link from "next/link";

/** Shield + document mark. Shield and page use the site ink color, the leaf uses the site accent. */
export function LogoMark({ size = 32, light = false }: { size?: number; light?: boolean }) {
  const ink = light ? "#ffffff" : "#0d0b1a";
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 64 72" fill="none" aria-hidden>
      <path d="M14 36V8h24l14 14v18c0 12-8 20-20 27" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 8v14h14" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 30h14M26 40h14" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <path d="M12 40c10 0 18 4 22 12 3 6 1 11-2 15C20 61 12 52 12 40Z" fill="#6c47ff" />
    </svg>
  );
}

export function Logo({ light = false, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="ScribeGuard home">
      <LogoMark light={light} size={28} />
      <span className={`font-display text-[21px] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Scribe<span className="text-accent">Guard</span>
      </span>
    </Link>
  );
}
