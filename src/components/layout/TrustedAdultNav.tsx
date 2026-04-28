"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/DemoSessionProvider";
import { getInitials } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/ui/logo";

const NAV_ITEMS = [
  { href: "/trusted", label: "Overview", icon: Home, exact: true },
  { href: "/trusted/jobs", label: "Jobs", icon: Briefcase },
  { href: "/trusted/jobs/new", label: "Post a Job", icon: PlusCircle },
  { href: "/trusted/proposals", label: "Proposals", icon: FileText },
];

export function TrustedAdultNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useSession();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen bg-bone">
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-line min-h-screen">
        <div className="p-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5 mb-3">
            <Logo size={32} />
            <Wordmark className="text-base" />
          </Link>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: session.user.avatarColor ?? "#A8B5A2" }}
            >
              {getInitials(session.user.name)}
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">{session.user.name}</p>
              <p className="text-xs text-blue-deep">Trusted Adult</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-blue-tint text-blue-deep"
                    : "text-ink-3 hover:bg-bone hover:text-ink"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line">
          <div className="rounded-xl bg-blue-tint p-3">
            <p className="text-xs font-medium text-blue-deep">Trusted Adult</p>
            <p className="text-xs text-ink-3 mt-0.5">
              Jobs you post need parent approval before kids see them.
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border-b border-line">
          <Logo size={26} />
          <Wordmark className="text-sm" />
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
