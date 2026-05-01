export type KidAvatarGender = "boy" | "girl";

export interface KidAvatarOption {
  id: string;
  name: string;
  gender: KidAvatarGender;
  hair: string;
  skin: string;
  shirt: string;
  accent: string;
  expression: string;
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
  },
];

export function getKidAvatarOption(id?: string) {
  return KID_AVATAR_OPTIONS.find((option) => option.id === id) ?? KID_AVATAR_OPTIONS[0];
}
