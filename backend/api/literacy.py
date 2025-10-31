from fastapi import APIRouter, Query

from backend.models.literacy import LessonResponse
from backend.services.literacy import recommended_lessons

router = APIRouter()


@router.get("", response_model=LessonResponse)
async def list_lessons(trigger: str | None = Query(default=None)) -> LessonResponse:
    return recommended_lessons(trigger)
