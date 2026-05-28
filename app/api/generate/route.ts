import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";
import { getAnthropic } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { review, businessName, tone, userId } = body;

    if (!review || !businessName || !tone || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabase();

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!profile) {
      const { data: user } = await supabase.auth.admin.getUserById(userId);
      if (!user?.user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      await supabase.from("profiles").insert({
        id: userId,
        email: user.user.email,
        monthly_reply_count: 0,
      });
    }

    // Call Anthropic
    const prompt = `You are a professional business owner named ${businessName}. Write a polite, helpful, on-brand reply to this customer review. Tone: ${tone}. Keep it under 150 words. Sound human, not robotic. Do not start with 'Thank you for your review'. Review: ${review}`;

    const anthropic = getAnthropic();
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const replyText =
      message.content[0]?.type === "text"
        ? message.content[0].text.trim()
        : "";

    // Save to Supabase
    await supabase.from("replies").insert({
      user_id: userId,
      review_text: review,
      reply_text: replyText,
      tone,
    });

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate reply" },
      { status: 500 }
    );
  }
}
