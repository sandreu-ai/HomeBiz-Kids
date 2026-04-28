import { PageHeader } from "@/components/ui-custom/PageHeader";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { FileText } from "lucide-react";

export default function TrustedProposalsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Your Proposals"
        subtitle="Job suggestions you've sent to the family — pending parent approval"
      />

      <EmptyState
        icon={FileText}
        heading="No pending proposals"
        subtext="When you post a job, it appears here while waiting for parent approval."
        actionLabel="Post a Job"
        actionHref="/trusted/jobs/new"
      />
    </div>
  );
}
