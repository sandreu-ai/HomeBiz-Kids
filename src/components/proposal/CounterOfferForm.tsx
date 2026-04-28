"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CounterOfferFormProps {
  originalTokens: number;
  onSubmit?: (data: { tokens: number; note: string; scopeChange: string }) => void;
  onCancel?: () => void;
}

export function CounterOfferForm({ originalTokens, onSubmit, onCancel }: CounterOfferFormProps) {
  const [tokens, setTokens] = useState(originalTokens);
  const [note, setNote] = useState("");
  const [scopeChange, setScopeChange] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ tokens, note, scopeChange });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-blue-tint border border-blue-soft rounded-2xl p-5">
      <div>
        <p className="text-xs font-bold text-blue-deep uppercase tracking-wider mb-1">
          Counteroffer
        </p>
        <p className="text-xs text-ink-3">
          Negotiate scope, reward, or both. Teaches kids that value can be discussed.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="counter-tokens">New reward amount</Label>
        <div className="flex items-center gap-2">
          <Input
            id="counter-tokens"
            type="number"
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-ink-3">tokens (was {originalTokens})</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scope-change">Scope change (optional)</Label>
        <Input
          id="scope-change"
          value={scopeChange}
          onChange={(e) => setScopeChange(e.target.value)}
          placeholder="e.g. Skip the labels for now"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="counter-note">Note to your child</Label>
        <Textarea
          id="counter-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Approved for 25 tokens if you also vacuum and organize the books."
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">Send counteroffer</Button>
      </div>
    </form>
  );
}
