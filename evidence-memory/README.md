# FPF Evidence Memory — Phase 1 (additive research-memory plane)

A second, **additive** memory plane for research/provenance, sitting beside the canonical
vectorless FPF spec runtime. The spec runtime stays untouched and authoritative; nothing
here refactors or renames existing code.

**Phase 1 is deterministic, append-only, and makes zero LLM and zero network calls.**

## What it is

```
append-only carrier ledger      (where evidence physically lives)
  → stable evidence anchors      (a citable span inside a carrier)
    → claimKey-deduped claims     (an assertion, grounded in ≥1 anchor)
      → typed append-only edges   (verifiedBy / derivedFrom / contradicts / refines / …)
        → scoped, decay-stamped memory cards
```

Plus one deterministic tool, `trace_evidence(id)`, that resolves any node
(`card` | `claim` | `anchor`) to its grounding carriers, with contradiction and
freshness signals attached.

The ledgers are **dogfooded** with the verified evidence behind the recommendation that
produced this plane (9 papers, the FPF spec, this repo, and two `fpf.sh` pages), so
`trace_evidence` runs against real provenance on first execution.

## Layout

```
evidence-memory/
  README.md                 ← this file
  tool-contract.md          ← the trace_evidence MCP contract + naming decision
  schemas/                  ← JSON Schemas for the five record types
    carrier-record.schema.json
    evidence-anchor.schema.json
    claim.schema.json
    evidence-edge.schema.json
    memory-card.schema.json
  src/
    types.ts                ← typed mirror of the runnable reference
    trace-evidence.mjs      ← zero-dep reference impl (load + validate + trace)
  scripts/
    verify.mjs              ← Phase-1 acceptance gate
  memory/current/           ← canonical truth: append-only JSONL ledgers
    carrier-ledger.jsonl
    evidence-anchors.jsonl
    claims.jsonl
    evidence-edges.jsonl
    memory-cards.jsonl
```

**Truth = the append-only JSONL ledgers** under `memory/current/`. Any graph or index is a
rebuildable *projection*, never a source of truth. There is no monolithic
`evidence-graph.json` in Phase 1.

The JSON Schemas in `schemas/` are **documentation-only** in Phase 1. The runtime guarantee
is the referential-integrity gate in `scripts/verify.mjs` (backed by `validate()` in
`src/trace-evidence.mjs`), not a schema validator. Wiring the schemas into validation —
and enforcing the `active`-claim → `≥1`-anchor and `sourceHash` rules — is deferred to
Phase 2. Ledger rows may also carry extra documentary fields (e.g. a `note` on a rejected
claim); the schemas allow this via `additionalProperties: true`.

## Run it

Works under `node` (≥18) or `bun`, with no build step and no dependencies:

```bash
# Acceptance gate — prints "9 passed, 0 failed" and exits 0
node evidence-memory/scripts/verify.mjs
# or: bun evidence-memory/scripts/verify.mjs
# or from package.json:
bun run verify:evidence

# Trace a memory card to its grounding carriers
node evidence-memory/src/trace-evidence.mjs card:sota-agent-memory

# Trace any claim / anchor, optionally "as of" a date (freshness is date-aware)
node evidence-memory/src/trace-evidence.mjs card:adr-fpf-evidence-memory 2026-07-01
```

## The 8 fixes baked in (ADR over the original recommendation)

1. **Namespace.** Tool family is `trace_evidence` / `search_evidence` / `audit_claim` /
   `list_contradictions` (snake_case, in-convention with `search_fpf`, `trace_fpf_path`).
   **Never `fpf_memory.*`** — that is the *blocked legacy* surface from the May 2026 cost
   incident (compatibility review 2026-06-30). Phase 1 ships only `trace_evidence`.
2. **Contradiction is edge-authored, not inferred.** A `contradicts` edge is written
   explicitly; `trace_evidence` surfaces it deterministically — no LLM inference.
3. **`claimKey` identity.** Claims carry a content-addressed `claimKey` so duplicates and
   merges are deterministic rather than by mutable `id`.
4. **Edges are append-only JSONL**, not a monolithic graph file. A built
   `evidence-graph.json` is a projection only, and is out of scope for Phase 1.
5. **Deterministic rerank precedence — deferred to Phase 3.** No scoring/rerank ships now.
6. **FAMA-style evaluation — deferred to Phase 4.** Forgetting-aware accuracy is captured
   as a tracked claim (Memora) and an invalidation test, not yet a harness.
7. **Cross-plane spec-snapshot refresh hook.** The `fpfSnapshot` field is present on cards
   *now* so a spec-snapshot bump can flag cards for refresh later.
8. **Zero LLM calls in Phase 1.** No extraction, no embeddings, no network. LLM
   *proposers* are deferred to a later, guardrailed phase.

## Two-plane split

A memory card carries both `claimIds` (evidence plane — each resolves
claim → anchor → carrier) and `fpfIds` (spec plane — pointers grounded in the canonical
fpf-memory runtime named by `fpfSnapshot`). Spec-plane pointers are **not** required to
have evidence-plane anchors; that separation is the whole point of the second plane.

## Out of scope for Phase 1 (deferred)

- Vector / sparse retrieval (`search_evidence`)
- LLM extraction, embeddings, and any network calls
- A built `evidence-graph.json` projection
- A refresh daemon / scheduled decay sweep
- Deterministic rerank precedence (Phase 3)
- FAMA-style eval harness (Phase 4)
- `audit_claim` / `list_contradictions` MCP tools (the reference impl exposes
  `listContradictions()` programmatically; only `trace_evidence` is a Phase-1 tool)

## Phases

| Phase | Scope | Status |
| ----- | ----- | ------ |
| 1 | Append-only ledgers, `trace_evidence`, verify gate. Zero-LLM, deterministic. | **this PR** |
| 2 | `sourceHash` enforcement for `active` claims; broader carriers/anchors; MCP registration + hosted ledger bundling. | deferred |
| 3 | `search_evidence` + deterministic rerank precedence; `audit_claim`, `list_contradictions` tools. | deferred |
| 4 | FAMA-style evaluation harness. | deferred |
| 5 | Guardrailed LLM proposers (extraction / embeddings) behind spend controls. | deferred |

See [`tool-contract.md`](./tool-contract.md) for the `trace_evidence` contract, the
namespace decision, and the Phase-1 MCP integration status.
