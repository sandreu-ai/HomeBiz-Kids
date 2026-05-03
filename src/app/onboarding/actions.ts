"use server";

import { redirect } from "next/navigation";
import {
  createFirstChildProfile,
  ensureParentFamilyForClerkUser,
  getCurrentClerkParentProfile,
  getParentFamilySessionStatus,
} from "@/lib/family/parent-family-session";

const getRequiredText = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
};

const getRequiredAge = (formData: FormData) => {
  const value = getRequiredText(formData, "childAge");
  const age = Number.parseInt(value, 10);

  if (!Number.isInteger(age) || age < 3 || age > 18) {
    throw new Error("Child age must be between 3 and 18.");
  }

  return age;
};

export async function completeFirstFamilyOnboarding(formData: FormData) {
  const status = await getParentFamilySessionStatus();

  if (status.status !== "ready") {
    redirect("/onboarding");
  }

  const parentProfile = await getCurrentClerkParentProfile();

  if (!parentProfile.clerkUserId) {
    redirect("/sign-in");
  }

  const familyName = getRequiredText(formData, "familyName");
  const childName = getRequiredText(formData, "childName");
  const childAge = getRequiredAge(formData);

  const { family } = await ensureParentFamilyForClerkUser({
    clerkUserId: parentProfile.clerkUserId,
    email: parentProfile.email,
    name: parentProfile.name,
    familyName,
  });

  await createFirstChildProfile({
    familyId: family.id,
    name: childName,
    age: childAge,
  });

  redirect("/dashboard/children");
}
