import { PageHeader } from "@/components/ui-custom/PageHeader";
import { ChildProfileCard } from "@/components/family/ChildProfileCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DEMO_CHILD_PROFILES } from "@/lib/demo-data";

export default function ChildrenPage() {
  const profiles = Object.values(DEMO_CHILD_PROFILES);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Children"
        subtitle="Each child's progress, balance, and character growth"
      >
        <Button>
          <UserPlus className="w-4 h-4" />
          Add Child
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {profiles.map((p) => (
          <ChildProfileCard key={p.id} profile={p} href={`/dashboard/children/${p.id}`} />
        ))}
      </div>
    </div>
  );
}
