"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_PRAISE_BANK } from "@/lib/demo-data";
import { Textarea } from "@/components/ui/textarea";

interface PraiseBankSelectorProps {
  onChange?: (text: string | null) => void;
}

export function PraiseBankSelector({ onChange }: PraiseBankSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState("");

  function pick(text: string) {
    setSelected(text);
    onChange?.(text);
  }

  return (
    <div className="bg-blue-tint border border-blue-soft rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Heart className="w-4 h-4 text-blue-deep" />
        <p className="text-xs font-bold text-blue-deep uppercase tracking-wider">
          Add praise (recommended)
        </p>
      </div>
      <p className="text-xs text-ink-3">
        Rewards matter. Being seen matters too.
      </p>

      <div className="flex flex-wrap gap-1.5">
        {DEMO_PRAISE_BANK.slice(0, 8).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p.text)}
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
              selected === p.text
                ? "bg-blue-deep text-white border-blue-deep"
                : "bg-white border-line hover:border-blue-deep/50 text-ink"
            )}
          >
            {p.text}
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Or write your own custom note..."
        value={custom}
        onChange={(e) => {
          setCustom(e.target.value);
          if (e.target.value) {
            setSelected(e.target.value);
            onChange?.(e.target.value);
          }
        }}
        rows={2}
      />
    </div>
  );
}
