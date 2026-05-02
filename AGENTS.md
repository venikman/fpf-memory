# fpf_memory MCP Usage

Use the `fpf_memory` MCP server whenever the task requires grounded answers, exact FPF IDs, canonical generated docs, or deterministic retrieval provenance from the local FPF spec runtime (spec path from `FPF_SPEC_SOURCE_PATH`, default `published/current/FPF-Spec.md`).

Public tools (deployed MCP surface):

- `browse_fpf_catalog` for task-oriented discovery by part, status, or kind
- `search_fpf` for full-text search across compiled nodes
- `ask_fpf` for markdown-first answers
- `query_fpf_spec` for structured answer envelopes
- `read_fpf_doc` for exact generated markdown pages
- `get_fpf_index_status` for runtime freshness checks

Expert tools (local full-surface runtime only, via `FPF_MCP_SURFACE=full bun run mcp`):

- `inspect_fpf_node`, `inspect_fpf_anchor`, `expand_fpf_citations` for deep inspection
- `trace_fpf_path` for retrieval evidence and provenance

Admin tools (index management):

- `refresh_fpf_index` to rebuild the local artifact set

FPF work-evaluation surface:

- `bun run evaluate:work` reviews the current PR branch against the local FPF rubric for the three-surface split
- `bun run cli -- evaluate-work --target working-tree --format json` emits the same review as machine-readable JSON
- `--spec <path>` may point at a local FPF markdown file for comparison; the default remains `FPF_SPEC_SOURCE_PATH` or `published/current/FPF-Spec.md`

## Codex Verification Rule

For every non-trivial Codex implementation or review-fix task, run the closest real end-to-end (E2E) verification path, record that run as video, and share the recording path or link with the user before calling the work complete.

- Use `bun run e2e:report -- docs` for human-facing docs/wiki changes.
- Use `bun run e2e:report -- cli` for CLI, MCP, retrieval, or evaluator changes.
- Use `bun run e2e:report -- deploy-dry-run` for packaging or deploy changes.
- Use `bun run e2e:report -- --name <task-slug> --command "<command>"` when none of the presets matches the change.
- Share the generated `.runtime/e2e-recordings/<timestamp>-<task>/e2e-report.webm` path, plus the `report.md` path and any visible caveats, in the final response.
- If video recording cannot be produced, stop and report the blocker instead of silently substituting logs, screenshots, or command output. If Chromium is missing, run `bunx playwright install chromium` and retry.
- Pure planning or explanation-only turns with no repo mutation do not require an E2E recording.

## Learned User Preferences

- Prefer not treating a repo-root spec checkout as the source of truth; use `bun run spec:download` or set `FPF_PUBLISH_SOURCE_PATH` to a local checkout (for example `fpf-sync`) when refreshing the committed `published/current/**` surface.
- Keep `FPF_SPEC_SOURCE_PATH` aligned across shell or project `.env`, MCP host configuration (`server.json` `env`), and any other entrypoints so CLI, MCP, and docs builds use the same spec file.
- When strategy, architecture, adoption UX, or wording needs a real second opinion, prepare a focused external GPT-5.5 Pro critique prompt for the user to run manually; do not depend on that channel for repo facts, tests, deploy evidence, or automation.

## Learned Workspace Facts

- Default raw upstream for `bun run spec:download` is `venikman/fpf-sync` on `main` at `FPF/FPF-Spec.md`, overridable with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`; downloaded output defaults to `.fpf-upstream/FPF-Spec.md` (gitignored).
- `FPF_SPEC_SOURCE_PATH` must be a local filesystem path; GitHub blob or other HTTPS URLs are not valid values (download or sync first, then point at the file).
- CI and full docs builds in this repo consume the committed `published/current/**` surface (spec + snapshot + manifest). The local pre-push hook prepares it with `bun run publish:current`.
- The FPF work evaluator is deterministic and local-only: it reads git/filesystem evidence, does not fetch GitHub, does not call an LLM, and does not fall back to `.fpf-upstream`.
- `docs/` is the Rspress content root; `docs/generated/**` is produced from the configured spec via `docs:generate` (gitignored), separate from the static site output under `doc_build/`.
