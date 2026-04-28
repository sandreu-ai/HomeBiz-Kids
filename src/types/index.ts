// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "PARENT" | "CHILD" | "TRUSTED_ADULT";

export type JobStatus =
  | "OPEN"
  | "CLAIMED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export type ProposalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COUNTERED";

export type InvoiceStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "REVISION_REQUESTED";

export type RewardType =
  | "SCREEN_TIME"
  | "ACTIVITY"
  | "TREAT"
  | "CUSTOM";

/** Subscription plan a family is on. Drives free-tier gating. */
export type FamilyPlan = "FREE" | "FAMILY";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD" | "CHALLENGE";

export type ProofRequirement =
  | "NONE"
  | "AFTER_ONLY"
  | "BEFORE_ONLY"
  | "BEFORE_AND_AFTER";

export type JobCategory =
  | "HOUSEHOLD"
  | "YARD_WORK"
  | "PET_CARE"
  | "LEARNING"
  | "SERVICE"
  | "CREATIVE"
  | "BUSINESS"
  | "BONUS_CHALLENGE"
  | "ORGANIZATION"
  | "OUTDOOR";

export type VirtueFocus =
  | "RESPONSIBILITY"
  | "INITIATIVE"
  | "DILIGENCE"
  | "HONESTY"
  | "FOLLOW_THROUGH"
  | "PROBLEM_SOLVING"
  | "SERVICE"
  | "STEWARDSHIP"
  | "COMMUNICATION"
  | "RESILIENCE";

export type TransactionType = "EARNED" | "REDEEMED" | "BONUS" | "DEDUCTION";

export type RedemptionStatus = "PENDING" | "APPROVED" | "DENIED";

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  avatarColor?: string; // for avatar fallback
  createdAt: string;
  familyId: string;
}

export interface Family {
  id: string;
  name: string;
  createdAt: string;
  members: FamilyMember[];
  plan: FamilyPlan;
  /** ISO month string ("2026-04") used to scope the free tier's monthly job count. */
  currentBillingMonth?: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  familyId: string;
  user: User;
  role: UserRole;
  approved: boolean;
  joinedAt: string;
}

export interface ChildProfile {
  id: string;
  userId: string;
  user: User;
  age: number;
  tokenBalance: number;
  virtues: VirtueFocus[];
  level: number;
  streak: number;
  lifetimeTokens: number;
  completedJobsCount: number;
  badges?: ChildBadge[];
  activeSavingsGoal?: SavingsGoal;
}

export interface Job {
  id: string;
  familyId: string;
  postedById: string;
  postedBy: User;
  claimedById?: string;
  claimedBy?: User;
  title: string;
  description: string;
  category: JobCategory;
  difficulty: DifficultyLevel;
  virtues: VirtueFocus[];
  tokenReward: number;
  status: JobStatus;
  dueDate?: string;
  proofRequirement: ProofRequirement;
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
  assignedToId?: string;
  assignedTo?: ChildProfile;
  proposal?: JobProposal;
  invoice?: Invoice;
  beforePhoto?: PhotoProof;
  afterPhoto?: PhotoProof;
  estimatedTime?: string;
  suggestedAgeRange?: string;
  checklist?: QualityChecklistItem[];
  pitchId?: string;
}

export interface JobProposal {
  id: string;
  jobId?: string;
  proposedById: string;
  proposedBy: User;
  title: string;
  description: string;
  whyItMatters: string;
  tokenAsk: number;
  estimatedTime: string;
  status: ProposalStatus;
  counterOffer?: string;
  counterTokens?: number;
  createdAt: string;
  beforePhotoUrl?: string;
  beforePhotoPlaceholder?: boolean;
}

export interface PhotoProof {
  id: string;
  invoiceId: string;
  phase: "before" | "after";
  url: string;
  isPlaceholder?: boolean;
  uploadedAt: string;
}

export interface Invoice {
  id: string;
  jobId: string;
  job: Job;
  submittedById: string;
  submittedBy: User;
  status: InvoiceStatus;
  notes?: string;
  reflection?: string;
  signedOff: boolean;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  photoProofs: PhotoProof[];
  feedback?: ParentFeedback;
  bonusTokens?: number;
  bonus?: Bonus;
  praiseNote?: PraiseNote;
  revisionRequest?: RevisionRequest;
  revisionRequestedAt?: string;
  resubmittedAt?: string;
  checklistCompleted?: QualityChecklistItem[];
}

export interface ParentFeedback {
  id: string;
  invoiceId: string;
  authorId: string;
  author: User;
  rating: "great" | "improvement" | "above_beyond";
  note?: string;
  bonusTokens?: number;
  createdAt: string;
}

export interface Reward {
  id: string;
  familyId: string;
  title: string;
  description?: string;
  tokenCost: number;
  type: RewardType;
  isActive: boolean;
  emoji?: string;
  createdAt: string;
}

export interface RewardRedemption {
  id: string;
  rewardId: string;
  reward: Reward;
  childId: string;
  child: ChildProfile;
  status: RedemptionStatus;
  requestedAt: string;
  resolvedAt?: string;
}

