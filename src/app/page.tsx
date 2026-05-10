import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  ArrowRight,
  Briefcase,
  Camera,
  CheckCircle2,
  Heart,
  Lightbulb,
  Star,
  Trophy,
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a growth mission",
    description: "A responsibility, act of service, courage challenge, or child-pitched idea.",
  },
  {
    step: "02",
    title: "Make it a game",
    description: "Clear standards, proof, tokens, badges, and family-defined rewards.",
  },
  {
    step: "03",
    title: "Coach the mindset",
    description: "Kids connect effort to value, virtue, service, and follow-through.",
  },
  {
    step: "04",
    title: "Reinforce the win",
    description: "Parents approve, praise, redirect, and build habits without nagging.",
  },
];

const FORMATION_CARDS = [
  {
    icon: Heart,
    title: "Better character",
    description: "Responsibility, honesty, service, courage, diligence, and a better attitude at home.",
    color: "bg-green-soft text-blue-deep",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurial thinking",
    description: "Notice problems, pitch solutions, create value, negotiate fairly, and own outcomes.",
    color: "bg-yellow-tint text-yellow-ink",
  },
  {
    icon: Trophy,
    title: "Gamified follow-through",
    description: "Missions, proof, tokens, badges, and rewards make growth visible and repeatable.",
    color: "bg-blue-tint text-blue-deep",
  },
];

const SKILLS = [
  "Responsibility",
  "Initiative",
  "Service",
  "Courage",
  "Diligence",
  "Negotiation",
  "Financial literacy",
  "Follow-through",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-tint via-bone to-yellow-tint pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 text-center relative">
          <div className="mb-6 flex justify-center">
            <div className="rounded-[2rem] bg-white/85 p-2.5 shadow-card ring-1 ring-line/70 backdrop-blur">
              <Logo size={112} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-4 py-1.5 text-xs font-medium text-ink-3 mb-8 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-blue-deep animate-pulse" />
            Gamified character formation for families
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight mb-6">
            Gamify your child’s growth into a better human being.
            <br />
            <span className="text-blue-deep relative">
              Build an entrepreneurial mindset at home.
              <span className="absolute -bottom-1 left-0 right-0 h-[4px] bg-yellow rounded" />
            </span>
          </h1>

          <p className="text-lg text-ink-3 max-w-2xl mx-auto leading-relaxed mb-10">
            HomeBiz Kids turns real family needs into missions where kids practice responsibility, service, courage, and value creation — with tokens, proof, praise, and rewards that make growth feel like a game.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="xl">
              <Link href="/sign-up">
                Start free with one child
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/dashboard">View demo dashboard</Link>
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
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink mb-3">Simple system. Bigger formation.</h2>
            <p className="text-ink-3 max-w-xl mx-auto">
              Not a chore chart. A parent-led game for forming capable, generous, entrepreneurial kids.
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

      {/* ── Core outcomes ── */}
      <section className="py-16 bg-bone">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink mb-3">What your child practices</h2>
            <p className="text-ink-3 max-w-xl mx-auto">
              Every mission trains one clear life pattern: see a need, create value, do it well, reflect, and follow through.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FORMATION_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-line rounded-2xl p-6 hover:shadow-card transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-ink mb-2">{card.title}</h3>
                <p className="text-sm text-ink-3 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof + pitch demo ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-tint text-blue-deep text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Camera className="w-3.5 h-3.5" />
                Growth You Can See
              </div>
              <h2 className="text-3xl font-bold text-ink mb-4">
                Proof, reflection, and rewards — without the nagging.
              </h2>
              <p className="text-ink-3 leading-relaxed mb-6">
                Kids submit before/after proof and explain what changed. Parents coach the standard, then reward real effort.
              </p>
              <div className="flex flex-wrap gap-2.5">
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

            <div className="bg-white rounded-3xl border border-line shadow-card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-ink">Say Hi First to 10 People</span>
                <span className="text-xs bg-yellow-tint text-yellow-ink px-2.5 py-1 rounded-full font-medium">
                  Child pitch
                </span>
              </div>

              <p className="text-sm text-ink-3 mb-4 leading-relaxed">
                "I want to practice courage by greeting people first and making them feel welcome."
              </p>

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
                  "You noticed a chance to serve and followed through. That is initiative."
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-deep">✦</span>
                  <span className="text-sm font-bold text-yellow-ink">20 tokens earned</span>
                </div>
                <div className="flex items-center gap-1 bg-yellow-tint px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-deep" />
                  <span className="text-xs font-medium text-yellow-ink">courage badge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parent control ── */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Parent-led",
                copy: "You choose the missions, rewards, standards, and trusted adults.",
              },
              {
                icon: CheckCircle2,
                title: "Kid-safe",
                copy: "Children stay as profiles under a parent account. No public profiles. No in-app fiat wallet.",
              },
              {
                icon: Lightbulb,
                title: "Formation-first",
                copy: "The goal is not more tasks. It is a child who sees needs and takes ownership.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <item.icon className="w-6 h-6 text-yellow-deep mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing preview ── */}
      <section className="py-16 bg-bone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-ink mb-3">Start with one child for free.</h2>
          <p className="text-ink-3 mb-10">
            Upgrade when you want unlimited children, missions, photos, trusted adults, and weekly reports.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Free", price: "$0", subtitle: "forever", features: ["1 child", "3 missions / month", "Reward store", "Savings goals"] },
              { name: "Family", price: "$8.99", subtitle: "/month or $89/year", features: ["Unlimited children", "Before / after photos", "Child pitches", "Trusted adults", "Weekly reports"] },
            ].map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-5 text-left border ${
                  index === 1
                    ? "bg-blue-deep text-white border-blue-deep shadow-card-hover"
                    : "bg-white border-line shadow-card"
                }`}
              >
                <p className={`text-sm font-semibold mb-1 ${index === 1 ? "text-white/80" : "text-ink-3"}`}>
                  {plan.name}
                </p>
                <p className={`text-2xl font-bold mb-1 ${index === 1 ? "text-white" : "text-ink"}`}>
                  {plan.price}
                </p>
                <p className={`text-xs mb-4 ${index === 1 ? "text-white/60" : "text-ink-3"}`}>
                  {plan.subtitle}
                </p>
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${index === 1 ? "text-white/70" : "text-blue-deep"}`} />
                      <span className={`text-xs ${index === 1 ? "text-white/80" : "text-ink-3"}`}>{feature}</span>
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
      <section className="py-20 bg-blue-deep text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Raise a child who sees needs, creates value, and follows through.
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Use everyday family life to form better habits and an entrepreneurial mindset — one mission at a time.
          </p>
          <Button asChild size="xl" variant="yellow">
            <Link href="/sign-up">
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
