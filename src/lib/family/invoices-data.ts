import "server-only";

import { InvoiceStatus, Role } from "@prisma/client";
import { DEMO_INVOICES } from "@/lib/demo-data";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";
import type {
  Bonus,
  ChildProfile,
  DifficultyLevel,
  Invoice,
  Job,
  JobCategory,
  ParentFeedback,
  PhotoProof,
  PraiseNote,
  ProofRequirement,
  RevisionRequest,
  User,
  VirtueFocus,
} from "@/types";

type Mode = "demo" | "live";

export type ParentInvoicesResult = {
  mode: Mode;
  familyId: string | null;
  familyName: string | null;
  invoices: Invoice[];
};

function toIso(date?: Date | null) {
  return date ? date.toISOString() : undefined;
}

function toUser(user: {
  id: string;
  name: string;
  email: string | null;
  role: Role;
  avatarUrl: string | null;
  avatarColor: string | null;
  createdAt: Date;
}, familyId: string): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email ?? undefined,
    role: user.role,
    avatarUrl: user.avatarUrl ?? undefined,
    avatarColor: user.avatarColor ?? undefined,
    createdAt: user.createdAt.toISOString(),
    familyId,
  };
}

function toChildProfile(profile: {
  id: string;
  userId: string;
  age: number;
  tokenBalance: number;
  virtues: string[];
  level: number;
  streak: number;
  lifetimeTokens: number;
  completedJobs: number;
  user: Parameters<typeof toUser>[0];
}, familyId: string): ChildProfile {
  return {
    id: profile.id,
    userId: profile.userId,
    user: toUser(profile.user, familyId),
    age: profile.age,
    tokenBalance: profile.tokenBalance,
    virtues: profile.virtues as VirtueFocus[],
    level: profile.level,
    streak: profile.streak,
    lifetimeTokens: profile.lifetimeTokens,
    completedJobsCount: profile.completedJobs,
  };
}

