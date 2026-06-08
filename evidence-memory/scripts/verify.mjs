// verify.mjs — Phase-1 acceptance gate. Run: node scripts/verify.mjs
// Validates the ledgers parse + are referentially sound, then exercises trace_evidence
// and the falsifiable gates from the ADR. Exits non-zero on any failure.

import { loadAll, validate, traceEvidence, listContradictions } from "../src/trace-evidence.mjs";

let pass = 0, fail = 0;
const ok = (name, cond, detail = "") => {
  (cond ? pass++ : fail++);
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

const store = loadAll();

// 1. Every JSONL line parsed (loadAll throws otherwise) + counts.
ok("ledgers load + parse", true,
  `${store.carriers.size} carriers, ${store.anchors.size} anchors, ${store.claims.size} claims, ${store.edges.size} edges, ${store.cards.size} cards`);

// 2. Referential integrity + required fields.
const errors = validate(store);
ok("referential integrity (0 dangling refs / missing fields)", errors.length === 0, errors.join(" | "));

// 3. trace_evidence resolves a card to grounding carriers.
const t = traceEvidence("card:sota-agent-memory");
ok("trace_evidence(card) resolves to carriers", !t.error && t.carriers.length >= 3,
  `${t.carriers?.length} carriers`);
ok("every traced claim reaches a real carrier URI",
  t.claims.every((c) => c.anchors.every((a) => a.carrier && a.carrier.uri && !a.carrier.error)));

// 4. ADR card resolves too.
const t2 = traceEvidence("card:adr-fpf-evidence-memory");
ok("trace_evidence(ADR card) resolves", !t2.error && t2.claims.length === 5);

// 5. Contradiction is edge-authored and surfaced (ADR gate 3/4).
const contra = listContradictions(store);
ok("contradiction surfaced via authored edge (not inference)", contra.length >= 1,
  contra.map((c) => c.between.join(" ⟂ ")).join("; "));
ok("contradicted claim carries status=contradicted",
  store.claims.get("claim:embeddings-as-center")?.status === "contradicted");

// 6. Anchor discipline: a non-rejected active claim must cite >=1 anchor.
const orphan = [...store.claims.values()].filter(
  (c) => c.status === "active" && (!c.anchors || c.anchors.length === 0));
ok("no active claim without an evidence anchor", orphan.length === 0,
  orphan.map((c) => c.id).join(", "));

// 7. Freshness signal present on every card.
const cardsFresh = [...store.cards.values()].every((c) => c.refreshAfter || c.fpfSnapshot);
ok("every card carries a refresh/snapshot signal", cardsFresh);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
