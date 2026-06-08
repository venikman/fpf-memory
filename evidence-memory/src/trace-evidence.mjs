// trace-evidence.mjs — Phase-1 reference implementation (zero deps, Node >=18 ESM).
// Canonical truth = the append-only JSONL ledgers in ../memory/current/.
// This module loads them, checks referential integrity, and resolves provenance:
//   card -> claims -> anchors -> carriers, plus contradiction + freshness signals.
// Port target: venikman/fpf-memory uses Bun + Zod-authored MCP contracts (snake_case
// tools). The MCP tool name is `trace_evidence` (NOT `fpf_memory.*`, a blocked legacy
// namespace). See ../tool-contract.md.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const LEDGER_DIR = join(HERE, "..", "memory", "current");
const DEFAULT_AS_OF = "2026-06-08";

function readJsonl(path) {
  const rows = [];
  const text = readFileSync(path, "utf8");
  text.split("\n").forEach((line, i) => {
    const s = line.trim();
    if (!s) return;
    try {
      rows.push(JSON.parse(s));
    } catch (e) {
      throw new Error(`Invalid JSON at ${path}:${i + 1} -> ${e.message}`);
    }
  });
  return rows;
}

export function loadAll(dir = LEDGER_DIR) {
  const byId = (rows) => new Map(rows.map((r) => [r.id, r]));
  return {
    carriers: byId(readJsonl(join(dir, "carrier-ledger.jsonl"))),
    anchors: byId(readJsonl(join(dir, "evidence-anchors.jsonl"))),
    claims: byId(readJsonl(join(dir, "claims.jsonl"))),
    edges: byId(readJsonl(join(dir, "evidence-edges.jsonl"))),
    cards: byId(readJsonl(join(dir, "memory-cards.jsonl"))),
  };
}

// Referential-integrity + minimal-shape validation. Returns a list of error strings.
export function validate(store = loadAll()) {
  const errors = [];
  const need = (cond, msg) => { if (!cond) errors.push(msg); };
  const REQ = {
    carriers: ["id", "kind", "uri"],
    anchors: ["id", "carrierId", "selector"],
    claims: ["id", "claimKey", "text", "claimType", "contextId", "status"],
    edges: ["id", "from", "to", "relation"],
    cards: ["id", "title", "claimIds"],
  };
  for (const [coll, fields] of Object.entries(REQ))
    for (const [id, row] of store[coll])
      for (const f of fields) need(row[f] !== undefined, `${coll} ${id} missing '${f}'`);

  for (const [id, a] of store.anchors)
    need(store.carriers.has(a.carrierId), `anchor ${id} -> missing carrier ${a.carrierId}`);
  for (const [id, c] of store.claims)
    (c.anchors || []).forEach((aid) =>
      need(store.anchors.has(aid), `claim ${id} -> missing anchor ${aid}`));
  for (const [id, e] of store.edges) {
    const ok = (x) => store.claims.has(x) || store.anchors.has(x);
    need(ok(e.from), `edge ${id} -> missing 'from' node ${e.from}`);
    need(ok(e.to), `edge ${id} -> missing 'to' node ${e.to}`);
  }
  for (const [id, card] of store.cards) {
    (card.claimIds || []).forEach((cid) =>
      need(store.claims.has(cid), `card ${id} -> missing claim ${cid}`));
    (card.evidenceAnchorIds || []).forEach((aid) =>
      need(store.anchors.has(aid), `card ${id} -> missing anchor ${aid}`));
  }
  return errors;
}

export function freshnessOf(node, asOf = DEFAULT_AS_OF) {
  if (node.status === "contradicted") return "contradicted";
  if (node.status === "superseded") return "superseded";
  if (node.status === "deprecated") return "deprecated";
  if (node.refreshAfter && node.refreshAfter < asOf) return "stale";
  if (node.decayPolicyId === "on-spec-snapshot-change") return "valid-until-spec-change";
  return "fresh";
}

export function listContradictions(store = loadAll()) {
  const out = [];
  for (const [, e] of store.edges)
    if (e.relation === "contradicts")
      out.push({
        edge: e.id,
        between: [e.from, e.to],
        context: e.contextId,
        mechanism: e.note || "edge-authored",
      });
  return out;
}

function resolveClaim(cid, store, asOf) {
  const c = store.claims.get(cid);
  if (!c) return { id: cid, error: "missing-claim" };
  const anchors = (c.anchors || []).map((aid) => {
    const a = store.anchors.get(aid);
    const carrier = a && store.carriers.get(a.carrierId);
    return {
      id: aid,
      quote: a?.quote,
      selector: a?.selector,
      carrier: carrier
        ? { id: carrier.id, uri: carrier.uri, title: carrier.title, integrity: carrier.integrity }
        : { error: `missing-carrier:${a?.carrierId}` },
    };
  });
  const edges = [];
  for (const [, e] of store.edges)
    if (e.from === cid || e.to === cid)
      edges.push({ id: e.id, from: e.from, relation: e.relation, to: e.to });
  return { id: cid, text: c.text, status: c.status, freshness: freshnessOf(c, asOf), anchors, edges };
}

// Trace any node id (card | claim | anchor) to its grounding carriers.
export function traceEvidence(id, { asOf = DEFAULT_AS_OF, store = loadAll() } = {}) {
  let claimIds = [];
  let root;
  if (store.cards.has(id)) {
    const card = store.cards.get(id);
    root = { kind: "memory_card", id, title: card.title, fpfIds: card.fpfIds, freshness: freshnessOf(card, asOf) };
    claimIds = card.claimIds || [];
  } else if (store.claims.has(id)) {
    root = { kind: "claim", id };
    claimIds = [id];
  } else if (store.anchors.has(id)) {
    claimIds = [...store.claims.values()].filter((c) => (c.anchors || []).includes(id)).map((c) => c.id);
    root = { kind: "anchor", id, citedByClaims: claimIds };
  } else {
    return { query: id, error: "unknown-id" };
  }

  const claims = claimIds.map((cid) => resolveClaim(cid, store, asOf));
  const carriers = new Map();
  for (const c of claims)
    for (const a of c.anchors || [])
      if (a.carrier && !a.carrier.error) carriers.set(a.carrier.id, a.carrier);

  const subtree = new Set(claimIds);
  const contradictions = listContradictions(store).filter(
    (x) => subtree.has(x.between[0]) || subtree.has(x.between[1])
  );
  const stale = claims.filter((c) => ["stale", "contradicted", "superseded", "deprecated"].includes(c.freshness));

  return {
    query: id,
    resolvedAt: asOf,
    root,
    claims,
    carriers: [...carriers.values()],
    contradictions,
    freshness: {
      overall: stale.length ? "needs-attention" : "fresh",
      flagged: stale.map((c) => ({ id: c.id, freshness: c.freshness })),
    },
  };
}

// CLI: node src/trace-evidence.mjs <card-or-claim-id> [asOf]
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const id = process.argv[2] || "card:sota-agent-memory";
  const asOf = process.argv[3] || DEFAULT_AS_OF;
  console.log(JSON.stringify(traceEvidence(id, { asOf }), null, 2));
}
