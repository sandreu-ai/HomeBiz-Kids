import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JobStatus, ProposalStatus, InvoiceStatus, DifficultyLevel, JobCategory } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokens(amount: number): string {
  return `${amount} token${amount !== 1 ? "s" : ""}`;
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateStr);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getJobStatusLabel(status: JobStatus): string {
  const labels: Record<JobStatus, string> = {
    OPEN: "Open",
    CLAIMED: "Claimed",
    IN_PROGRESS: "In Progress",
    SUBMITTED: "Submitted",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
  };
  return labels[status];
}

export function getJobStatusColor(status: JobStatus): string {
  const colors: Record<JobStatus, string> = {
    OPEN: "bg-blue-tint text-blue-deep",
    CLAIMED: "bg-yellow-tint text-yellow-ink",
    IN_PROGRESS: "bg-yellow-tint text-yellow-ink",
    SUBMITTED: "bg-blue-tint text-blue-deep",
    APPROVED: "bg-green-tint text-green-deep",
    REJECTED: "bg-red-tint text-red-deep",
    CANCELLED: "bg-line-soft text-ink-3",
  };
  return colors[status];
}

export function getProposalStatusColor(status: ProposalStatus): string {
  const colors: Record<ProposalStatus, string> = {
    PENDING: "bg-blue-tint text-blue-deep",
    APPROVED: "bg-green-tint text-green-deep",
    REJECTED: "bg-red-tint text-red-deep",
    COUNTERED: "bg-yellow-tint text-yellow-ink",
  };
  return colors[status];
}

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  const colors: Record<InvoiceStatus, string> = {
    DRAFT: "bg-line-soft text-ink-3",
    SUBMITTED: "bg-blue-tint text-blue-deep",
    APPROVED: "bg-green-tint text-green-deep",
    REJECTED: "bg-red-tint text-red-deep",
    REVISION_REQUESTED: "bg-yellow-tint text-yellow-ink",
  };
  return colors[status];
}

export function getDifficultyColor(difficulty: DifficultyLevel): string {
  const colors: Record<DifficultyLevel, string> = {
    EASY: "bg-green-tint text-green-deep",
    MEDIUM: "bg-yellow-tint text-yellow-ink",
    HARD: "bg-red-tint text-red-deep",
    CHALLENGE: "bg-[#EAE3F2] text-[#5F3D9D]",
  };
  return colors[difficulty];
}

export function getDifficultyLabel(difficulty: DifficultyLevel): string {
  const labels: Record<DifficultyLevel, string> = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
    CHALLENGE: "Challenge",
  };
  return labels[difficulty];
}

export function getCategoryLabel(category: JobCategory): string {
  const labels: Record<JobCategory, string> = {
    HOUSEHOLD: "Household",
    YARD_WORK: "Yard Work",
    PET_CARE: "Pet Care",
    LEARNING: "Learning",
    SERVICE: "Service",
    CREATIVE: "Creative",
    BUSINESS: "Business Idea",
    BONUS_CHALLENGE: "Bonus Challenge",
    ORGANIZATION: "Organization",
    OUTDOOR: "Outdoor Work",
  };
  return labels[category];
}

export function getCategoryEmoji(category: JobCategory): string {
  const emojis: Record<JobCategory, string> = {
    HOUSEHOLD: "🏠",
    YARD_WORK: "🌿",
    PET_CARE: "🐾",
    LEARNING: "📚",
    SERVICE: "🤝",
    CREATIVE: "🎨",
    BUSINESS: "💡",
    BONUS_CHALLENGE: "⭐",
    ORGANIZATION: "📦",
    OUTDOOR: "🌳",
  };
  return emojis[category];
}

export function getVirtueLabel(virtue: string): string {
  const labels: Record<string, string> = {
    RESPONSIBILITY: "Responsibility",
    INITIATIVE: "Initiative",
    DILIGENCE: "Diligence",
    HONESTY: "Honesty",
    FOLLOW_THROUGH: "Follow-Through",
    PROBLEM_SOLVING: "Problem-Solving",
    SERVICE: "Service",
    STEWARDSHIP: "Stewardship",
    COMMUNICATION: "Communication",
    RESILIENCE: "Resilience",
  };
  return labels[virtue] ?? virtue;
}