export interface WalletTransaction {
  id: string;
  childId: string;
  type: TransactionType;
  tokens?: number;
  cash?: number;
  description: string;
  jobId?: string;
  invoiceId?: string;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  type:
    | "job_posted"
    | "job_claimed"
    | "job_submitted"
    | "job_approved"
    | "proposal_submitted"
    | "proposal_approved"
    | "invoice_submitted"
    | "invoice_approved"
    | "reward_redeemed"
    | "bonus_added"
    | "trusted_adult_proposed";
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  description: string;
  jobTitle?: string;
  createdAt: string;
}

// ─── Pitches, Checklists, Bonuses, Badges, Goals ─────────────────────────────

export interface QualityChecklistItem {
  id: string;
  text: string;
  required: boolean;
  completed?: boolean;
}

export interface JobPitch {
  id: string;
  proposedById: string;
  proposedBy: User;
  title: string;
  problemNoticed: string;
  whyItMatters: string;
  proposedSolution: string;
  estimatedTime: string;
  tokenAsk: number;
  whyRewardIsFair: string;
  beforePhotoUrl?: string;
  beforePhotoPlaceholder?: boolean;
  noteToParent?: string;
  suggestedChecklist: QualityChecklistItem[];
  status: ProposalStatus;
  counterOffer?: CounterOffer;
  createdAt: string;
}

export interface CounterOffer {
  id: string;
  pitchId: string;
  authorId: string;
  authorName: string;
  newTokens?: number;
  newRewardType?: RewardType;
  scopeChange?: string;
  parentNote: string;
  addedChecklistItems?: QualityChecklistItem[];
  createdAt: string;
  childResponse?: "ACCEPTED" | "DECLINED" | "REVISED";
}

export interface Bonus {
  id: string;
  invoiceId: string;
  amount: number;
  reason: string;
  parentNote?: string;
  createdAt: string;
}

export type BadgeCode =
  | "INITIATIVE"
  | "FOLLOW_THROUGH"
  | "STEWARDSHIP"
  | "HELPER"
  | "ENTREPRENEUR"
  | "RESILIENCE"
  | "DILIGENCE"
  | "NEGOTIATOR"
  | "QUALITY_WORKER"
  | "BONUS_EARNER";

export interface SkillBadge {
  code: BadgeCode;
  title: string;
  description: string;
  emoji: string;
  goal: number;
  color: string;
}

export interface ChildBadge {
  childId: string;
  badgeCode: BadgeCode;
  progress: number;
  earned: boolean;
  earnedAt?: string;
}

export interface SavingsGoal {
  id: string;
  childId: string;
  title: string;
  emoji: string;
  targetTokens: number;
  savedTokens: number;
  targetCash?: number;
  savedCash?: number;
  deadline?: string;
  isActive: boolean;
  createdAt: string;
}

// ─── Family Economy Settings ──────────────────────────────────────────────────

export interface FamilyEconomySettings {
  familyId: string;
  currencyType: "VIRTUAL_TOKENS" | "PRIVILEGES" | "PHYSICAL_TOKENS";
  tokenName: string;
  requireApprovalForPayouts: boolean;
  allowChildProposals: boolean;
  allowTrustedAdultJobs: boolean;
  defaultProofRequirement: ProofRequirement;
  requireReflection: boolean;
  enableBonuses: boolean;
  enableSavingsGoals: boolean;
  enableSkillBadges: boolean;
  enableWeeklyReports: boolean;
  trustedAdultJobsRequireApproval: boolean;
}

// ─── Praise Bank ──────────────────────────────────────────────────────────────

export interface PraiseBankItem {
  id: string;
  text: string;
  category?: string;
}

export interface PraiseNote {
  id: string;
  invoiceId: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

// ─── Weekly Reports ───────────────────────────────────────────────────────────

export interface WeeklyReportChildSummary {
  childId: string;
  childName: string;
  jobsCompleted: number;
  tokensEarned: number;
  proposalsSubmitted: number;
  bonusesEarned: number;
  skillsPracticed: string[];
  badgesEarned: BadgeCode[];
  topJob?: string;
  praiseHighlights: string[];
}

export interface WeeklyReport {
  id: string;
  familyId: string;
  weekStart: string;
  weekEnd: string;
  totalJobsCompleted: number;
  totalTokensEarned: number;
  totalRewardsRedeemed: number;
  childSummaries: WeeklyReportChildSummary[];
  topSkillPracticed: string;
  mostImpressiveJob?: string;
  suggestedJobsNextWeek: string[];
  createdAt: string;
}

// ─── Job Suggestions ──────────────────────────────────────────────────────────

export interface JobSuggestion {
  id: string;
  ageRange: "5-7" | "8-10" | "11-14" | "15+";
  title: string;
  description: string;
  category: JobCategory;
  difficulty: DifficultyLevel;
  virtueFocus: VirtueFocus[];
  suggestedReward: { min: number; max: number };
  suggestedChecklist: string[];
}

// ─── Revision ─────────────────────────────────────────────────────────────────

export interface RevisionRequest {
  id: string;
  invoiceId: string;
  authorId: string;
  authorName: string;
  note: string;
  itemsNeedingAttention?: string[];
  createdAt: string;
}

// ─── Session ──────────────────────────────────────────────────────────────────

export interface DemoSession {
  user: User;
  childProfile?: ChildProfile;
  family: Family;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}
