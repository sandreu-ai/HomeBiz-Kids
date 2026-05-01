import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { PhotoUploadCard } from "@/components/proof/PhotoUploadCard";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LittleIllustratedKid } from "@/components/child/AvatarPicker";
import { ArrowLeft, Camera, ReceiptText, Send, Sparkles } from "lucide-react";
import { DEMO_JOBS } from "@/lib/demo-data";
import { formatDate, formatTokens } from "@/lib/utils";
import { getKidAvatarOption } from "@/lib/child-portal/avatar-options";

export default async function NewInvoicePage(props: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { jobId } = await props.searchParams;
  const job = jobId ? DEMO_JOBS.find((j) => j.id === jobId) : undefined;
  if (!job) notFound();

  const submitter = job.claimedBy ?? job.postedBy;
  const avatar = getKidAvatarOption(submitter.id.includes("mateo") ? "avatar-boy-green-curls" : "avatar-boy-blue-wave");

  return (
    <div className="mx-auto max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href={`/child/jobs/${job.id}`}>
          <ArrowLeft className="w-4 h-4" />
          Back to job
        </Link>
      </Button>

      <div className="mb-6 rounded-3xl border-4 border-ink bg-yellow-tint p-5 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-ink">Simple kid invoice</p>
            <h1 className="mt-1 text-3xl font-black text-ink">Show the work. Ask for tokens.</h1>
            <p className="mt-2 text-sm text-ink-3">
              Keep it short: what you did, before/after proof, and a clear request for your parent.
            </p>
          </div>
          <div className="relative mx-auto shrink-0 rounded-[2rem] border-3 border-ink bg-white p-3 shadow-card sm:mx-0">
            <LittleIllustratedKid avatar={avatar} size="lg" />
            <span className="absolute -right-3 top-2 rotate-6 rounded-full border-2 border-ink bg-green px-2 py-0.5 text-xs font-black text-white">
              done!
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border-4 border-ink bg-white shadow-pop">
        <div className="flex items-start justify-between border-b-2 border-line p-5">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-ink bg-blue-deep">
                <ReceiptText className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-black text-blue-deep">HomeBiz Kids</span>
            </div>
            <p className="text-xs font-bold text-ink-3">Draft invoice to parent</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black tracking-widest text-ink">INVOICE</p>
            <p className="text-xs text-ink-3">{formatDate(new Date().toISOString())}</p>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="rounded-2xl border-2 border-line bg-bone p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-ink-3">Job</p>
                <h2 className="text-lg font-black text-ink">{job.title}</h2>
                <p className="mt-1 max-w-xl text-sm text-ink-3">{job.description}</p>
              </div>
              <div className="rounded-full border-2 border-ink bg-yellow px-3 py-1 text-sm font-black text-yellow-ink">
                {formatTokens(job.tokenReward)} agreed
              </div>
            </div>
          </div>

          {job.beforePhoto ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-red-deep" />
                <p className="text-sm font-black text-ink">Before photo from when you started</p>
              </div>
              <BeforeAfterComparison beforeUrl={job.beforePhoto.url} afterLabel="After photo goes below" />
              <p className="text-xs text-ink-3">
                This before picture carries into the invoice so your parent can see what changed.
              </p>
            </div>
          ) : (
            <PhotoUploadCard
              phase="before"
              label="Before photo from when you started"
              hint="If you forgot earlier, add a before-style photo or reference image now."
            />
          )}

          <PhotoUploadCard
            phase="after"
            label="Take an after picture"
            hint="Show the finished work clearly. This is your proof of value."
          />

          {job.checklist && job.checklist.length > 0 && (
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="mb-3 text-sm font-black text-ink">Quick quality check</p>
              <QualityChecklist items={job.checklist} editable />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-[1fr_11rem]">
            <div className="space-y-2">
              <Label htmlFor="work-summary">What did you do?</Label>
              <Textarea
                id="work-summary"
                placeholder="Example: I made my bed, put clothes in the hamper, organized the floor, and vacuumed."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokens-requested">Tokens requested</Label>
              <Input id="tokens-requested" inputMode="numeric" defaultValue={job.tokenReward} />
              <p className="text-xs text-ink-3">Parent can approve or counteroffer.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent-note">Note to your parent (optional)</Label>
            <Textarea
              id="parent-note"
              placeholder="Anything you want your parent to notice?"
              rows={2}
            />
          </div>

          <div className="rounded-2xl border-2 border-blue-soft bg-blue-tint p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-blue-deep" />
              <div>
                <p className="text-sm font-black text-blue-deep">Invoice preview</p>
                <p className="text-xs text-ink-3">
                  Your parent will see the job, your before photo, your after photo, what you did, and the tokens you requested.
                </p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full border-2 border-ink" asChild>
            <Link href="/child/invoices">
              <Send className="h-4 w-4" />
              Submit invoice for parent review
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
