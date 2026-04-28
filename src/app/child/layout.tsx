import { ChildNav } from "@/components/layout/ChildNav";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return <ChildNav>{children}</ChildNav>;
}
