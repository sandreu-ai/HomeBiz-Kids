"use client";

import { useSession } from "@/providers/DemoSessionProvider";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { InvoiceCard } from "@/components/invoice/InvoiceCard";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Receipt } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";

export default function ChildInvoicesPage() {
  const { session } = useSession();
  const myInvoices = DEMO_INVOICES.filter((i) => i.submittedById === session.user.id);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="My Invoices"
        subtitle="Review your invoices before they go to your parent for review."
      />

      {myInvoices.length === 0 ? (
        <EmptyState
          icon={Receipt}
          heading="No invoices yet"
          subtext="When you submit an invoice for a finished job, it shows up here."
        />
      ) : (
        <div className="space-y-3">
          {myInvoices.map((i) => <InvoiceCard key={i.id} invoice={i} viewAs="child" />)}
        </div>
      )}
    </div>
  );
}
