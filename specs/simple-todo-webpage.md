---
status: approved
type: feature
id: simple-todo-webpage
title: Simple todo webpage
short_summary: Standalone HTML todo list with local persistence
affected_project_keys:
  - test
worktree_name: cursor/simple-todo-webpage-2a44
base_branch: main
target_branch: main
intent_prompt: Ship a minimal single-file todo page with add, complete, delete, and localStorage persistence.
approved_at: "2026-05-14T00:00:00Z"
execution_history:
  - round: 1
    executed_at: "2026-05-14T11:06:02Z"
    commit_hash: "a71b7a3"
    verification_note: "Manual smoke open todo/index.html — add, toggle, remove, refresh persistence."
---

# Simple todo webpage

## Context

Deliver a dependency-free todo interface suitable for opening directly in a browser from this repository, aligned with the seed README’s direction toward a SPA-style experience.

## Requirements

- Single-page UI: add tasks via text input and explicit submit (Enter key must also submit).
- List shows pending items with a checkbox to mark complete and a control to remove an item.
- Completed items read differently from pending items (strikethrough and muted styling).
- Persist the list in `localStorage` under a stable key and reload it on page load.
- Works offline with no network requests or external scripts.

## Patterns to Follow

- Semantic HTML (`main`, `header`, `label`, `ul`/`li`) and keyboard-accessible controls.

## Files to MODIFY

- None (greenfield files under `todo/` and this spec).

## Open Questions

None.

## Test Expectations

- Manual smoke only (open `todo/index.html`, add items, refresh, confirm persistence).
