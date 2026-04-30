import type { JobPitch } from "@/types";
import { DEMO_USERS } from "./users";

export const DEMO_PITCHES: JobPitch[] = [
  {
    id: "pitch-001",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Practice Saying Hi First",
    problemNoticed:
      "I get shy around people and usually wait for them to talk to me first.",
    whyItMatters:
      "Being able to greet people first will help me become more confident, kind, and welcoming.",
    proposedSolution:
      "I will say hi first to 10 people today, look them in the eye, and use their name when I know it.",
    estimatedTime: "1 day",
    tokenAsk: 20,
    whyRewardIsFair:
      "It takes courage for me, and practicing it will help me grow instead of avoiding people.",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
    noteToParent: "I want to practice being brave and making other people feel noticed.",
    suggestedChecklist: [
      { id: "ck-1", text: "Say hi first to 10 people", required: true },
      { id: "ck-2", text: "Look people in the eye", required: true },
      { id: "ck-3", text: "Use their name when I know it", required: true },
      { id: "ck-4", text: "Write down what I noticed afterward", required: true },
      { id: "ck-5", text: "Tell Mom or Dad when I finish", required: true },
      { id: "ck-6", text: "Ask one follow-up question", required: false },
      { id: "ck-7", text: "Add a short reflection", required: true },
    ],
    status: "PENDING",
    createdAt: "2026-04-26T10:00:00Z",
  },
  {
    id: "pitch-002",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Do Quiet Favors for My Siblings",
    problemNoticed: "My siblings have been asking for help with little things, and I do not always notice.",
    whyItMatters: "Serving them without being asked can make our home more peaceful and help us become better friends.",
    proposedSolution: "I will do three quiet favors for Mateo or my sister without announcing it or expecting praise.",
    estimatedTime: "1 afternoon",
    tokenAsk: 30,
    whyRewardIsFair: "It will help me practice service and make home feel kinder.",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
    suggestedChecklist: [
      { id: "ck-1", text: "Notice one thing a sibling needs", required: true },
      { id: "ck-2", text: "Do the favor quietly", required: true },
      { id: "ck-3", text: "Do two more favors before dinner", required: true },
      { id: "ck-4", text: "Write what changed in the house afterward", required: true },
    ],
    status: "COUNTERED",
    counterOffer: {
      id: "counter-001",
      pitchId: "pitch-002",
      authorId: "user-santiago",
      authorName: "Santiago",
      newTokens: 25,
      parentNote:
        "Approved for 25 tokens. I love the service. Keep the favors quiet and specific — the goal is to bless your siblings, not perform for praise.",
      scopeChange: "Do three quiet favors and write one sentence about how it affected the home.",
      createdAt: "2026-04-18T11:00:00Z",
    },
    createdAt: "2026-04-18T10:00:00Z",
  },
];
