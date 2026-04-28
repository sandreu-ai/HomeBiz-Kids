import type { JobPitch } from "@/types";
import { DEMO_USERS } from "./users";

export const DEMO_PITCHES: JobPitch[] = [
  {
    id: "pitch-001",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Deep Clean My Room",
    problemNoticed:
      "My room is messy and hard to walk through. There's clothes on the floor and stuff piled on my desk.",
    whyItMatters:
      "I can't find my school things in the morning and it makes the room feel stressful when I want to read or play.",
    proposedSolution:
      "I will make my bed, clear the floor, put dirty clothes in the hamper, organize my desk, vacuum the rug, and dust the shelves.",
    estimatedTime: "45 minutes",
    tokenAsk: 25,
    whyRewardIsFair:
      "It will take a while and the room will look totally different. That's worth more than a regular small chore.",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
    noteToParent: "I want to do this without being asked because I'm tired of not finding my stuff.",
    suggestedChecklist: [
      { id: "ck-1", text: "Make my bed", required: true },
      { id: "ck-2", text: "Pick up all clothes from floor", required: true },
      { id: "ck-3", text: "Put dirty clothes in hamper", required: true },
      { id: "ck-4", text: "Organize desk surface", required: true },
      { id: "ck-5", text: "Vacuum the floor", required: true },
      { id: "ck-6", text: "Dust shelves", required: false },
      { id: "ck-7", text: "Upload after photo", required: true },
    ],
    status: "PENDING",
    createdAt: "2026-04-26T10:00:00Z",
  },
  {
    id: "pitch-002",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Organize Dad's Garage Shelf",
    problemNoticed: "The garage shelf by the door has tools and bins all mixed up.",
    whyItMatters: "Dad wastes time finding tools when he needs them.",
    proposedSolution: "I will sort tools into bins by type and label them.",
    estimatedTime: "1 hour",
    tokenAsk: 40,
    whyRewardIsFair: "It's a long job and Dad will save time later.",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
    suggestedChecklist: [
      { id: "ck-1", text: "Take everything off the shelf", required: true },
      { id: "ck-2", text: "Sort tools by type", required: true },
      { id: "ck-3", text: "Wipe shelf clean", required: true },
      { id: "ck-4", text: "Put items back organized", required: true },
    ],
    status: "COUNTERED",
    counterOffer: {
      id: "counter-001",
      pitchId: "pitch-002",
      authorId: "user-santiago",
      authorName: "Santiago",
      newTokens: 30,
      parentNote:
        "Approved for 30 tokens. I love the initiative! The shelf sort is great. Skip the labels for now — we can add those later if you still want to.",
      scopeChange: "Skip making labels. Just sort and organize.",
      createdAt: "2026-04-18T11:00:00Z",
    },
    createdAt: "2026-04-18T10:00:00Z",
  },
];
