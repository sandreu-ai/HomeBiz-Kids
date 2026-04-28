"use client";

import { useState } from "react";
import { useSession } from "@/providers/DemoSessionProvider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DEMO_USERS = [
  { key: "santiago", name: "Santiago", role: "Parent", color: "#3F6B4F", href: "/dashboard" },
  { key: "daniel", name: "Daniel", role: "Child (12)", color: "#6E9BCB", href: "/child" },
  { key: "mateo", name: "Mateo", role: "Child (9)", color: "#D9A441", href: "/child" },
  { key: "joe", name: "Grandpa Joe", role: "Trusted Adult", color: "#A8B5A2", href: "/trusted" },
];

export function DemoUserSwitcher() {
  const [open, setOpen] = useState(false);
  const { currentKey, switchUser } = useSession();
  const router = useRouter();

  function handleSwitch(key: string, href: string) {
    switchUser(key);
    setOpen(false);
    router.push(href);
  }

  return (
    <div
      className="fixed right-6 z-50 flex flex-col items-end gap-2"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
    >
      {open && (
        <div className="bg-white rounded-2xl shadow-card-hover border border-line p-2 min-w-[180px] animate-fade-up">
          <p className="text-[10px] font-semibold text-ink-3 px-2 py-1 uppercase tracking-wider">
            Switch Demo User
          </p>
          {DEMO_USERS.map((u) => (
            <button
              key={u.key}
              onClick={() => handleSwitch(u.key, u.href)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left transition-colors hover:bg-bone",
                currentKey === u.key && "bg-bone"
              )}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: u.color }}
              >
                {u.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink leading-tight">{u.name}</p>
                <p className="text-[10px] text-ink-3">{u.role}</p>
              </div>
              {currentKey === u.key && (
                <span className="ml-auto text-blue-deep text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-ink text-white text-xs font-semibold px-3 py-2 rounded-full shadow-card-hover hover:bg-ink/90 transition-colors"
      >
        <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
          👤
        </span>
        Demo: {DEMO_USERS.find((u) => u.key === currentKey)?.name ?? "Switch user"}
      </button>
    </div>
  );
}
