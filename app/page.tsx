"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M.75 6a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H1.5A.75.75 0 01.75 6zM16.75 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM.75 14a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H1.5A.75.75 0 01.75 14zM16.75 14a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
  );
}

export default function LandingPage() {
  const scrollRef = useScrollReveal();

  return (
    <>
      <Navbar />

      <main ref={scrollRef}>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 animate-float"
            style={{
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(199,215,253,0.6) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20 sm:pt-32 sm:pb-28">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="reveal inline-flex items-center rounded-full border border-[#c7d7fd] bg-[#EEF2FF] px-4 py-1 text-xs font-medium text-accent mb-6">
                AI-powered review management
              </span>

              <h1 className="reveal font-display text-[40px] leading-[1.1] sm:text-[68px] sm:leading-[1.05] text-gray-900 tracking-tight">
                Reply to every review in 5 seconds.
              </h1>

              <p className="reveal mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl">
                ReplyAI writes professional, on-brand replies to your Google and
                Yelp reviews instantly. Save hours every week.
              </p>

              <div className="reveal mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-150 shadow-sm"
                >
                  Start for free &rarr;
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-8 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                >
                  See how it works
                </Link>
              </div>

              <p className="reveal mt-4 text-xs text-gray-400">
                No credit card required &middot; Free forever plan &middot; Setup
                in 2 minutes
              </p>
            </div>

            {/* Dashboard mockup */}
            <div className="reveal mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                <div className="flex h-10 items-center gap-1.5 border-b border-gray-100 px-4">
                  <span className="w-3 h-3 rounded-full bg-gray-200" />
                  <span className="w-3 h-3 rounded-full bg-gray-200" />
                  <span className="w-3 h-3 rounded-full bg-gray-200" />
                  <span className="ml-4 text-[11px] text-gray-400 font-medium">
                    app.replyai.com/dashboard
                  </span>
                </div>
                <div className="p-8 bg-white">
                  <div className="flex gap-8">
                    <div className="w-1/3 space-y-4">
                      <div className="h-3 w-24 bg-gray-100 rounded" />
                      <div className="h-32 bg-gray-50 rounded-lg border border-gray-100" />
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                      <div className="h-10 bg-gray-50 rounded-lg border border-gray-100" />
                      <div className="flex gap-2">
                        <span className="h-7 w-20 bg-gray-100 rounded-md" />
                        <span className="h-7 w-20 bg-gray-100 rounded-md" />
                        <span className="h-7 w-24 bg-gray-100 rounded-md" />
                      </div>
                      <div className="h-10 bg-accent/10 rounded-lg" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="h-3 w-28 bg-gray-100 rounded" />
                      <div className="h-36 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-2" />
                          <div className="h-3 w-32 bg-gray-100 rounded mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL PROOF ─── */}
        <section className="bg-gray-50 border-y border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-center text-sm font-medium text-gray-500 mb-8">
              Trusted by 500+ small businesses
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-gray-400">
              {[
                "Restaurants",
                "Hair Salons",
                "Dental Clinics",
                "Coffee Shops",
                "Hotels",
              ].map((label) => (
                <span key={label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
                How it works
              </h2>
              <p className="reveal mt-4 text-gray-500">
                Three simple steps to never miss a review again.
              </p>
            </div>

            <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
              {/* Dashed connector line */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-12 left-[calc(16.66%+3rem)] right-[calc(16.66%+3rem)] h-px border-t border-dashed border-gray-200"
              />

              {[
                {
                  num: "01",
                  title: "Paste your review",
                  desc: "Copy any Google or Yelp review and paste it in",
                },
                {
                  num: "02",
                  title: "Choose your tone",
                  desc: "Pick Professional, Friendly, or Apologetic",
                },
                {
                  num: "03",
                  title: "Copy and post",
                  desc: "Get a perfect reply in seconds. Copy and paste to Google.",
                },
              ].map((step) => (
                <div key={step.num} className="relative text-center">
                  <span
                    aria-hidden="true"
                    className="block font-display text-[64px] leading-none text-gray-100 select-none"
                  >
                    {step.num}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section
          id="features"
          className="py-24 sm:py-32 bg-gray-50 border-y border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
                Everything you need
              </h2>
              <p className="reveal mt-4 text-gray-500">
                Powerful features designed for busy business owners.
              </p>
            </div>

            <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: StarIcon,
                  title: "AI-Powered Replies",
                  desc: "Claude AI writes replies that sound human, not robotic.",
                },
                {
                  icon: SlidersIcon,
                  title: "Tone Control",
                  desc: "Match your brand voice — professional, warm, or empathetic.",
                },
                {
                  icon: ClockIcon,
                  title: "Reply History",
                  desc: "Every reply saved so you can revisit and reuse anytime.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                    <feature.icon />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BEFORE / AFTER ─── */}
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
                Before &amp; After
              </h2>
              <p className="reveal mt-4 text-gray-500">
                See how ReplyAI transforms a negative review into a professional
                response.
              </p>
            </div>

            <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
              {/* Before */}
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">
                    Original Review
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;Worst pizza ever. Dough was raw, toppings were cheap.
                  Staff was rude. Never coming back.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`w-4 h-4 ${s <= 1 ? "text-red-400" : "text-gray-200"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>

              {/* After */}
              <div className="rounded-xl border border-green-100 bg-green-50/50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">
                    AI-Generated Reply
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  &ldquo;Hi there, thank you for your honest feedback. I&apos;m
                  sorry to hear your experience didn&apos;t meet expectations.
                  We take all reviews seriously and will be reviewing our dough
                  preparation process with the kitchen team. We&apos;d love the
                  chance to make it right — please reach out to us directly.
                  Thank you.&rdquo;
                </p>
                <p className="mt-3 text-xs text-gray-400 font-medium">
                  Tone: Professional
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section
          id="pricing"
          className="py-24 sm:py-32 bg-gray-50 border-y border-gray-100"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
                Free for everyone
              </h2>
              <p className="reveal mt-4 text-gray-500">
                No hidden fees. No credit card needed.
              </p>
            </div>

            <div className="reveal mt-16 max-w-sm mx-auto">
              <PricingCard
                name="Free"
                price="$0"
                description="Unlimited access for everyone"
                features={[
                  "Unlimited replies",
                  "All tone options",
                  "Unlimited reply history",
                  "Email support",
                ]}
                cta="Get started free"
                onCtaClick={() => {
                  window.location.href = "/auth/signup";
                }}
              />
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight text-center">
              Loved by business owners
            </h2>

            <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "ReplyAI saved me 2 hours every week. Our response rate went from 20% to 100%.",
                  name: "Maria S.",
                  title: "Restaurant Owner",
                },
                {
                  quote:
                    "I was ignoring reviews for months. Now I reply to every single one in minutes.",
                  name: "James K.",
                  title: "Salon Manager",
                },
                {
                  quote:
                    "The replies sound exactly like me. My customers love the personal touch.",
                  name: "Priya M.",
                  title: "Clinic Director",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
                >
                  <svg
                    className="w-6 h-6 text-accent/30 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-semibold">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 sm:py-32 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="reveal font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
              Start replying in 2 minutes.
            </h2>
            <p className="reveal mt-4 text-gray-500 text-lg">
              Join 500+ small businesses saving time with ReplyAI.
            </p>
            <Link
              href="/auth/signup"
              className="reveal mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-150 shadow-sm"
            >
              Create free account &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
