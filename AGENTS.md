# FPF Reference MCP Usage

**FPF** is the upstream framework spec. **`fpf_reference`** is the MCP server name for bounded FPF lookup — not agent memory, not this repo name (`fpf-memory`). Hosted adopters use `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`; see [Connect MCP](https://fpf.sh/connect-mcp).

Use the `fpf_reference` MCP server whenever the task requires grounded answers, exact FPF IDs, canonical generated docs, or deterministic retrieval provenance from the local FPF spec runtime (spec path from `FPF_SPEC_SOURCE_PATH`, default `published/current/FPF-Spec.md`).

The legacy `fpf_memory` server name is compatibility-only. Do not use it in new setup snippets, final summaries, memory notes, or public-facing guidance unless the text is explicitly about the legacy alias.

Operators packaging the hosted MCP surface: see [docs/vercel-mcp-packaging.md](docs/vercel-mcp-packaging.md).

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

For every non-trivial Codex implementation or review-fix task, run the closest real end-to-end verification command for the surface that changed (docs build for docs, CLI invocation for CLI/MCP/evaluator changes, deploy dry-run for packaging) and share the command, the relevant output excerpt, and any caveats with the user before calling the work complete. Pure planning or explanation-only turns with no repo mutation do not require this.

Use the smallest verification profile that is admissible for the changed surface, then escalate when the claim or touched files require stronger evidence:

| Profile | Use when | Evidence expectation |
| --- | --- | --- |
| P0 Planning/no mutation | No repo files changed, or no completion claim is being made. | State that no verification was run. |
| P1 Tiny low-risk | Copy, typo, dead-link text, comments, or docs wording that does not alter public promises, routes, schemas, security, deploy, monitors, or generated artifacts. | Focused static inspection or one targeted command, plus a note explaining why broader checks were not needed. |
| P2 Normal docs/code | Docs, CLI, runtime, tests, or hosted copy changes with local behavior impact but no production-control or security boundary change. | Closest real surface check, such as a focused test, `bun run docs:build`, a CLI invocation, local smoke, or `bun run check` as applicable. |
| P3 Production/security/deploy/MCP/published | Public promise wording, MCP routes/tools/contracts, security headers, deploy packaging, monitor behavior, production smoke, or `published/current/**`. | Surface E2E or deploy dry-run plus a production evidence packet when production-facing behavior is implicated. |
| P4 Autonomous sync/deploy automation | Sync workers, scheduled monitors, merge/deploy automation, billing/spend controls, or any autonomous action path. | Budget, guard verdict, stop/replan trigger, and ledger-style evidence note. Human approval is still required for billing, purchases, destructive actions, and final external publishing. |

Escalate out of P1/P2 immediately when the change touches public-facing promise wording, acceptance criteria, setup instructions, MCP route shape, tool contracts, transport semantics, Vercel build/deploy packaging, aliases/domains, security or privacy logging, cost/spend controls, compatibility routes, generated publication artifacts, workflow files, branch-protection assumptions, merge automation, or deployment automation. A small PR should be small in local agent work, not weaker in evidence for high-risk surfaces. Subagents are case-by-case: use them for independent substantive tasks or material review independence, not by reflex for a two-line low-risk change.

## Learned User Preferences

- Prefer `bun run spec:download` or set `FPF_PUBLISH_SOURCE_PATH` to a local checkout of Anatoly Levenchuk's upstream FPF repo when refreshing the committed `published/current/**` surface.
- Keep `FPF_SPEC_SOURCE_PATH` aligned across shell or project `.env`, MCP host configuration (`server.json` `env`), and any other entrypoints so CLI, MCP, and docs builds use the same spec file.
- When strategy, architecture, adoption UX, or wording needs a real second opinion, prepare a focused external GPT-5.5 Pro critique prompt for the user to run manually; do not depend on that channel for repo facts, tests, deploy evidence, or automation.
- Default MCP adoption path is the hosted endpoint at `mcp.fpf.sh`; document local stdio only for operators and contributors (README, AGENTS.md), not first-time adopters.
- Change adoption copy (endpoints, FPF-vs-MCP explainer, client setup) in `src/core/public-copy.ts`; avoid hardcoding those strings in wiki markdown or hosted HTML.

## Learned Workspace Facts

- Default raw upstream for `bun run spec:download` is `ailev/FPF` on `main` at `FPF-Spec.md`, overridable with `FPF_UPSTREAM_SPEC_URL` and `FPF_DOWNLOAD_SPEC_OUTPUT`; downloaded output defaults to `.fpf-upstream/FPF-Spec.md` (gitignored).
- `FPF_SPEC_SOURCE_PATH` must be a local filesystem path; GitHub blob or other HTTPS URLs are not valid values (download or sync first, then point at the file).
- CI and full docs builds in this repo consume the committed `published/current/**` surface (spec + snapshot + manifest). The local pre-push hook prepares it with `bun run publish:current`.
- The FPF work evaluator is deterministic and local-only: it reads git/filesystem evidence, does not fetch GitHub, does not call an LLM, and does not fall back to `.fpf-upstream`.
- `docs/` is the Rspress content root; `docs/generated/**` is produced from the configured spec via `docs:generate` (gitignored), separate from the static site output under `doc_build/`.
- `src/core/public-copy.ts` is the SSOT for adoption copy (endpoints, tool names, FPF-vs-MCP explainer, first-successful-call copy, client setup); `tests/public-copy-parity.test.ts` locks wiki, hosted HTML, and connect-docs alignment.
- fpf.sh uses a two-manual IA: Manual A (adoption — `/`, `start-here`, `connect-mcp`, work packets) vs Manual B (reference catalog — `/patterns`, `/routes`, generated preface/patterns/routes).
- `docs/patterns.md` and `docs/routes.md` are gitignored short-URL alias pages emitted by the docs generator; `/` is task-first orientation, full pattern catalog at `/patterns`.
- Playwright e2e defaults to production `https://fpf.sh` unless `FPF_E2E_BASE_URL` is set (preview CI passes the Vercel preview URL).
