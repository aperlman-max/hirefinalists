import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPriceId, PLANS, PlanKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = (await req.json()) as { plan?: PlanKey; email?: string };
    if (!plan || !(plan in PLANS)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const stripe = getStripe();
    const priceId = getPriceId(plan);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { plan },
        trial_period_days: plan === "enterprise" ? undefined : 7,
      },
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe/checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
