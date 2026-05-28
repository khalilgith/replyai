"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-[22px] leading-none text-gray-900"
          >
            ReplyAI
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
            >
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-150"
            >
              Start free
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden relative w-6 h-6 flex items-center justify-center"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 absolute transition-all duration-200 ${
                mobileOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 absolute transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 absolute transition-all duration-200 ${
                mobileOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link
            href="/#features"
            className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/auth/login"
            className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-150"
            onClick={() => setMobileOpen(false)}
          >
            Start free
          </Link>
        </nav>
      )}
    </header>
  );
}
