"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import ReviewForm from "@/components/ReviewForm";
import ReplyCard from "@/components/ReplyCard";

interface Reply {
  id: string;
  review_text: string;
  reply_text: string;
  tone: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string | null } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reply, setReply] = useState("");
  const [history, setHistory] = useState<Reply[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user: u },
      } = await supabase.auth.getUser();
      if (!u) {
        router.push("/auth/login");
        return;
      }
      setUser(u);
      const { data: h } = await supabase
        .from("replies")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (h) setHistory(h as Reply[]);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleGenerate = useCallback(
    async (data: { review: string; businessName: string; tone: string }) => {
      setGenerating(true);
      setError("");
      setReply("");

      if (!user) return;

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            review: data.review,
            businessName: data.businessName,
            tone: data.tone,
            userId: user.id,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          setError(result.error || "Something went wrong");
          return;
        }

        if (!result.reply) {
          setError("AI returned an empty response");
          return;
        }

        setReply(result.reply);
        const s = createClient();
        const { data: h } = await s
          .from("replies")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50);
        if (h) setHistory(h as Reply[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to generate reply");
      } finally {
        setGenerating(false);
      }
    },
    [user]
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(reply);
  }, [reply]);

  const handleRegenerate = useCallback(() => {
    setReply("");
  }, []);

  const handleSave = useCallback(async () => {
    // Already saved on generate
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const handleCopyHistory = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleDeleteHistory = async (id: string) => {
    const supabase = createClient();
    await supabase.from("replies").delete().eq("id", id);
    setHistory((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <span className="font-display text-[22px] text-gray-900">
            ReplyAI
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            {
              label: "Dashboard",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              ),
              active: true,
            },
            {
              label: "History",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              active: false,
            },
            {
              label: "Settings",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              active: false,
            },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                item.active
                  ? "bg-accent-light text-accent border-l-2 border-accent"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-semibold shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {user?.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              Generate Reply
            </h1>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-6 space-y-8 max-w-5xl mx-auto w-full">
          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ReviewForm onGenerate={handleGenerate} loading={generating} />
            </div>

            <div>
              {reply ? (
                <ReplyCard
                  reply={reply}
                  onCopy={handleCopy}
                  onRegenerate={handleRegenerate}
                  onSave={handleSave}
                />
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    Your reply will appear here
                  </p>
                </div>
              )}
              {error && (
                <p className="mt-4 text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Reply History */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Reply History
            </h2>

            {history.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-sm text-gray-400">
                  No replies yet. Generate your first reply above.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-gray-500">
                        Review
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-gray-500">
                        Tone
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4 text-gray-700 max-w-[200px] truncate">
                          {r.review_text}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                            {r.tone}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleCopyHistory(r.reply_text)}
                              className="text-xs text-gray-400 hover:text-accent transition-colors"
                              aria-label="Copy reply"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => handleDeleteHistory(r.id)}
                              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Delete reply"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
