"use client";

import type { QualityChecklistItem } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QualityChecklistProps {
  items: QualityChecklistItem[];
  editable?: boolean;
  onChange?: (items: QualityChecklistItem[]) => void;
  className?: string;
}

export function QualityChecklist({
  items,
  editable = false,
  onChange,
  className,
}: QualityChecklistProps) {
  const [list, setList] = useState(items);

  function toggle(id: string) {
    if (!editable) return;
    const next = list.map((it) =>
      it.id === id ? { ...it, completed: !it.completed } : it
    );
    setList(next);
    onChange?.(next);
  }

  const completed = list.filter((it) => it.completed).length;
  const requiredTotal = list.filter((it) => it.required).length;
  const requiredDone = list.filter((it) => it.required && it.completed).length;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink uppercase tracking-wider">
          Quality Checklist
        </p>
        <span className="text-xs font-medium text-ink-3">
          {requiredDone}/{requiredTotal} required · {completed}/{list.length} total
        </span>
      </div>

      <div className="bg-bone rounded-2xl p-3 space-y-1">
        {list.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!editable}
            onClick={() => toggle(item.id)}
            className={cn(
              "w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors",
              editable && "hover:bg-white",
              !editable && "cursor-default"
            )}
          >
            {item.completed ? (
              <CheckCircle2 className="w-4 h-4 text-blue-deep mt-0.5 shrink-0" />
            ) : (
              <Circle className={cn("w-4 h-4 mt-0.5 shrink-0", item.required ? "text-line" : "text-line/50")} />
            )}
            <span
              className={cn(
                "text-sm flex-1",
                item.completed ? "text-ink-3 line-through" : "text-ink",
                !item.required && "italic text-ink-3"
              )}
            >
              {item.text}
              {!item.required && (
                <span className="text-[10px] font-medium text-ink-4 ml-1.5 not-italic">(optional)</span>
              )}
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-ink-3 italic text-center">
        Clear work. Clear standards. Clear reward.
      </p>
    </div>
  );
}
