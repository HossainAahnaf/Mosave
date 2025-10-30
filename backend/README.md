# MoSave Backend

FastAPI scaffold for the MoSave AI household finance mentor. This service exposes REST endpoints for expenses, AI insights,
simulations, and literacy content. It is designed to work with Supabase (auth + Postgres) and the Next.js frontend.

## Getting started

```bash
cd backend
poetry install
poetry run uvicorn backend.app:app --reload
```

Environment variables can be stored in `.env` (see `app/config.py` for available fields).

## Endpoints

- `GET /api/expenses` – sample expenses + summaries (replace with Supabase realtime)
- `POST /api/insights/chat` – placeholder AI mentor using OpenAI (mocked by default)
- `POST /api/simulation` – Monte Carlo simulator (NumPy-based stub)
- `GET /api/literacy` – lesson recommendations seeded from `/public/data`

## Data + ML

- `ml/recommender.py` – stub reinforcement learning loop
- `ml/predictor.py` – simple regression placeholder for savings projections
- `db/schema.sql` – Supabase/Postgres schema
- `db/seed_data.sql` – development seed data

Swap these with production-ready models or connect to LangChain pipelines.
