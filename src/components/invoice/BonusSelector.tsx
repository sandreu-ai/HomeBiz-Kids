"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const QUICK_BONUSES = [
  { tokens: 5, reason: "Did it without being reminded" },
  { tokens: 10, reason: "Went above and beyond" },
  { tokens: 3, reason: "Finished early" },
  { tokens: 5, reason: "Excellent attitude" },
];

interface BonusSelectorProps {
  onChange?: (bonus: { tokens: number; reason: string } | null) => void;
}

export function BonusSelector({ onChange }: BonusSelectorProps) {
  const [selected, setSelected] = useState<{ tokens: number; reason: string } | null>(null);
  const [customTokens, setCustomTokens] = useState("");
  const [customReason, setCustomReason] = useState("");

  function selectQuick(b: { tokens: number; reason: string }) {
    setSelected(b);
    onChange?.(b);
  }

  function applyCustom() {
    const t = parseInt(customTokens, 10);
    if (!t || !customReason.trim()) return;
    const next = { tokens: t, reason: customReason.trim() };
    setSelected(next);
    onChange?.(next);
  }

  return (
    <div className="bg-yellow-tint border border-yellow rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-ink" />
        <p className="text-xs font-bold text-yellow-ink uppercase tracking-wider">
          Add a bonus (optional)
        </p>
      </div>
      <p className="text-xs text-ink-3">
        Reward excellence and character — not just task completion.
      </p>

      <div className="grid grid-cols-2 gap-2">
        {QUICK_BONUSES.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => selectQuick(b)}
            className={cn(
              "text-left p-2.5 rounded-xl border-2 transition-all bg-white",
              selected?.tokens === b.tokens && selected?.reason === b.reason
                ? "border-yellow-deep bg-yellow-tint"
                : "border-line hover:border-yellow-deep/50"
            )}
          >
            <p className="text-sm font-bold text-yellow-ink">+{b.tokens} tokens</p>
            <p className="text-[11px] text-ink-3 leading-tight mt-0.5">{b.reason}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Custom"
          value={customTokens}
          onChange={(e) => setCustomTokens(e.target.value)}
          className="w-20"
        />
        <Input
          placeholder="Custom reason..."
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
        />
        <button
          type="button"
          onClick={applyCustom}
          className="px-3 py-1 rounded-xl bg-yellow-deep text-white text-xs font-semibold hover:bg-yellow whitespace-nowrap"
        >
          Apply
        </button>
      </div>

      {selected && (
        <div className="bg-white rounded-xl p-3 flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-yellow-deep" />
          <span className="font-semibold text-yellow-ink">+{selected.tokens} tokens</span>
          <span className="text-ink-3 text-xs">— {selected.reason}</span>
          <button
            type="button"
            onClick={() => { setSelected(null); onChange?.(null); }}
            className="ml-auto text-xs text-ink-3 hover:text-red-deep"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
