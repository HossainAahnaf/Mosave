import json
from pathlib import Path
from typing import Any

from backend.app.config import get_settings


def load_json(filename: str) -> Any:
    settings = get_settings()
    file_path = settings.data_dir / filename
    if not file_path.exists():
        raise FileNotFoundError(f"Seed file {filename} not found in {settings.data_dir}")

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)
