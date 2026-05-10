"use server";

import { DifficultyLevel, JobStatus, ProofRequirement, RewardType, Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";
import { getParentJobFormOptions } from "@/lib/family/jobs-data";

const JOB_CATEGORIES = new Set([
  "HOUSEHOLD",
  "YARD_WORK",
  "PET_CARE",
  "LEARNING",
  "SERVICE",
  "CREATIVE",
  "BUSINESS",
  "BONUS_CHALLENGE",
  "ORGANIZATION",
  "OUTDOOR",
]);

const VIRTUES = [
  "RESPONSIBILITY",
  "INITIATIVE",
  "DILIGENCE",
  "HONESTY",
  "FOLLOW_THROUGH",
  "PROBLEM_SOLVING",
  "SERVICE",
  "STEWARDSHIP",
  "COMMUNICATION",
  "RESILIENCE",
];

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

function getEnumValue<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export async function createParentJob(formData: FormData) {
  const session = await getParentFamilySessionStatus();

  if (session.status !== "ready") {
    redirect("/sign-up");
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
    redirect("/onboarding");
  }

  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const category = getString(formData, "category", "HOUSEHOLD");
  const difficulty = getEnumValue(
    getString(formData, "difficulty", DifficultyLevel.MEDIUM),
    Object.values(DifficultyLevel),
    DifficultyLevel.MEDIUM,
  );
  const proofRequirement = getEnumValue(
    getString(formData, "proofRequirement", ProofRequirement.AFTER_ONLY),
    Object.values(ProofRequirement),
    ProofRequirement.AFTER_ONLY,
  );
  const tokenReward = Math.max(0, Number.parseInt(getString(formData, "tokenReward", "0"), 10) || 0);
  const dueDateValue = getString(formData, "dueDate");
  const assignedChildUserId = getString(formData, "assignedChildUserId");
  const checklistItems = formData
    .getAll("checklist")
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

  if (!title || !description) {
    redirect("/dashboard/jobs/new");
  }

  let claimedById: string | undefined;
  if (assignedChildUserId && assignedChildUserId !== "open") {
    const childMember = await prisma.familyMember.findFirst({
      where: {
        familyId: family.id,
        role: Role.CHILD,
        approved: true,
        userId: assignedChildUserId,
      },
      select: { userId: true },
    });
    claimedById = childMember?.userId;
  }

  await prisma.job.create({
    data: {
      family: { connect: { id: family.id } },
      postedBy: { connect: { id: parent.id } },
      ...(claimedById ? { claimedBy: { connect: { id: claimedById } }, status: JobStatus.CLAIMED } : { status: JobStatus.OPEN }),
      title,
      description,
      category: JOB_CATEGORIES.has(category) ? category : "HOUSEHOLD",
      difficulty,
      virtues: VIRTUES.filter((virtue) => formData.has(`virtue:${virtue}`)),
      rewardType: RewardType.TOKENS,
      tokenReward,
      dueDate: dueDateValue ? new Date(`${dueDateValue}T00:00:00.000Z`) : undefined,
      proofRequirement,
      isRecurring: formData.get("isRecurring") === "on",
      checklist: checklistItems.length
        ? {
            create: checklistItems.map((text, order) => ({ text, order, required: true })),
          }
        : undefined,
    },
  });

  redirect("/dashboard/jobs");
}

export { getParentJobFormOptions };
