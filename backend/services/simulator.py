import math
from typing import List

import numpy as np

from backend.models.simulation import SimulationInput, SimulationPoint, SimulationResponse


def run_monte_carlo_simulation(payload: SimulationInput, horizon_months: int = 6) -> SimulationResponse:
    """Produce a lightweight Monte Carlo projection for demo purposes.

    Replace with a more rigorous engine or connect to a background worker for heavier workloads.
    """

    runs = 500
    monthly_variance = payload.variance or 0.1
    balances = np.zeros((runs, horizon_months))

    for run in range(runs):
        balance = payload.savings
        for month in range(horizon_months):
            income_noise = np.random.normal(loc=payload.income, scale=payload.income * monthly_variance)
            rent_noise = np.random.normal(loc=payload.rent, scale=payload.rent * monthly_variance)
            discretionary = max(0, income_noise - rent_noise - 500)

            if payload.scenario == "job_loss" and month in (0, 1):
                income_noise *= 0.4
            elif payload.scenario == "rent_increase":
                rent_noise *= 1.12
            elif payload.scenario == "medical_expense" and month == 1:
                discretionary -= 350
            elif payload.scenario == "gig_income" and month >= 2:
                income_noise *= 1.15

            balance = balance + discretionary
            balances[run, month] = balance

    points: List[SimulationPoint] = []
    for month in range(horizon_months):
        month_values = balances[:, month]
        points.append(
            SimulationPoint(
                month=f"Month {month + 1}",
                balance=float(np.mean(month_values)),
                percentile10=float(np.percentile(month_values, 10)),
                percentile90=float(np.percentile(month_values, 90))
            )
        )

    summary = _summarize(points, payload.goal)
    recommendations = _recommendations(points, payload.goal)

    return SimulationResponse(points=points, summary=summary, recommendations=recommendations)


def _summarize(points: List[SimulationPoint], goal: float) -> str:
    final_balance = points[-1].balance
    if final_balance >= goal:
        return "Great news! You are on track to meet your goal within the simulated window."
    shortfall = goal - final_balance
    return f"You are projected to fall short by roughly ${shortfall:,.0f}. Consider trimming expenses or boosting income."


def _recommendations(points: List[SimulationPoint], goal: float) -> List[str]:
    final = points[-1]
    recs: List[str] = []
    if final.balance < goal:
        recs.append("Automate an extra $40/week into savings to close the gap.")
    if final.percentile10 < goal * 0.6:
        recs.append("Build an emergency buffer to guard against downside scenarios.")
    recs.append("Schedule a Mo micro-lesson on recurring subscriptions.")
    return recs
