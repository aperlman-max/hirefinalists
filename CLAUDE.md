# Project: Hirefinalists Directory

## What this is
An online directory of vetted contractors based in Latin America, similar to remotelatinos.com but with better filtering, search, and contractor profiles. We also only do vetted candidates that have been interviewed and were finalists in an interview process.

## Stack
- Next.js 15 (App Router, TypeScript)
- Supabase (Postgres, Auth, Storage)
- Tailwind CSS
- Deployed on Vercel

## Conventions
- Server Components by default; Client Components only when needed
- Use Supabase SSR client patterns from @supabase/ssr
- Tailwind for all styling, no CSS modules
- Prefer server actions over API routes for mutations
