"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  PlusCircle,
  Wallet,
  Gift,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/DemoSessionProvider";
import { getInitials } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/ui/logo";
import { Coin } from "@/components/ui/coin";

const NAV_ITEMS = [
  { href: "/child", label: "Home", icon: Home, exact: true },
  { href: "/child/jobs", label: "Jobs", icon: Briefcase },
  { href: "/child/propose", label: "Propose", icon: PlusCircle },
  { href: "/child/wallet", label: "Wallet", icon: Wallet },
  { href: "/child/rewards", label: "Rewards", icon: Gift },
  { href: "/child/work-history", label: "My Work", icon: Trophy },
];

export function ChildNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useSession();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen bg-bone">
      {/* Desktop left sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-line min-h-screen">
        {/* Logo + child info */}
        <div className="p-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Logo size={32} />
            <Wordmark className="text-base" />
          </Link>
          {session.childProfile && (
            <div className="flex items-center gap-3 bg-bone rounded-xl p-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: session.user.avatarColor ?? "#6E9BCB" }}
              >
                {getInitials(session.user.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{session.user.name}</p>
                <p className="text-xs text-yellow-deep font-medium">
                  {session.childProfile.tokenBalance} tokens
                </p>
              </div>
            </div>
          )}
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

        <div className="p-4 border-t border-line">
          <p className="text-xs text-ink-3 text-center">Your work matters. 💚</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-line">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={26} />
            <Wordmark className="text-sm" />
          </Link>
          {session.childProfile && (
            <div className="flex items-center gap-1.5 bg-yellow-tint rounded-full px-3 py-1">
              <Coin size="md" />
              <span className="text-xs font-bold text-yellow-ink">
                {session.childProfile.tokenBalance}
              </span>
            </div>
          )}
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-28 lg:pb-8">{children}</main>

        {/* Mobile bottom tab bar */}
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line flex items-center justify-around px-2 pt-2 z-30"
          style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all",
                  active ? "text-blue-deep" : "text-ink-3"
                )}
              >
                <item.icon className={cn("w-5 h-5", active && "stroke-[2.5]")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
