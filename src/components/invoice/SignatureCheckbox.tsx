"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignatureCheckboxProps {
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function SignatureCheckbox({ onChange, className }: SignatureCheckboxProps) {
  const [checked, setChecked] = useState(false);

  function handleToggle() {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "w-full flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left",
        checked
          ? "border-blue-deep bg-blue-tint"
          : "border-line bg-bone hover:border-green",
        className
      )}
    >
      <div className="shrink-0 mt-0.5">
        {checked ? (
          <CheckCircle2 className="w-5 h-5 text-blue-deep" />
        ) : (
          <Circle className="w-5 h-5 text-line" />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">
          I confirm that I completed this work honestly and carefully.
        </p>
        <p className="text-xs text-ink-3 mt-0.5">
          Tap to sign your invoice. Your word matters.
        </p>
      </div>
    </button>
  );
}
