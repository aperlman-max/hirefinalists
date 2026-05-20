-- HireFinalists database schema. Run in the Supabase SQL editor.

-- 1. Contractors directory
create table if not exists public.contractors (
  id              text primary key,
  name            text not null,
  title           text not null,
  country         text not null,
  city            text not null,
  timezone        text not null,
  skills          text[] not null default '{}',
  years_experience int not null default 0,
  hourly_rate     int not null,
  monthly_rate    int not null,
  availability    text not null check (availability in ('immediate','2weeks','1month')),
  bio             text not null,
  languages       text[] not null default '{}',
  education       text,
  previous_companies text[] not null default '{}',
  interview_score int not null check (interview_score between 0 and 100),
  verified        boolean not null default false,
  avatar          text,
  linkedin_url    text,
  portfolio_url   text,
  category        text not null,
  english         text not null check (english in ('native','fluent','professional')),
  -- Contact info (gated behind subscription via app logic)
  contact_email   text,
  contact_phone   text,
  contact_linkedin text,
  interview_recording_url text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists contractors_category_idx on public.contractors(category);
create index if not exists contractors_country_idx on public.contractors(country);
create index if not exists contractors_availability_idx on public.contractors(availability);
create index if not exists contractors_score_idx on public.contractors(interview_score desc);

-- Row Level Security: profiles are publicly readable, contact fields stripped client-side.
alter table public.contractors enable row level security;
create policy "public read" on public.contractors for select using (true);

-- 2. Subscriptions (per-customer payment state synced from Stripe)
create table if not exists public.subscriptions (
  id                  uuid primary key default gen_random_uuid(),
  email               text not null,
  stripe_customer_id  text unique,
  stripe_subscription_id text unique,
  plan                text not null check (plan in ('starter','professional','enterprise','concierge')),
  billing             text not null default 'monthly' check (billing in ('monthly','annual')),
  status              text not null,
  current_period_end  timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists subscriptions_email_idx on public.subscriptions(email);
create index if not exists subscriptions_status_idx on public.subscriptions(status);

alter table public.subscriptions enable row level security;
-- Customers can read their own subscription via the API; we use service-role only here.
create policy "service role only" on public.subscriptions for all using (auth.role() = 'service_role');

-- 3. Lead captures (newsletter / "free guide" form)
create table if not exists public.leads (
  id        uuid primary key default gen_random_uuid(),
  email     text not null,
  source    text,
  ip        text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists leads_email_idx on public.leads(email);
alter table public.leads enable row level security;
create policy "service role only" on public.leads for all using (auth.role() = 'service_role');

-- 4. Contractor unlocks (audit log + usage caps for Starter tier)
create table if not exists public.unlocks (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  contractor_id text not null references public.contractors(id),
  created_at    timestamptz not null default now()
);
create index if not exists unlocks_email_idx on public.unlocks(email);
alter table public.unlocks enable row level security;
create policy "service role only" on public.unlocks for all using (auth.role() = 'service_role');
