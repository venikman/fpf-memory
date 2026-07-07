# Glaze Companion Design (Exploration)

## Objective

Decide whether Glaze (<https://www.glaze.app/>, Raycast's AI desktop-app builder for macOS) can benefit this project, and — for the one admissible integration — specify it precisely enough that building it cannot blur the `fpf_reference` interface contract.

## Verdict

- Glaze is admissible **only** as an optional, read-only, native macOS client over the hosted public `fpf_reference` MCP surface. It is one more consumer of the published interface contract, exactly like Codex or Claude Code.
- Glaze brings **no value to the core**: the deterministic vectorless runtime, the publication pipeline, and the agent-facing MCP surface. Glaze generates apps with a non-deterministic LLM step; the publication path here is deterministic and evidence-audited. A generated app may consume the contract; it must never participate in producing published artifacts.
- Priority: opportunistic, low. Nothing in this repo's runtime, CI, or published surfaces may depend on the companion existing.

## Context

The hosted MCP endpoint and the static reference site already serve the two primary audiences (agents and humans in a browser). A native macOS companion is a plausible third client surface: menu-bar quick lookup, offline reading of already-fetched pages, and a windowed reader for people who live outside the browser. Glaze makes that buildable from a single prompt without adding Swift to anyone's plate, and its store gives a small distribution channel.

Glaze constraints as of this design (2026-07-07): macOS Tahoe + Apple Silicon only; apps are local-first and run without a server; apps can call external APIs and AI-model integrations; distribution is unlisted sharing or the public Glaze Store.

## FPF Grounding

`ask_fpf` on the production runtime routed this exact decision ("external client surface as optional read-only consumer of a published interface contract") to **route:boundary-unpacking**, ordered entry `A.6` → `A.6.B` → `A.6.C`, confidence 0.92. The route's acceptance check: mixed boundary statements get stable claim IDs in a claim register, and each atomic claim routes to one owner layer. The claim register below is this spec's implementation of that check.

Repo QA anchors reused: `B.5.1` (this doc is exploration/shaping, separated from operation), `A.10`/`G.6` (snapshot hash and builtAt as the evidence spine), `E.19` (explicit, separate quality gates), `C.24` (bounded tool-call behavior for the client).

The runtime snapshot used throughout this design: `sha256:f916341a8b3711b847c8a701f8b71e0ee155d9e5517be3ed36363fa6621ccf2b`, built `2026-07-03T21:18:14Z`, `fresh: true` — identical hash reported by `get_fpf_index_status` and echoed in every payload captured in the Evidence section.

## Claim register

| ID | Atomic claim | Owner layer |
| --- | --- | --- |
| GLZ-1 | The companion calls only tools from the contract's six-tool public roster (`browse_fpf_catalog`, `search_fpf`, `ask_fpf`, `query_fpf_spec`, `read_fpf_doc`, `get_fpf_index_status`) — and ships using five of them: `query_fpf_spec` is intentionally unused (agent-facing structured envelope; `ask_fpf` is its human-facing twin). | Interface contract (mcp.fpf.sh) |
| GLZ-2 | Expert tools (`inspect_*`, `trace_fpf_path`, `refresh_fpf_index`) are never assumed on the hosted endpoint and never appear in the app. | Interface contract |
| GLZ-3 | Reliance gate: before trust-sensitive display, `get_fpf_index_status` must show `snapshotExists: true`, `fresh: true`, and `currentSourceHash === sourceHash`; otherwise every surface renders a degraded state and answers are labeled unverified. | Interface contract |
| GLZ-4 | Exact wording flows only through `read_fpf_doc`; `ask_fpf` output is presented as a grounded summary, never as canonical spec text. | Interface contract |
| GLZ-5 | The companion is not agent memory, job state, a workflow engine, or a policy authority — the contract's non-admissible uses stay non-admissible in the client UI and copy. | Interface contract |
| GLZ-6 | The app, its configuration, and any store listing use the canonical `fpf_reference` endpoint and name; the legacy `fpf_memory` name appears nowhere. | Repo policy (AGENTS.md) |
| GLZ-7 | Every rendered answer or page footer carries `snapshot.sourceHash` (short form) and `builtAt` from that same response; a mismatch against the status hash renders a stale banner. | Client app |
| GLZ-8 | Freshness is shown as internal consistency only; the app never claims upstream currentness (`upstreamCurrentness` is `unknown` by design on the public status). | Interface contract |
| GLZ-9 | Client-side caching is keyed by `(tool, arguments, sourceHash)` — admissible because tool responses are deterministic per snapshot — and invalidated when the status hash changes. | Client app |
| GLZ-10 | Input caps are mirrored client-side (question ≤ 2000 chars, search query ≤ 1000, selector ≤ 256; bounded reads via `maxChars`), so the app never emits schema-rejected input. | Client app (mirrors `src/mcp/tool-contracts.ts`) |
| GLZ-11 | Requests stay bounded: search fires on submit (or ≥ 300 ms debounce), catalog pages via `nextOffset`, status is checked at launch and on manual refresh only — courtesy to the hosted spend guardrails. | Client app |
| GLZ-12 | Publishing to the Glaze Store is external publication and requires explicit human approval; unlisted sharing is the default distribution. | Repo policy (AGENTS.md autonomy norms) |
| GLZ-13 | Nothing in this repo's runtime, pipeline, CI, or published surfaces depends on the companion; removing it is a no-op for the project. | Repo policy |

## Design

Working name: **FPF Companion**. One dependency: `https://mcp.fpf.sh/api/mcp/fpf_reference/mcp`. Shape: a menu-bar quick-search plus a main window with five surfaces.

### Status (freshness spine)

Maps `get_fpf_index_status` directly: a pill in the sidebar footer is green when the GLZ-3 gate passes, amber otherwise. The detail view lists `sourceHash`, `builtAt`, `compilerMode: local_vectorless`, and the artifact booleans. The pill's state gates the trust labeling on every other surface.

### Ask

Maps `ask_fpf` (`mode: compact` default; `verbose`/`proof` toggle) — the human-facing twin of `query_fpf_spec`, whose structured envelope stays deliberately unused in this app. Renders the `markdown` answer; `ids` as chips that open the Reader; `citations`, `constraints`, `gaps`, and `confidence` as a grounding footer. `status` enum handling: `ok` renders normally; `not_found` offers Search; `ambiguous` renders `candidateIds` as suggestion chips; `unsupported` explains the bound; `stale_snapshot_prevented` triggers the stale banner and a status re-check.

### Search

Maps `search_fpf`. Hit rows show `kind` badge (pattern / route / lexeme / preface), `title`, `id`, `part`, `status`, and the `snippet`; selecting a hit opens the Reader. Optional `kind` filter mirrors the schema enum.

### Catalog

Maps `browse_fpf_catalog` with `part` / `status` / `kind` filters, paged by `nextOffset`, honoring `didYouMean.part` for near-miss filters.

### Reader

Maps `read_fpf_doc`. Hover cards use `mode: "preview"` (headings + snippet, no body). Full pages request `maxChars: 20000` first and offer "load full page" when `truncated: true` (`markdownChars` tells the user the full size). Header shows `title`, resolved `nodeId`, and an "open on fpf.sh" link derived from `docRef.staticPath`. Typing an ID (`A.1.1`) or route (`route:project-alignment`) anywhere jumps straight here via selector auto-resolution.

### Offline behavior

Local-first apps keep working offline: cached pages stay readable but are labeled with their snapshot short-hash plus "offline — freshness unverified", and the GLZ-3 gate re-runs on reconnect.

## Glaze build prompt

The operational artifact — paste into Glaze as-is:

```text
Build a macOS app called "FPF Companion": a read-only reader and lookup client
for the First Principles Framework reference, backed by exactly one external
service, the hosted MCP endpoint:

  https://mcp.fpf.sh/api/mcp/fpf_reference/mcp   (server name: fpf_reference)

Use only these five MCP tools, nothing else:
- get_fpf_index_status {} -> { sourcePath, sourceHash, builtAt, snapshotExists,
  currentSourceHash, fresh, compilerMode, artifacts }
- search_fpf { query (<=1000 chars), kind?: pattern|route|lexeme|preface,
  limit?: 1..100 } -> { hits: [{ id, kind, title, status?, part?, score,
  snippet }], total, snapshot }
- browse_fpf_catalog { part?, status?, kind?, limit?: 1..500, offset? }
  -> { entries: [{ id, kind, title, status?, part?, description }], total,
  nextOffset?, didYouMean?, snapshot }
- ask_fpf { question (<=2000 chars), mode?: compact|verbose|proof }
  -> { markdown, ids, citations, constraints, gaps, confidence, status,
  snapshot }
- read_fpf_doc { selector (<=256 chars), mode?: preview|full, maxChars? }
  -> { title?, nodeId?, markdown?, markdownChars?, truncated?, headings?,
  preview?, docRef?: { staticPath }, snapshot }

(The endpoint also exposes a sixth public tool, query_fpf_spec; it returns an
agent-facing structured envelope and is intentionally NOT used by this app —
do not call it or generate code for it.)

App shape: a menu-bar icon with a global-shortcut quick-search (top 5
search_fpf hits; Enter opens the reader; typing an exact ID like "A.1.1" or
"route:project-alignment" opens the reader directly), and a main window with
a sidebar: Ask, Search, Catalog, Reader, Status.

Non-negotiable behaviors:
1. On launch and on manual refresh call get_fpf_index_status. Trusted state
   requires snapshotExists && fresh && currentSourceHash === sourceHash.
   Show a green "Fresh" pill when trusted, amber "Degraded" otherwise, and
   label all content "unverified" in degraded state.
2. Every answer and page shows a footer with the response's own
   snapshot.sourceHash (first 12 hex chars) and builtAt. If it differs from
   the status hash, show a stale banner.
3. ask_fpf answers are grounded summaries. For exact spec wording always
   fetch read_fpf_doc and say so in the UI ("Exact text").
4. Handle the answer status enum: ok; not_found (offer search); ambiguous
   (render candidateIds as suggestions); unsupported (explain);
   stale_snapshot_prevented (stale banner + status re-check).
5. Reader fetches use maxChars 20000 first; when truncated is true show
   "Load full page (N chars)". Preview/hover cards use mode "preview".
6. Cache responses keyed by (tool, arguments, sourceHash); drop the cache
   when the status hash changes. Offline: cached pages stay readable,
   labeled "offline — freshness unverified" with their snapshot hash.
7. Enforce input caps client-side: question 2000, search 1000, selector 256
   characters. Debounce search; page the catalog with nextOffset; never poll.
8. Freshness means internal consistency of the deployed snapshot only —
   never display any claim that upstream FPF is current.
9. The service name is fpf_reference. Never reference "fpf_memory" anywhere:
   not in code, settings, copy, or the store listing.
10. The app is read-only: no notes, no memory, no editing, no workflow
    features. Link out to https://fpf.sh/ for the full site.

Visual: native macOS feel, quiet reference-tool aesthetic, monospace for
IDs and hashes, kind badges for pattern/route/lexeme/preface.
```

## Evidence (design-time payloads, production endpoint, 2026-07-07)

`get_fpf_index_status`:

```json
{"sourceHash":"sha256:f916341a8b37…","builtAt":"2026-07-03T21:18:14Z",
 "snapshotExists":true,"currentSourceHash":"sha256:f916341a8b37…",
 "fresh":true,"compilerMode":"local_vectorless"}
```

`search_fpf { query: "bounded context", limit: 3 }` → 1689 total; top hits `lex:bounded-context` (lexeme, score 160.8), `A.1.1` "U.BoundedContext Semantic Frame" (pattern, Stable), `A.2.5` (pattern, Stable) — same snapshot hash echoed.

`browse_fpf_catalog { kind: "route", limit: 3 }` → 3 routes total: `route:boundary-unpacking`, `route:project-alignment`, `route:writing-or-reviewing-patterns`, each with a task-oriented `description`.

`ask_fpf` (boundary question) → `route:boundary-unpacking`, IDs `A.6, A.6.B, A.6.C` (+ conditional `A.6.P, C.16.Q, A.6.A`), confidence 0.92, status `ok`.

## Non-goals

- No Glaze anywhere in the build/publish/sync path; the README scope list (no vector DB, no remote indexing, no LLM step in the docs pipeline) stays authoritative and untouched.
- No expert tools; no bundling of the local stdio runtime inside the app.
- No cross-platform promise — the website remains the canonical human surface; the companion is macOS-only by Glaze's own constraint.
- Not an FPF authoring or editing surface, and not a second source of adoption copy: endpoint/setup wording keeps its SSOT in `src/core/public-copy.ts`.

## Acceptance checks (app-level, mirroring the contract's)

1. With outbound network restricted to `mcp.fpf.sh`, all five surfaces function — proving the single-dependency boundary (GLZ-1, GLZ-13).
2. Simulating `fresh: false` or a hash mismatch degrades every surface and labels all content unverified (GLZ-3, GLZ-7).
3. A search of the generated app's source contains zero occurrences of `fpf_memory` (GLZ-6).
4. Every rendered answer/page shows its snapshot short-hash; in the nominal state it equals the status hash (GLZ-7).
5. Any store or unlisted listing names `fpf_reference`, links `https://fpf.sh/`, and ships only after explicit human approval (GLZ-6, GLZ-12).

## Decision

Park as an optional exploration: the benefit is real but minor (a nicer native lookup surface plus a small discovery channel), the cost of a clean build is one prompt, and the boundary above keeps it from ever leaking into the core. If nobody wants the desktop experience, dropping this doc is the entire cost of exit.
