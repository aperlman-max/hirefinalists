# HireFinalists

A directory of vetted Latin American contractors — each one already an interview finalist at a real company. Built with Next.js 15, Supabase, Tailwind, and Stripe.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in keys
npm run dev
```

Open <http://localhost:3000>.

## Going live (revenue-ready in ~30 minutes)

The site is fully wired for payments via Stripe Checkout. To start accepting subscriptions:

### 1. Create three Stripe Prices

In the Stripe Dashboard → **Products** → **Add product**, create:

| Product       | Price       | Billing   |
| ------------- | ----------- | --------- |
| Starter       | $299 USD    | Monthly   |
| Professional  | $799 USD    | Monthly   |
| Enterprise    | $2,499 USD  | Monthly   |

Copy each Price ID (`price_...`).

### 2. Set environment variables

Add to `.env.local` (and your hosting provider):

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Configure the webhook

In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**:

- URL: `https://your-domain.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

### 4. Deploy

```bash
vercel --prod
```

Or push to GitHub and connect via the Vercel dashboard. Add the same env vars there.

That's it — the **Start Free Trial** buttons on the pricing page will redirect to Stripe Checkout and your webhook will receive paid customer events.

## Architecture

- `app/` — App Router pages
  - `page.tsx` — Landing page
  - `contractors/` — Searchable directory + `[id]` profiles
  - `pricing/` — Three-tier subscription pricing
  - `for-employers/` — Conversion landing page
  - `apply/` — Contractor application form
  - `get-started/` — Email capture + Stripe Checkout redirect
  - `dashboard/` — Post-checkout success destination
  - `api/stripe/checkout/` — Creates a Checkout Session
  - `api/stripe/webhook/` — Verifies + handles subscription events
- `components/` — Shared UI (Nav, ContractorDirectory)
- `lib/`
  - `data.ts` — Contractor seed data
  - `stripe.ts` — Lazy Stripe client + plan config

## Revenue model

| Plan         | Price       | Target customer                        |
| ------------ | ----------- | -------------------------------------- |
| Starter      | $299/mo     | Small teams making their first hire    |
| Professional | $799/mo     | Growing teams hiring 2–5 / quarter     |
| Enterprise   | $2,499/mo   | Companies scaling a LATAM team         |

To reach **$10,000 per day** ($300k MRR):
- ~120 Enterprise subs, **or**
- ~375 Professional subs, **or**
- A blend (e.g. 60 Enterprise + 190 Professional)

## Supabase setup

Supabase is wired but optional — the app reads from `lib/data.ts` if env vars aren't set.

1. Create a project at supabase.com.
2. Run `supabase/schema.sql` in the SQL editor to create the `contractors`, `subscriptions`, `leads`, and `unlocks` tables.
3. Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Once configured:
- `/contractors` reads from `public.contractors`
- Stripe webhook upserts subscription state into `public.subscriptions`
- Newsletter signups insert into `public.leads`

The fallback to in-memory data means the app keeps running while you migrate.

## Next steps for traction

1. Move seed contractor data into Supabase and build an admin panel for adding new candidates.
2. Add Supabase auth so the paywall actually gates contact info on the profile pages.
3. SEO content — write blog posts targeting "hire LATAM developer", "Mexico remote engineer", etc.
4. Cold outbound — the Sales / Marketing / Operations contractors in the directory are immediate qualified leads for the platform itself.
