import type { ChildBadge } from "@/types";
import { SKILL_BADGES } from "@/lib/demo-data/badges";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SkillBadgeCardProps {
  childBadge: ChildBadge;
  className?: string;
}

export function SkillBadgeCard({ childBadge, className }: SkillBadgeCardProps) {
  const badge = SKILL_BADGES[childBadge.badgeCode];
  const pct = Math.min(100, (childBadge.progress / badge.goal) * 100);

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-line shadow-card p-5 transition-all",
        childBadge.earned && "bg-gradient-to-br from-yellow-tint to-bone border-yellow-deep",
        className
      )}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
            childBadge.earned ? "bg-yellow-soft" : "bg-line-soft"
          )}
        >
          {childBadge.earned ? badge.emoji : <span className="opacity-40">{badge.emoji}</span>}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-ink text-sm leading-tight">
            {badge.title}
            {childBadge.earned && (
              <span className="ml-1.5 text-[10px] bg-yellow text-white px-1.5 py-0.5 rounded-full font-semibold align-middle">
                EARNED
              </span>
            )}
          </h3>
          <p className="text-xs text-ink-3 mt-1 leading-relaxed">{badge.description}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-ink-3">
            {childBadge.progress} / {badge.goal}
          </span>
          {childBadge.earned ? (
            <span className="text-xs font-medium text-yellow-ink">Complete!</span>
          ) : (
            <span className="text-xs font-medium text-blue-deep">{Math.round(pct)}%</span>
          )}
        </div>
        <Progress value={pct} />
      </div>
    </div>
  );
}
