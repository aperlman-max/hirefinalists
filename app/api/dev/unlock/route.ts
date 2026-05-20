import { NextResponse } from "next/server";
import { SUBSCRIPTION_COOKIE } from "@/lib/access";

/**
 * Dev-only helper to toggle the paywall state without going through Stripe.
 * GET /api/dev/unlock         → sets the cookie (active subscription)
 * GET /api/dev/unlock?off=1   → clears the cookie
 *
 * Disabled in production unless ALLOW_DEV_UNLOCK=true.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEV_UNLOCK !== "true") {
    return NextResponse.json({ error: "Disabled in production." }, { status: 403 });
  }

  const url = new URL(req.url);
  const off = url.searchParams.get("off");
  const res = NextResponse.redirect(new URL("/contractors", req.url));

  if (off) {
    res.cookies.delete(SUBSCRIPTION_COOKIE);
  } else {
    res.cookies.set({
      name: SUBSCRIPTION_COOKIE,
      value: JSON.stringify({ active: true, plan: "professional", email: "demo@hirefinalists.com" }),
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return res;
}
