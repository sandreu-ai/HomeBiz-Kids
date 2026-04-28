import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Heart, Briefcase, Sprout } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-6 leading-tight tracking-tight text-center">
            We were tired of chore charts that didn't work.
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed mb-12 text-center">
            HomeBiz Kids was built by parents who wanted real work to actually get done at
            home — without the daily nagging — and who saw an opportunity to teach their kids
            entrepreneurship at the same time. The character lessons are the byproduct.
            The cleaner house is the point.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">Less for you</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Stop reminding, stop arguing. Jobs get claimed and done.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Sprout className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">More for them</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Kids learn initiative, follow-through, and how to price work.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">Family-first</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Trusted grandparents can post jobs. Parents stay in control.</p>
            </div>
          </div>

          <div className="space-y-10 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">What it is — and isn't</h2>
              <p className="text-ink-3 mb-3">
                HomeBiz Kids is a family work marketplace. Parents post jobs. Kids see them,
                claim them, do them, and submit invoices. Tokens flow into a wallet. Tokens get
                spent in a reward store you control.
              </p>
              <p className="text-ink-3">
                It is <em>not</em> a chore tracker disguised as a sticker chart. It is <em>not</em>
                a way to pay your kids real cash through an app — there's no fiat exchange in HomeBiz Kids,
                ever. Tokens are virtual. What they're worth is up to your family.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">Why kids stick with it</h2>
              <p className="text-ink-3 mb-3">
                The Job Pitch flow teaches kids to articulate value. Counteroffers teach
                negotiation. Quality checklists teach standards. Before-and-after photos teach pride
                in transformation. Invoices teach professionalism. Bonuses teach excellence. Savings
                goals teach delayed gratification.
              </p>
              <p className="text-ink-3">
                Most chore apps treat children as tasks to manage. We treat them as tiny
                entrepreneurs — capable of noticing problems, proposing solutions, and producing
                work they're proud of.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">Why parents stick with it</h2>
              <p className="text-ink-3 mb-3">
                Because work actually gets done. The bathroom gets cleaned. The yard gets weeded.
                The car gets washed. The trash goes out. And you didn't ask three times.
              </p>
              <p className="text-ink-3">
                The weekly report turns it all into a record — for parents,
                for homeschool portfolios, and most of all for the child looking back
                years later thinking: <em>I did that.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
