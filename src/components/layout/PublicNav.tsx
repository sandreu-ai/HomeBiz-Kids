"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, Wordmark } from "@/components/ui/logo";

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bone/90 backdrop-blur-md border-b border-line/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={32} />
          <Wordmark className="text-lg" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/pricing" className="text-sm font-medium text-ink-3 hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-ink-3 hover:text-ink transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-ink-3 hover:text-ink transition-colors">
            Sign In
          </Link>
          <Button asChild size="sm">
            <Link href="/dashboard">Start your family marketplace</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-line-soft"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line bg-bone px-4 py-4 space-y-3">
          <Link href="/pricing" className="block py-2 text-sm font-medium text-ink" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/about" className="block py-2 text-sm font-medium text-ink" onClick={() => setOpen(false)}>About</Link>
          <Link href="/dashboard" className="block py-2 text-sm font-medium text-ink" onClick={() => setOpen(false)}>Sign In</Link>
          <Button asChild className="w-full" onClick={() => setOpen(false)}>
            <Link href="/dashboard">Start your family marketplace</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
