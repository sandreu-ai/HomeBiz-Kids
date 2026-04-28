"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { SkillBadgeCard } from "@/components/badges/SkillBadgeCard";
import { SKILL_BADGES } from "@/lib/demo-data/badges";
import type { ChildBadge, BadgeCode } from "@/types";

export default function ChildBadgesPage() {
  const { session } = useSession();
  const profile = session.childProfile;

  if (!profile) return <div>Switch to a child user.</div>;

  // Show all badges - earned and not started
  const myBadgeCodes = new Set(profile.badges?.map((b) => b.badgeCode) ?? []);
  const allBadges: ChildBadge[] = [
    ...(profile.badges ?? []),
    ...(Object.keys(SKILL_BADGES) as BadgeCode[])
      .filter((code) => !myBadgeCodes.has(code))
      .map((code) => ({
        childId: profile.id,
        badgeCode: code,
        progress: 0,
        earned: false,
      })),
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Your Badges"
        subtitle="Badges are earned by real work."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBadges.map((b) => <SkillBadgeCard key={b.badgeCode} childBadge={b} />)}
      </div>
    </div>
  );
}
