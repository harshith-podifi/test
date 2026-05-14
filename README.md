# test

Greenfield project managed under a Pod workspace.

## Status

The repository includes a minimal static todo demo under `todo/`. Architecture-as-Code
docs for this project may live at the workspace level under
`projects/test/docs/` and are owned by the `pod-project-context` skill.

## Source links

- Proposal: `20260512-todo-app.proposal`
- Breakdown: `20260512-todo-app.breakdown.proposal`
- Spec for this branch: `20260512-00-seed-project-context-docs.spec`
  (workspace-level, doc-only)

Subsequent project-repo work (backend scaffold, REST API + JSON store, SPA,
observability) will land on later branches authored from the breakdown's
remaining tasks.

## Todo demo

Static todo UI with local persistence: open [`todo/index.html`](todo/index.html)
in a browser. Approved spec: [`specs/simple-todo-webpage.md`](specs/simple-todo-webpage.md).
