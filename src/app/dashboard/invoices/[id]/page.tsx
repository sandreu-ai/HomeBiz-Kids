import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BeforeAfterComparison } from "@/components/proof/BeforeAfterComparison";
import { QualityChecklist } from "@/components/job/QualityChecklist";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { InvoiceReviewActions } from "@/components/invoice/InvoiceReviewActions";
import { ArrowLeft, Zap, CheckCircle2, MessageSquare } from "lucide-react";
import { DEMO_INVOICES } from "@/lib/demo-data";
import { formatDate, formatTokens, getInitials } from "@/lib/utils";

export default async function InvoiceReviewPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const invoice = DEMO_INVOICES.find((i) => i.id === id);
  if (!invoice) notFound();

  const job = invoice.job;
  const before = invoice.photoProofs.find((p) => p.phase === "before");
  const after = invoice.photoProofs.find((p) => p.phase === "after");

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/dashboard/invoices">
          <ArrowLeft className="w-4 h-4" />
          Back to invoices
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice document */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
            {/* Invoice header */}
            <div className="p-6 border-b border-line">
              <div className="flex items-start justify-between">
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
                  <p className="text-xs text-ink-3">
                    {invoice.submittedAt ? formatDate(invoice.submittedAt) : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Submitted by */}
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

            {/* Job line */}
            <div className="p-6 space-y-4">
              <div className="bg-bone rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-3">Job</span>
                  <span className="font-semibold text-ink">{job.title}</span>
                </div>
                <p className="text-xs text-ink-3">{job.description}</p>
                <div className="flex justify-between text-sm pt-2 border-t border-line">
                  <span className="text-ink-3">Agreed reward</span>
                  <span className="font-bold text-yellow-ink">{formatTokens(job.tokenReward)}</span>
                </div>
              </div>

              {/* Virtues */}
              {job.virtues.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-ink mb-2">Virtues practiced</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.virtues.map((v) => <VirtueBadge key={v} virtue={v} />)}
                  </div>
                </div>
              )}

              {/* Checklist */}
              {job.checklist && job.checklist.length > 0 && (
                <QualityChecklist items={job.checklist} />
              )}

              {/* Before/After */}
              {(before || after) && (
                <BeforeAfterComparison
                  beforeUrl={before?.url}
                  afterUrl={after?.url}
                />
              )}

              {/* Notes */}
              {invoice.notes && (
                <div className="bg-bone rounded-xl p-4 flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-ink-3 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-ink mb-1">Note from {invoice.submittedBy.name.split(" ")[0]}</p>
                    <p className="text-sm text-ink italic">"{invoice.notes}"</p>
                  </div>
                </div>
              )}

              {/* Reflection */}
              {invoice.reflection && (
                <div className="bg-blue-tint rounded-xl p-4 border-l-4 border-blue">
                  <p className="text-xs font-bold text-blue-deep uppercase tracking-wider mb-1">
                    My reflection
                  </p>
                  <p className="text-sm text-ink italic">"{invoice.reflection}"</p>
                </div>
              )}

              {/* Signature */}
              {invoice.signedOff && (
                <div className="bg-blue-tint border border-blue-soft rounded-xl p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-deep shrink-0" />
                  <p className="text-xs text-blue-deep font-medium italic">
                    Signed: "I confirm I completed this work honestly and carefully." — {invoice.submittedBy.name}
                  </p>
                </div>
              )}
            </div>

            {/* Existing feedback if approved */}
            {invoice.feedback && (
              <div className="bg-gradient-to-br from-yellow-tint to-bone p-6 border-t-2 border-yellow-deep">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center text-white text-base shrink-0">
                    ⭐
                  </div>
                  <div>
                    <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider mb-1">
                      {invoice.feedback.rating === "above_beyond" && "Above & beyond"}
                      {invoice.feedback.rating === "great" && "Great job"}
                      {invoice.feedback.rating === "improvement" && "Needs improvement"}
                    </p>
                    <p className="text-sm text-ink italic">"{invoice.feedback.note}"</p>
                    {invoice.feedback.bonusTokens && (
                      <p className="text-sm font-bold text-yellow-ink mt-2">
                        +{invoice.feedback.bonusTokens} bonus tokens awarded
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review actions */}
        <div>
          {invoice.status === "SUBMITTED" ? (
            <InvoiceReviewActions baseReward={job.tokenReward} />
          ) : invoice.status === "APPROVED" ? (
            <div className="bg-blue-tint rounded-2xl p-5 text-center">
              <CheckCircle2 className="w-10 h-10 text-blue-deep mx-auto mb-2" />
              <p className="font-bold text-blue-deep">Already approved</p>
              <p className="text-xs text-ink-3 mt-1">
                {formatTokens(job.tokenReward + (invoice.bonusTokens ?? 0))} paid out
              </p>
            </div>
          ) : (
            <div className="bg-bone rounded-2xl p-5 text-center">
              <p className="text-sm font-medium text-ink">Status: {invoice.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
