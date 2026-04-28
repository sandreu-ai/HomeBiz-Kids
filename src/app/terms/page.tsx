import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <PublicNav />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-ink mb-3">Terms of Service</h1>
          <p className="text-ink-3 mb-12">Last updated April 26, 2026</p>

          <div className="space-y-6 text-ink">
            <div>
              <h2 className="text-lg font-semibold mb-2">Family-owned accounts</h2>
              <p className="text-ink-3 leading-relaxed">
                One parent owns the family account. Children and trusted adults are
                profiles under that account. Parents are responsible for what happens
                in their family marketplace.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Reasonable use</h2>
              <p className="text-ink-3 leading-relaxed">
                HomeBiz Kids is for honest family use. No public marketplaces, no resale
                of accounts, no use as a workaround for child labor laws.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Subscriptions</h2>
              <p className="text-ink-3 leading-relaxed">
                Family and Academy plans renew until cancelled. Free plan is free
                forever for what it includes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Your data is yours</h2>
              <p className="text-ink-3 leading-relaxed">
                Export anytime. Delete anytime. We don't sell, share, or train models
                on your family's data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
