"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { WalletSummary } from "@/components/wallet/WalletSummary";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { DEMO_TRANSACTIONS } from "@/lib/demo-data";
import { formatRelativeDate } from "@/lib/utils";
import { ArrowDown, ArrowUp, Sparkles, Gift } from "lucide-react";

export default function WalletPage() {
  const { session } = useSession();
  const profile = session.childProfile;

  if (!profile) return <div>Switch to a child user.</div>;

  const transactions = DEMO_TRANSACTIONS.filter((t) => t.childId === profile.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Your Wallet"
        subtitle="Your work is adding up."
      />

      <WalletSummary profile={profile} />

      {profile.activeSavingsGoal && (
        <div>
          <SectionHeader title="Saving for..." />
          <SavingsGoalCard goal={profile.activeSavingsGoal} />
        </div>
      )}

      <div>
        <SectionHeader title="Recent activity" />
        <div className="bg-white rounded-2xl border border-line shadow-card divide-y divide-line">
          {transactions.map((tx) => {
            const isPositive = (tx.tokens ?? 0) > 0;
            const Icon = tx.type === "REDEEMED" ? Gift : tx.type === "BONUS" ? Sparkles : isPositive ? ArrowUp : ArrowDown;
            const iconBg =
              tx.type === "BONUS"
                ? "bg-yellow-tint text-yellow-ink"
                : isPositive
                ? "bg-blue-tint text-blue-deep"
                : "bg-red-tint text-red-deep";
            return (
              <div key={tx.id} className="flex items-center gap-3 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{tx.description}</p>
                  <p className="text-xs text-ink-3">{formatRelativeDate(tx.createdAt)}</p>
                </div>
                <div className={`text-sm font-bold ${isPositive ? "text-blue-deep" : "text-red-deep"}`}>
                  {isPositive ? "+" : ""}{tx.tokens} tokens
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save / Spend / Give */}
      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-5">
        <p className="text-xs font-bold text-blue-deep uppercase tracking-wider mb-3">
          Three jars approach
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Save", amount: 70, color: "bg-blue-deep" },
            { label: "Spend", amount: 50, color: "bg-yellow-deep" },
            { label: "Give", amount: 25, color: "bg-red" },
          ].map((j) => (
            <div key={j.label} className="bg-white rounded-xl p-3 text-center">
              <div className={`w-8 h-8 rounded-full ${j.color} mx-auto mb-2`} />
              <p className="text-xs font-medium text-ink-3">{j.label}</p>
              <p className="text-lg font-bold text-ink">{j.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
