from fastapi import FastAPI

from backend.api import expenses, insights, simulation, literacy


def create_app() -> FastAPI:
    app = FastAPI(
        title="MoSave API",
        version="0.1.0",
        description="AI-driven household finance mentor backend"
    )

    app.include_router(expenses.router, prefix="/api/expenses", tags=["expenses"])
    app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
    app.include_router(simulation.router, prefix="/api/simulation", tags=["simulation"])
    app.include_router(literacy.router, prefix="/api/literacy", tags=["literacy"])

    return app


app = create_app()
