import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function PublicFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={32} />
              <span className="font-extrabold text-lg tracking-tight">HomeBiz Kids</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              A family marketplace that rewires the brain — helping kids practice initiative, service, standards, and delayed gratification while bringing more peace to the home.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Product</h4>
            <div className="space-y-2">
              {[
                ["Pricing", "/pricing"],
                ["About", "/about"],
                ["Dashboard", "/dashboard"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Legal</h4>
            <div className="space-y-2">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 HomeBiz Kids. Built with love for families.
          </p>
          <p className="text-xs text-white/40">
            Privacy-first · No ads in child portal · Parent-controlled
          </p>
        </div>
      </div>
    </footer>
  );
}
