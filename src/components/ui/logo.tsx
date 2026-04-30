import { cn } from "@/lib/utils";

const WORDMARK_COLORS = {
  H: "#4285F4",
  o: "#EA4335",
  m: "#FBBC04",
  e: "#4285F4",
  B: "#34A853",
  iHomeBiz: "#EA4335",
  z: "#FBBC04",
  K: "#4285F4",
  iKids: "#FBBC04",
  d: "#34A853",
  s: "#EA4335",
} as const;

interface LogoProps {
  size?: number;
  className?: string;
}

/** HomeBiz Kids logomark — colored house with checkmark roof. */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="HomeBiz Kids"
    >
      <path d="M 30 56 L 60 30 L 90 56 L 90 92 Q 90 96 86 96 L 34 96 Q 30 96 30 92 Z" fill="#4285F4" />
      <path d="M 30 56 L 60 30 L 90 56 L 60 56 Z" fill="#1A73E8" />
      <rect x="54" y="74" width="12" height="22" rx="2" fill="#FBBC04" />
      <rect x="38" y="64" width="10" height="10" rx="2" fill="#34A853" />
      <rect x="72" y="64" width="10" height="10" rx="2" fill="#EA4335" />
      <rect x="74" y="36" width="6" height="14" rx="1" fill="#EA4335" />
      <path
        d="M 53 46 L 58 51 L 67 40"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
}

/** HomeBiz Kids wordmark — exact letter colors from the brand kit. */
export function Wordmark({ className }: WordmarkProps) {
  const letters = [
    { ch: "H", color: WORDMARK_COLORS.H },
    { ch: "o", color: WORDMARK_COLORS.o },
    { ch: "m", color: WORDMARK_COLORS.m },
    { ch: "e", color: WORDMARK_COLORS.e },
    { ch: "B", color: WORDMARK_COLORS.B },
    { ch: "i", color: WORDMARK_COLORS.iHomeBiz },
    { ch: "z", color: WORDMARK_COLORS.z },
    { ch: " ", color: undefined },
    { ch: "K", color: WORDMARK_COLORS.K },
    { ch: "i", color: WORDMARK_COLORS.iKids },
    { ch: "d", color: WORDMARK_COLORS.d },
    { ch: "s", color: WORDMARK_COLORS.s },
  ];

  return (
    <span className={cn("font-extrabold tracking-tight", className)}>
      {letters.map(({ ch, color }, i) => {
        if (ch === " ") return <span key={i}>&nbsp;</span>;
        return (
          <span key={i} style={{ color }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
