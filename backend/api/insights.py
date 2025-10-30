from fastapi import APIRouter

from backend.models.chat import ChatRequest, ChatResponse
from backend.services.insights import generate_mock_insights

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat_with_mo(payload: ChatRequest) -> ChatResponse:
    """Placeholder AI mentor endpoint.

    In production, stream GPT-4 responses or connect to a fine-tuned small model.
    """

    return generate_mock_insights(payload.prompt, len(payload.history))


@router.get("/prompts")
async def example_prompts() -> dict[str, str]:
    return {
        "insight_generator": "You are Mo, an empathetic financial mentor for young adults. Given this monthly expense data: {user_data}, generate three insights, one improvement tip, and one micro-lesson that matches the user’s financial behavior.",
        "scenario_simulation": "Given current income = {income}, rent = {rent}, savings = {savings}, and goal = {goal}, project 6-month outcomes with a 10% variance in costs. Summarize visually and suggest 2 actions."
    }
