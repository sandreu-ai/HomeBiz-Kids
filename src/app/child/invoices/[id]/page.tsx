import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { PhotoUploadCard } from "@/components/proof/PhotoUploadCard";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { SignatureCheckbox } from "@/components/invoice/SignatureCheckbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";
import { formatDate, formatTokens, getInitials } from "@/lib/utils";

export default async function ChildInvoiceDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const invoice = DEMO_INVOICES.find((i) => i.id === id);
  if (!invoice) notFound();

  const job = invoice.job;
  const before = invoice.photoProofs.find((p) => p.phase === "before");
  const after = invoice.photoProofs.find((p) => p.phase === "after");
  const isDraft = invoice.status === "DRAFT" || invoice.status === "REVISION_REQUESTED";

  return (
    <div className="max-w-2xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/child/invoices">
          <ArrowLeft className="w-4 h-4" />
          Back to invoices
        </Link>
      </Button>

      {invoice.status === "REVISION_REQUESTED" && (
        <div className="bg-blue-tint border border-blue-soft rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-deep mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-blue-deep">Revision requested</p>
            <p className="text-sm text-ink mt-1">
              Almost done. Make the fixes below and resubmit.
            </p>
          </div>
        </div>
      )}

      {invoice.status === "APPROVED" && (
        <div className="bg-blue-tint border border-blue-deep rounded-2xl p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-deep mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-blue-deep">Invoice approved!</p>
            <p className="text-sm text-ink mt-1">
              {formatTokens(job.tokenReward + (invoice.bonusTokens ?? 0))} added to your wallet.
            </p>
            {invoice.feedback?.note && (
              <p className="text-sm italic text-ink mt-2">"{invoice.feedback.note}"</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        {/* Invoice header */}
        <div className="p-6 border-b border-line flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-6 h-6 rounded bg-blue-deep flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-blue-deep">HomeBiz Kids</span>
            </div>
            <p className="text-xs text-ink-3">
              Invoice #{invoice.id.toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold tracking-widest text-ink">INVOICE</p>
            <p className="text-xs text-ink-3">{formatDate(invoice.createdAt)}</p>
          </div>
        </div>

        {/* From */}
        <div className="p-6 border-b border-line flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ backgroundColor: invoice.submittedBy.avatarColor ?? "#6E9BCB" }}
          >
            {getInitials(invoice.submittedBy.name)}
          </div>
          <div>
            <p className="text-xs text-ink-3">From</p>
            <p className="text-sm font-bold text-ink">{invoice.submittedBy.name}</p>
          </div>
        </div>

        {/* Body */}
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
            <QualityChecklist items={job.checklist} editable={isDraft} />
          )}

          {(before || isDraft) && (
            <BeforeAfterComparison beforeUrl={before?.url} afterUrl={after?.url} />
          )}

          {isDraft && !after && (
            <PhotoUploadCard phase="after" />
          )}

          {isDraft && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reflection">What did you learn from this job?</Label>
                <Textarea
                  id="reflection"
                  placeholder="What surprised you? What went well? What was hard?"
                  rows={3}
                  defaultValue={invoice.reflection ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note to your parent (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Anything you want them to know..."
                  rows={2}
                  defaultValue={invoice.notes ?? ""}
                />
              </div>

              <SignatureCheckbox />

              <Button size="lg" className="w-full">
                {invoice.status === "REVISION_REQUESTED" ? "Resubmit invoice" : "Submit invoice for review"}
              </Button>
            </>
          )}

          {invoice.signedOff && !isDraft && (
            <div className="bg-blue-tint border border-blue-soft rounded-xl p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-deep shrink-0" />
              <p className="text-xs text-blue-deep font-medium italic">
                Signed: "I confirm I completed this work honestly and carefully."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
