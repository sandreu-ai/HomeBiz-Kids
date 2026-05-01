import Link from "next/link";
import { CheckCircle2, X, Sparkles } from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyebrowLabel } from "@/components/ui/eyebrow";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start forming one child with missions, tokens, and savings goals.",
    cta: "Start free",
    highlight: false,
    features: [
      { included: true, text: "1 child profile" },
      { included: true, text: "3 active missions per month" },
      { included: true, text: "30-day work history" },
      { included: true, text: "Reward store with custom rewards" },
      { included: true, text: "Savings goals" },
      { included: false, text: "Before / after photo proof" },
      { included: false, text: "Child-created value pitches" },
      { included: false, text: "Trusted adults" },
      { included: false, text: "Quality checklists & bonuses" },
      { included: false, text: "Weekly family reports" },
      { included: false, text: "Homeschool portfolio export" },
    ],
  },
  {
    name: "Family",
    price: "$8.99",
    period: "/month",
    yearly: "or $89/year — save $18",
    description: "Form capable kids. Create more peace at home.",
    cta: "Get the Family plan",
    highlight: true,
    features: [
      { included: true, text: "Unlimited children" },
      { included: true, text: "Unlimited formation missions" },
      { included: true, text: "Full work history forever" },
      { included: true, text: "Before / after photo proof" },
      { included: true, text: "Child-created value pitches & counteroffers" },
      { included: true, text: "Quality checklists" },
      { included: true, text: "Bonuses + praise bank" },
      { included: true, text: "Up to 4 trusted adults" },
      { included: true, text: "Weekly family reports" },
      { included: true, text: "Skill badges" },
      { included: true, text: "Homeschool portfolio export" },
      { included: true, text: "Priority support" },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-16">
          <EyebrowLabel className="mb-4 inline-block">Pricing</EyebrowLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-4 leading-tight tracking-tight">
            Build a calmer family economy for less than a coffee.
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed">
            Free forever for one child. Upgrade when you are ready to build a fuller family marketplace around character, service, savings goals, and household peace.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-3xl p-7 flex flex-col border-2 transition-all relative",
                  plan.highlight
                    ? "bg-ink text-white border-blue-deep shadow-pop md:-translate-y-3"
                    : "bg-white border-line shadow-card hover:-translate-y-1 hover:shadow-card-hover"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow text-yellow-ink-deep text-xs font-bold px-3 py-1 rounded-full shadow-cta-yellow flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className={cn(
                      "text-sm font-bold mb-1 tracking-tight",
                      plan.highlight ? "text-yellow" : "text-blue-deep"
                    )}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={cn(
                        "text-5xl font-extrabold tracking-tight",
                        plan.highlight ? "text-white" : "text-ink"
                      )}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlight ? "text-white/60" : "text-ink-3"
                      )}
                    >
                      {plan.period}
                    </span>
                  </div>
                  {plan.yearly && (
                    <p
                      className={cn(
                        "text-xs font-medium",
                        plan.highlight ? "text-yellow" : "text-ink-3"
                      )}
                    >
                      {plan.yearly}
                    </p>
                  )}
                  <p
                    className={cn(
                      "text-sm mt-3 leading-relaxed",
                      plan.highlight ? "text-white/80" : "text-ink-3"
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  variant={plan.highlight ? "yellow" : "default"}
                  className="mb-6"
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4 mt-0.5 shrink-0",
                            plan.highlight ? "text-yellow" : "text-blue-deep"
                          )}
                        />
                      ) : (
                        <X
                          className={cn(
                            "w-4 h-4 mt-0.5 shrink-0 opacity-30",
                            plan.highlight ? "text-white" : "text-ink-3"
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          !feature.included && "opacity-50",
                          plan.highlight ? "text-white/90" : "text-ink"
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-ink mb-2">No app store fees. No surprises.</h3>
            <p className="text-sm text-ink-3 leading-relaxed">
              HomeBiz Kids only deals in virtual tokens — there is no real-money exchange in the app. Tokens redeem for whatever your family decides: privileges, savings goals, family experiences, or parent-defined rewards. Privacy-first for kids: no ads, no tracking, no public profiles.
            </p>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-ink-3">
              Questions?{" "}
              <Link href="/about" className="text-blue-deep font-semibold hover:underline">
                Read our story
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
