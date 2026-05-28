"use client";

import { useState } from "react";

interface ReviewFormProps {
  onGenerate: (data: {
    review: string;
    businessName: string;
    tone: string;
  }) => Promise<void>;
  loading: boolean;
}

const tones = ["Professional", "Friendly", "Apologetic"];

export default function ReviewForm({ onGenerate, loading }: ReviewFormProps) {
  const [review, setReview] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [tone, setTone] = useState("Professional");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim() || !businessName.trim()) return;
    await onGenerate({ review, businessName, tone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Customer Review
        </label>
        <textarea
          id="review"
          rows={6}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Paste the customer review here..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-150 resize-none min-h-[160px]"
          required
        />
      </div>

      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Mario's Pizza"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-150"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reply Tone
        </label>
        <div className="flex gap-2">
          {tones.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                tone === t
                  ? "bg-accent text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !review.trim() || !businessName.trim()}
        className="w-full inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Reply"
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Powered by Claude AI
      </p>
    </form>
  );
}
