import type { SavingsGoal } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  className?: string;
  variant?: "default" | "wide";
}

export function SavingsGoalCard({ goal, className, variant = "default" }: SavingsGoalCardProps) {
  const pct = Math.min(100, (goal.savedTokens / goal.targetTokens) * 100);
  const remaining = Math.max(0, goal.targetTokens - goal.savedTokens);

  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br from-yellow-tint via-bone to-green-tint border border-yellow shadow-card p-5",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
          {goal.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-yellow-ink uppercase tracking-wider">
            Saving for
          </p>
          <h3 className="font-bold text-ink text-base leading-tight truncate">{goal.title}</h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-yellow-ink">{goal.savedTokens}</p>
          <p className="text-[10px] text-ink-3">of {goal.targetTokens}</p>
        </div>
      </div>

      <Progress value={pct} className="bg-white/60" />

      <div className="flex items-center justify-between mt-3 text-xs">
        <div className="flex items-center gap-1.5 text-ink-3">
          <Target className="w-3 h-3" />
          <span>
            {remaining > 0 ? `${remaining} tokens to go` : "Goal reached! 🎉"}
          </span>
        </div>
        {goal.deadline && (
          <div className="flex items-center gap-1.5 text-ink-3">
            <Calendar className="w-3 h-3" />
            <span>By {formatDate(goal.deadline)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
