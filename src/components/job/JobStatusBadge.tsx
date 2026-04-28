import { Badge } from "@/components/ui/badge";
import { getJobStatusLabel, getJobStatusColor } from "@/lib/utils";
import type { JobStatus } from "@/types";
import { cn } from "@/lib/utils";

export function JobStatusBadge({ status, className }: { status: JobStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getJobStatusColor(status),
        className
      )}
    >
      {getJobStatusLabel(status)}
    </span>
  );
}
