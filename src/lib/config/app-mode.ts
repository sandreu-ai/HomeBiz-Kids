const hasValue = (value: string | undefined) => Boolean(value && value.trim().length > 0);

const isPlaceholderDatabaseUrl = (value: string | undefined) => {
  const databaseUrl = value?.trim();

  return (
    !databaseUrl ||
    databaseUrl.includes("USER:PASSWORD@HOST") ||
    databaseUrl.includes("user:password@localhost") ||
    databaseUrl.includes("***@HOST")
  );
};

export function isClerkConfigured() {
  return (
    hasValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    hasValue(process.env.CLERK_SECRET_KEY)
  );
}

export function isDatabaseConfigured() {
  return !isPlaceholderDatabaseUrl(process.env.DATABASE_URL);
}

export function getMissingProductionServiceKeys() {
  const missing: string[] = [];

  if (!hasValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)) {
    missing.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  if (!hasValue(process.env.CLERK_SECRET_KEY)) {
    missing.push("CLERK_SECRET_KEY");
  }

  if (!isDatabaseConfigured()) {
    missing.push("DATABASE_URL");
  }

  return missing;
}

export function areProductionServicesConfigured() {
  return isClerkConfigured() && isDatabaseConfigured();
}
