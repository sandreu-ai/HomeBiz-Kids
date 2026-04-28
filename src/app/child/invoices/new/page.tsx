import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { PhotoUploadCard } from "@/components/proof/PhotoUploadCard";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { SignatureCheckbox } from "@/components/invoice/SignatureCheckbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Zap } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";
import { formatDate, formatTokens, getInitials } from "@/lib/utils";

export default async function NewInvoicePage(props: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { jobId } = await props.searchParams;
  const job = jobId ? DEMO_JOBS.find((j) => j.id === jobId) : undefined;
  if (!job) notFound();

  const submitter = job.claimedBy ?? job.postedBy;

  return (
    <div className="max-w-2xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href={`/child/jobs/${job.id}`}>
          <ArrowLeft className="w-4 h-4" />
          Back to job
        </Link>
      </Button>

      <div className="bg-blue-tint border border-blue-soft rounded-2xl p-4 mb-6">
        <p className="text-sm font-medium text-ink">
          Review your invoice before sending it to your parent.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="p-6 border-b border-line flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-6 h-6 rounded bg-blue-deep flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-blue-deep">HomeBiz Kids</span>
            </div>
            <p className="text-xs text-ink-3">Draft Invoice</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold tracking-widest text-ink">INVOICE</p>
            <p className="text-xs text-ink-3">{formatDate(new Date().toISOString())}</p>
          </div>
        </div>

        <div className="p-6 border-b border-line flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ backgroundColor: submitter.avatarColor ?? "#6E9BCB" }}
          >
            {getInitials(submitter.name)}
          </div>
          <div>
            <p className="text-xs text-ink-3">From</p>
            <p className="text-sm font-bold text-ink">{submitter.name}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-bone rounded-xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink-3">Job</span>
              <span className="font-semibold text-ink">{job.title}</span>
            </div>
            <p className="text-xs text-ink-3 mb-2">{job.description}</p>
            <div className="flex justify-between text-sm pt-2 border-t border-line">
              <span className="text-ink-3">Agreed reward</span>
              <span className="font-bold text-yellow-ink">{formatTokens(job.tokenReward)}</span>
            </div>
          </div>

          {job.checklist && job.checklist.length > 0 && (
            <QualityChecklist items={job.checklist} editable />
          )}

          {job.beforePhoto ? (
            <BeforeAfterComparison beforeUrl={job.beforePhoto.url} />
          ) : null}

          <PhotoUploadCard phase="after" />

          <div className="space-y-2">
            <Label htmlFor="reflection">What did you learn from this job?</Label>
            <Textarea
              id="reflection"
              placeholder="What surprised you? What went well? What was hard?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note to your parent (optional)</Label>
            <Textarea
              id="note"
              placeholder="Anything you want them to know..."
              rows={2}
            />
          </div>

          <SignatureCheckbox />

          <Button size="lg" className="w-full" asChild>
            <Link href="/child/invoices">Submit invoice for review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
