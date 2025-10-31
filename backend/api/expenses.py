from fastapi import APIRouter

from backend.models.finance import ExpensePayload
from backend.services.expenses import fetch_expenses

router = APIRouter()


@router.get("", response_model=ExpensePayload)
async def list_expenses() -> ExpensePayload:
    """Return seed expense data. Replace with Supabase realtime queries in production."""

    return fetch_expenses()
