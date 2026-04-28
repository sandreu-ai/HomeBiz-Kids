import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-ink mb-3">Privacy Policy</h1>
          <p className="text-ink-3 mb-12">Last updated April 26, 2026</p>

          <div className="space-y-6 text-ink">
            <div>
              <h2 className="text-lg font-semibold mb-2">Children's privacy comes first.</h2>
              <p className="text-ink-3 leading-relaxed">
                Children do not need email addresses to use HomeBiz Kids. We never sell
                child data, never show ads in the child portal, and never expose child
                profiles to anyone outside the family.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">What we collect</h2>
              <p className="text-ink-3 leading-relaxed">
                Parent email and account info. Child names, ages, and work history within
                the family. Photos uploaded for proof of work. Family settings.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">What we don't collect</h2>
              <p className="text-ink-3 leading-relaxed">
                Location data. Social connections outside the family. Marketing data
                from children. We don't run analytics in the child portal.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Trusted adults</h2>
              <p className="text-ink-3 leading-relaxed">
                When you invite a trusted adult, they only see what your family permits.
                Their job posts can require parent approval before children see them.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Your control</h2>
              <p className="text-ink-3 leading-relaxed">
                You can export or delete all family data at any time. Cancellation
                doesn't lock your work history — it's yours to keep forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
