import { getDifficultyLabel, getDifficultyColor } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";
import { cn } from "@/lib/utils";

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: DifficultyLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getDifficultyColor(difficulty),
        className
      )}
    >
      {getDifficultyLabel(difficulty)}
    </span>
  );
}
