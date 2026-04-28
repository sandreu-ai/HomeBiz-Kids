import { PageHeader } from "@/components/ui-custom/PageHeader";
import { InvoiceCard } from "@/components/invoice/InvoiceCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { Receipt } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";

export default function InvoicesPage() {
  const submitted = DEMO_INVOICES.filter((i) => i.status === "SUBMITTED");
  const approved = DEMO_INVOICES.filter((i) => i.status === "APPROVED");
  const revision = DEMO_INVOICES.filter((i) => i.status === "REVISION_REQUESTED");

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Invoices"
        subtitle="Review and approve work your kids have submitted"
      />

      <Tabs defaultValue="awaiting" className="w-full">
        <TabsList>
          <TabsTrigger value="awaiting">Awaiting Review ({submitted.length})</TabsTrigger>
          <TabsTrigger value="revision">Revision ({revision.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="all">All ({DEMO_INVOICES.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="awaiting">
          {submitted.length === 0 ? (
            <EmptyState
              icon={Receipt}
              heading="All caught up!"
              subtext="When your kids finish work and submit invoices, they'll appear here for review."
            />
          ) : (
            <div className="space-y-3">
              {submitted.map((inv) => <InvoiceCard key={inv.id} invoice={inv} viewAs="parent" />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="revision">
          {revision.length === 0 ? (
            <EmptyState icon={Receipt} heading="No revisions pending" subtext="Invoices awaiting child resubmission appear here." />
          ) : (
            <div className="space-y-3">
              {revision.map((inv) => <InvoiceCard key={inv.id} invoice={inv} viewAs="parent" />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-3">
            {approved.map((inv) => <InvoiceCard key={inv.id} invoice={inv} viewAs="parent" />)}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-3">
            {DEMO_INVOICES.map((inv) => <InvoiceCard key={inv.id} invoice={inv} viewAs="parent" />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
