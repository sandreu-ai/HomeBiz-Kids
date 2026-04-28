import { PageHeader } from "@/components/ui-custom/PageHeader";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { SkillBadgeCard } from "@/components/badges/SkillBadgeCard";
import { DEMO_CHILD_PROFILES } from "@/lib/demo-data";

export default function BadgesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Skill Badges"
        subtitle="Earned by real work, not random gamification"
      />

      <div className="space-y-10">
        {Object.values(DEMO_CHILD_PROFILES).map((profile) => (
          <div key={profile.id}>
            <SectionHeader
              title={profile.user.name}
              subtitle={`Level ${profile.level} · ${profile.lifetimeTokens} lifetime tokens`}
            />
            {profile.badges && profile.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.badges.map((b) => (
                  <SkillBadgeCard key={b.badgeCode} childBadge={b} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-3">No badges started yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
