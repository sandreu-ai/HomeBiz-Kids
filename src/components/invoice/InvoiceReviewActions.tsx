"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { BonusSelector } from "./BonusSelector";
import { PraiseBankSelector } from "./PraiseBankSelector";
import { approveParentInvoice, rejectParentInvoice, requestParentInvoiceRevision } from "@/app/dashboard/invoices/actions";

interface InvoiceReviewActionsProps {
  invoiceId: string;
  baseReward: number;
}

export function InvoiceReviewActions({ invoiceId, baseReward }: InvoiceReviewActionsProps) {
  const [bonus, setBonus] = useState<{ tokens: number; reason: string } | null>(null);
  const [praise, setPraise] = useState<string | null>(null);
  const [decision, setDecision] = useState<"revision" | null>(null);
  const [revisionNote, setRevisionNote] = useState("");

  const totalReward = baseReward + (bonus?.tokens ?? 0);

  if (decision === "revision") {
    return (
      <form action={requestParentInvoiceRevision} className="bg-blue-tint border-2 border-blue-soft rounded-2xl p-5 space-y-3">
        <input type="hidden" name="invoiceId" value={invoiceId} />
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-deep" />
          <p className="font-bold text-blue-deep">Request Revision</p>
        </div>
        <Textarea
          name="revisionNote"
          value={revisionNote}
          onChange={(e) => setRevisionNote(e.target.value)}
          placeholder="Almost done. Please put the books away and upload one more photo."
          rows={3}
          required
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={() => setDecision(null)}>Cancel</Button>
          <Button type="submit" size="sm">Send revision request</Button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <BonusSelector onChange={setBonus} />
      <PraiseBankSelector onChange={setPraise} />

      <form action={approveParentInvoice} className="bg-white border border-line rounded-2xl p-4 flex items-center justify-between">
        <input type="hidden" name="invoiceId" value={invoiceId} />
        <input type="hidden" name="bonusTokens" value={bonus?.tokens ?? 0} />
        <input type="hidden" name="bonusReason" value={bonus?.reason ?? ""} />
        <input type="hidden" name="praise" value={praise ?? ""} />
        <div>
          <p className="text-xs text-ink-3">Total reward</p>
          <p className="text-2xl font-bold text-yellow-ink">
            {totalReward} <span className="text-sm font-medium text-ink-3">tokens</span>
          </p>
          {bonus && (
            <p className="text-xs text-blue-deep font-medium">
              {baseReward} agreed + {bonus.tokens} bonus
            </p>
          )}
          {praise && <p className="text-xs text-ink-3 mt-1 line-clamp-2">Praise: "{praise}"</p>}
        </div>
        <Button type="submit" size="lg" className="ml-auto">
          <CheckCircle2 className="w-4 h-4" />
          Approve & Pay
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" onClick={() => setDecision("revision")}>
          <AlertCircle className="w-4 h-4" />
          Request Revision
        </Button>
        <form action={rejectParentInvoice}>
          <input type="hidden" name="invoiceId" value={invoiceId} />
          <Button type="submit" variant="outline" className="w-full text-red-deep border-red-soft hover:bg-red-tint">
            <XCircle className="w-4 h-4" />
            Reject
          </Button>
        </form>
      </div>
    </div>
  );
}
