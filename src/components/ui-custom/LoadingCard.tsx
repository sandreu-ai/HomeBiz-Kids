import { cn } from "@/lib/utils";

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white border border-line p-6 shadow-card", className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-line-soft rounded-lg w-3/4" />
        <div className="h-3 bg-line-soft rounded-lg w-1/2" />
        <div className="h-3 bg-line-soft rounded-lg w-5/6" />
        <div className="h-8 bg-line-soft rounded-xl w-24 mt-4" />
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
