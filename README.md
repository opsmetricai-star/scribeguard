# ScribeGuard

Governed AI platform: public marketing site plus a working app (Next.js 16, React 19, TypeScript, Tailwind 4, Supabase, Gemini).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values.
3. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql` (tables, RLS, signup trigger, credit function, storage bucket).
4. In Supabase Auth settings, add `http://localhost:3000/auth/callback` (and your production URL) to the redirect allow-list.
5. `npm run dev`

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Credit accounting, webhook, contact form |
| `GEMINI_API_KEY` | server only | Model access |
| `GEMINI_MODEL` | server | Defaults to `gemini-3.8-flash` |
| `NEXT_PUBLIC_SITE_URL` | public | Auth redirects and metadata |
| `SELAR_WEBHOOK_SECRET` | server only | Shared secret for `/api/webhooks/selar` |

Never commit `.env.local`. Set the same variables in Vercel project settings to deploy.

## What is implemented

- Public site: home (12 sections), platform, agents, guardrails, models, knowledge, security, 6 solution pages, pricing, customers, resources, docs, about, contact, privacy/terms placeholders.
- Auth: sign-up, login, logout, password recovery and reset, protected `/app` routes (proxy + server-side check).
- App: dashboard, assistant (chat), guardrail checks with saved policies, agent builder and runner, knowledge uploads (private Storage), analytics charts, billing, settings, notifications.
- AI: server-side Gemini calls, zod-validated structured guardrail output, per-plan monthly credits spent atomically in Postgres, credits refunded when a model call fails.
- RLS on every table; users cannot edit their plan or credits.

## Payments

Plans map to the supplied Selar links: `47plan` = Starter ($47), `57plan` = Pro ($57), `97plan` = Business ($97). Confirm that mapping matches the products you created.

A checkout redirect never upgrades an account. Plans change only through `POST /api/webhooks/selar` with header `x-webhook-secret`, body `{"email","plan","reference"}`. **I did not verify Selar's real webhook format or signature scheme.** Until you adapt that route to Selar's actual payload, activate plans manually by calling the endpoint (or updating `profiles.plan`) after confirming payment in Selar.

## Known limitations

- Supabase keys were not provided, so auth, database, storage and the full AI flow were not exercised end to end. Only the build, public pages and a Gemini key check were tested.
- The reference site (writer.com) blocked automated access, so the design was built from general knowledge of its style, not a section-by-section audit. Colors were intentionally shifted.
- Seats are not enforced (accounts are single-user). Agent count and monthly credits are enforced.
- Knowledge: only `.txt`, `.md`, `.csv` are read by agents; PDF/DOCX are stored only.
- Customer scenarios, stats and logos are illustrative placeholders, labeled as such. Replace them with real ones.
- Resource articles, privacy and terms are placeholders.
