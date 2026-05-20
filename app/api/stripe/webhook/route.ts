import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json(
      { error: "Webhook signature or STRIPE_WEBHOOK_SECRET missing." },
      { status: 400 }
    );
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("[stripe-webhook] verify failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = await getSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe-webhook] checkout completed:", {
        sessionId: session.id,
        customer: session.customer,
        subscription: session.subscription,
        email: session.customer_email,
        plan: session.metadata?.plan,
      });
      if (supabase && session.customer_email && session.subscription) {
        const { error } = await supabase.from("subscriptions").upsert(
          {
            email: session.customer_email,
            stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
            stripe_subscription_id: typeof session.subscription === "string" ? session.subscription : null,
            plan: (session.metadata?.plan as string) ?? "professional",
            billing: (session.metadata?.billing as string) ?? "monthly",
            status: "active",
          },
          { onConflict: "stripe_subscription_id" }
        );
        if (error) console.error("[stripe-webhook] supabase upsert failed:", error.message);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`[stripe-webhook] ${event.type}:`, {
        subscriptionId: sub.id,
        customer: sub.customer,
        status: sub.status,
        plan: sub.metadata?.plan,
      });
      if (supabase) {
        const periodEnd = sub.items?.data?.[0]?.current_period_end;
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: sub.status,
            current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);
        if (error) console.error("[stripe-webhook] supabase update failed:", error.message);
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.warn("[stripe-webhook] payment failed:", {
        invoiceId: invoice.id,
        customer: invoice.customer,
        amount_due: invoice.amount_due,
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
