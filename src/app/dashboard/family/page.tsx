import { PageHeader } from "@/components/ui-custom/PageHeader";
import { SectionHeader } from "@/components/ui-custom/SectionHeader";
import { ChildProfileCard } from "@/components/family/ChildProfileCard";
import { TrustedAdultCard } from "@/components/family/TrustedAdultCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DEMO_CHILD_PROFILES, DEMO_USERS } from "@/lib/demo-data";

export default function FamilyPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Family"
        subtitle="Manage children, trusted adults, and family settings"
      />

      <div className="space-y-10">
        <div>
          <SectionHeader title="Children">
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4" />
              Add Child
            </Button>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(DEMO_CHILD_PROFILES).map((p) => (
              <ChildProfileCard key={p.id} profile={p} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            title="Trusted Adults"
            subtitle="Up to 4 grandparents, mentors, or family friends can post jobs"
          >
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4" />
              Invite Adult
            </Button>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TrustedAdultCard
              user={DEMO_USERS.joe}
              relationship="Grandfather"
              permissions={["Can propose jobs", "Requires parent approval", "Can leave feedback"]}
            />
            <div className="bg-line-soft/40 rounded-2xl border-2 border-dashed border-line flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-line/40 flex items-center justify-center mb-3">
                <UserPlus className="w-5 h-5 text-ink-3" />
              </div>
              <p className="text-sm font-semibold text-ink">Invite a trusted adult</p>
              <p className="text-xs text-ink-3 mt-1">
                Up to 4 trusted adults · {3} slots available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
