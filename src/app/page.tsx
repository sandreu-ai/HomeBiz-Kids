import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Camera,
  Receipt,
  Coins,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Heart,
} from "lucide-react";

const FEATURES = [
  {
    icon: Briefcase,
    title: "Post Jobs",
    description:
      "Parents create detailed job listings with rewards, difficulty ratings, and proof requirements.",
    color: "bg-blue-tint text-blue-deep",
  },
  {
    icon: Lightbulb,
    title: "Propose Work",
    description:
      "Kids spot something that needs doing, propose it as a job, and negotiate their reward.",
    color: "bg-yellow-tint text-yellow-ink",
  },
  {
    icon: Camera,
    title: "Upload Proof",
    description:
      "Before and after photos turn completed work into visual proof of transformation.",
    color: "bg-red-tint text-red-deep",
  },
  {
    icon: Receipt,
    title: "Submit Invoices",
    description:
      "Kids sign and submit real invoices. Parents review them like tiny entrepreneurs.",
    color: "bg-blue-tint text-blue-deep",
  },
  {
    icon: Coins,
    title: "Earn Rewards",
    description:
      "Tokens, cash, and custom prizes — a real reward economy kids can see growing.",
    color: "bg-yellow-tint text-yellow-ink",
  },
  {
    icon: Heart,
    title: "Build Character",
    description:
      "Every job builds responsibility, initiative, diligence, and follow-through.",
    color: "bg-green-soft text-blue-deep",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Parent posts a job",
    description:
      "Set the task, reward, difficulty, and whether proof is required. Or leave it open for kids to claim.",
  },
  {
    step: "02",
    title: "Child spots the work",
    description:
      "Kids browse open jobs or propose their own. They take a before photo to document the starting point.",
  },
  {
    step: "03",
    title: "Work gets done",
    description:
      "Child completes the job, takes an after photo, and submits an invoice with a personal note.",
  },
  {
    step: "04",
    title: "Parent reviews and pays",
    description:
      "Compare before and after, leave feedback, approve the invoice, and watch your child's pride grow.",
  },
];

