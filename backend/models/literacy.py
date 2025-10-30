from typing import List

from pydantic import BaseModel


class Lesson(BaseModel):
    id: str
    title: str
    type: str
    duration_minutes: int
    trigger: str
    summary: str
    actions: List[str]


class LessonResponse(BaseModel):
    next_lessons: List[Lesson]
    message: str
