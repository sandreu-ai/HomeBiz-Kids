import type { Invoice } from "@/types";
import { DEMO_USERS } from "./users";
import { DEMO_JOBS } from "./jobs";

export const DEMO_INVOICES: Invoice[] = [
  {
    id: "invoice-001",
    jobId: "job-001",
    job: DEMO_JOBS[0],
    submittedById: "user-daniel",
    submittedBy: DEMO_USERS.daniel,
    status: "SUBMITTED",
    notes:
      "I worked really hard on this. I even organized my shoes in the closet which wasn't on the list!",
    reflection:
      "I learned that keeping my room clean actually helps me focus better on homework.",
    signedOff: true,
    submittedAt: "2026-04-25T14:30:00Z",
    createdAt: "2026-04-25T14:00:00Z",
    photoProofs: [
      {
        id: "photo-001-before",
        invoiceId: "invoice-001",
        phase: "before",
        url: "/images/placeholder-before.jpg",
        isPlaceholder: true,
        uploadedAt: "2026-04-24T09:00:00Z",
      },
      {
        id: "photo-001-after",
        invoiceId: "invoice-001",
        phase: "after",
        url: "/images/placeholder-after.jpg",
        isPlaceholder: true,
        uploadedAt: "2026-04-25T14:00:00Z",
      },
    ],
  },
  {
    id: "invoice-002",
    jobId: "job-005",
    job: DEMO_JOBS[4],
    submittedById: "user-daniel",
    submittedBy: DEMO_USERS.daniel,
    status: "APPROVED",
    notes: "Mateo really liked the story! We read the whole two chapters.",
    reflection: "Reading out loud is harder than I thought but it was fun.",
    signedOff: true,
    submittedAt: "2026-04-19T17:00:00Z",
    reviewedAt: "2026-04-19T18:00:00Z",
    createdAt: "2026-04-19T17:00:00Z",
    photoProofs: [],
    feedback: {
      id: "feedback-001",
      invoiceId: "invoice-002",
      authorId: "user-santiago",
      author: DEMO_USERS.santiago,
      rating: "above_beyond",
      note: "Great job noticing that Mateo needed some company. You showed excellent initiative and made him feel special.",
      bonusTokens: 5,
      createdAt: "2026-04-19T18:00:00Z",
    },
    bonusTokens: 5,
  },
];
