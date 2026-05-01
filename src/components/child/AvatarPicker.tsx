"use client";

import { useMemo, useState } from "react";
import {
  AVATAR_BUILDER_PARTS,
  DEFAULT_AVATAR_BUILDER_SELECTION,
  KID_AVATAR_OPTIONS,
  buildKidAvatarOption,
  type AvatarBuilderSelection,
  type KidAvatarAccessory,
  type KidAvatarOption,
} from "@/lib/child-portal/avatar-options";
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

function HairShape({ avatar, isGirl }: { avatar: KidAvatarOption; isGirl: boolean }) {
  const hairStyle = avatar.hairStyle ?? (isGirl ? "bob" : "wave");

  if (hairStyle === "hijab") {
    return (
      <div
        className="absolute bottom-[39%] h-[57%] w-[72%] rounded-t-full rounded-b-[46%] border-3 border-ink"
        style={{ backgroundColor: avatar.hair }}
      />
    );
  }

  if (hairStyle === "curls") {
    return (
      <>
        <div className="absolute bottom-[75%] left-[18%] h-[20%] w-[20%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[81%] left-[34%] h-[22%] w-[22%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[78%] right-[20%] h-[21%] w-[21%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[69%] h-[22%] w-[60%] rounded-t-full rounded-b-[40%] border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
      </>
    );
  }

  if (hairStyle === "puffs") {
    return (
      <>
        <div className="absolute bottom-[66%] left-[6%] h-[30%] w-[30%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[66%] right-[6%] h-[30%] w-[30%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[71%] h-[22%] w-[58%] rounded-t-full rounded-b-[40%] border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
      </>
    );
  }

  if (hairStyle === "braids") {
    return (
      <>
        <div className="absolute bottom-[70%] h-[24%] w-[66%] rounded-t-full rounded-b-[45%] border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[43%] left-[11%] h-[41%] w-[15%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
        <div className="absolute bottom-[43%] right-[11%] h-[41%] w-[15%] rounded-full border-3 border-ink" style={{ backgroundColor: avatar.hair }} />
      </>
    );
  }

  if (hairStyle === "side-sweep") {
    return (
      <div
        className="absolute bottom-[70%] h-[22%] w-[66%] -rotate-6 rounded-t-full rounded-bl-[60%] rounded-br-[25%] border-3 border-ink"
        style={{ backgroundColor: avatar.hair }}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute bottom-[70%] border-3 border-ink",
        isGirl ? "h-[24%] w-[66%] rounded-t-full rounded-b-[45%]" : "h-[18%] w-[58%] rounded-t-full rounded-b-[40%]"
      )}
      style={{ backgroundColor: avatar.hair }}
    />
  );
}

export function LittleIllustratedKid({ avatar, size = "md", className }: LittleIllustratedKidProps) {
  const isGirl = avatar.gender === "girl";
  const hasGlasses = avatar.accessory === "glasses";
  const hasHeadband = avatar.accessory === "headband";
  const hasStarPin = avatar.accessory === "star-pin";

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
      <HairShape avatar={avatar} isGirl={isGirl} />
      {hasHeadband && (
        <div className="absolute bottom-[79%] h-[8%] w-[62%] -rotate-3 rounded-full border-3 border-ink" style={{ backgroundColor: avatar.accent }} />
      )}
      {avatar.hairStyle === "cap" && (
        <div className="absolute bottom-[80%] right-[10%] h-[12%] w-[48%] -rotate-6 rounded-full border-3 border-ink" style={{ backgroundColor: avatar.accent }} />
      )}
      <div className="absolute bottom-[59%] left-[34%] h-1.5 w-1.5 rounded-full bg-ink" />
      <div className="absolute bottom-[59%] right-[34%] h-1.5 w-1.5 rounded-full bg-ink" />
      {hasGlasses && (
        <>
          <div className="absolute bottom-[55%] left-[27%] h-[14%] w-[20%] rounded-full border-2 border-ink bg-white/20" />
          <div className="absolute bottom-[55%] right-[27%] h-[14%] w-[20%] rounded-full border-2 border-ink bg-white/20" />
          <div className="absolute bottom-[60%] h-0.5 w-[10%] rounded-full bg-ink" />
        </>
      )}
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
      {hasStarPin && (
        <div className="absolute -right-1 top-1 rounded-full border-2 border-ink bg-yellow px-1.5 py-0.5 text-[10px] font-black text-yellow-ink rotate-6">
          ✦
        </div>
      )}
    </div>
  );
}

