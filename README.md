# MoSave — AI Household Finance Mentor

Monorepo scaffold featuring a Next.js frontend, FastAPI backend, AI placeholders, Supabase-ready schema, and a Chrome extension prototype.

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
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Backend quick start

```bash
cd backend
poetry install
poetry run uvicorn backend.app:app --reload
```

Configure `.env` for `OPENAI_API_KEY`, `SUPABASE_URL`, etc. Sample prompts available at `/api/insights/prompts`.

## Deployment flow

- Frontend → Vercel (connect repo, configure ENV)
- Backend → Render/ Railway (build `poetry install`, start `uvicorn backend.app:app`) with Supabase for auth/storage

## Optional modules

- LangChain pipelines for Mo’s lesson chaining
- Streamlit tutor for workshops (`streamlit run tutor.py` scaffold TBD)
- Supabase Edge Function to receive Chrome extension payloads

This scaffold ships with clear TODO markers where production integrations should be wired in.
