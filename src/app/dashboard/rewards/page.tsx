import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { RewardCard } from "@/components/rewards/RewardCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DEMO_REWARDS, DEMO_REDEMPTIONS } from "@/lib/demo-data";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { formatRelativeDate } from "@/lib/utils";

export default function RewardsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Reward Store"
        subtitle="Customize what your kids can earn"
      >
        <Button asChild>
          <Link href="/dashboard/rewards/new">
            <Plus className="w-4 h-4" />
            Add Reward
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {DEMO_REWARDS.map((r) => (
          <RewardCard key={r.id} reward={r} viewAs="parent" />
        ))}
      </div>

      <div>
        <SectionHeader
          title="Recent redemptions"
          subtitle="Rewards your children have requested or claimed"
        />
        <div className="bg-white rounded-2xl border border-line shadow-card divide-y divide-line">
          {DEMO_REDEMPTIONS.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-tint flex items-center justify-center text-xl shrink-0">
                {r.reward.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{r.reward.title}</p>
                <p className="text-xs text-ink-3">
                  Redeemed by {r.child.user.name.split(" ")[0]} · {formatRelativeDate(r.requestedAt)}
                </p>
              </div>
              <span className="text-xs bg-blue-tint text-blue-deep font-medium px-2.5 py-1 rounded-full">
                {r.status === "APPROVED" ? "Granted" : r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
