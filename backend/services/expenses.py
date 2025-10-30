from backend.models.finance import ExpensePayload
from backend.services.data_loader import load_json


def fetch_expenses() -> ExpensePayload:
    data = load_json("sample_expenses.json")
    return ExpensePayload(**data)
