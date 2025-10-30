from textwrap import dedent
from typing import List

from backend.app.config import get_settings
from backend.models.chat import ChatResponse


def generate_mock_insights(prompt: str, history_count: int) -> ChatResponse:
    settings = get_settings()
    base_reply = dedent(
        f"""
        You saved 12% this month — that's stronger than 60% of MoSave members your age. I spotted a 25% jump in groceries;
        let's explore meal planning ideas together.
        """
    ).strip()

    micro_lesson = "Budgeting Basics: Align your 50/30/20 targets with real household categories."
    insights: List[str] = [
        "Savings rate is trending upward for the second month in a row.",
        "Grocery spending spiked in week 3; batch cooking could trim $45/month.",
        "Recurring subscriptions renew next week — review to avoid surprises."
    ]

    # Note: In production, call OpenAI or LangChain here with `prompt` and `history_count`.
    return ChatResponse(reply=base_reply, micro_lesson=micro_lesson, insights=insights)
