"use client";

import { useState } from "react";
import type { JobSuggestion } from "@/types";
import { cn } from "@/lib/utils";
import { Lightbulb, ArrowRight } from "lucide-react";

interface JobSuggestionPanelProps {
  suggestions: JobSuggestion[];
}

const AGE_GROUPS = ["5-7", "8-10", "11-14", "15+"] as const;

export function JobSuggestionPanel({ suggestions }: JobSuggestionPanelProps) {
  const [activeAge, setActiveAge] = useState<typeof AGE_GROUPS[number]>("8-10");

  const filtered = suggestions.filter((s) => s.ageRange === activeAge);

  return (
    <div className="bg-gradient-to-br from-blue/10 to-bone rounded-2xl border border-blue-soft p-5 sticky top-6">
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb className="w-4 h-4 text-blue-deep" />
        <p className="text-xs font-bold text-blue-deep uppercase tracking-wider">
          Job Ideas by Age
        </p>
      </div>
      <p className="text-xs text-ink-3 mb-4">
        Click any idea to auto-fill the form.
      </p>

      {/* Age tabs */}
      <div className="grid grid-cols-4 gap-1 bg-white rounded-xl p-1 mb-4">
        {AGE_GROUPS.map((age) => (
          <button
            key={age}
            type="button"
            onClick={() => setActiveAge(age)}
            className={cn(
              "text-xs font-semibold py-1.5 rounded-lg transition-all",
              activeAge === age
                ? "bg-blue text-white shadow-sm"
                : "text-ink-3 hover:text-ink"
            )}
          >
            {age}
          </button>
        ))}
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        {filtered.map((s) => (
          <button
            key={s.id}
            type="button"
            className="w-full text-left bg-white border border-line rounded-xl p-3 hover:border-blue hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="font-semibold text-ink text-sm leading-tight">{s.title}</p>
              <ArrowRight className="w-3.5 h-3.5 text-line group-hover:text-blue-deep group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-ink-3 line-clamp-2 mb-2">{s.description}</p>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="bg-line-soft px-1.5 py-0.5 rounded font-medium text-ink-3">
                {s.difficulty.toLowerCase()}
              </span>
              <span className="bg-yellow-tint text-yellow-ink px-1.5 py-0.5 rounded font-medium">
                {s.suggestedReward.min}–{s.suggestedReward.max} tokens
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
