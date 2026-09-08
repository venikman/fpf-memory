# bm25f — fielded BM25+ ("bm25f-plus")

Implements the recommended recipe of `research/lexical.md` §(a): four weighted
streams per doc (id / title / aliases / body) with the lexeme→pattern
anchor-text fold, BM25F-style weighted TF combined **before** one shared
saturation (R&Z 2009 Eq. 3.19–3.21), per-field length normalization, Lucene
non-negative IDF, the BM25+ delta lower bound, an SDM-lite proximity blend,
exact-match bonuses, a SymSpell deletion-distance-1 typo bridge, and a
coordination-based abstention gate.

Files: `index.ts` (index + scoring core), `tokenizer.ts` (shared doc/query
pipeline), `porter2.ts` (Snowball English stemmer, frozen by unit vectors that
the build self-checks).

## Final parameters and provenance

| param | digest start | frozen | provenance |
|---|---|---|---|
| `k1` | 1.5 | **1.5** | R&Z 2009 §3.4.4; re-swept {0.9–3.0} after every scoring change per digest warning — 1.5 stands |
| `delta` | 1.0 | **0.15** | Lv & Zhai 2011 shape kept; swept {0.1–1.0}. At 1.0, 324KB docs + ToC collected `idf·delta` for every conversational filler word and buried precise answers (see D7); digest itself hedges toward a smaller floor (§b.2) |
| `w` (id/title/aliases/body) | 10/6/5/1 | **10/6/5/1** | digest table (R&Z Table 3.1 scaled); not re-swept — category metrics gave no evidence against |
| `b` (id/title/aliases/body) | 0/0.6/0.6/0.5 | **0/0.6/0.6/0.3** | id fixed-length, title/aliases TREC-13 values; `b_body` swept {0.25–0.75} → 0.3 (digest predicted the low end for short-NL-query/long-doc skew) |
| SDM lambdas | 0.85/0.10/0.05 | same | Metzler & Croft 2005 |
| unordered window | 8 | 8 | Metzler & Croft 2005 |
| exact bonuses (id / title-alias / phrase) | 1000/100/20 | same | digest §a.4.2 |
| contained-id bonus | — | **50** | deviation D5 |
| coord | 0.25 + 0.75·coord, floor 0.34 | same, but **idf-weighted coord** | digest §a.4.3 + deviation D3 |
| `tau` | 1.0 (sweep) | **12** | dev margin: leaking negatives peak at 8.6, weakest positive best-score 18.2 → mid-margin, robust both directions |
| kind multipliers | — | **lexeme 0.9, preface 0.8** | digest §b.1 endorses doc-kind multipliers; swept {1.0, 0.9, 0.8}² (D6) |

All values are literal constants in `index.ts` (`DEFAULT_PARAMS`); the
constructor accepts overrides only as a dev-tuning hook for sweeps.

## Grid sweeps (dev, category level only)

Tuning used `gold/dev.json` exclusively through harness-equivalent tooling
(build once, `applyParams`, re-run all 150 queries); selection by nDCG@10,
then MRR@10, ties → smaller `b_body` (digest §5). No per-question logic
anywhere in candidate code.

Stage 1 — `b_body × k1 × delta` (5×4×3 grid + edge probes, top rows):

| b_body | k1 | delta | nDCG@10 | MRR@10 |
|---|---|---|---|---|
| 0.3 | 1.5 | 0.15 | 0.8195 | 0.7918 |
| 0.3 | 2.0 | 0.15 | 0.8193 | 0.7914 |
| 0.3 | 2.0 | 0.25 | 0.8188 | 0.7910 |
| 0.4 | 1.5 | 0.15 | 0.8180 | 0.7922 |
| … | | | | |
| 0.75 | 0.9 | 1.0 (worst) | 0.7523 | 0.7134 |

`delta ≤ 0.25` occupied the entire top-12; every `delta = 1.0` row sat in the
bottom third. A post-change confirmation sweep (after D4b landed) kept the
chosen point within 0.0001 nDCG of the plateau top.

Stage 2 — kind multipliers at (0.3, 1.5, 0.15): lexeme 0.9 is a clear gain
(nDCG 0.8195 → 0.8395, R@1 73.6 → 77.1); preface 0.8 adds 0.0002 → picked by
the stated rule.

Stage 3 — `tau` {0.5 … 20}: positives untouched until τ≈20 (weakest positive
best-score 18.2); leaking negatives peak at 8.6; negClean hits 1.0 from τ=10.
Frozen τ=12 (mid-margin rather than the max, so both sides tolerate test-set
drift).

## Dev metrics (frozen params, `results/bm25f-final.json`)

Overall: **R@1 80.0% · R@5 89.3% · R@10 92.9% · MRR@10 0.838 · nDCG@10 0.859 ·
negative-clean 100%** — build ≈1.9 s, p50 0.5 ms, p95 1.1 ms, deterministic ✓
(reference: baseline-trace R@5 73.6%, MRR 0.639, p50 543 ms).

| category | n | R@5 | MRR@10 |
|---|---|---|---|
| id-lookup | 17 | 100% | 0.971 |
| title | 17 | 100% | 1.000 |
| alias | 16 | 100% | 0.969 |
| typo | 17 | 100% | 1.000 |
| definition | 17 | 100% | 1.000 |
| multi-hop | 16 | 50.0% | 0.176 |
| task | 19 | 84.2% | 0.751 |
| paraphrase | 21 | 81.0% | 0.817 |

