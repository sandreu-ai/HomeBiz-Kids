import type { JobProposal } from "@/types";
import { DEMO_USERS } from "./users";

export const DEMO_PROPOSALS: JobProposal[] = [
  {
    id: "proposal-001",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Deep Clean the Bathroom",
    description:
      "I will scrub the toilet, sink, and tub, wipe down all surfaces, clean the mirror, mop the floor, and replace the toilet paper roll.",
    whyItMatters:
      "A clean bathroom is healthier for our whole family and guests will feel more comfortable.",
    tokenAsk: 35,
    estimatedTime: "45 minutes",
    status: "PENDING",
    createdAt: "2026-04-25T16:00:00Z",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
  },
  {
    id: "proposal-002",
    proposedById: "user-daniel",
    proposedBy: DEMO_USERS.daniel,
    title: "Organize Dad's Garage Shelf",
    description:
      "I noticed the garage shelf by the door is messy. I will sort tools, put things back in bins, and sweep the floor underneath.",
    whyItMatters:
      "It will be easier to find things and the garage will look nicer.",
    tokenAsk: 40,
    estimatedTime: "1 hour",
    status: "COUNTERED",
    counterOffer:
      "Approved for 30 tokens. The shelf looks good but the floor sweep is optional this time.",
    counterTokens: 30,
    createdAt: "2026-04-18T10:00:00Z",
    beforePhotoUrl: "/images/placeholder-before.jpg",
    beforePhotoPlaceholder: true,
  },
];
