import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  heading: string;
  subtext: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  heading,
  subtext,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-line-soft flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-ink-3" />
      </div>
      <h3 className="text-lg font-semibold text-ink mb-2">{heading}</h3>
      <p className="text-sm text-ink-3 max-w-sm leading-relaxed mb-6">
        {subtext}
      </p>
      {actionLabel && (
        <Button
          onClick={onAction}
          variant="default"
          size="sm"
          asChild={!!actionHref}
        >
          {actionHref ? <Link href={actionHref}>{actionLabel}</Link> : actionLabel}
        </Button>
      )}
    </div>
  );
}
