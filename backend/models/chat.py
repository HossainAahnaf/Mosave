from typing import List

from pydantic import BaseModel


class ChatTurn(BaseModel):
    id: str
    role: str
    content: str


class ChatRequest(BaseModel):
    prompt: str
    history: List[ChatTurn]


class ChatResponse(BaseModel):
    reply: str
    micro_lesson: str | None = None
    insights: List[str] | None = None
