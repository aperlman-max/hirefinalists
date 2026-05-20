import Link from "next/link";
import { cookies } from "next/headers";
import { CONTRACTORS } from "@/lib/data";
import { SUBSCRIPTION_COOKIE } from "@/lib/access";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Dashboard — HireFinalists",
};

type SearchParams = Promise<{ session_id?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id: sessionId } = await searchParams;
  const cookieStore = await cookies();

  // After Stripe Checkout redirects here with a session_id, verify it and
  // set the subscription cookie so the user gets paywall access.
  if (sessionId && !cookieStore.get(SUBSCRIPTION_COOKIE)) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid" || session.status === "complete" || session.subscription) {
        const plan = (session.metadata?.plan as "starter" | "professional" | "enterprise" | "concierge") || "professional";
        cookieStore.set({
          name: SUBSCRIPTION_COOKIE,
          value: JSON.stringify({
            active: true,
            plan,
            email: session.customer_email ?? undefined,
          }),
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
          httpOnly: false,
        });
      }
    } catch (err) {
      console.warn("[dashboard] could not verify session:", err);
    }
  }

  const topContractors = CONTRACTORS.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10 flex items-start gap-4">
        <div className="text-3xl">🎉</div>
        <div>
          <h2 className="font-semibold text-green-900 text-lg">Welcome to HireFinalists!</h2>
          <p className="text-green-700 text-sm mt-1">
            Your trial is active. You now have full access to contractor profiles, contact info, and video interviews.
          </p>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your contractor matches</h1>
        <Link href="/contractors" className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
          Browse all →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topContractors.map((c) => (
          <Link
            key={c.id}
            href={`/contractors/${c.id}`}
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full bg-gray-100" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">{c.title}</p>
              </div>
              <span className="text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full flex-shrink-0">
                {c.interviewScore}/100
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {c.skills.slice(0, 3).map((s) => (
                <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{c.city}, {c.country}</span>
              <div className="text-right">
                <span className="font-semibold text-gray-900">${c.monthlyRate.toLocaleString()}/mo</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-indigo-600 font-medium">✓ Contact info unlocked</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
