# MoSave — AI Household Finance Mentor

Monorepo featuring a Next.js frontend, FastAPI backend, Supabase persistence, AI placeholders, and a Chrome extension prototype. Phase 1 now ships with household onboarding, Supabase-authenticated dashboards, and a basic what-if simulator.

## Structure

- `frontend/` – Next.js 14 + Tailwind app with dashboard, simulator, learning, and community pages
- `backend/` – FastAPI service exposing expenses, insights, simulation, and literacy routes
- `public/data/` – JSON fixtures for expenses, users, and lessons
- `chrome-extension/` – Manifest v3 extension to capture online receipts

## Frontend quick start

```bash
cd frontend
npm install
npm run dev
```

Environment variables:

- `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional for backend worker calls:

- `SUPABASE_SERVICE_ROLE_KEY` (FastAPI Monte Carlo / data manipulation)

## Backend quick start

```bash
cd backend
poetry install
poetry run uvicorn backend.app:app --reload
```

Configure `.env` for `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, etc. Sample prompts available at `/api/insights/prompts`.

## Supabase setup

1. Create a Supabase project and enable email/password + (optionally) Google auth.
2. Run the SQL in `backend/db/schema.sql` inside the Supabase SQL editor to create tables + RLS policies.
3. (Optional) Seed demo data with `backend/db/seed_data.sql`, replacing the placeholder UUIDs with IDs from `auth.users`.
4. Add the Supabase URL + anon key to your frontend `.env.local`. Restart the dev server.

When Supabase variables are missing, the app falls back to bundled sample data so the UI remains demoable.

## Deployment flow

- Frontend → Vercel (connect repo, configure ENV)
- Backend → Render/ Railway (build `poetry install`, start `uvicorn backend.app:app`) with Supabase for auth/storage

## Optional modules

- LangChain pipelines for Mo’s lesson chaining
- Streamlit tutor for workshops (`streamlit run tutor.py` scaffold TBD)
- Supabase Edge Function to receive Chrome extension payloads
- Automated Monte Carlo background jobs (Phase 3)

This scaffold ships with clear TODO markers where production integrations should be wired in.
