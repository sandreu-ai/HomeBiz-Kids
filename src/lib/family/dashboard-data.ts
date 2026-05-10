import "server-only";

import { InvoiceStatus, JobStatus, ProposalStatus, Role } from "@prisma/client";
import { DEMO_CHILD_PROFILES, DEMO_INVOICES, DEMO_JOBS, DEMO_PITCHES } from "@/lib/demo-data";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";

export type ParentDashboardSummary = {
  mode: "demo" | "live";
  familyId: string | null;
  familyName: string | null;
  openJobs: number;
  inProgressJobs: number;
  pendingProposals: number;
  pendingInvoices: number;
  totalTokens: number;
  childCount: number;
};

function getDemoDashboardSummary(): ParentDashboardSummary {
  return {
    mode: "demo",
    familyId: null,
    familyName: null,
    openJobs: DEMO_JOBS.filter((job) => job.status === "OPEN").length,
    inProgressJobs: DEMO_JOBS.filter((job) => job.status === "IN_PROGRESS" || job.status === "CLAIMED").length,
    pendingProposals: DEMO_PITCHES.filter((pitch) => pitch.status === "PENDING").length,
    pendingInvoices: DEMO_INVOICES.filter((invoice) => invoice.status === "SUBMITTED").length,
    totalTokens: Object.values(DEMO_CHILD_PROFILES).reduce(
      (sum, child) => sum + child.tokenBalance,
      0,
    ),
    childCount: Object.keys(DEMO_CHILD_PROFILES).length,
  };
}

export async function getParentDashboardSummary(): Promise<ParentDashboardSummary> {
  const session = await getParentFamilySessionStatus();

  if (session.status !== "ready") {
    return getDemoDashboardSummary();
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

  if (!family) {
    return {
      mode: "live",
      familyId: null,
      familyName: null,
      openJobs: 0,
      inProgressJobs: 0,
      pendingProposals: 0,
      pendingInvoices: 0,
      totalTokens: 0,
      childCount: 0,
    };
  }

  const familyId = family.id;
  const [openJobs, inProgressJobs, pendingProposals, pendingInvoices, tokenAggregate, childCount] =
    await Promise.all([
      prisma.job.count({ where: { familyId, status: JobStatus.OPEN } }),
      prisma.job.count({
        where: {
          familyId,
          status: { in: [JobStatus.IN_PROGRESS, JobStatus.CLAIMED] },
        },
      }),
      prisma.jobPitch.count({
        where: {
          status: ProposalStatus.PENDING,
          proposedBy: {
            familyMembers: {
              some: { familyId, role: Role.CHILD, approved: true },
            },
          },
        },
      }),
      prisma.invoice.count({
        where: {
          status: InvoiceStatus.SUBMITTED,
          job: { familyId },
        },
      }),
      prisma.childProfile.aggregate({
        where: {
          user: {
            familyMembers: {
              some: { familyId, role: Role.CHILD, approved: true },
            },
          },
        },
        _sum: { tokenBalance: true },
      }),
      prisma.familyMember.count({
        where: { familyId, role: Role.CHILD, approved: true },
      }),
    ]);

  return {
    mode: "live",
    familyId,
    familyName: family.name,
    openJobs,
    inProgressJobs,
    pendingProposals,
    pendingInvoices,
    totalTokens: tokenAggregate._sum.tokenBalance ?? 0,
    childCount,
  };
}
