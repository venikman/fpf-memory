// types.ts — typed contracts for the FPF Evidence Memory plane (Phase 1).
// Mirrors the runnable reference in trace-evidence.mjs. In venikman/fpf-memory these
// would be authored as Zod schemas under src/mcp/tool-contracts.ts; plain TS here to
// stay build-free. Truth lives in the append-only JSONL ledgers under memory/current/.

export type MemoryStatus =
  | "candidate"    // proposed, not yet promoted
  | "active"       // promoted, in use
  | "deprecated"
  | "contradicted"
  | "stale"
  | "superseded";

export type CarrierKind =
  | "fpf_spec"
  | "repo_file"
  | "paper"
  | "web_doc"
  | "conversation"
  | "benchmark_run"
  | "decision_record";

export interface Integrity {
  method: string;        // how existence/content was checked (e.g. "abstract-fetch")
  verifiedAt: string;    // ISO-8601
  note?: string;
  // sourceHash is REQUIRED before a carrier may host an `active` claim in Phase >=2.
  sourceHash?: string;
}

export interface CarrierRecord {
  id: string;            // "carrier:<stable-slug>"
  kind: CarrierKind;
  uri: string;
  title?: string;
  retrievedAt: string;
  integrity: Integrity;
  boundedContextIds: string[];
}

export interface EvidenceAnchor {
  id: string;            // "anchor:<slug>"
  carrierId: string;     // -> CarrierRecord.id
  selector: {
    kind: "line_span" | "section" | "page" | "timestamp" | "byte_range";
    start?: number;
    end?: number;
    label?: string;
  };
  quote?: string;
  quoteHash?: string;
}

export interface Claim {
  id: string;            // "claim:<slug>"
  claimKey: string;      // FIX #3: content-addressed identity for dedup/merge
  text: string;
  claimType: "definition" | "method" | "architecture" | "comparison" | "decision" | "risk" | "result";
  contextId: string;     // A.1.1 bounded context
  anchors: string[];     // -> EvidenceAnchor.id (active claims require >=1)
  status: MemoryStatus;
  createdAt: string;
  validAfter?: string;
  validUntil?: string;
  refreshAfter?: string; // B.3.4 / G.11
  decayPolicyId?: string;
}

export type EvidenceRelation =
  | "derivedFrom" | "verifiedBy" | "validatedBy" | "fromWorkSet"
  | "happenedBefore" | "contradicts" | "supersedes" | "refines"
  | "mentions" | "usesPattern";

// FIX #4: edges are append-only JSONL, NOT a monolithic graph file.
// evidence-graph.json is a *built projection*, never a source of truth.
export interface EvidenceEdge {
  id: string;
  from: string;          // claim or anchor id
  to: string;            // claim or anchor id
  relation: EvidenceRelation;
  contextId: string;
  confidence?: number;   // derived signal, not truth
  note?: string;
}

export interface MemoryCard {
  id: string;            // "card:<slug>"
  title: string;
  summary: string;
  claimIds: string[];    // evidence-plane: each resolves claim -> anchor -> carrier
  fpfIds: string[];      // spec-plane pointers: grounded in the canonical fpf-memory
                         // runtime (the snapshot named in fpfSnapshot), NOT required to
                         // have evidence-plane anchors. This is the two-plane split.
  routeIds: string[];
  contextId: string;
  status: MemoryStatus;
  evidenceAnchorIds: string[];
  fpfSnapshot?: string;  // FIX #7: snapshot the card was validated against
  refreshAfter?: string;
  invalidationTests: string[];
}
