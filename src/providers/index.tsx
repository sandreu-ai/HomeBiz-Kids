"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { DemoSessionProvider } from "./DemoSessionProvider";

const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function Providers({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured) {
    return <DemoSessionProvider>{children}</DemoSessionProvider>;
  }

  return (
    <ClerkProvider>
      <DemoSessionProvider>{children}</DemoSessionProvider>
    </ClerkProvider>
  );
}
