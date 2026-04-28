"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { InvoiceCard } from "@/components/invoice/InvoiceCard";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { AlertCircle } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";

export default function ChildRevisionsPage() {
  const { session } = useSession();
  const userId = session.user.id;

  const revisions = DEMO_INVOICES.filter(
    (i) => i.submittedById === userId && i.status === "REVISION_REQUESTED"
  );

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Revisions"
        subtitle="When your parent asks for changes — handle them well, earn the Resilience Badge."
      />

      {revisions.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          heading="Nothing needs fixing right now"
          subtext="When a parent asks for changes on an invoice, it'll appear here."
        />
      ) : (
        <div className="space-y-3">
          {revisions.map((i) => <InvoiceCard key={i.id} invoice={i} viewAs="child" />)}
        </div>
      )}
    </div>
  );
}
