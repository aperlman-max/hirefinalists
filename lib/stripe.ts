import Stripe from "stripe";

export type PlanKey = "starter" | "professional" | "enterprise" | "concierge";

export const PLANS: Record<PlanKey, { name: string; price: number; priceIdEnv: string }> = {
  starter: {
    name: "Starter",
    price: 299,
    priceIdEnv: "STRIPE_PRICE_STARTER",
  },
  professional: {
    name: "Professional",
    price: 799,
    priceIdEnv: "STRIPE_PRICE_PROFESSIONAL",
  },
  enterprise: {
    name: "Enterprise",
    price: 2499,
    priceIdEnv: "STRIPE_PRICE_ENTERPRISE",
  },
  concierge: {
    name: "Concierge (Done-for-You)",
    price: 9999,
    priceIdEnv: "STRIPE_PRICE_CONCIERGE",
  },
};

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local to enable checkout."
    );
  }
  return new Stripe(key);
}

export function getPriceId(plan: PlanKey): string {
  const envName = PLANS[plan].priceIdEnv;
  const id = process.env[envName];
  if (!id) {
    throw new Error(
      `${envName} is not set. Create a Stripe Price for ${PLANS[plan].name} and add the ID to .env.local.`
    );
  }
  return id;
}