const SKILLS = [
  "Responsibility",
  "Initiative",
  "Follow-Through",
  "Diligence",
  "Negotiation",
  "Financial Literacy",
  "Problem-Solving",
  "Honesty",
  "Entrepreneurship",
  "Stewardship",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-tint via-bone to-yellow-tint pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-4 py-1.5 text-xs font-medium text-ink-3 mb-8 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-blue-deep animate-pulse" />
            Your child's first tiny business
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight mb-6">
            Your kids do the work.
            <br />
            <span className="text-blue-deep relative">
              You get your weekends back.
              <span className="absolute -bottom-1 left-0 right-0 h-[4px] bg-yellow rounded" />
            </span>
          </h1>

          <p className="text-lg text-ink-3 max-w-2xl mx-auto leading-relaxed mb-10">
            HomeBiz Kids turns everyday family work into a real economy.
            Kids spot jobs, pitch a price, do the work, and send you an invoice.
            <span className="font-semibold text-ink"> They learn responsibility and entrepreneurship — you get a cleaner house and time to think.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="xl">
              <Link href="/dashboard">
                Start free with one child
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>

          <p className="text-xs text-ink-3 mt-5">
            Free forever for one child · No credit card required · Privacy-first for kids
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-ink mb-3">How it works</h2>
            <p className="text-ink-3 max-w-xl mx-auto">
              Four simple steps turn household chores into a real work experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-deep flex items-center justify-center text-white font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before/After proof showcase ── */}
      <section className="py-20 bg-bone">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-tint text-blue-deep text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Camera className="w-3.5 h-3.5" />
                Proof of Work
              </div>
              <h2 className="text-3xl font-bold text-ink mb-4">
                See the transformation, not just the result.
              </h2>
              <p className="text-ink-3 leading-relaxed mb-6">
                Before and after photos give kids a sense of pride in their work —
                and give parents a visual record of what was actually done. No more
                "I already did it."
              </p>
              <div className="space-y-3">
                {[
                  "Before photos document the starting point",
                  "After photos prove the transformation",
                  "Parents compare side-by-side before approving",
                  "Completed work becomes part of a portfolio",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-deep mt-0.5 shrink-0" />
                    <p className="text-sm text-ink-3">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock before/after card */}
            <div className="bg-white rounded-3xl border border-line shadow-card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-ink">Clean Your Room</span>
                <span className="text-xs bg-blue-tint text-blue-deep px-2.5 py-1 rounded-full font-medium">
                  Approved ✓
                </span>
              </div>

              <div className="flex gap-3 mb-4">
                <div className="flex-1 aspect-video rounded-2xl bg-gradient-to-br from-line to-line-soft flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">📸</div>
                    <span className="text-[10px] font-bold bg-red text-white px-2 py-0.5 rounded-full">
                      Before
                    </span>
                  </div>
                </div>
                <div className="flex-1 aspect-video rounded-2xl bg-gradient-to-br from-green-tint to-blue-tint flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">✨</div>
                    <span className="text-[10px] font-bold bg-blue-deep text-white px-2 py-0.5 rounded-full">
                      After
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-tint rounded-xl p-3">
                <p className="text-xs font-medium text-blue-deep mb-1">Parent feedback</p>
                <p className="text-xs text-ink-3 italic">
                  "Great job noticing without being asked. You showed excellent initiative."
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-deep">✦</span>
                  <span className="text-sm font-bold text-yellow-ink">25 tokens earned</span>
                </div>
                <div className="flex items-center gap-1 bg-yellow-tint px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-deep" />
                  <span className="text-xs font-medium text-yellow-ink">+5 bonus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Child proposals feature ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mock proposal card */}
            <div className="bg-bone rounded-3xl border border-line p-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-yellow-soft flex items-center justify-center text-base">
                  💡
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-ink">New Proposal</p>
                  <p className="text-xs text-ink-3">from Daniel · just now</p>
                </div>
                <span className="ml-auto text-xs bg-yellow-tint text-yellow-ink font-medium px-2.5 py-0.5 rounded-full">
                  Awaiting Review
                </span>
              </div>

              <h3 className="font-bold text-ink mb-2">Deep Clean the Bathroom</h3>
              <p className="text-sm text-ink-3 mb-3 leading-relaxed">
                I will scrub the toilet, sink, and tub, wipe down all surfaces, clean the mirror, and mop the floor.
              </p>

              <div className="bg-white rounded-xl p-3 mb-4 border border-line">
                <p className="text-xs font-semibold text-ink mb-1">Why it matters</p>
                <p className="text-xs text-ink-3 italic">
                  "A clean bathroom is healthier for our whole family and guests will feel more comfortable."
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-deep">✦</span>
                  <span className="text-sm font-bold text-yellow-ink">35 tokens requested</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-red-tint text-red-deep px-3 py-1.5 rounded-lg font-medium">
                    Decline
                  </button>
                  <button className="text-xs bg-blue-deep text-white px-3 py-1.5 rounded-lg font-medium">
                    Approve
                  </button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-yellow-tint text-yellow-ink text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Lightbulb className="w-3.5 h-3.5" />
                Child Proposals
              </div>
              <h2 className="text-3xl font-bold text-ink mb-4">
                Kids see something that needs doing — and turn it into a job.
              </h2>
              <p className="text-ink-3 leading-relaxed mb-6">
                The most powerful feature in HomeBiz Kids isn't the chores parents
                post — it's the work kids spot on their own. Teaching initiative
                is the whole point.
              </p>
              <div className="space-y-3">
                {[
                  "Child spots a job around the house",
                  "Proposes it with a description, why it matters, and a price",
                  "Takes a before photo as documentation",
                  "Parent approves, rejects, or makes a counteroffer",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-deep mt-0.5 shrink-0" />
                    <p className="text-sm text-ink-3">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Invoice system ── */}
      <section className="py-20 bg-ink text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Receipt className="w-3.5 h-3.5" />
                Kid-Friendly Invoices
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Real invoices. Real pride.
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                After finishing a job, kids submit a professional-style invoice —
                complete with their name, job description, before/after photos,
                and a personal reflection. Then they sign it.
              </p>
              <p className="text-sm font-semibold text-yellow-deep mb-2">
                "I confirm that I completed this work honestly and carefully."
              </p>
              <p className="text-white/50 text-sm">
                That signature teaches more than any chore chart ever could.
              </p>
            </div>

            {/* Mock invoice */}
            <div className="bg-white text-ink rounded-3xl p-6">
              <div className="flex items-start justify-between mb-5 pb-5 border-b border-line">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded bg-blue-deep flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-blue-deep">HomeBiz Kids</span>
                  </div>
                  <p className="text-xs text-ink-3">Invoice #INV-001</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-ink">INVOICE</p>
                  <p className="text-xs text-ink-3">April 25, 2026</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-ink-3">From</p>
                <p className="text-sm font-semibold text-ink">Daniel Reyes</p>
              </div>

              <div className="bg-bone rounded-xl p-3 mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-3">Job</span>
                  <span className="font-medium text-ink">Clean Your Room</span>
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-3">Proof</span>
                  <span className="text-blue-deep font-medium">Before + After ✓</span>
                </div>
                <div className="flex justify-between text-xs pt-1.5 border-t border-line">
                  <span className="font-semibold text-ink">Reward</span>
                  <span className="font-bold text-yellow-ink">25 tokens</span>
                </div>
              </div>

              <div className="bg-blue-tint border border-blue-soft rounded-xl p-3 text-xs text-blue-deep font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Signed: "I completed this work honestly and carefully."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-ink mb-3">
              Everything your family needs
            </h2>
            <p className="text-ink-3 max-w-xl mx-auto">
              Built for parents who want to raise kids that work hard, think
              entrepreneurially, and take pride in their contribution.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="border border-line rounded-2xl p-5 hover:shadow-card transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-ink mb-2">{feature.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted adults ── */}
      <section className="py-20 bg-bone">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-tint text-blue-deep text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Users className="w-3.5 h-3.5" />
            Trusted Adults
          </div>
          <h2 className="text-3xl font-bold text-ink mb-4">
            Grandma can post a job too.
          </h2>
          <p className="text-ink-3 max-w-2xl mx-auto leading-relaxed mb-10">
            Invite up to four trusted adults — grandparents, aunts, uncles, mentors —
            to post jobs and encourage the kids. Parent approval required before kids
            see anything. Privacy always protected.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {["Grandma", "Grandpa Joe", "Aunt Maria", "Uncle Carlos"].map((name) => (
              <div
                key={name}
                className="bg-white border border-line rounded-2xl px-5 py-3 flex items-center gap-2.5 shadow-soft"
              >
                <div className="w-8 h-8 rounded-full bg-blue-tint flex items-center justify-center text-sm font-bold text-blue-deep">
                  {name[0]}
                </div>
                <span className="text-sm font-medium text-ink">{name}</span>
                <span className="text-xs text-blue-deep bg-blue-tint px-2 py-0.5 rounded-full">
                  Trusted Adult
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Character skills ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-ink mb-4">
            More than chores. Character.
          </h2>
          <p className="text-ink-3 max-w-xl mx-auto mb-10">
            Every job in HomeBiz Kids is tagged with the life skill it teaches.
            Watch your child build a portfolio of character.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="bg-green-tint text-blue-deep font-medium text-sm px-4 py-2 rounded-full border border-green"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing preview ── */}
      <section className="py-20 bg-bone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-ink mb-3">Free your weekend for less than a coffee.</h2>
          <p className="text-ink-3 mb-10">
            Free forever for one child. Upgrade when your family is ready.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Free", price: "$0", subtitle: "forever", highlight: false, features: ["1 child", "3 jobs / month", "Reward store", "Savings goals", "30-day history"] },
              { name: "Family", price: "$8.99", subtitle: "/month or $89/year", highlight: true, features: ["Unlimited children + jobs", "Before / after photos", "Child pitches & counteroffers", "Trusted adults", "Weekly reports", "Homeschool portfolio"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-5 text-left border ${
                  plan.highlight
                    ? "bg-blue-deep text-white border-blue-deep shadow-card-hover"
                    : "bg-white border-line shadow-card"
                }`}
              >
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-white/80" : "text-ink-3"}`}>
                  {plan.name}
                </p>
                <p className={`text-2xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-ink"}`}>
                  {plan.price}
                </p>
                <p className={`text-xs mb-4 ${plan.highlight ? "text-white/60" : "text-ink-3"}`}>
                  {plan.subtitle}
                </p>
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${plan.highlight ? "text-white/70" : "text-blue-deep"}`} />
                      <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-ink-3"}`}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link href="/pricing">See full pricing details</Link>
          </Button>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-blue-deep text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Stop reminding. Start running a marketplace.
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Less nagging. Less arguing. More work getting done — by them, on their initiative,
            because they want the tokens. They learn responsibility. You get your evenings back.
          </p>
          <Button asChild size="xl" variant="yellow">
            <Link href="/dashboard">
              Start free with one child
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-white/40 text-xs mt-4">
            Free forever for one child. Cancel anytime. No app store fees.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
