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
import { Logo, Wordmark } from "@/components/ui/logo";
import { Coin } from "@/components/ui/coin";
import { LittleIllustratedKid } from "@/components/child/AvatarPicker";
import { getKidAvatarOption } from "@/lib/child-portal/avatar-options";

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
  const selectedAvatar = getKidAvatarOption(session.childProfile?.id === "child-mateo" ? "avatar-boy-green-curls" : "avatar-boy-blue-wave");

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="kid-portal-shell flex min-h-screen overflow-hidden bg-yellow-tint/40 bg-[radial-gradient(circle_at_20%_10%,rgba(251,188,4,.25),transparent_22rem),radial-gradient(circle_at_90%_20%,rgba(66,133,244,.18),transparent_20rem),radial-gradient(circle_at_60%_95%,rgba(52,168,83,.14),transparent_22rem)]">
      {/* Desktop left sidebar */}
      <aside className="hidden lg:flex min-h-screen w-64 flex-col border-r-4 border-ink bg-white/90 shadow-pop">
        {/* Logo + child info */}
        <div className="p-6 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Logo size={32} />
            <Wordmark className="text-base" />
          </Link>
          {session.childProfile && (
            <div className="relative overflow-hidden rounded-3xl border-3 border-ink bg-yellow-tint p-3 shadow-card">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-deep">
                My tiny business HQ
              </p>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/70 p-1">
                  <LittleIllustratedKid avatar={selectedAvatar} size="sm" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-ink truncate">{session.user.name}</p>
                  <p className="text-xs text-yellow-ink font-black">
                    {session.childProfile.tokenBalance} tokens
                  </p>
                </div>
              </div>
              <span className="sticker-style absolute right-2 top-2 rotate-6 rounded-full border-2 border-ink bg-green px-2 py-0.5 text-[10px] font-black text-white">
                + ideas
              </span>
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
                    ? "border-2 border-ink bg-blue-deep text-white shadow-cta"
                    : "border-2 border-transparent text-ink-3 hover:border-ink hover:bg-yellow-tint hover:text-ink"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line">
          <p className="text-xs font-black text-ink-3 text-center">Tiny businesses do real work. 💚</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between border-b-4 border-ink bg-white/90 px-4 py-3 shadow-soft">
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
