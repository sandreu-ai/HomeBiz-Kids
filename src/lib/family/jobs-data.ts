import "server-only";

import { JobStatus, Role } from "@prisma/client";
import { DEMO_CHILD_PROFILES, DEMO_JOBS } from "@/lib/demo-data";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";
import type {
  ChildProfile,
  DifficultyLevel,
  Job,
  JobCategory,
  ProofRequirement,
  User,
  VirtueFocus,
} from "@/types";

export type ParentJobsResult = {
  mode: "demo" | "live";
  familyId: string | null;
  familyName: string | null;
  jobs: Job[];
};

export type ParentJobFormOptions = {
  mode: "demo" | "live";
  familyId: string | null;
  familyName: string | null;
  children: Array<{ userId: string; profileId: string; name: string }>;
};

const OPEN_JOB_STATUSES = [JobStatus.OPEN];

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
  status: JobStatus;
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
    status: job.status,
    dueDate: job.dueDate?.toISOString(),
    proofRequirement: job.proofRequirement,
    isRecurring: job.isRecurring,
    estimatedTime: job.estimatedTime ?? undefined,
    suggestedAgeRange: job.suggestedAgeRange ?? undefined,
    checklist: job.checklist,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

function getDemoJobs(): ParentJobsResult {
  return {
    mode: "demo",
    familyId: null,
    familyName: null,
    jobs: DEMO_JOBS,
  };
}

function getDemoJobFormOptions(): ParentJobFormOptions {
  return {
    mode: "demo",
    familyId: null,
    familyName: null,
    children: Object.values(DEMO_CHILD_PROFILES).map((child) => ({
      userId: child.userId,
      profileId: child.id,
      name: child.user.name,
    })),
  };
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

export async function getParentJobs(): Promise<ParentJobsResult> {
  const context = await getParentFamilyContext();

  if (!context) {
    return getDemoJobs();
  }

  if (!context.family) {
    return { mode: "live", familyId: null, familyName: null, jobs: [] };
  }

  const familyId = context.family.id;
  const jobs = await context.prisma.job.findMany({
    where: { familyId },
    include: {
      postedBy: true,
      claimedBy: true,
      checklist: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    mode: "live",
    familyId,
    familyName: context.family.name,
    jobs: jobs.map((job) => toJob(job)),
  };
}

export async function getParentJobById(jobId: string): Promise<Job | null> {
  const context = await getParentFamilyContext();

  if (!context) {
    return DEMO_JOBS.find((job) => job.id === jobId) ?? null;
  }

  if (!context.family) {
    return null;
  }

  const familyId = context.family.id;
  const job = await context.prisma.job.findFirst({
    where: { id: jobId, familyId },
    include: {
      postedBy: true,
      claimedBy: true,
      checklist: { orderBy: { order: "asc" } },
    },
  });

  return job ? toJob(job) : null;
}

export async function getParentJobFormOptions(): Promise<ParentJobFormOptions> {
  const context = await getParentFamilyContext();

  if (!context) {
    return getDemoJobFormOptions();
  }

  if (!context.family) {
    return { mode: "live", familyId: null, familyName: null, children: [] };
  }

  const familyId = context.family.id;
  const childProfiles = await context.prisma.childProfile.findMany({
    where: {
      user: {
        familyMembers: {
          some: { familyId, role: Role.CHILD, approved: true },
        },
      },
    },
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return {
    mode: "live",
    familyId,
    familyName: context.family.name,
    children: childProfiles.map((profile) => ({
      userId: profile.userId,
      profileId: profile.id,
      name: profile.user.name,
    })),
  };
}
