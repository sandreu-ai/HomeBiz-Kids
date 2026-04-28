"use client";

import type { Reward } from "@/types";
import { formatTokens } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RewardCardProps {
  reward: Reward;
  childTokens?: number;
  onRedeem?: (rewardId: string) => void;
  viewAs?: "parent" | "child";
  className?: string;
}

export function RewardCard({
  reward,
  childTokens,
  onRedeem,
  viewAs = "child",
  className,
}: RewardCardProps) {
  const canAfford =
    childTokens !== undefined ? childTokens >= reward.tokenCost : true;

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-line shadow-card p-5 flex flex-col gap-4 transition-all",
        !canAfford && viewAs === "child" && "opacity-60",
        className
      )}
    >
      {/* Emoji + title */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl bg-yellow-tint flex items-center justify-center text-2xl shrink-0">
          {reward.emoji ?? "🎁"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-ink text-sm leading-tight">
            {reward.title}
          </h3>
          {reward.description && (
            <p className="text-xs text-ink-3 mt-1 leading-relaxed">
              {reward.description}
            </p>
          )}
        </div>
      </div>

      {/* Cost + action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-deep text-base">✦</span>
          <span className="text-sm font-bold text-yellow-ink">
            {formatTokens(reward.tokenCost)}
          </span>
        </div>

        {viewAs === "child" && onRedeem && (
          <Button
            size="sm"
            variant={canAfford ? "gold" : "secondary"}
            disabled={!canAfford}
            onClick={() => onRedeem(reward.id)}
          >
            {canAfford ? "Redeem" : "Need more tokens"}
          </Button>
        )}

        {viewAs === "parent" && (
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full font-medium",
              reward.isActive
                ? "bg-blue-tint text-blue-deep"
                : "bg-line text-ink-3"
            )}
          >
            {reward.isActive ? "Active" : "Inactive"}
          </span>
        )}
      </div>
    </div>
  );
}
