# `trace_evidence` — MCP tool contract

Phase 1 ships exactly one tool: `trace_evidence`. It resolves any evidence-plane node to
its grounding carriers, deterministically, with no LLM and no network access.

## Naming decision (non-negotiable)

- The tool is **`trace_evidence`** — snake_case, in-convention with the existing tools
  (`search_fpf`, `trace_fpf_path`, `query_fpf_spec`, …).
- The full Evidence Memory family is `trace_evidence`, `search_evidence`, `audit_claim`,
  `list_contradictions`. Phase 1 ships only `trace_evidence`.
- **Never use the `fpf_memory.*` namespace.** It is the *blocked legacy* MCP client/endpoint
  name from the May 2026 cost incident; a scheduled compatibility review runs 2026-06-30
  (see `.github/workflows/fpf-reference-legacy-alias-reminder.yml` and the canonical vs.
  legacy endpoints `/api/mcp/fpf_reference/mcp` vs `/api/mcp/fpf_memory/mcp`). The new
  tool must not reuse that surface.

## Input

```jsonc
{
  "id": "string",            // required — a card:* | claim:* | anchor:* id
  "asOf": "2026-06-08",      // optional — ISO date; drives date-aware freshness
  "depth": 1                 // optional — 1..5 reserved for future expansion depth
}
```

`asOf` defaults to the ledgers' build date. `depth` is accepted and reserved; Phase 1
always resolves the fixed `card → claims → anchors → carriers` shape (effective depth 1).

## Output (envelope)

```jsonc
{
  "query": "card:sota-agent-memory",
  "resolvedAt": "2026-06-08",
  "root": {
    "kind": "memory_card",          // memory_card | claim | anchor
    "id": "card:sota-agent-memory",
    "title": "SoTA pack: Agent Memory Architecture",
    "fpfIds": ["G.2", "B.3.4", "G.6", "A.1.1"],
    "freshness": "fresh"            // fresh | stale | contradicted | superseded | deprecated | valid-until-spec-change
  },
  "claims": [
    {
      "id": "claim:decay-mandatory",
      "text": "…",
      "status": "active",
      "freshness": "fresh",
      "anchors": [
        {
          "id": "anchor:memora-fama",
          "quote": "…",
          "selector": { "kind": "section", "label": "abstract" },
          "carrier": {
            "id": "carrier:arxiv-2604.20006",
            "uri": "https://arxiv.org/abs/2604.20006",
            "title": "From Recall to Forgetting: …",
            "integrity": { "method": "abstract-fetch", "verifiedAt": "2026-06-08" }
          }
        }
      ],
      "edges": [{ "id": "edge:e1", "from": "claim:decay-mandatory", "relation": "verifiedBy", "to": "anchor:memora-fama" }]
    }
  ],
  "carriers": [ /* deduped carrier records reached by the trace */ ],
  "contradictions": [
    { "edge": "edge:e6", "between": ["claim:vector-not-identity", "claim:embeddings-as-center"], "context": "agent-memory-sota", "mechanism": "edge-authored" }
  ],
  "freshness": {
    "overall": "fresh",            // "needs-attention" if any traced claim is stale/contradicted/superseded/deprecated
    "flagged": [{ "id": "claim:…", "freshness": "stale" }]
  }
}
```

For an unknown id the tool returns `{ "query": id, "error": "unknown-id" }`.

Contradictions are surfaced from authored `contradicts` edges only — never inferred.

## Reference implementation

The canonical, runnable contract is `src/trace-evidence.mjs` (zero deps, Node ESM). Typed
shapes mirror it in `src/types.ts`. In `venikman/fpf-memory` these would be authored as Zod
schemas under `src/mcp/tool-contracts.ts`; the plain-TS mirror keeps Phase 1 build-free.

A future MCP `execute` wrapper is a thin adapter:

```ts
import { traceEvidence } from '../../../evidence-memory/src/trace-evidence.mjs';

// inputSchema:  { id: string, asOf?: string /* ISO date */, depth?: 1..5 }
// outputSchema: a permissive object (envelope above); tighten in Phase 3.
execute: async ({ id, asOf }) => traceEvidence(id, { asOf });
```

## Phase-1 integration status (why the tool is not yet registered)

Phase 1 delivers `trace_evidence` as a **fully functional standalone surface** — the CLI
(`node evidence-memory/src/trace-evidence.mjs <id> [asOf]`) and the CI verify gate
(`bun run verify:evidence`). MCP server registration is intentionally **deferred**, because
registering it within Phase 1's additive constraints is not clean:

1. **The tool surface is contract-pinned by a test.** `tests/mcp-server.test.ts` asserts the
   exact registered tool list with `toEqual([...])`. Adding `trace_evidence` to
   `fpfMcpTools` would require editing that test — and Phase 1's acceptance rule forbids
   modifying any file outside `evidence-memory/` except `package.json` (one script) and the
   CI workflow (one step). Registration is therefore a Phase-2 change that updates the two
   tool-list assertions alongside it.
2. **Hosted bundling does not ship the ledgers.** The hosted MCP function bundle
   (`vercel:mcp:build`) carries only the `hosted/…` artifacts, and `build:mcp` bundles to
   `dist/stdio.js`, where `import.meta.url`-relative ledger reads would not resolve. Wiring
   the hosted/bundled surface needs a deliberate ledger-bundling + path-resolution step,
   tracked for Phase 2, so the tool degrades cleanly rather than throwing in deployment.

The contract above is the source of truth for that Phase-2 wiring.
