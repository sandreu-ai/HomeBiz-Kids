import { ParentSidebar } from "@/components/layout/ParentSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ParentSidebar>{children}</ParentSidebar>;
}
