import Link from "next/link";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { ChildProfileCard } from "@/components/family/ChildProfileCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { getParentChildrenProfiles } from "@/lib/family/children-data";

export default async function ChildrenPage() {
  const { profiles, mode, familyName } = await getParentChildrenProfiles();
  const isLiveEmpty = mode === "live" && profiles.length === 0;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Children"
        subtitle={
          familyName
            ? `Each child's progress, balance, and character growth for ${familyName}`
            : "Each child's progress, balance, and character growth"
        }
      >
        <Button asChild>
          <Link href="/onboarding">
            <UserPlus className="w-4 h-4" />
            Add Child
          </Link>
        </Button>
      </PageHeader>

      {isLiveEmpty ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center shadow-card">
          <h2 className="text-xl font-bold text-ink">No child profiles yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-3">
            Add a parent-owned child profile to start assigning jobs, tracking tokens, and reviewing proof.
          </p>
          <Button asChild className="mt-5">
            <Link href="/onboarding">
              <UserPlus className="w-4 h-4" />
              Add your first child
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profiles.map((p) => (
            <ChildProfileCard key={p.id} profile={p} href={`/dashboard/children/${p.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
