export type KidAvatarGender = "boy" | "girl";
export type KidHairStyle = "wave" | "curls" | "cap" | "braids" | "puffs" | "bob" | "short" | "side-sweep" | "hijab";
export type KidAvatarAccessory = "none" | "glasses" | "headband" | "star-pin";

export interface KidAvatarOption {
  id: string;
  name: string;
  gender: KidAvatarGender;
  hair: string;
  skin: string;
  shirt: string;
  accent: string;
  expression: string;
  hairStyle?: KidHairStyle;
  accessory?: KidAvatarAccessory;
}

export type AvatarBuilderSelection = {
  skinToneId: string;
  hairStyleId: KidHairStyle;
  hairColorId: string;
  shirtColorId: string;
  accessoryId: KidAvatarAccessory;
};

export const AVATAR_BUILDER_PARTS = {
  skinTones: [
    { id: "peach", label: "Peach", value: "#F2B996" },
    { id: "tan", label: "Tan", value: "#D9A066" },
    { id: "brown", label: "Brown", value: "#8D5524" },
    { id: "deep", label: "Deep", value: "#6D3F24" },
  ],
  hairStyles: [
    { id: "wave" as KidHairStyle, label: "Wave" },
    { id: "curls" as KidHairStyle, label: "Curls" },
    { id: "braids" as KidHairStyle, label: "Braids" },
    { id: "puffs" as KidHairStyle, label: "Puffs" },
    { id: "bob" as KidHairStyle, label: "Bob" },
    { id: "side-sweep" as KidHairStyle, label: "Side sweep" },
    { id: "hijab" as KidHairStyle, label: "Hijab" },
  ],
  hairColors: [
    { id: "black", label: "Black", value: "#171717" },
    { id: "brown", label: "Brown", value: "#4A2B16" },
    { id: "auburn", label: "Auburn", value: "#8D3A35" },
    { id: "blond", label: "Blond", value: "#D7A34A" },
    { id: "purple", label: "Purple", value: "#A53B6B" },
  ],
  shirtColors: [
    { id: "blue", label: "Blue", value: "#4285F4", accent: "#D2E3FC" },
    { id: "red", label: "Red", value: "#EA4335", accent: "#FAD2CF" },
    { id: "yellow", label: "Yellow", value: "#FBBC04", accent: "#FEEFC3" },
    { id: "green", label: "Green", value: "#34A853", accent: "#CEEAD6" },
  ],
  accessories: [
    { id: "none" as KidAvatarAccessory, label: "No extra" },
    { id: "glasses" as KidAvatarAccessory, label: "Glasses" },
    { id: "headband" as KidAvatarAccessory, label: "Headband" },
    { id: "star-pin" as KidAvatarAccessory, label: "Star pin" },
  ],
} as const;

export const DEFAULT_AVATAR_BUILDER_SELECTION: AvatarBuilderSelection = {
  skinToneId: "peach",
  hairStyleId: "wave",
  hairColorId: "black",
  shirtColorId: "blue",
  accessoryId: "none",
};

const findPart = <T extends { id: string }>(parts: readonly T[], id: string, fallback: T) =>
  parts.find((part) => part.id === id) ?? fallback;

export function buildKidAvatarOption(selection: AvatarBuilderSelection): KidAvatarOption {
  const skin = findPart(AVATAR_BUILDER_PARTS.skinTones, selection.skinToneId, AVATAR_BUILDER_PARTS.skinTones[0]);
  const hairColor = findPart(AVATAR_BUILDER_PARTS.hairColors, selection.hairColorId, AVATAR_BUILDER_PARTS.hairColors[0]);
  const shirt = findPart(AVATAR_BUILDER_PARTS.shirtColors, selection.shirtColorId, AVATAR_BUILDER_PARTS.shirtColors[0]);
  const hairStyle = findPart(AVATAR_BUILDER_PARTS.hairStyles, selection.hairStyleId, AVATAR_BUILDER_PARTS.hairStyles[0]);
  const accessory = findPart(AVATAR_BUILDER_PARTS.accessories, selection.accessoryId, AVATAR_BUILDER_PARTS.accessories[0]);

  return {
    id: `custom-${skin.id}-${hairStyle.id}-${hairColor.id}-${shirt.id}-${accessory.id}`,
    name: "My custom helper",
    gender: hairStyle.id === "braids" || hairStyle.id === "puffs" || hairStyle.id === "bob" || hairStyle.id === "hijab" ? "girl" : "boy",
    hair: hairColor.value,
    skin: skin.value,
    shirt: shirt.value,
    accent: shirt.accent,
    expression: "proud",
    hairStyle: hairStyle.id,
    accessory: accessory.id,
  };
}

