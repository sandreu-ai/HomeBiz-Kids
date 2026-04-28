import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChildProfileCard } from "@/components/family/ChildProfileCard";
import { SkillBadgeCard } from "@/components/badges/SkillBadgeCard";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { JobCard } from "@/components/job/JobCard";
import { ArrowLeft } from "lucide-react";
import { DEMO_CHILD_PROFILES, DEMO_JOBS } from "@/lib/demo-data";

export default async function ChildDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const profile = Object.values(DEMO_CHILD_PROFILES).find((p) => p.id === id);
  if (!profile) notFound();

  const childJobs = DEMO_JOBS.filter(
    (j) => j.claimedById === profile.userId || j.assignedToId === profile.id
  );

  return (
    <div className="max-w-5xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/dashboard/children">
          <ArrowLeft className="w-4 h-4" />
          All children
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChildProfileCard profile={profile} />

          <div>
            <SectionHeader title={`${profile.user.name.split(" ")[0]}'s jobs`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {childJobs.map((j) => <JobCard key={j.id} job={j} viewAs="parent" />)}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {profile.activeSavingsGoal && (
            <div>
              <SectionHeader title="Savings goal" />
              <SavingsGoalCard goal={profile.activeSavingsGoal} />
            </div>
          )}

          {profile.badges && profile.badges.length > 0 && (
            <div>
              <SectionHeader title="Badges" />
              <div className="space-y-3">
                {profile.badges.slice(0, 4).map((b) => (
                  <SkillBadgeCard key={b.badgeCode} childBadge={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