function PartButton({
  label,
  selected,
  onClick,
  swatch,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 bg-white px-3 py-2 text-xs font-black text-ink transition hover:-translate-y-0.5 hover:shadow-soft",
        selected ? "border-blue-deep ring-2 ring-blue-soft" : "border-line"
      )}
    >
      {swatch && <span className="h-4 w-4 rounded-full border border-ink/20" style={{ backgroundColor: swatch }} />}
      {label}
    </button>
  );
}

export function AvatarPicker({ selectedId = KID_AVATAR_OPTIONS[0].id }: { selectedId?: string }) {
  const [selection, setSelection] = useState<AvatarBuilderSelection>(DEFAULT_AVATAR_BUILDER_SELECTION);
  const customAvatar = useMemo(() => buildKidAvatarOption(selection), [selection]);

  const updateSelection = <K extends keyof AvatarBuilderSelection>(key: K, value: AvatarBuilderSelection[K]) => {
    setSelection((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="rounded-3xl border-2 border-dashed border-blue-soft bg-white/80 p-4 shadow-card">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-deep">Playful avatar</p>
          <h2 className="text-lg font-black text-ink">Choose your character</h2>
          <p className="mt-1 text-xs font-medium text-ink-3">Start from a polished preset or build your own helper avatar.</p>
        </div>
        <span className="sticker-style w-fit rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-black text-yellow-ink shadow-soft -rotate-2">
          your HQ
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-ink-3">Preset avatars</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
            {KID_AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                className={cn(
                  "relative rounded-2xl border-2 bg-bone p-2 transition hover:-translate-y-0.5 hover:shadow-card",
                  avatar.id === selectedId ? "border-blue-deep ring-2 ring-blue-soft" : "border-line"
                )}
                aria-pressed={avatar.id === selectedId}
              >
                  {avatar.id === selectedId && (
                    <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-yellow text-[10px] font-black text-yellow-ink">
                      ✓
                    </span>
                  )}
                  <LittleIllustratedKid avatar={avatar} size="sm" />
                  <span className="mt-1 block text-[10px] font-bold text-ink-3">Starter</span>
                </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border-2 border-ink bg-bone p-4 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="rounded-[1.5rem] border-2 border-ink bg-white p-3 shadow-card">
              <LittleIllustratedKid avatar={customAvatar} size="lg" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-deep">Build your avatar</p>
              <h3 className="text-xl font-black text-ink">Make a character that feels like you</h3>
              <p className="mt-1 text-xs text-ink-3">Constrained choices keep it polished, private, and kid-safe.</p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-xs font-black text-ink">Choose skin tone</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_BUILDER_PARTS.skinTones.map((tone) => (
                  <PartButton
                    key={tone.id}
                    label={tone.label}
                    swatch={tone.value}
                    selected={selection.skinToneId === tone.id}
                    onClick={() => updateSelection("skinToneId", tone.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-black text-ink">Choose hair style</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_BUILDER_PARTS.hairStyles.map((style) => (
                  <PartButton
                    key={style.id}
                    label={style.label}
                    selected={selection.hairStyleId === style.id}
                    onClick={() => updateSelection("hairStyleId", style.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-black text-ink">Choose hair color</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_BUILDER_PARTS.hairColors.map((color) => (
                  <PartButton
                    key={color.id}
                    label={color.label}
                    swatch={color.value}
                    selected={selection.hairColorId === color.id}
                    onClick={() => updateSelection("hairColorId", color.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-black text-ink">Choose shirt color</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_BUILDER_PARTS.shirtColors.map((color) => (
                  <PartButton
                    key={color.id}
                    label={color.label}
                    swatch={color.value}
                    selected={selection.shirtColorId === color.id}
                    onClick={() => updateSelection("shirtColorId", color.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-black text-ink">Choose accessory</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_BUILDER_PARTS.accessories.map((accessory) => (
                  <PartButton
                    key={accessory.id}
                    label={accessory.label}
                    selected={selection.accessoryId === accessory.id}
                    onClick={() => updateSelection("accessoryId", accessory.id as KidAvatarAccessory)}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl border-2 border-ink bg-yellow px-4 py-3 text-sm font-black text-yellow-ink shadow-cta-yellow transition hover:-translate-y-0.5"
            >
              Use this character
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
