"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SavingsGoalsPage() {
  const { session } = useSession();
  const profile = session.childProfile;

  if (!profile) return <div>Switch to a child user.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Savings Goals"
        subtitle="Save toward something that matters. Delayed gratification is a superpower."
      >
        <Button>
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </PageHeader>

      {profile.activeSavingsGoal && (
        <div className="space-y-6">
          <SavingsGoalCard goal={profile.activeSavingsGoal} />

          <div className="bg-white rounded-2xl border border-line shadow-card p-5">
            <p className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
              Add tokens to your goal
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50].map((n) => (
                <Button key={n} variant="outline" size="sm">
                  +{n} tokens
                </Button>
              ))}
            </div>
            <p className="text-xs text-ink-3 italic mt-3">
              You have {profile.tokenBalance - profile.activeSavingsGoal.savedTokens} tokens free to put toward your goal.
            </p>
          </div>

          <div className="bg-blue-tint border border-blue-soft rounded-2xl p-5">
            <p className="text-sm font-medium text-blue-deep mb-1">Why save?</p>
            <p className="text-xs text-ink-3 leading-relaxed">
              Saving toward a goal teaches your brain to wait — and that's a skill you'll use
              your whole life. Real entrepreneurs don't spend everything they earn.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