export const KID_AVATAR_OPTIONS: KidAvatarOption[] = [
  {
    id: "avatar-boy-blue-wave",
    name: "Blue Builder",
    gender: "boy",
    hair: "#1F1F1F",
    skin: "#F2B996",
    shirt: "#4285F4",
    accent: "#FBBC04",
    expression: "confident",
    hairStyle: "wave",
    accessory: "star-pin",
  },
  {
    id: "avatar-boy-green-curls",
    name: "Green Problem Solver",
    gender: "boy",
    hair: "#4A2B16",
    skin: "#8D5524",
    shirt: "#34A853",
    accent: "#D2E3FC",
    expression: "bright",
    hairStyle: "curls",
  },
  {
    id: "avatar-boy-red-cap",
    name: "Red Pitch Pro",
    gender: "boy",
    hair: "#6B3F24",
    skin: "#D9A066",
    shirt: "#EA4335",
    accent: "#FEEFC3",
    expression: "ready",
    hairStyle: "cap",
  },
  {
    id: "avatar-girl-yellow-braids",
    name: "Yellow Maker",
    gender: "girl",
    hair: "#3B2416",
    skin: "#C68642",
    shirt: "#FBBC04",
    accent: "#EADDFF",
    expression: "proud",
    hairStyle: "braids",
  },
  {
    id: "avatar-girl-blue-puffs",
    name: "Blue Idea Captain",
    gender: "girl",
    hair: "#171717",
    skin: "#6D3F24",
    shirt: "#1A73E8",
    accent: "#CEEAD6",
    expression: "curious",
    hairStyle: "puffs",
  },
  {
    id: "avatar-girl-green-bob",
    name: "Green Service Star",
    gender: "girl",
    hair: "#7A4B2A",
    skin: "#F1C27D",
    shirt: "#34A853",
    accent: "#FAD2CF",
    expression: "cheerful",
    hairStyle: "bob",
    accessory: "headband",
  },
  {
    id: "avatar-boy-yellow-side-sweep",
    name: "Yellow Job Captain",
    gender: "boy",
    hair: "#8D3A35",
    skin: "#F2B996",
    shirt: "#FBBC04",
    accent: "#4285F4",
    expression: "focused",
    hairStyle: "side-sweep",
    accessory: "none",
  },
  {
    id: "avatar-boy-blue-glasses",
    name: "Blue Number Whiz",
    gender: "boy",
    hair: "#171717",
    skin: "#D9A066",
    shirt: "#4285F4",
    accent: "#CEEAD6",
    expression: "thoughtful",
    hairStyle: "short",
    accessory: "glasses",
  },
  {
    id: "avatar-boy-green-cap",
    name: "Green Helper Pro",
    gender: "boy",
    hair: "#4A2B16",
    skin: "#6D3F24",
    shirt: "#34A853",
    accent: "#FEEFC3",
    expression: "steady",
    hairStyle: "cap",
    accessory: "star-pin",
  },
  {
    id: "avatar-girl-red-hijab",
    name: "Red Idea Helper",
    gender: "girl",
    hair: "#8D3A35",
    skin: "#D9A066",
    shirt: "#EA4335",
    accent: "#FEEFC3",
    expression: "warm",
    hairStyle: "hijab",
    accessory: "none",
  },
  {
    id: "avatar-girl-yellow-glasses",
    name: "Yellow Plan Maker",
    gender: "girl",
    hair: "#D7A34A",
    skin: "#F2B996",
    shirt: "#FBBC04",
    accent: "#FAD2CF",
    expression: "clever",
    hairStyle: "wave",
    accessory: "glasses",
  },
  {
    id: "avatar-girl-green-side-sweep",
    name: "Green Kindness Lead",
    gender: "girl",
    hair: "#A53B6B",
    skin: "#8D5524",
    shirt: "#34A853",
    accent: "#D2E3FC",
    expression: "kind",
    hairStyle: "side-sweep",
    accessory: "headband",
  },
];

export function getKidAvatarOption(id?: string) {
  return KID_AVATAR_OPTIONS.find((option) => option.id === id) ?? KID_AVATAR_OPTIONS[0];
}
