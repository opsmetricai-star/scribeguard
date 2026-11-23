# ScribeGuard

Governed AI platform: public marketing site plus a working app (Next.js 16, React 19, TypeScript, Tailwind 4, Supabase, Gemini).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values.
3. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql` then `0002_grants.sql` (tables, RLS, signup trigger, credit function, storage bucket, API role grants).
4. In Supabase Auth settings, add `http://localhost:3000/auth/callback` (and your production URL) to the redirect allow-list.
5. `npm run dev`

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Credit accounting, webhook, contact form |
| `GEMINI_API_KEY` | server only | Model access |
| `GEMINI_MODEL` | server | Defaults to `gemini-3.5-flash` |
| `GEMINI_FALLBACK_MODEL` | server | Used when the main model is overloaded; defaults to `gemini-3.1-flash-lite` |
| `NEXT_PUBLIC_SITE_URL` | public | Auth redirects and metadata |
| `SELAR_WEBHOOK_SECRET` | server only | Shared secret for `/api/webhooks/selar` |

Never commit `.env.local`. Set the same variables in Vercel project settings to deploy.

## What is implemented

- Public site: home, platform, agents, guardrails, models, knowledge, security, six solution pages, pricing, docs, about, privacy and terms. All marketing calls to action are Sign up or Log in.
- Auth: sign-up, login, logout, password recovery and reset, protected `/app` routes (proxy + server-side check).
- App: dashboard, assistant (chat), guardrail checks with saved policies, agent builder and runner, knowledge uploads (private Storage), analytics charts, billing, settings, notifications.
- AI: server-side Gemini calls, zod-validated structured guardrail output, per-plan monthly credits spent atomically in Postgres, credits refunded when a model call fails.
- RLS on every table; users cannot edit their plan or credits.

## Payments

Plans map to the supplied Selar links: `47plan` = Starter ($47), `57plan` = Pro ($57), `97plan` = Business ($97). Confirm that mapping matches the products you created.

A checkout redirect never upgrades an account. Plans change only through `POST /api/webhooks/selar` with header `x-webhook-secret`, body `{"email","plan","reference"}`. **I did not verify Selar's real webhook format or signature scheme.** Until you adapt that route to Selar's actual payload, activate plans manually by calling the endpoint (or updating `profiles.plan`) after confirming payment in Selar.

## Known limitations

- Tested against a live Supabase project and Gemini: login/logout, protected routes, RLS and tamper checks, storage isolation, guardrail check, agent run grounded in an uploaded document, assistant chat, plan and credit limits, webhook auth and activation, analytics. NOT tested: email sign-up confirmation and password-reset emails, the Selar payment flow itself, and Vercel deployment. Review the privacy policy and terms with counsel before launch.
- The reference site (writer.com) blocked automated access, so the design was built from general knowledge of its style, not a section-by-section audit. Colors were intentionally shifted.
- Seats are not enforced (accounts are single-user). Agent count and monthly credits are enforced.
- Knowledge: only `.txt`, `.md`, `.csv` are read by agents; PDF/DOCX are stored only.
- There are no customer logos, testimonials or case studies; add real ones only when you have them.
