"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes, ReplyAI is completely free. No hidden fees or credit card required.",
  },
  {
    q: "What counts as a reply?",
    a: "Each generated reply counts as one, including regenerations.",
  },
  {
    q: "Is my data private?",
    a: "Reviews are sent to Claude API for processing. We never store review content.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight">
                Free for everyone
              </h1>
              <p className="mt-4 text-gray-500">
                No hidden fees. No credit card needed.
              </p>
            </div>

            <div className="mt-16 max-w-sm mx-auto">
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

        {/* FAQ */}
        <section className="py-24 sm:py-32 bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-display text-[30px] sm:text-[42px] text-gray-900 leading-tight text-center">
              Frequently asked questions
            </h2>

            <div className="mt-16 space-y-6">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-gray-200 bg-white open:shadow-sm transition-shadow"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-gray-900 list-none">
                    {faq.q}
                    <svg
                      className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