function toJob(job: {
  id: string;
  familyId: string;
  postedById: string;
  postedBy: Parameters<typeof toUser>[0];
  claimedById: string | null;
  claimedBy: Parameters<typeof toUser>[0] | null;
  title: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  virtues: string[];
  tokenReward: number;
  status: string;
  dueDate: Date | null;
  proofRequirement: ProofRequirement;
  isRecurring: boolean;
  estimatedTime: string | null;
  suggestedAgeRange: string | null;
  checklist: Array<{ id: string; text: string; required: boolean; completed: boolean }>;
  createdAt: Date;
  updatedAt: Date;
}, assignedTo?: ChildProfile): Job {
  return {
    id: job.id,
    familyId: job.familyId,
    postedById: job.postedById,
    postedBy: toUser(job.postedBy, job.familyId),
    claimedById: job.claimedById ?? undefined,
    claimedBy: job.claimedBy ? toUser(job.claimedBy, job.familyId) : undefined,
    assignedToId: assignedTo?.id,
    assignedTo,
    title: job.title,
    description: job.description,
    category: job.category as JobCategory,
    difficulty: job.difficulty,
    virtues: job.virtues as VirtueFocus[],
    tokenReward: job.tokenReward,
    status: job.status as Job["status"],
    dueDate: toIso(job.dueDate),
    proofRequirement: job.proofRequirement,
    isRecurring: job.isRecurring,
    estimatedTime: job.estimatedTime ?? undefined,
    suggestedAgeRange: job.suggestedAgeRange ?? undefined,
    checklist: job.checklist,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

function toInvoice(invoice: {
  id: string;
  jobId: string;
  job: Parameters<typeof toJob>[0];
  submittedById: string;
  submittedBy: Parameters<typeof toUser>[0] & { childProfile: Parameters<typeof toChildProfile>[0] | null };
  status: InvoiceStatus;
  notes: string | null;
  reflection: string | null;
  signedOff: boolean;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  revisionRequestedAt: Date | null;
  resubmittedAt: Date | null;
  bonusTokens: number;
  createdAt: Date;
  photoProofs: Array<{ id: string; invoiceId: string; phase: string; url: string; isPlaceholder: boolean; uploadedAt: Date }>;
  feedback: ({ id: string; invoiceId: string; authorId: string; author: Parameters<typeof toUser>[0]; rating: string; note: string | null; bonusTokens: number; createdAt: Date } | null);
  bonus: ({ id: string; invoiceId: string; amount: number; reason: string; parentNote: string | null; createdAt: Date } | null);
  praiseNote: ({ id: string; invoiceId: string; text: string; authorId: string; authorName: string; createdAt: Date } | null);
  revisionRequest: ({ id: string; invoiceId: string; authorId: string; authorName: string; note: string; itemsNeedingAttention: string[]; createdAt: Date } | null);
}): Invoice {
  const familyId = invoice.job.familyId;
  const submittedChild = invoice.submittedBy.childProfile
    ? toChildProfile(invoice.submittedBy.childProfile, familyId)
    : undefined;

  return {
    id: invoice.id,
    jobId: invoice.jobId,
    job: toJob(invoice.job, submittedChild),
    submittedById: invoice.submittedById,
    submittedBy: toUser(invoice.submittedBy, familyId),
    status: invoice.status as Invoice["status"],
    notes: invoice.notes ?? undefined,
    reflection: invoice.reflection ?? undefined,
    signedOff: invoice.signedOff,
    submittedAt: toIso(invoice.submittedAt),
    reviewedAt: toIso(invoice.reviewedAt),
    revisionRequestedAt: toIso(invoice.revisionRequestedAt),
    resubmittedAt: toIso(invoice.resubmittedAt),
    bonusTokens: invoice.bonusTokens,
    createdAt: invoice.createdAt.toISOString(),
    photoProofs: invoice.photoProofs.map((proof): PhotoProof => ({
      id: proof.id,
      invoiceId: proof.invoiceId,
      phase: proof.phase === "before" ? "before" : "after",
      url: proof.url,
      isPlaceholder: proof.isPlaceholder,
      uploadedAt: proof.uploadedAt.toISOString(),
    })),
    feedback: invoice.feedback
      ? ({
          id: invoice.feedback.id,
          invoiceId: invoice.feedback.invoiceId,
          authorId: invoice.feedback.authorId,
          author: toUser(invoice.feedback.author, familyId),
          rating: invoice.feedback.rating as ParentFeedback["rating"],
          note: invoice.feedback.note ?? undefined,
          bonusTokens: invoice.feedback.bonusTokens,
          createdAt: invoice.feedback.createdAt.toISOString(),
        } satisfies ParentFeedback)
      : undefined,
    bonus: invoice.bonus
      ? ({
          id: invoice.bonus.id,
          invoiceId: invoice.bonus.invoiceId,
          amount: invoice.bonus.amount,
          reason: invoice.bonus.reason,
          parentNote: invoice.bonus.parentNote ?? undefined,
          createdAt: invoice.bonus.createdAt.toISOString(),
        } satisfies Bonus)
      : undefined,
    praiseNote: invoice.praiseNote
      ? ({
          id: invoice.praiseNote.id,
          invoiceId: invoice.praiseNote.invoiceId,
          text: invoice.praiseNote.text,
          authorId: invoice.praiseNote.authorId,
          authorName: invoice.praiseNote.authorName,
          createdAt: invoice.praiseNote.createdAt.toISOString(),
        } satisfies PraiseNote)
      : undefined,
    revisionRequest: invoice.revisionRequest
      ? ({
          id: invoice.revisionRequest.id,
          invoiceId: invoice.revisionRequest.invoiceId,
          authorId: invoice.revisionRequest.authorId,
          authorName: invoice.revisionRequest.authorName,
          note: invoice.revisionRequest.note,
          itemsNeedingAttention: invoice.revisionRequest.itemsNeedingAttention,
          createdAt: invoice.revisionRequest.createdAt.toISOString(),
        } satisfies RevisionRequest)
      : undefined,
  };
}

function getDemoInvoices(): ParentInvoicesResult {
  return { mode: "demo", familyId: null, familyName: null, invoices: DEMO_INVOICES };
}

async function getParentFamilyContext() {
  const session = await getParentFamilySessionStatus();

  if (session.status !== "ready") {
    return null;
  }

  const prisma = getPrisma();
  const parent = await prisma.user.findUnique({
    where: { clerkUserId: session.clerkUserId },
    include: {
      familyMembers: {
        where: { role: Role.PARENT, approved: true },
        include: { family: true },
        take: 1,
      },
    },
  });

  const family = parent?.familyMembers[0]?.family;
  if (!parent || !family) {
    return { prisma, parent: null, family: null };
  }

  return { prisma, parent, family };
}

const invoiceInclude = {
  job: {
    include: {
      postedBy: true,
      claimedBy: true,
      checklist: { orderBy: { order: "asc" as const } },
    },
  },
  submittedBy: { include: { childProfile: { include: { user: true } } } },
  photoProofs: { orderBy: { uploadedAt: "asc" as const } },
  feedback: { include: { author: true } },
  bonus: true,
  praiseNote: true,
  revisionRequest: true,
};

export async function getParentInvoices(): Promise<ParentInvoicesResult> {
  const context = await getParentFamilyContext();

  if (!context) {
    return getDemoInvoices();
  }

  if (!context.family) {
    return { mode: "live", familyId: null, familyName: null, invoices: [] };
  }

  const familyId = context.family.id;
  const invoices = await context.prisma.invoice.findMany({
    where: { job: { familyId } },
    include: invoiceInclude,
    orderBy: { createdAt: "desc" },
  });

  return {
    mode: "live",
    familyId,
    familyName: context.family.name,
    invoices: invoices.map(toInvoice),
  };
}

export async function getParentInvoiceById(invoiceId: string): Promise<Invoice | null> {
  const context = await getParentFamilyContext();

  if (!context) {
    return DEMO_INVOICES.find((invoice) => invoice.id === invoiceId) ?? null;
  }

  if (!context.family) {
    return null;
  }

  const invoice = await context.prisma.invoice.findFirst({
    where: { id: invoiceId, job: { familyId: context.family.id } },
    include: invoiceInclude,
  });

  return invoice ? toInvoice(invoice) : null;
}
