from fastapi import APIRouter

from backend.models.simulation import SimulationInput, SimulationResponse
from backend.services.simulator import run_monte_carlo_simulation

router = APIRouter()


@router.post("", response_model=SimulationResponse)
async def simulate(payload: SimulationInput) -> SimulationResponse:
    return run_monte_carlo_simulation(payload)
