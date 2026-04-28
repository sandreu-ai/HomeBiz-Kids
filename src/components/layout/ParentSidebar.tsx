"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Receipt,
  Users,
  Gift,
  Heart,
  BarChart3,
  Award,
  BookOpen,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/DemoSessionProvider";
import { getInitials } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/ui/logo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/children", label: "Children", icon: Users },
  { href: "/dashboard/rewards", label: "Rewards", icon: Gift },
  { href: "/dashboard/family", label: "Family", icon: Heart },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/badges", label: "Badges", icon: Award },
  { href: "/dashboard/homeschool-portfolio", label: "Portfolio", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function ParentSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  const sidebar = (
    <aside className="w-64 bg-white border-r border-line flex flex-col min-h-screen shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-line">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={32} />
          <Wordmark className="text-base" />
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: session.user.avatarColor ?? "#3F6B4F" }}
          >
            {getInitials(session.user.name)}
          </div>
          <div>
            <p className="text-xs font-semibold text-ink leading-tight">{session.user.name}</p>
            <p className="text-xs text-ink-3">{session.family.name}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-deep text-white shadow-sm"
                  : "text-ink-3 hover:bg-bone hover:text-ink"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom hint */}
      <div className="p-4 border-t border-line">
        <div className="rounded-xl bg-bone p-3">
          <p className="text-xs font-medium text-ink mb-0.5">Less reminding.</p>
          <p className="text-xs text-ink-3">More work getting done. ✨</p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-bone">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">{sidebar}</div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-line">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-bone"
          >
            <Menu className="w-5 h-5 text-ink" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Logo size={26} />
            <Wordmark className="text-sm" />
          </Link>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
