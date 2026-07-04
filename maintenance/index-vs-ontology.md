# Index vs Ontology: the retrieval substrate

**Status:** decision memo · **Last reviewed:** 2026-07-04 · **Recommendation:** promote the
existing typed graph to a first-class ontology surface; do **not** add vector RAG.

## The question

The steward's framing, restated: accessibility has been approached first as an **index**, then as
an **MCP**. Both can improve — but is *indexing* the only strategy, or can it be **replaced**?
FPF is a framework about ontology; maybe treating the corpus as an **ontology** gives *different
properties* — data made "smart enough" and "broken down enough" to answer questions **without a
RAG system.** *"What if ontology is the key?"*

Short answer: **the instinct is right, and the ontology is already here — latently.** FPF Reference
is not really "an index with search." It is a compiled, typed knowledge graph that *retrieves by
traversal*. "Indexing" undersells it. The strategic move is not to bolt on RAG (that would destroy
the property FPF sells); it is to **promote the graph that already exists from an internal
implementation detail to a declared, directly queryable surface.**

## What is actually built today

An evidence-based inventory of `src/runtime/` and the compiled artifacts (`src/core/types.ts`,
`src/runtime/graph-compiler.ts`, `src/runtime/frontier-expander.ts`, `src/runtime/query-engine.ts`):

- **A typed labeled property graph, persisted.** `pattern-graph.json`, `route-graph.json`, and the
  unified `snapshot.relationGraph` hold nodes and typed edges.
- **A closed node-kind taxonomy:** `NodeKind = 'pattern' | 'route' | 'lexeme' | 'preface'`
  (`src/core/types.ts`).
- **A rich closed relation taxonomy — 22 typed edge kinds** with provenance
  (`RelationKind`, `src/core/types.ts`): semantic (`builds_on`, `refines`, `constrains`,
  `enables`, `used_by`, …), route-membership (`route_step`, `landing_on`,
  `current_route_surface`, `typical_next_owner`, `common_wrong_reroute`, `route_hint`), vocabulary
  (`lexical_match`), citation (`explicit_reference`), and outline adjacency
  (`outline_parent/child/prev_sibling/next_sibling`). Every `RelationEdge` carries a `source`
  field recording *how* the edge was derived.
- **Retrieval is graph traversal, not search.** The real answer path is a **bounded frontier
  loop** (`frontier-expander.ts`, `MAX_HOPS = 6`) that walks typed edges outward from seed nodes,
  with priority *tiered by relation kind* (explicit references first, then route relations, then
  semantic, then outline adjacency), stopping via question-type sufficiency tests. Full-text token
  overlap (`search()`) is only *one seeding path* into that walk.
- **Routes are first-class paths through the graph.** A `RouteRecord` has `orderedIds`,
  `landingIds`, `optionalIds`, `nextOwners`, `reroutes`; the ordered steps are materialized as a
  `route_step` edge chain. A route *is* a curated traversal — this is exactly "drivability."
- **Vectorless by design, and it means it.** A repo-wide search finds no embedding/vector/ANN/RAG
  code anywhere — only the literal mode string `local_vectorless` and prose. Scoring is pure
  lexical overlap plus typed-edge priorities. `docs/glossary.md`: "deterministic graph lookups,
  **not embeddings.**"

**Conclusion:** the "index" is layer 1 of a three-layer stack. Layer 2 (the typed graph +
traversal) is the actual engine and is already built. What is *missing* is layer 3.

## The three-layer stack (they are not alternatives)

```
Layer 3  Declared ontology schema + inference        ← MISSING (the opportunity)
         (legal node/relation triples, domain/range,
          inverses, subclasses, consistency rules)
Layer 2  Typed property graph + frontier traversal    ← BUILT (the real engine)
         (4 node kinds, 22 relation kinds, routes,
          6-hop bounded expansion)
Layer 1  Inverted text index + lexical overlap        ← BUILT (seeding / fallback)
```

Index and ontology are not competing strategies to choose between; they are **layers of one
substrate.** "Replace indexing with ontology" is best read as "stop *presenting* the system as a
search index and invest in the schema layer that turns the graph into something you can query and
verify."

## What is genuinely missing (layer 3)

The graph is typed, but there is **no schema *about* the graph**:

- **No T-Box.** Nothing declares which `(nodeKind, relationKind, nodeKind)` triples are *legal*.
  Relation semantics live implicitly in the frontier scorer's hard-coded priority groupings, not
  in declared data.
- **No inference.** Inverse edges (`constrains`/`constrained_by`, `outline_parent`/`child`) and
  route-step chains are **hand-materialized** in the compiler, not derived from a rule. Transitive
  closures (e.g. full `builds_on` ancestry) are not computed.
- **Free-text where types belong.** A pattern's `type`, `normativity`, `part`, `cluster`,
  `status` are parsed as **strings**, not typed ontology classes — so you cannot reliably ask "all
  *normative* patterns in part B."
