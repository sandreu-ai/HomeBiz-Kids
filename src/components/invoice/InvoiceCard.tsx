import Link from "next/link";
import type { Invoice } from "@/types";
import {
  formatDate,
  formatTokens,
  getInvoiceStatusColor,
  getCategoryEmoji,
} from "@/lib/utils";
import { Camera, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceCardProps {
  invoice: Invoice;
  viewAs?: "parent" | "child";
}

export function InvoiceCard({ invoice, viewAs = "parent" }: InvoiceCardProps) {
  const href =
    viewAs === "parent"
      ? `/dashboard/invoices/${invoice.id}`
      : `/child/invoices/${invoice.id}`;

  const statusLabel: Record<typeof invoice.status, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Awaiting Review",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    REVISION_REQUESTED: "Revision Requested",
  };

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl border border-line shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-bone flex items-center justify-center text-lg shrink-0">
              {getCategoryEmoji(invoice.job.category)}
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm leading-tight">
                {invoice.job.title}
              </h3>
              <p className="text-xs text-ink-3 mt-0.5">
                Invoice #{invoice.id.split("-")[1]?.toUpperCase()} ·
                Submitted by {invoice.submittedBy.name.split(" ")[0]}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0",
              getInvoiceStatusColor(invoice.status)
            )}
          >
            {statusLabel[invoice.status]}
          </span>
        </div>

        {invoice.notes && (
          <p className="text-xs text-ink-3 line-clamp-2 mb-3 italic">
            "{invoice.notes}"
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-ink-3">
            <span className="flex items-center gap-1 font-semibold text-yellow-ink">
              <span>✦</span>
              {formatTokens(invoice.job.tokenReward)}
              {invoice.bonusTokens && invoice.bonusTokens > 0 && (
                <span className="text-blue-deep">+{invoice.bonusTokens}</span>
              )}
            </span>
            {invoice.photoProofs.length > 0 && (
              <span className="flex items-center gap-1 text-blue-deep">
                <Camera className="w-3 h-3" />
                {invoice.photoProofs.length} photo{invoice.photoProofs.length !== 1 ? "s" : ""}
              </span>
            )}
            {invoice.submittedAt && (
              <span>{formatDate(invoice.submittedAt)}</span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-line group-hover:text-blue-deep group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
