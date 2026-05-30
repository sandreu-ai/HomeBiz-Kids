"use server";

import { InvoiceStatus, TransactionType, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db";
import { getParentFamilySessionStatus } from "@/lib/family/parent-family-session";

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(getString(formData, key, String(fallback)), 10);
  return Number.isFinite(value) ? value : fallback;
}

async function getParentScopedInvoice(invoiceId: string) {
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

  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, job: { familyId: family.id } },
    include: {
      job: true,
      submittedBy: { include: { childProfile: true } },
    },
  });

  if (!invoice) {
    redirect("/dashboard/invoices");
  }

  return { prisma, parent, family, invoice };
}

export async function approveParentInvoice(formData: FormData) {
  const invoiceId = getString(formData, "invoiceId");
  const praiseText = getString(formData, "praise");
  const bonusTokens = Math.max(0, getInt(formData, "bonusTokens", 0));
  const bonusReason = getString(formData, "bonusReason");
  const feedbackNote = getString(formData, "feedbackNote") || praiseText || undefined;

  if (!invoiceId) {
    redirect("/dashboard/invoices");
  }

  const { prisma, parent, invoice } = await getParentScopedInvoice(invoiceId);
  const totalTokens = invoice.job.tokenReward + bonusTokens;

  await prisma.$transaction(async (tx) => {
    await tx.invoice.update({
      where: { id: invoice.id },
      data: {
        status: InvoiceStatus.APPROVED,
        reviewedAt: new Date(),
        bonusTokens,
        feedback: {
          upsert: {
            create: {
              authorId: parent.id,
              rating: bonusTokens > 0 ? "above_beyond" : "great",
              note: feedbackNote,
              bonusTokens,
            },
            update: {
              authorId: parent.id,
              rating: bonusTokens > 0 ? "above_beyond" : "great",
              note: feedbackNote,
              bonusTokens,
            },
          },
        },
        ...(bonusTokens > 0
          ? {
              bonus: {
                upsert: {
                  create: { amount: bonusTokens, reason: bonusReason || "Bonus", parentNote: feedbackNote },
                  update: { amount: bonusTokens, reason: bonusReason || "Bonus", parentNote: feedbackNote },
                },
              },
            }
          : {}),
        ...(praiseText
          ? {
              praiseNote: {
                upsert: {
                  create: { text: praiseText, authorId: parent.id, authorName: parent.name },
                  update: { text: praiseText, authorId: parent.id, authorName: parent.name },
                },
              },
            }
          : {}),
      },
    });

    if (invoice.submittedBy.childProfile) {
      await tx.childProfile.update({
        where: { id: invoice.submittedBy.childProfile.id },
        data: {
          tokenBalance: { increment: totalTokens },
          lifetimeTokens: { increment: totalTokens },
          completedJobs: { increment: 1 },
          transactions: {
            create: {
              type: TransactionType.EARNED,
              tokens: totalTokens,
              description: `Approved invoice: ${invoice.job.title}`,
              jobId: invoice.jobId,
              invoiceId: invoice.id,
            },
          },
        },
      });
    }
  });

  revalidatePath("/dashboard/invoices");
  revalidatePath(`/dashboard/invoices/${invoice.id}`);
  redirect(`/dashboard/invoices/${invoice.id}`);
}

export async function requestParentInvoiceRevision(formData: FormData) {
  const invoiceId = getString(formData, "invoiceId");
  const note = getString(formData, "revisionNote");

  if (!invoiceId || !note) {
    redirect(invoiceId ? `/dashboard/invoices/${invoiceId}` : "/dashboard/invoices");
  }

  const { prisma, parent, invoice } = await getParentScopedInvoice(invoiceId);

  await prisma.invoice.update({
    where: { id: invoice.id },
    data: {
      status: InvoiceStatus.REVISION_REQUESTED,
      revisionRequestedAt: new Date(),
      revisionRequest: {
        upsert: {
          create: { authorId: parent.id, authorName: parent.name, note, itemsNeedingAttention: [] },
          update: { authorId: parent.id, authorName: parent.name, note, itemsNeedingAttention: [] },
        },
      },
    },
  });

  revalidatePath("/dashboard/invoices");
  revalidatePath(`/dashboard/invoices/${invoice.id}`);
  redirect(`/dashboard/invoices/${invoice.id}`);
}

export async function rejectParentInvoice(formData: FormData) {
  const invoiceId = getString(formData, "invoiceId");

  if (!invoiceId) {
    redirect("/dashboard/invoices");
  }

  const { prisma, invoice } = await getParentScopedInvoice(invoiceId);
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { status: InvoiceStatus.REJECTED, reviewedAt: new Date() },
  });

  revalidatePath("/dashboard/invoices");
  revalidatePath(`/dashboard/invoices/${invoice.id}`);
  redirect(`/dashboard/invoices/${invoice.id}`);
}
