"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { WorkHistoryCard } from "@/components/ui-custom/WorkHistoryCard";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Trophy } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";

export default function WorkHistoryPage() {
  const { session } = useSession();
  const userId = session.user.id;

  const completed = DEMO_INVOICES.filter(
    (i) => i.submittedById === userId && i.status === "APPROVED"
  );

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="My Work Portfolio"
        subtitle="Look what you've built. Every completed job is proof you can do hard things."
      />

      {completed.length === 0 ? (
        <EmptyState
          icon={Trophy}
          heading="Your work tells a story — start writing it"
          subtext="Approved invoices show up here as a record of everything you've completed."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completed.map((inv) => <WorkHistoryCard key={inv.id} invoice={inv} />)}
        </div>
      )}
    </div>
  );
}
