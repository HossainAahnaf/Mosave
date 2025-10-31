from typing import List

import numpy as np


class LessonRecommender:
    """Placeholder reinforcement learning loop.

    Replace with a proper contextual bandit or collaborative filtering model. This scaffold provides deterministic
    recommendations based on overspending categories.
    """

    def __init__(self, seed: int = 42) -> None:
        np.random.seed(seed)

    def recommend(self, signals: dict[str, float]) -> List[str]:
        choices = []
        if signals.get("overspend_groceries", 0) > 0.2:
            choices.append("lesson-budgeting-basics")
            choices.append("quiz-grocery-gameplan")
        if signals.get("balanced_month", 0) > 0.5:
            choices.append("lesson-intro-credit-scores")

        if not choices:
            choices.append("lesson-savings-reflex")

        return list(dict.fromkeys(choices))


recommender = LessonRecommender()
