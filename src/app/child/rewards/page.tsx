"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { RewardCard } from "@/components/rewards/RewardCard";
import { DEMO_REWARDS } from "@/lib/demo-data";

export default function ChildRewardsPage() {
  const { session } = useSession();
  const tokens = session.childProfile?.tokenBalance ?? 0;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Reward Store"
        subtitle="You earned this."
      >
        <div className="flex items-center gap-1.5 bg-yellow-tint px-3 py-1.5 rounded-full">
          <span className="text-yellow-deep">✦</span>
          <span className="text-sm font-bold text-yellow-ink">{tokens} tokens</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_REWARDS.map((r) => (
          <RewardCard
            key={r.id}
            reward={r}
            childTokens={tokens}
            viewAs="child"
            onRedeem={() => alert(`Redemption requested for ${r.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
