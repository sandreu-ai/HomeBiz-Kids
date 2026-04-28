"use client";

import Link from "next/link";
import { useSession } from "@/providers/DemoSessionProvider";
import { WalletSummary } from "@/components/wallet/WalletSummary";
import { JobCard } from "@/components/job/JobCard";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { SkillBadgeCard } from "@/components/badges/SkillBadgeCard";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";

export default function ChildHomePage() {
  const { session } = useSession();
  const profile = session.childProfile;

  if (!profile) {
    return (
      <div className="text-center p-8">
        <p className="text-ink-3">Switch to a child user to see this page.</p>
      </div>
    );
  }

  const firstName = session.user.name.split(" ")[0];
  const availableJobs = DEMO_JOBS.filter((j) => j.status === "OPEN").slice(0, 3);
  const activeBadges = profile.badges?.filter((b) => !b.earned).slice(0, 2) ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-ink-3 text-sm">Welcome back,</p>
        <h1 className="text-3xl font-bold text-ink mt-1">
          {firstName} 👋 Ready to earn?
        </h1>
        <p className="text-ink-3 mt-1">Your work is adding up.</p>
      </div>

      {/* Wallet summary */}
      <WalletSummary profile={profile} />

      {/* Pitch CTA */}
      <Link
        href="/child/propose"
        className="block bg-gradient-to-br from-yellow-tint to-bone border-2 border-yellow-deep rounded-3xl p-6 hover:shadow-card-hover transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-yellow flex items-center justify-center text-2xl shrink-0 shadow-sm">
            💡
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-1">
              Spotted something?
            </p>
            <h3 className="text-lg font-bold text-ink">Make Your Pitch</h3>
            <p className="text-sm text-ink-3 mt-0.5">
              Good entrepreneurs notice problems and offer helpful solutions.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-yellow-ink group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Available jobs */}
          <div>
            <SectionHeader title="Jobs you can claim" subtitle="Show what you can do">
              <Button asChild variant="ghost" size="sm">
                <Link href="/child/jobs">All jobs</Link>
              </Button>
            </SectionHeader>
            <div className="space-y-3">
              {availableJobs.map((j) => <JobCard key={j.id} job={j} viewAs="child" />)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Savings goal */}
          {profile.activeSavingsGoal && (
            <div>
              <SectionHeader title="Saving for...">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/child/savings-goals">Manage</Link>
                </Button>
              </SectionHeader>
              <SavingsGoalCard goal={profile.activeSavingsGoal} />
            </div>
          )}

          {/* Active badges */}
          {activeBadges.length > 0 && (
            <div>
              <SectionHeader title="Badges in progress">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/child/badges">All</Link>
                </Button>
              </SectionHeader>
              <div className="space-y-3">
                {activeBadges.map((b) => <SkillBadgeCard key={b.badgeCode} childBadge={b} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-6 text-center">
        <Sparkles className="w-6 h-6 text-blue-deep mx-auto mb-2" />
        <p className="text-sm font-semibold text-blue-deep">Build your work streak</p>
        <p className="text-xs text-ink-3 mt-1">
          You're on day {profile.streak}. Every completed job is proof that you can do hard things.
        </p>
      </div>
    </div>
  );
}
