"use client";

import { useState } from "react";
import { Camera, CheckCircle2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PhotoUploadCardProps {
  phase: "before" | "after";
  label?: string;
  hint?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

export function PhotoUploadCard({
  phase,
  label,
  hint,
  onChange,
  className,
}: PhotoUploadCardProps) {
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const defaultLabel = phase === "before" ? "Before Photo" : "After Photo";
  const defaultHint =
    phase === "before"
      ? "Take a photo before you start. Show what needs to be done."
      : "Nice work. Now show what changed.";

  const borderColor = phase === "before" ? "border-red-soft" : "border-blue-deep";
  const bgColor = phase === "before" ? "bg-red-tint" : "bg-blue-tint";
  const accentColor = phase === "before" ? "text-red-deep" : "text-blue-deep";
  const labelBg = phase === "before" ? "bg-red" : "bg-blue-deep";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setUploaded(true);
      onChange?.(file);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploaded(true);
      onChange?.(file);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full text-white",
            labelBg
          )}
        >
          {label ?? defaultLabel}
        </span>
      </div>

      <label
        className={cn(
          "flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer",
          borderColor,
          bgColor,
          dragging && "scale-[1.01] shadow-card",
          uploaded && "border-solid opacity-80"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={handleChange}
        />

        {uploaded ? (
          <>
            <CheckCircle2 className="w-10 h-10 text-blue-deep" />
            <div className="text-center">
              <p className="text-sm font-semibold text-ink">Photo added!</p>
              <p className="text-xs text-ink-3 mt-0.5">Click to replace</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                phase === "before" ? "bg-red-tint" : "bg-blue-tint"
              )}
            >
              <Camera className={cn("w-6 h-6", accentColor)} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-ink">
                {dragging ? "Drop it here" : "Upload or drag photo"}
              </p>
              <p className="text-xs text-ink-3 mt-1 max-w-[200px]">
                {hint ?? defaultHint}
              </p>
            </div>
            <Button variant="outline" size="sm" type="button" className="pointer-events-none">
              <Upload className="w-3.5 h-3.5" />
              Choose photo
            </Button>
          </>
        )}
      </label>
    </div>
  );
}
