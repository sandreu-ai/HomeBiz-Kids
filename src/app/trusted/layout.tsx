import { TrustedAdultNav } from "@/components/layout/TrustedAdultNav";

export default function TrustedLayout({ children }: { children: React.ReactNode }) {
  return <TrustedAdultNav>{children}</TrustedAdultNav>;
}
