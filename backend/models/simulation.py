from typing import List

from pydantic import BaseModel, Field


class SimulationInput(BaseModel):
    income: float = Field(..., gt=0)
    rent: float = Field(..., ge=0)
    savings: float = Field(..., ge=0)
    goal: float = Field(..., ge=0)
    scenario: str
    variance: float = Field(0.1, ge=0, le=0.5)


class SimulationPoint(BaseModel):
    month: str
    balance: float
    percentile10: float
    percentile90: float


class SimulationResponse(BaseModel):
    points: List[SimulationPoint]
    summary: str
    recommendations: List[str]
