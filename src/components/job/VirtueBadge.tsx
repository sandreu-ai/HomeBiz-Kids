import { getVirtueLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function VirtueBadge({
  virtue,
  className,
}: {
  virtue: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-tint text-blue-deep",
        className
      )}
    >
      {getVirtueLabel(virtue)}
    </span>
  );
}
