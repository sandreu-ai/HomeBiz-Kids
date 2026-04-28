import type { User } from "@/types";
import { getInitials } from "@/lib/utils";
import { Shield, Mail } from "lucide-react";

interface TrustedAdultCardProps {
  user: User;
  relationship?: string;
  permissions?: string[];
}

export function TrustedAdultCard({
  user,
  relationship,
  permissions = ["Can propose jobs"],
}: TrustedAdultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-line shadow-card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white"
          style={{ backgroundColor: user.avatarColor ?? "#A8B5A2" }}
        >
          {getInitials(user.name)}
        </div>
        <div>
          <h3 className="font-bold text-ink">{user.name}</h3>
          <p className="text-xs text-blue-deep font-medium">
            {relationship ?? "Trusted Adult"}
          </p>
        </div>
        <div className="ml-auto">
          <Shield className="w-4 h-4 text-blue-deep" />
        </div>
      </div>

      {user.email && (
        <p className="text-xs text-ink-3 flex items-center gap-1.5 mb-3">
          <Mail className="w-3 h-3" />
          {user.email}
        </p>
      )}

      <div className="space-y-1.5">
        {permissions.map((p) => (
          <div key={p} className="text-xs text-ink flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-deep" />
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
