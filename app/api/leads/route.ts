import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email, source, details } = (await req.json()) as {
      email?: string;
      source?: string;
      details?: Record<string, unknown>;
    };

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") ?? null;
    const ua = req.headers.get("user-agent") ?? null;

    // Persist to Supabase when configured; otherwise just log.
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("leads").insert({
        email,
        source: source ?? null,
        ip,
        user_agent: ua,
        details: details ?? null,
      });
      if (error) {
        console.error("[leads] supabase insert failed:", error.message);
      }
    } else {
      console.log("[leads] (no Supabase) new signup:", { email, source, ip, ua, details });
    }

    const forwardUrl = process.env.LEAD_WEBHOOK_URL;
    if (forwardUrl) {
      try {
        await fetch(forwardUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source, at: new Date().toISOString() }),
        });
      } catch (err) {
        console.warn("[leads] forward webhook failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[leads] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
