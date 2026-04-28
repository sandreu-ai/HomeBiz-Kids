"use client";

import { DemoSessionProvider } from "./DemoSessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DemoSessionProvider>{children}</DemoSessionProvider>;
}
