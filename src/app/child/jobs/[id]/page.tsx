import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/job/JobStatusBadge";
import { DifficultyBadge } from "@/components/job/DifficultyBadge";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { PhotoUploadCard } from "@/components/proof/PhotoUploadCard";
import { ArrowLeft, Calendar, Clock, Coins, CheckCircle2 } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";
import { formatDate, formatTokens, getCategoryEmoji } from "@/lib/utils";

export default async function ChildJobDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const job = DEMO_JOBS.find((j) => j.id === id);
  if (!job) notFound();

  const isOpen = job.status === "OPEN";
  const isClaimed = ["CLAIMED", "IN_PROGRESS"].includes(job.status);
  const needsAfterPhoto = job.proofRequirement === "AFTER_ONLY" || job.proofRequirement === "BEFORE_AND_AFTER";

  return (
    <div className="max-w-3xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/child/jobs">
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>
      </Button>

      <div className="bg-white rounded-3xl border border-line shadow-card p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-bone flex items-center justify-center text-2xl shrink-0">
            {getCategoryEmoji(job.category)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <JobStatusBadge status={job.status} />
              <DifficultyBadge difficulty={job.difficulty} />
            </div>
            <h1 className="text-xl font-bold text-ink">{job.title}</h1>
          </div>
          <div className="flex items-center gap-1 bg-yellow-tint px-3 py-1.5 rounded-full shrink-0">
            <span className="text-yellow-deep">✦</span>
            <span className="font-bold text-yellow-ink">{formatTokens(job.tokenReward)}</span>
          </div>
        </div>

        <p className="text-sm text-ink leading-relaxed mb-5">{job.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {job.dueDate && (
            <div className="bg-bone rounded-xl p-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ink-3" />
              <div>
                <p className="text-[10px] text-ink-3 uppercase">Due</p>
                <p className="text-sm font-medium text-ink">{formatDate(job.dueDate)}</p>
              </div>
            </div>
          )}
          {job.estimatedTime && (
            <div className="bg-bone rounded-xl p-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink-3" />
              <div>
                <p className="text-[10px] text-ink-3 uppercase">Estimated time</p>
                <p className="text-sm font-medium text-ink">{job.estimatedTime}</p>
              </div>
            </div>
          )}
        </div>

        {job.virtues.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-ink-3 mb-2 uppercase tracking-wider">
              You'll practice
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.virtues.map((v) => <VirtueBadge key={v} virtue={v} />)}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="bg-blue-deep text-white rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold">Ready to claim this job?</p>
            <p className="text-xs text-white/70 mt-0.5">Once you start, you commit to finishing.</p>
          </div>
          <Button variant="gold" size="lg">
            Accept Job
          </Button>
        </div>
      )}

      {isClaimed && (
        <div className="space-y-6">
          {job.checklist && (
            <div className="bg-white rounded-2xl border border-line shadow-card p-5">
              <h2 className="font-semibold text-ink mb-3">Your checklist</h2>
              <QualityChecklist items={job.checklist} editable />
            </div>
          )}

          {needsAfterPhoto && (
            <div className="bg-white rounded-2xl border border-line shadow-card p-5 space-y-4">
              <h2 className="font-semibold text-ink">Upload proof</h2>
              {job.beforePhoto && (
                <BeforeAfterComparison beforeUrl={job.beforePhoto.url} afterLabel="After (upload below)" />
              )}
              <PhotoUploadCard phase="after" />
            </div>
          )}

          <div className="bg-blue-deep text-white rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold">All done?</p>
              <p className="text-xs text-white/70">Submit your invoice for parent review.</p>
            </div>
            <Button asChild variant="gold" size="lg">
              <Link href={`/child/invoices/new?jobId=${job.id}`}>
                <CheckCircle2 className="w-4 h-4" />
                Submit Invoice
              </Link>
            </Button>
          </div>
        </div>
      )}

      {(job.beforePhoto || job.afterPhoto) && !isClaimed && (
        <div className="bg-white rounded-2xl border border-line shadow-card p-5">
          <BeforeAfterComparison
            beforeUrl={job.beforePhoto?.url}
            afterUrl={job.afterPhoto?.url}
          />
        </div>
      )}
    </div>
  );
}
