import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/auth/login?error=no_code", req.url)
      );
    }

    const supabase = await createAdminSupabase();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
      return NextResponse.redirect(
        new URL("/auth/login?error=auth_failed", req.url)
      );
    }

    // Create profile if not exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", data.user.id)
      .single();

    if (!existingProfile) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        plan: "free",
        monthly_reply_count: 0,
      });

      // Send welcome email via Resend
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "ReplyAI <welcome@replyai.com>",
            to: data.user.email,
            subject: "Welcome to ReplyAI!",
            html: `<h1>Welcome to ReplyAI!</h1><p>You're all set to start replying to reviews. Get started at <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">your dashboard</a>.</p>`,
          }),
        });
      } catch {
        // Welcome email is non-critical
      }
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch {
    return NextResponse.redirect(
      new URL("/auth/login?error=unexpected", req.url)
    );
  }
}
