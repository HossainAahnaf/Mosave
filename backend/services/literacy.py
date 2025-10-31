from typing import List

from backend.models.literacy import Lesson, LessonResponse
from backend.services.data_loader import load_json


def recommended_lessons(trigger: str | None = None) -> LessonResponse:
    data = load_json("sample_lessons.json")
    lessons: List[Lesson] = [Lesson(**item) for item in data]

    if trigger:
        lessons = [lesson for lesson in lessons if lesson.trigger == trigger] or lessons

    message = "Lessons curated by Mo. Replace with GPT-powered personalization using your Supabase event stream."
    return LessonResponse(next_lessons=lessons[:3], message=message)
