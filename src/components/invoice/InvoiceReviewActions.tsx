"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { BonusSelector } from "./BonusSelector";
import { PraiseBankSelector } from "./PraiseBankSelector";
import { cn } from "@/lib/utils";

interface InvoiceReviewActionsProps {
  baseReward: number;
}

export function InvoiceReviewActions({ baseReward }: InvoiceReviewActionsProps) {
  const [bonus, setBonus] = useState<{ tokens: number; reason: string } | null>(null);
  const [praise, setPraise] = useState<string | null>(null);
  const [decision, setDecision] = useState<"approved" | "revision" | "rejected" | null>(null);
  const [revisionNote, setRevisionNote] = useState("");

  const totalReward = baseReward + (bonus?.tokens ?? 0);

  if (decision === "approved") {
    return (
      <div className="bg-blue-tint border-2 border-blue-deep rounded-2xl p-5 text-center">
        <CheckCircle2 className="w-10 h-10 text-blue-deep mx-auto mb-2" />
        <p className="font-bold text-blue-deep text-lg">Invoice Approved!</p>
        <p className="text-sm text-ink-3 mt-1">
          {totalReward} tokens added to wallet
          {bonus && ` (${baseReward} + ${bonus.tokens} bonus)`}
        </p>
        {praise && (
          <p className="text-sm italic text-ink mt-3">"{praise}"</p>
        )}
      </div>
    );
  }

  if (decision === "rejected") {
    return (
      <div className="bg-red-tint border-2 border-red-soft rounded-2xl p-5 text-center">
        <XCircle className="w-10 h-10 text-red-deep mx-auto mb-2" />
        <p className="font-bold text-red-deep text-lg">Invoice Rejected</p>
        <p className="text-sm text-ink-3 mt-1">No tokens awarded.</p>
      </div>
    );
  }

  if (decision === "revision") {
    return (
      <div className="bg-blue-tint border-2 border-blue-soft rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-deep" />
          <p className="font-bold text-blue-deep">Request Revision</p>
        </div>
        <Textarea
          value={revisionNote}
          onChange={(e) => setRevisionNote(e.target.value)}
          placeholder="Almost done. Please put the books away and upload one more photo."
          rows={3}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setDecision(null)}>Cancel</Button>
          <Button size="sm" onClick={() => alert("Revision requested.")}>Send revision request</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BonusSelector onChange={setBonus} />
      <PraiseBankSelector onChange={setPraise} />

      <div className="bg-white border border-line rounded-2xl p-4 flex items-center justify-between">
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
        </div>
        <Button onClick={() => setDecision("approved")} size="lg" className="ml-auto">
          <CheckCircle2 className="w-4 h-4" />
          Approve & Pay
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => setDecision("revision")}>
          <AlertCircle className="w-4 h-4" />
          Request Revision
        </Button>
        <Button variant="outline" onClick={() => setDecision("rejected")} className="text-red-deep border-red-soft hover:bg-red-tint">
          <XCircle className="w-4 h-4" />
          Reject
        </Button>
      </div>
    </div>
  );
}
