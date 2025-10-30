from datetime import date
from typing import List

from pydantic import BaseModel


class Expense(BaseModel):
    id: str
    category: str
    amount: float
    occurredOn: date
    householdId: str
    notes: str | None = None


class ExpenseSummary(BaseModel):
    month: str
    income: float
    expenses: float
    savings: float


class ExpensePayload(BaseModel):
    transactions: List[Expense]
    summary: List[ExpenseSummary]
