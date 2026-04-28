import Link from "next/link";
import type { ChildProfile } from "@/types";
import { getInitials } from "@/lib/utils";
import { VirtueBadge } from "@/components/job/VirtueBadge";
import { Progress } from "@/components/ui/progress";
import { Coins, Flame, Trophy } from "lucide-react";

interface ChildProfileCardProps {
  profile: ChildProfile;
  href?: string;
}

export function ChildProfileCard({ profile, href }: ChildProfileCardProps) {
  const content = (
    <div className="bg-white rounded-2xl border border-line shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all p-6">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-sm"
          style={{ backgroundColor: profile.user.avatarColor ?? "#6E9BCB" }}
        >
          {getInitials(profile.user.name)}
        </div>
        <div>
          <h3 className="font-bold text-ink text-lg leading-tight">{profile.user.name}</h3>
          <p className="text-sm text-ink-3">Age {profile.age} · Level {profile.level}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-xs font-bold text-orange-600">{profile.streak}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 bg-yellow-tint rounded-xl">
          <p className="text-base font-bold text-yellow-ink">{profile.tokenBalance}</p>
          <p className="text-[11px] text-ink-3 mt-0.5">Tokens</p>
        </div>
        <div className="text-center p-3 bg-blue-tint rounded-xl">
          <p className="text-base font-bold text-blue-deep">{profile.completedJobsCount}</p>
          <p className="text-[11px] text-ink-3 mt-0.5">Jobs Done</p>
        </div>
        <div className="text-center p-3 bg-red-tint rounded-xl">
          <p className="text-base font-bold text-red-deep">{profile.streak}</p>
          <p className="text-[11px] text-ink-3 mt-0.5">Day Streak</p>
        </div>
      </div>

      {/* Level progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-ink-3">Level {profile.level} progress</span>
          <span className="text-xs font-medium text-blue-deep">{profile.lifetimeTokens} lifetime tokens</span>
        </div>
        <Progress value={((profile.lifetimeTokens % 200) / 200) * 100} />
      </div>

      {/* Virtues */}
      {profile.virtues.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {profile.virtues.map((v) => (
            <VirtueBadge key={v} virtue={v} />
          ))}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}
