import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
  href?: string;
}

export function DashboardCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = "text-blue-deep",
  iconBg = "bg-blue-tint",
  trend,
  className,
  href,
}: DashboardCardProps) {
  const content = (
    <div
      className={cn(
        "bg-white rounded-2xl border border-line shadow-card p-5",
        href && "hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-ink-3 uppercase tracking-wider">
          {label}
        </p>
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-4 h-4", iconColor)} />
        </div>
      </div>
      <p className="text-2xl font-bold text-ink">{value}</p>
      {subtext && (
        <p className="text-xs text-ink-3 mt-1 leading-relaxed">{subtext}</p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
