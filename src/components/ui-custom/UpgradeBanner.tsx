import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradeBannerProps {
  title: string;
  description: string;
  className?: string;
}

/** Compact banner that nudges Free-tier parents toward Family. */
export function UpgradeBanner({ title, description, className }: UpgradeBannerProps) {
  return (
    <Link
      href="/pricing"
      className={cn(
        "group flex items-center gap-3 rounded-2xl border-2 border-yellow/40 bg-gradient-to-br from-yellow-tint via-bone to-blue-tint p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-yellow flex items-center justify-center shadow-cta-yellow shrink-0">
        <Sparkles className="w-5 h-5 text-yellow-ink-deep" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-0.5">
          {title}
        </p>
        <p className="text-sm text-ink leading-snug">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-yellow-ink shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