- **No structural query surface.** The public tools (`search_fpf`, `ask_fpf`, `query_fpf_spec`,
  `read_fpf_doc`, `browse_fpf_catalog`) are answer/lookup-shaped. None lets a caller ask a
  *structural* question — "what builds on `A.15`?", "shortest relation path `A.1.1 → B.5.1`",
  "orphan patterns with no inbound edges", "every route that lands on `F.17`."

## Why ontology gives *different properties* (answering the steward directly)

"Ontology gives you other properties" — concretely, the missing layer buys things a text index
structurally cannot:

1. **Structural queries.** Traversal, neighborhood, path, and set questions become first-class.
   This is the "answer all questions without RAG" the steward wants: the answers are *computed
   from structure*, deterministically, not retrieved by fuzzy similarity.
2. **Validation as a maintenance gate.** A declared schema makes the graph *checkable*: dangling
   references, orphan routes, illegal relations, and broken IDs become **compile-time CI failures.**
   This feeds directly into the [maintenance strategy](./maintenance-strategy.md) — it is a new,
   cheap freshness/correctness gate (and a natural upstream-format canary).
3. **Explainability / provenance.** Every answer is already a *path of typed, sourced edges*
   (`trace_fpf_path` exposes it). An explicit ontology makes that path a **guarantee**, not an
   artifact — every claim carries its derivation.
4. **Composability for agents.** Agents can *reason over* the graph (walk, filter, compare)
   instead of re-reading prose. That is the difference between a document an agent quotes and a
   model an agent *operates*.
5. **Drivability = navigability.** "Drivable" literally means "there are paths, and you can follow
   them." Routes are those paths today; an ontology makes route *synthesis* and *gap detection*
   possible (find where a needed path is missing).

## Why NOT vector RAG (the important negative)

The steward's own phrasing points away from RAG — *"smart, broken-down data that answers
questions, and you don't need a RAG system."* That is exactly right, and worth stating as a
principle:

> **RAG trades away the one property FPF Reference sells.** FPF Reference's promise is
> *deterministic, cited, auditable, provenance-tracked* retrieval. Embeddings give fuzzy semantic
> recall at the cost of determinism, exact IDs, and inspectable derivation. Adding a vector store
> would make FPF Reference *worse at its actual job* to make it marginally better at a job
> (fuzzy open-domain recall) it deliberately does not do.

The corpus is small, closed, richly cross-referenced, and authored with explicit IDs and
relations. That is the **ideal case for a symbolic ontology and the worst case for needing
embeddings.** Keep it vectorless. If fuzzy recall is ever needed, add it as an *optional seeding
hint into the graph walk*, never as the source of truth.

## Recommended direction: promote the graph (phased, each phase shippable)

Every phase preserves determinism and the vectorless invariant; each ships independently and earns
its keep.

- **P1 — Declare the T-Box as data + validate in CI.** Add a schema file enumerating legal
  `(nodeKind, relationKind, nodeKind)` triples, domain/range, and inverse pairs. Validate the
  compiled `relationGraph` against it during build; fail on violations. *Lowest risk, immediate
  maintenance payoff — it becomes a new correctness gate and format canary.*
- **P2 — Derive instead of hand-code.** Generate inverse edges and route-step chains *from* the
  schema; add consistency checks (dangling refs, orphan routes/patterns, unreachable landings).
  Removes a class of hand-maintenance from the compiler.
- **P3 — Type the free-text.** Promote pattern `type`/`normativity`/`part`/`cluster`/`status` from
  strings to validated enums/classes, so structural filters are reliable.
- **P4 — Expose a structural graph-query MCP tool.** A new deterministic public tool (e.g.
  `query_fpf_graph`) for traversal/path/neighborhood/set questions — the third accessibility
  surface alongside search and ask. This is the concrete "ontology as a queryable product."
- **P5 (optional) — Ontology-derived route synthesis & gap detection.** Use the schema + usage
  telemetry (`usage:report` unresolved queries) to propose missing routes/edges — closing the
  loop from telemetry → substrate.

## Guardrails

- **Stay vectorless.** No embeddings as a source of truth. Ever.
- **Determinism + citations are non-negotiable.** Every new answer path must remain reproducible
  and sourced.
- **Version the schema in provenance.** The T-Box travels with `published/current/**` so answers
  remain auditable against a known schema version.
- **Do not over-formalize.** A typed property-graph schema (JSON, validated) is enough. Resist
  full OWL/RDF/reasoner machinery unless a real external consumer demands it — that complexity buys
  nothing this corpus needs.

## Decision needed from the steward

1. **Approve the direction:** "promote the graph to an ontology surface; do not add RAG." (Yes/No.)
2. **Approve P1** (declare T-Box + CI validation) as the next content-substrate task — it is
   low-risk, ships on its own, and strengthens the freshness/correctness gates the maintenance
   strategy depends on.
3. **Optional:** greenlight P4 (`query_fpf_graph`) as the flagship "ontology is now a product"
   deliverable once P1–P3 land.