Multi-hop is the known lexical ceiling (the answer is a graph neighbor of the
doc the question names, and lexical evidence points at the named doc); left to
the graph candidates by design.

## Deviations from the digest (all measured, category-level)

- **D1 — ID grammar generalized.** The digest's ID regex required digit
  segments (`a.2.3`). This corpus has alpha segments in 97/311 pattern ids
  (`A.1.CSD`, `A.19.SOURCE`) and namespaced ids (`lex:…`, `route:…`,
  `heading:…:1268`), so the tokenizer keeps any `letter(.seg)+` dotted id and
  any `name:…` colon id whole (plus dotted prefixes / interior word parts).
  Strictly a superset of the digest's rule; never stemmed or split.
- **D2 — Anchor fold = lexeme *title* only.** The digest's field table says
  "titles of lexeme docs pointing at this doc"; its prose says "text". In this
  corpus `lexeme.text` = surface form + the *target's own title*, so folding
  text would mostly re-inject title terms; title-only is the true anchor text
  and caps hub-lexeme spray (39 lexemes have >50 aliases; one points at 143
  targets — each still contributes exactly one short string per target).
  Folds are deduped per target (sorted by lexeme id) and skipped when equal to
  the target's title/id/existing aliases; 16,515 folded. Folded titles join
  the target's +100 alias-equality set; lexemes stay indexed as docs.
- **D3 — IDF-weighted coordination.** Count-based coord let conversational
  filler dilute precise answers below the 0.34 floor (the "Exact policy"
  lexeme matched 2/7 groups = 0.29 → filtered) while kitchen-sink mega-docs
  matched everything, and negatives leaked (negClean 50%). Each surface-chunk
  group now weighs its most informative term's IDF (df=0 → smoothed
  `idf(0.5)`), so unmatched nonsense dominates the denominator. Same
  multiplier shape and floor as the digest. Result: alias 68.8→100 R@5,
  negClean → 100% (with τ).
- **D4 — Quoted-span bonuses, title-only.** Gold-style questions quote the
  name they seek; whole-query equality never fires through framing. A span
  whose canon equals a doc *title* gets +100; equals a doc id → +50. Awarding
  alias *holders* instead walled multi-hop answers behind stacks of same-named
  lexemes (multi-hop R@5 43.8→12.5 before the title-only restriction; 43.8
  after). Spans also feed the +20 title-phrase check.
- **D4b — Span repair.** The bridge alone picks repairs by collection
  frequency, which fails when the truncation is more frequent ("Ownr" → own,
  not owner). For spans containing df=0 words, a deterministic odometer over
  each word's ≤8 deletion-distance-1 candidates (cf-ranked) searches for a
  combination landing exactly on a known title/alias/id canon; the first hit
  wins, earns the D4 bonus, and overrides the per-word repair. Also applied to
  unquoted queries of ≤8 tokens. Typo: 76.5% → 100% R@5, MRR 1.000.
- **D5 — Contained-id bonus (+50).** "Explain E.11 …" contains the id but
  isn't equal to it; the digest's own w_id row cites the runtime's exact-ID
  heuristic as precedent. id-lookup: 41.2% → 100% R@5.
- **D6 — Kind multipliers (lexeme 0.9, preface 0.8).** 8.4k tiny stubs
  duplicate their target's name and out-inflate it on short fields
  (`invB_title ≈ 1.8` for 1-token titles); the digest's §b.1 second-choice
  explicitly endorses kind multipliers, and gold alias/typo cases accept
  either the lexeme or its target, so a mild lexeme discount only reorders
  duplicates. Swept.
- **D7 — delta 0.15.** With delta=1.0 every term merely *present* in a 324KB
  doc earned `idf·1`, so docs containing all filler words beat precise
  answers ("Give me a quick summary of C.19" ranked E.18 and the Table of
  Contents above C.19). This is precisely the BM25+-too-generous failure the
  digest's §b.2 BM25L hedge anticipates; the sweep kept the BM25+ shape with a
  smaller floor rather than switching to BM25L.

Implementation notes (not deviations): positions are stopword-compressed so
stopword removal can't break adjacency; whole-identifier tokens and dotted-id
prefixes are "synthetic" (indexed, but excluded from the proximity/phrase
primary sequence); SDM pairs deduplicate; float accumulation order is fixed
(sorted unique terms; fields id→title→aliases→body); final order
`(score DESC, id ASC)`; exact bonuses exempt a doc from the coord *floor* but
not the multiplier; `query()` never throws (contract) — bad input returns `[]`.

## Determinism & resources

Same corpus + question ⇒ byte-identical rankings: literal constant tables, no
`Date`/`Math.random`/locale ops, sorted term iteration, stamped scratch arrays
(stamps gate cache reuse only, never values). Build ≈1.9 s single pass
(tokenize 4 streams, postings + body positions, raw-form del-1 map);
`approxIndexBytes` ≈ 120 MB dominated by the typo bridge's 558k deletion keys
(best-candidate-per-key keeps lookups exact — max over a union equals max over
per-key winners). Porter2 is frozen by 67 hand-traced vectors run at every
build; a drifted stemmer refuses to build.

## Run

```bash
cd experiments/retrieval-bakeoff
bun harness/run.ts --gold dev --factory candidates/bm25f/index.ts
```
