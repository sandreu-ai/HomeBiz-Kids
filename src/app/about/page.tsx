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
            A family marketplace that rewires the brain.
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed mb-12 text-center">
            HomeBiz Kids exists to help parents form capable, generous, goal-oriented children while creating more peace at home. The work matters, but the deeper purpose is the child becoming the kind of person who notices needs, serves family, follows standards, saves patiently, and creates value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">Less load on parents</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Helping around the house becomes incentivized, visible, and less dependent on nagging.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Sprout className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">More formation for children</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Children practice initiative, detail, courage, service, follow-through, and delayed gratification.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-tint flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-blue-deep" />
              </div>
              <h3 className="font-bold text-ink mb-1">Stronger family bonds</h3>
              <p className="text-sm text-ink-3 leading-relaxed">Sibling favors and trusted-adult encouragement help the whole home become more peaceful.</p>
            </div>
          </div>

          <div className="space-y-10 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">What it is — and isn't</h2>
              <p className="text-ink-3 mb-3">
                HomeBiz Kids is a family marketplace that rewires the brain. Parents can create missions around household help, sibling service, social courage, stewardship, discipline, and savings goals. Kids can also pitch work they notice on their own. Tokens flow into a wallet and toward goals your family controls.
              </p>
              <p className="text-ink-3">
                It is <em>not</em> a chore tracker disguised as a sticker chart. It is <em>not</em> a public marketplace or a way to pay kids real cash through an app — there is no fiat exchange in HomeBiz Kids, ever. Tokens are virtual. What they unlock is up to your family.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">Why kids stick with it</h2>
              <p className="text-ink-3 mb-3">
                The Job Pitch flow teaches kids to articulate value, but it is only one part of the system. Parent-created missions let you address a weakness you notice: a shy child can earn tokens for saying hi first to 10 people, siblings can earn for doing quiet favors for each other, and every child can practice saving toward something meaningful.
              </p>
              <p className="text-ink-3">
                Most family apps manage tasks. HomeBiz Kids forms people — young entrepreneurs who notice problems, serve their family, negotiate fairly, finish with excellence, and learn not to think only in hours-for-dollars.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">Why parents stick with it</h2>
              <p className="text-ink-3 mb-3">
                Because formation and household peace can happen together. The bathroom gets cleaned, the shy greeting gets practiced, siblings receive unexpected help, and parents get a repeatable way to reward the habits they want to see grow.
              </p>
              <p className="text-ink-3">
                The weekly report turns it all into a record — for parents, homeschool portfolios, and most of all for the child looking back years later thinking: <em>I became someone who follows through.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
