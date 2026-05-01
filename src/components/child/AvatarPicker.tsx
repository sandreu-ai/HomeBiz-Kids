import { KID_AVATAR_OPTIONS, type KidAvatarOption } from "@/lib/child-portal/avatar-options";
import { cn } from "@/lib/utils";

type LittleIllustratedKidProps = {
  avatar: KidAvatarOption;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClass = {
  sm: "w-12 h-14",
  md: "w-16 h-20",
  lg: "w-24 h-28",
  xl: "w-32 h-40",
};

export function LittleIllustratedKid({ avatar, size = "md", className }: LittleIllustratedKidProps) {
  const isGirl = avatar.gender === "girl";

  return (
    <div
      className={cn("relative inline-flex items-end justify-center", sizeClass[size], className)}
      aria-label={`${avatar.name} character avatar`}
      title={avatar.name}
    >
      <div
        className="absolute bottom-0 h-[58%] w-[70%] rounded-t-[40%] rounded-b-2xl border-3 border-ink shadow-soft"
        style={{ backgroundColor: avatar.shirt }}
      />
      <div
        className="absolute bottom-[43%] h-[42%] w-[58%] rounded-full border-3 border-ink"
        style={{ backgroundColor: avatar.skin }}
      />
      <div
        className={cn(
          "absolute bottom-[70%] border-3 border-ink",
          isGirl
            ? "h-[24%] w-[66%] rounded-t-full rounded-b-[45%]"
            : "h-[18%] w-[58%] rounded-t-full rounded-b-[40%]"
        )}
        style={{ backgroundColor: avatar.hair }}
      />
      {isGirl && (
        <>
          <div className="absolute bottom-[54%] left-[12%] h-[30%] w-[18%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
          <div className="absolute bottom-[54%] right-[12%] h-[30%] w-[18%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        </>
      )}
      {!isGirl && avatar.id.includes("cap") && (
        <div className="absolute bottom-[80%] right-[10%] h-[12%] w-[48%] -rotate-6 rounded-full border-3 border-ink" style={{ backgroundColor: avatar.accent }} />
      )}
      <div className="absolute bottom-[59%] left-[34%] h-1.5 w-1.5 rounded-full bg-ink" />
      <div className="absolute bottom-[59%] right-[34%] h-1.5 w-1.5 rounded-full bg-ink" />
      <div className="absolute bottom-[52%] h-2 w-5 rounded-b-full border-b-3 border-ink" />
      <div
        className="absolute bottom-[24%] -right-[2%] h-[28%] w-[13%] origin-bottom-left -rotate-45 rounded-full border-3 border-ink"
        style={{ backgroundColor: avatar.skin }}
      />
      <div
        className="absolute bottom-[8%] left-[24%] h-[18%] w-[15%] rounded-full border-3 border-ink"
        style={{ backgroundColor: "#1F1F1F" }}
      />
      <div
        className="absolute bottom-[8%] right-[24%] h-[18%] w-[15%] rounded-full border-3 border-ink"
        style={{ backgroundColor: "#1F1F1F" }}
      />
      <div className="absolute -right-1 top-1 rounded-full border-2 border-ink bg-yellow px-1.5 py-0.5 text-[10px] font-black text-yellow-ink rotate-6">
        ✦
      </div>
    </div>
  );
}

export function AvatarPicker({ selectedId = KID_AVATAR_OPTIONS[0].id }: { selectedId?: string }) {
  return (
    <section className="rounded-3xl border-2 border-dashed border-blue-soft bg-white/80 p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-deep">Playful avatar</p>
          <h2 className="text-lg font-black text-ink">Choose your character</h2>
        </div>
        <span className="sticker-style rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-black text-yellow-ink shadow-soft -rotate-2">
          your HQ
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {KID_AVATAR_OPTIONS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            className={cn(
              "rounded-2xl border-2 bg-bone p-2 transition hover:-translate-y-0.5 hover:shadow-card",
              avatar.id === selectedId ? "border-blue-deep ring-2 ring-blue-soft" : "border-line"
            )}
            aria-pressed={avatar.id === selectedId}
          >
            <LittleIllustratedKid avatar={avatar} size="sm" />
            <span className="mt-1 block text-[10px] font-bold text-ink-3">{avatar.gender}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
