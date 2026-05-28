interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  onCtaClick?: () => void;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  highlighted,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-xl bg-white overflow-hidden transition-all duration-200 ${
        highlighted
          ? "border-2 border-accent shadow-[0_0_32px_-8px_rgba(79,110,247,0.15)]"
          : "border border-gray-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 left-0 right-0">
          <div className="bg-accent text-white text-xs font-semibold text-center py-1.5 tracking-wide uppercase">
            Most popular
          </div>
        </div>
      )}

      <div className={`p-8 ${highlighted ? "pt-16" : ""}`}>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-display text-gray-900">{price}</span>
          <span className="text-sm text-gray-400">/ month</span>
        </div>

        <ul className="mt-8 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <svg
                className="w-4 h-4 text-accent mt-0.5 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onCtaClick}
          className={`mt-8 w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-150 ${
            highlighted
              ? "bg-accent text-white hover:bg-accent-hover shadow-sm"
              : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
