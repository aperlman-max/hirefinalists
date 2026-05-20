/**
 * Paywall access helpers.
 *
 * Reads a signed-ish cookie (`hf_subscription`) set by the Stripe checkout
 * success page. In production this should be replaced with a real
 * Supabase-backed session lookup, but the API shape stays the same.
 */
import { cookies } from "next/headers";

export type SubscriptionInfo = {
  active: boolean;
  plan?: "starter" | "professional" | "enterprise" | "concierge";
  email?: string;
};

const COOKIE_NAME = "hf_subscription";

export async function getSubscription(): Promise<SubscriptionInfo> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return { active: false };
  try {
    const parsed = JSON.parse(raw) as SubscriptionInfo;
    if (parsed.active) return parsed;
    return { active: false };
  } catch {
    return { active: false };
  }
}

export function buildSubscriptionCookie(info: SubscriptionInfo): string {
  // 30-day cookie; in production, sign this server-side or persist in DB.
  const value = encodeURIComponent(JSON.stringify(info));
  const maxAge = 60 * 60 * 24 * 30;
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export const SUBSCRIPTION_COOKIE = COOKIE_NAME;
