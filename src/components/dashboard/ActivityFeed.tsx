import type { ActivityEvent } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

function getEventIcon(type: ActivityEvent["type"]): string {
  const icons: Record<ActivityEvent["type"], string> = {
    job_posted: "📋",
    job_claimed: "🤝",
    job_submitted: "📤",
    job_approved: "✅",
    proposal_submitted: "💡",
    proposal_approved: "🎉",
    invoice_submitted: "📄",
    invoice_approved: "💰",
    reward_redeemed: "🎁",
    bonus_added: "⭐",
    trusted_adult_proposed: "👴",
  };
  return icons[type] ?? "📌";
}

function getEventColor(type: ActivityEvent["type"]): string {
  if (type.includes("approved") || type === "bonus_added") return "bg-blue-tint";
  if (type.includes("submitted") || type.includes("proposed")) return "bg-yellow-tint";
  if (type === "reward_redeemed") return "bg-red-tint";
  return "bg-line-soft";
}

interface ActivityFeedProps {
  events: ActivityEvent[];
  maxItems?: number;
}

export function ActivityFeed({ events, maxItems = 8 }: ActivityFeedProps) {
  const displayed = events.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {displayed.map((event, i) => (
        <div key={event.id} className="flex items-start gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0",
              getEventColor(event.type)
            )}
          >
            {getEventIcon(event.type)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-ink leading-snug">{event.description}</p>
            <p className="text-xs text-ink-3 mt-0.5">
              {formatRelativeDate(event.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
