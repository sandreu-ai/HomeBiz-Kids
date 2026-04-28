"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

interface BeforeAfterComparisonProps {
  beforeUrl?: string;
  afterUrl?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

function PhotoPanel({
  url,
  label,
  phase,
}: {
  url?: string;
  label: string;
  phase: "before" | "after";
}) {
  const isEmpty = !url;
  const bgColor = phase === "before" ? "bg-red-tint" : "bg-blue-tint";
  const borderColor = phase === "before" ? "border-red-soft" : "border-blue-soft";
  const textColor = phase === "before" ? "text-red-deep" : "text-blue-deep";
  const labelBg = phase === "before" ? "bg-red text-white" : "bg-blue-deep text-white";

  return (
    <div className="flex-1 min-w-0">
      <div className={cn("relative rounded-2xl overflow-hidden border-2", borderColor)}>
        {/* Label pill */}
        <div className={cn("absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold", labelBg)}>
          {label}
        </div>

        {url ? (
          <div className="aspect-video relative">
            {/* Use a placeholder colored box for demo */}
            <div
              className={cn(
                "w-full h-full flex items-center justify-center",
                phase === "before"
                  ? "bg-gradient-to-br from-line to-line-soft"
                  : "bg-gradient-to-br from-green-tint to-blue-tint"
              )}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {phase === "before" ? "📸" : "✨"}
                </div>
                <p className="text-xs font-medium text-ink-3">
                  {phase === "before" ? "Before photo" : "After photo"}
                </p>
                <p className="text-[10px] text-ink-4 mt-0.5">
                  (Demo placeholder)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={cn("aspect-video flex flex-col items-center justify-center", bgColor)}>
            <Camera className={cn("w-8 h-8 mb-2", textColor, "opacity-40")} />
            <p className={cn("text-xs font-medium", textColor, "opacity-60")}>
              No {label.toLowerCase()} photo yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function BeforeAfterComparison({
  beforeUrl,
  afterUrl,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterComparisonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-line" />
        <span className="text-xs font-semibold text-ink-3 uppercase tracking-wider px-2">
          Proof of Work
        </span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="flex gap-3">
        <PhotoPanel url={beforeUrl} label={beforeLabel} phase="before" />
        <PhotoPanel url={afterUrl} label={afterLabel} phase="after" />
      </div>

      {beforeUrl && afterUrl && (
        <p className="text-xs text-ink-3 text-center italic">
          Compare the before and after to see the transformation.
        </p>
      )}
    </div>
  );
}
