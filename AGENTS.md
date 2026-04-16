# fpf_memory MCP Usage

Use the `fpf_memory` MCP server whenever the task requires grounded answers, exact FPF IDs, canonical generated docs, or deterministic retrieval provenance from the local FPF spec runtime (spec path from `FPF_SPEC_SOURCE_PATH`, default `.fpf-upstream/FPF-Spec.md` after `bun run spec:download`).

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

## Learned User Preferences

- Prefer not vendoring the FPF spec markdown in this repository; use `bun run spec:download` or set `FPF_SPEC_SOURCE_PATH` to a local checkout (for example `fpf-sync`) instead of committing a copy at the repo root.
- Keep `FPF_SPEC_SOURCE_PATH` aligned across shell or project `.env`, MCP host configuration (`server.json` `env`), and any other entrypoints so CLI, MCP, and docs builds use the same spec file.

## Learned Workspace Facts

- Default raw upstream for `bun run spec:download` is `venikman/fpf-sync` on `main` at `FPF/FPF-Spec.md`, overridable with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`; downloaded output defaults to `.fpf-upstream/FPF-Spec.md` (gitignored).
- `FPF_SPEC_SOURCE_PATH` must be a local filesystem path; GitHub blob or other HTTPS URLs are not valid values (download or sync first, then point at the file).
- CI and full docs builds in this repo expect the spec file to exist before checks; workflows run `bun run spec:download` when using the default downloaded layout.
- `docs/` is the Rspress content root; hand-authored pages live there, while `docs/generated/**` is produced from the configured spec via `docs:generate` (gitignored; CI runs `docs:generate` before lint), separate from the static site output under `doc_build/`.
