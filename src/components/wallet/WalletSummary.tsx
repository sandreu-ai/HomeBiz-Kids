import type { ChildProfile } from "@/types";
import { formatTokens } from "@/lib/utils";
import { Flame, Trophy, Sparkles } from "lucide-react";
import { Coin } from "@/components/ui/coin";

interface WalletSummaryProps {
  profile: ChildProfile;
}

export function WalletSummary({ profile }: WalletSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4">
        <div className="w-8 h-8 rounded-xl bg-yellow-tint flex items-center justify-center mb-3">
          <Coin size="md" />
        </div>
        <p className="text-lg font-bold text-yellow-ink">{formatTokens(profile.tokenBalance)}</p>
        <p className="text-xs text-ink-3 mt-0.5">Token Balance</p>
      </div>

      <div className="bg-white rounded-2xl border border-line shadow-card p-4">
        <div className="w-8 h-8 rounded-xl bg-red-tint flex items-center justify-center mb-3">
          <Flame className="w-4 h-4 text-red-deep" />
        </div>
        <p className="text-lg font-bold text-red-deep">{profile.streak} days</p>
        <p className="text-xs text-ink-3 mt-0.5">Work Streak</p>
      </div>

      <div className="bg-white rounded-2xl border border-line shadow-card p-4">
        <div className="w-8 h-8 rounded-xl bg-blue-tint flex items-center justify-center mb-3">
          <Trophy className="w-4 h-4 text-blue-deep" />
        </div>
        <p className="text-lg font-bold text-blue-deep">{profile.completedJobsCount}</p>
        <p className="text-xs text-ink-3 mt-0.5">Jobs Completed</p>
      </div>
    </div>
  );
}
