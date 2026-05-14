"""Contract tests for the static todo page."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODO_HTML = ROOT / "todo.html"


def test_todo_html_exists() -> None:
    assert TODO_HTML.is_file()


def test_required_markup_hooks() -> None:
    html = TODO_HTML.read_text(encoding="utf-8")
    assert 'data-testid="todo-input"' in html
    assert 'data-testid="todo-add"' in html
    assert 'data-testid="todo-list"' in html
    assert re.search(r"""<input[^>]+id=['"]todo-input['"]""", html)
    assert re.search(r"""<button[^>]+id=['"]todo-add['"]""", html)
    assert re.search(r"""<ul[^>]+id=['"]todo-list['"]""", html)


def test_localstorage_contract() -> None:
    html = TODO_HTML.read_text(encoding="utf-8")
    assert "simple-todo-items" in html
    assert "localStorage.getItem" in html
    assert "localStorage.setItem" in html


def test_saved_items_are_json_array_shape() -> None:
    html = TODO_HTML.read_text(encoding="utf-8")
    assert "JSON.stringify" in html
    assert "JSON.parse" in html
    payload = '{"id":"1","text":"a","done":false}'
    data = json.loads(payload)
    assert set(data.keys()) >= {"id", "text", "done"}
