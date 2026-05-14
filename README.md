# test

Greenfield project managed under a Pod workspace.

## Status

This branch includes a small **Express** server that stores todos in
`data/todos.json`, exposes a **REST API** under `/api/todos`, and serves the
**SPA** from `public/`.

Architecture-as-Code docs for the wider project live at the workspace level
under `projects/test/docs/` (when present) and are owned by the
`pod-project-context` skill.

### Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000 — the UI talks to the API on the same origin.

## Source links

- Proposal: `20260512-todo-app.proposal`
- Breakdown: `20260512-todo-app.breakdown.proposal`
- Spec for this branch: `20260512-00-seed-project-context-docs.spec`
  (workspace-level, doc-only)

Further work (auth, observability, deployment) can follow the breakdown’s
remaining tasks.
