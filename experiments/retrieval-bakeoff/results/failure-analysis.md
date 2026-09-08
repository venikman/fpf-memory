# Failure analysis — held-out test (`results/test-final.json`, 150 cases)

**Scope.** Post-freeze failure characterization of the bake-off leaderboard. All numbers
below come from `results/test-final.json` (test), `results/dev-all-solo.json` +
`results/fusion-final.json` (dev), `results/test-flowwalk-probe.json` (post-freeze probe),
`gold/dev.json` / `gold/test.json`, and direct corpus reads via `harness/corpus.ts`.
Nothing outside this file was modified; nothing is committed.

Test leaderboard (MRR@10 / R@5): **fusion .832 / 88.6%** > bm25f .817 / 85.0% >
trigram-fuzzy .645 / 71.4% > baseline-trace .596 / 67.1% (production) > graph-ppr .585 / 70.7%
> rri .469 / 60.7% > baseline-search .301 / 38.6% > gramset .260 / 30.7%.
Fusion **strictly dominates** bm25f on test at the hit@5 level: it rescues 5 bm25f misses
(multi-hop-2, -8, -16, hc-test-15, hc-test-35) and surrenders none. Negatives: fusion and
bm25f 10/10 clean; production trace 0/10 (it always returns candidates for nonsense).

---

## 1. Taxonomy of the 16 fusion misses beyond rank 5

Every test miss classified; classes were derived from the data, then each case was verified
against the corpus (expected and returned nodes read in full where judgment was needed).

| Class | n | Description |
| --- | ---: | --- |
| **T1 — relation-target displacement (self-family crowding)** | **11** | Query quotes node X and asks for a typed relation target ("builds on" / "refines"); the ranker returns X's own cluster instead. In **16/16** test multi-hop cases fusion puts the quoted source at rank 1 and its title-mirror lexeme at rank 2; on average **3.5 of the top-5 slots** are the source's "self-family" (source, its lexemes, its descendants). |
| T1a — outvoted flow signal | 5 | The flow-walk lane had the answer at solo rank ≤5, but the four lexical lanes' unanimous self-family votes buried it. |
| T1b — crowded near-miss | 3 | The answer *is* in fusion's top-10 (ranks 7–8), pushed out of top-5 by the self-family. |
| T1c — hub-dilution deep miss | 3 | Both lanes weak: source/target sits in a high-degree neighborhood (A.2 degree 242, C.18 degree 238, didactic E-core) and walk inflow spreads across dozens of siblings. |
| **T2 — zero-anchor paraphrase gap** | **3** | Handcrafted paraphrase shares ≤1 content word with the target's title; no lexical anchor, nothing for graph lanes to walk from. Two of the three are also *fusion regressions*: bm25f had them at ranks 6 and 9; fusion's graph votes pushed them out of the top-10. |
| **T3 — task scenario-vocabulary gap** | **2** | Same root as T2 in task phrasing; one case additionally hits a polysemy trap ("unit" attracts the PublicationUnit/ComparativeReviewUnit cluster). |
| **Gold equivalence-set too narrow** | **0** | Checked in both directions — see §2. |

### Per-case table

| Case | Cat | fusion | bm25f | flow-walk solo | Class | Note |
| --- | --- | ---: | ---: | ---: | --- | --- |
| multi-hop-3 | multi-hop | ∅ | ∅ | **2** | T1a | "Gamma_method … build on?" → got B.1.5 itself + 4 of its lexemes in top-5 |
| multi-hop-4 | multi-hop | ∅ | ∅ | **5** | T1a | expected A.2.2 (U.Capability); zero title overlap with question |
| multi-hop-6 | multi-hop | ∅ | ∅ | **4** | T1a | production trace had it at rank 3 (frontier expansion) |
| multi-hop-9 | multi-hop | ∅ | ∅ | **3** | T1a | A.9 → {A.1, A.8}; got A.9 + its lexeme + C.29 |
| multi-hop-12 | multi-hop | ∅ | ∅ | **3** | T1a | production trace had it at rank 4 |
| multi-hop-7 | multi-hop | 8 | 6 | 3 | T1b | answer in top-10, crowded out (also outvoted: flow had rank 3) |
| multi-hop-11 | multi-hop | 7 | ∅ | 8 | T1b | E.2 → E.1; E-core hub cluster crowds ranks 1–6 |
| multi-hop-13 | multi-hop | 7 | ∅ | ∅ | T1b | lexical carried it to 7; the *walk* missed this one entirely |
| multi-hop-1 | multi-hop | ∅ | ∅ | 7 | T1c | source A.2.9; parent hub A.2 has degree 242 |
| multi-hop-5 | multi-hop | ∅ | ∅ | 6 | T1c | C.18.1 → {C.16, C.17, C.18}; C.18 degree 238 |
| multi-hop-14 | multi-hop | ∅ | ∅ | 8 | T1c | E.5 → {E.2, E.3}; walk mass diluted across E.5.x + E-core |
| hc-test-16 | paraphrase | ∅ | ∅ | — | T2 | "watcher and the watched" → B.2.5 Supervisor-Subholon Feedback Relation |
| hc-test-24 | paraphrase | ∅ | 9 | — | T2 (regression) | "curve going up or a real effect" → C.27; fusion demoted bm25f's rank-9 |
| hc-test-37 | paraphrase | ∅ | 6 | — | T2 (regression) | "vocabulary balloons" → F.14 Anti-Explosion Control; fusion demoted bm25f's rank-6 |
| hc-test-1 | task | ∅ | ∅ | — | T3 | "unit being worked on" pulled E.17 PublicationUnit cluster, not A.1.SCR |
| hc-test-14 | task | ∅ | ∅ | — | T3 | "procedures/stages/swapping" never maps to "order-sensitive method composition" |

Counterfactual (mechanical lower bound, computed on the frozen top-10 lists): simply
filtering the self-family out of fusion's ranking lifts test multi-hop R@5 from **5/16 (31%)
to 8/16 (50%)** with zero model change. Fusion already has 8/16 multi-hop hits@10.

## 2. Gold-narrowness verification (honest in both directions)

For every miss I scanned the returned top-5 for (a) lexemes whose `lexical_match` target is
an expected ID, (b) parents of expected IDs, (c) otherwise-equivalent answers; and read the
expected + returned node texts for the five handcrafted cases.

- **No case is gold-too-narrow.** No returned item was an equivalence-set-worthy alternate.
  The only adjacency found: in 4 multi-hop cases a top-5 item is a *child* of an expected ID —
  but that child is the quoted source itself (e.g. B.1.5 returned for "what does B.1.5 build
  on?", expected B.1) or an unrelated sibling (C.32.ACS for expected C.32). Neither answers
  the relation question asked. Multi-hop expected sets already contain *every* target of the
  asked relation, so they cannot be under-inclusive by construction.
- **Handcrafted targets are unambiguously on-point** (checked against corpus text):
  F.14's text literally opens "vocabulary explosion system-role names… stop, reuse";
  C.27 is verbatim "separate state, rate, and intervention-sensitive rate-change";
  B.2.5 is "supervised, regulated, steered, corrected… two-sided feedback relation";
  A.1.SCR is "which exact system acts or is intended to change"; B.1.5 is "order-sensitive
  method… How do I combine methods?". The retrieved alternatives (B.4 Canonical Evolution
  Loop, A.3.2 U.MethodDescription, A.18 CSLC-KERNEL…) are topical neighbors, not answers.
- **Nor is gold too generous anywhere**: no miss would flip to a hit under a stricter set.

Conclusion: all 16 misses are genuine retrieval failures; the gold verdicts stand.

## 3. Multi-hop deep-dive: why 31% (fusion) / 12.5% (bm25f), and what the flow-walk probe says

### 3a. The gold did not get harder structurally

| | dev | test |
| --- | --- | --- |
| relation mix | 2 refines / 14 builds_on | 2 refines / 14 builds_on |
| mean fan-out (expected-set size) | 2.50 | 2.56 |
| fan-out=1 cases | 6 | 5 |

Same generator, same template ("quoted title" + relation phrase). The *sampled sources*
changed (split-disjointness forces it) — and that changed everything for lexical rankers.

### 3b. Lexical multi-hop success is parasitic on incidental cross-references

A lexical ranker can only "solve" multi-hop when the expected target's own text happens to
quote the source (its ID or title). Measured over both splits:

| | dev | test |
| --- | --- | --- |
| cases where ≥1 expected target textually mentions the source | 14/16 | 11/16 |
| bm25f hits@5 among those | 8/14 | 2/11 |
| bm25f hits@5 where **no** target mentions the source | **0/2** | **0/5** |
| avg # corpus docs quoting the source's title-chunk | 56.5 | 8.2 |

The necessary condition was never violated by a single hit (0/7 across both splits).
Dev happened to sample sources from richly cross-referenced neighborhoods (E.x.DA evaluation
family, G.6 evidence ledger…) where targets both mention the source *and* outrank
competitors; test sampled quieter sources. **Dev multi-hop for lexical rankers was ~half
luck**: bm25f 50% dev → 12.5% test, trigram-fuzzy 25% → 0%, baseline-search 50% → 12.5%.
There is no lexical fix for this category — the signal being matched is accidental.

### 3c. The flow-walk's strength did generalize — the probe confirms it

`results/test-flowwalk-probe.json` (pure flow-walk `puref-r00`, post-freeze, test):
**multi-hop 68.8% R@5 / MRR .287** — vs 81% dev. A modest, explainable drop, against the
lexical collapse (50→12.5). It remains > 2× every frozen candidate (fusion/trace 31.3%).
Its five test failures are all structural, not lexical: mh-13 (missed outright), mh-11/14 at
ranks 8 (didactic E-core: E.1/E.2/E.3/E.5/E.6 all cross-link; inflow spreads over the
cluster), mh-1 at 7 (A.2, degree 242), mh-5 at 6 (C.18, degree 238). Hub fan-out dilution is
the walk's one residual weakness — the same one that caps the counterfactual filter at 50%.
The probe also re-confirms why flow-walk can't ship solo: task 22.7% / paraphrase 5.6% R@5,
overall MRR .462.

### 3d. Why fusion landed at 31% despite containing the flow lane

The shipped fusion weights (flow at 0.2, RRF K=10) were the *largest flow weight that still
beat solo bm25f on dev headline metrics* — a frontier point calibrated when dev multi-hop
looked half-solved by lexical luck (bm25f 50%). On test the lexical prior collapsed, and
0.2 proved too small: in 5 of the 8 answer-absent misses (T1a) the flow lane had the answer
at solo rank 2–5 but was outvoted by four lexical lanes unanimously endorsing the
self-family (source at rank 1 in 16/16, mirror lexeme at rank 2 in 16/16). The fusion
README's own ablation shows the dial: `l8-f02-p10` hit 93.6% overall R@5 with 75% dev
multi-hop, and fw .4 K10 hit 94.3%/81%. This is a **dev-luck mis-calibration of a real,
generalizing signal — not a missing capability**. (Caveat from §1: the two T2 regressions
show the graph lanes also carry a small tail cost; the dial is a genuine trade, so re-tune
on a fresh split, not on the now-burned test set.)

## 4. Per-candidate signatures (dev → test, R@5 per category)

**fusion** — convex min-max over {bm25f .7, graph-ppr .3, rri .1, trigram .1} + rank-RRF
flow lane (.2, K=10) gated on bm25f abstention. What the position buys: the only candidate
that strictly dominates the lexical ceiling on held-out data (MRR .832 vs .817; rescues 5
bm25f misses, surrenders none at @5), best-in-class paraphrase 83.3% and task 90.9%,
multi-hop doubled over bm25f (31.3 vs 12.5), 10/10 negatives, 12 ms p50. What it costs:
6.6 s build / ~276 MB (five sub-indexes), a dev-frozen flow weight that test proved too
conservative (§3d), and a measurable tail risk — two fringe bm25f hits (ranks 6, 9) pushed
past rank 10 by graph votes. Generalized well overall: dev 91.4 → test 88.6 R@5.

**bm25f** — fielded BM25+ with anchor-text fold, SymSpell typo bridge, proximity, exact
tiers, idf-coord abstention. Buys: the surface-query ceiling — 100% R@5 on title/alias/
typo/definition on *both* splits, task 86.4 / paraphrase 77.8 test, 10/10 negatives,
0.55 ms p50, and near-zero dev→test drop outside multi-hop (MRR .838→.817). Costs: it
cannot follow a relation — multi-hop 50%→12.5% exposed its dev number as cross-reference
luck (§3b) — and id-lookup MRR .912 concedes exact-ID perfection to the production trace
(1.000). The honest conclusion: principled IR replicates ~everything the hand-tuned
runtime does at 1/1000th the latency, except edge traversal.

**baseline-trace (production pipeline)** — hand-tuned seeder/ranker + frontier expansion.
Buys: perfect id-lookup and title (1.000 MRR both splits), strong alias 93.8 / definition
100, and — via frontier expansion — real multi-hop (31.3% test, tied with fusion; it found
multi-hop-6/-12 at ranks 3–4 where bm25f failed). Costs: everything vocabulary-shaped —
typo 52.9 (no fuzzy bridge), paraphrase 16.7 (dev 57.1 → test 16.7, the largest
generalization gap of any candidate: its dev paraphrase relied on hand-written seed rules
that don't transfer), task 50.0 — plus 0/10 negative discipline (never abstains), 516 ms
p50, and a 16-candidate cap that truncates recall. The hand-tuned scorer is not better
than the IR baseline; it is a different specialist (IDs + edges) with a brittle middle.

**trigram-fuzzy** — trigram spell-fix ladder feeding lite-BM25F. Buys: best-in-class typo
(100% R@5, .912 MRR test), perfect id/title, 0.33 ms p50 (fastest), 9/10 negatives, and the
smallest dev→test drop of the top group (.674→.645). Costs: no semantics (task 50 /
paraphrase 50) and *deliberately* no graph — multi-hop 0.0% test. As a component (weight
.1 in fusion) it is pure upside; solo it is a typo specialist.

**graph-ppr** — BM25 seeds → specificity teleport → α=.5 PPR, shipped π-blend. Buys:
paraphrase 77.8 / task 77.3 test (walk-smoothing genuinely helps neighborhood queries —
it, not rri, is fusion's paraphrase/task engine), decent typo 70.6 via seed forgiveness.
Costs: multi-hop 6.3% in shipped mode — its own README correctly diagnosed that seed
self-retention drowns 1-hop inflow (the flow variant fixes exactly this) — definition 52.9,
5/10 negatives, and MRR .585 solo. Its lasting contribution is the flow-walk discovery plus
the documented Condorcet conflict that shaped fusion's rank-based lane.

**rri** — reflective random indexing, d=1024 ternary vectors, one reflective pass. Buys:
exact-tier id-lookup 100/1.000, cheap semantic votes with zero graph (typo 76.5,
definition 76.5), 10/10 negatives; inside fusion it shields id-lookup (fusion .971 vs bm25f
.912 MRR). Costs: precision collapse in the open categories — title 82.4 (hub drift in
reflective space: title-9/-14 lost to sibling lexemes), task 45.5, paraphrase 27.8 — one
reflective pass over an 8.5k-stub corpus produces vectors too blurry to rank with. A
worthwhile 0.1-weight lane, not a retriever.

**baseline-search** — production token-overlap search. Test MRR .301; id-lookup 0% R@5
(its +200 exact-ID boost doesn't survive IDs embedded in sentences), title 100% (literal
overlap is its one move), 1.3 s p50. The floor it was meant to be.

**gramset** — exact trigram-set containment×Jaccard, no idf/tokenizer/graph. Test .260:
title 5.9 / typo 11.8 (no idf → common-word drowning; no correction ladder), yet task
63.6% R@5 — third-best solo — because its *bounded doc text* rule (title + aliases + first
450 chars) concentrates scoring on the "Use this when" lead. The architecture is a dead
end; the field-design lesson (lead-text field) is worth keeping.

## 5. Recommendations for the fpf-memory runtime (ranked)

1. **[ship-candidate] Replace the runtime's candidate scoring core
   (`src/runtime/candidate-seeder.ts` + `candidate-ranker.ts`) with the fusion stack —
   bm25f backbone + graph-ppr lane + flow lane + bm25f abstention gate — keeping the
   runtime's exact-ID fast path and frontier expander.**
   Evidence: test MRR .596 → .832 (+40%), R@5 67.1 → 88.6; category deltas vs production:
   typo 52.9→100, paraphrase 16.7→83.3, task 50.0→90.9, negatives 0/10→10/10 clean, p50
   516 ms→12 ms; fusion surrendered zero cases to bm25f and, at @5, none to production
   either. **Measured risks:** (a) multi-hop only reaches parity with production (31.3% =
   31.3%) under the frozen weights — pair with recs 2–3 or ship knowing the category
   doesn't regress but doesn't improve; (b) id-lookup MRR .971 vs production's 1.000 —
   keep the runtime's exact-ID +100 short-circuit in front to erase this; (c) 6.6 s build
   vs 0.7 s (still within the interactive-seconds constraint) and ~276 MB resident;
   (d) two observed tail regressions where graph votes demoted fringe lexical hits past
   rank 10 (hc-test-24, hc-test-37). Minimal-change fallback: bm25f solo (MRR .817,
   0.55 ms p50, 1.9 s build) accepting multi-hop 12.5% unless rec 2 lands.

2. **[ship-candidate] Add relation-aware query handling before ranking:** when the
   question quotes a resolvable node title/ID and uses relation phrasing ("builds on",
   "refines", "refinement of"), resolve the quoted node (it is rank 1 in 16/16 test
   multi-hop cases — resolution is the solved part), then answer from its typed edges in
   the asked direction, demoting the self-family (node + mirror lexemes + descendants).
   Evidence: 16/16 source-at-rank-1 / mirror-lexeme-at-rank-2; avg 3.5/5 top slots are
   self-family; mechanically filtering the family lifts fusion multi-hop 31%→50% on the
   frozen lists, and reading the edge answers 16/16 by construction (gold *is* the edge
   set). Risk: intent-detection false positives — gate on the exact relation vocabulary
   plus a successful quoted-node resolution, and fall through to normal ranking otherwise.

3. **[tune] Re-tune the fusion flow-lane weight on a fresh dev split** toward the
   README's recall-optimal points (`l8-f02-p10`: 75% dev multi-hop at 93.6% overall R@5;
   fw .4 K10: 81%/94.3%). Evidence: §3d — 5 of 8 answer-absent multi-hop misses had the
   answer in the flow lane's solo top-5 but outvoted; the frozen 0.2 was calibrated
   against dev's luck-inflated lexical multi-hop (50%→12.5% dev→test). Risk: the
   documented paraphrase/task MRR trade (~.005–.06) and the two T2 regression cases;
   test.json is burned for tuning — generate a new split from a new seed.

4. **[rethink] The zero-anchor paraphrase tail is at the deterministic-lexical ceiling.**
   hc-test-1/-14/-16/-24 (and dev analogues) share ≤1 content word with their targets; no
   candidate — including RRI semantics and PPR smoothing — retrieved them, and two attract
   polysemy distractors ("unit"). In-constraint move: promote the spec's own cue text
   ("Use this when" / retrieval-cue rows, per E.11) into a heavier-weighted BM25F field —
   gramset's lead-450-chars result and bm25f's fringe ranks (F.14 @6, F.1 @7, C.27 @9,
   B.1.5 @9) say this tips near-misses, not deep ones. Closing the deep misses means
   model-based semantics, which breaks the no-model-weights constraint — a board
   decision, not a tuning knob.

5. **[tune] Adopt the abstention gate and drop the 16-candidate cap in the runtime's ask
   path.** Evidence: production trace negativeCleanRate 0/10 on both splits (it always
   returns something for nonsense) vs bm25f/fusion 10/10 at zero positive cost on both
   splits; the trace's fixed 16-candidate short-list also truncates recall (R@10 75.0 vs
   fusion 90.7). Cheap, isolated, and independent of which ranker ships.

6. **[gold-fix] Harden the multi-hop category for the next iteration — the current gold
   is right but gameable.** No narrowness was found (§2), yet 16/16 multi-hop questions
   follow one template (quoted exact title + relation phrase), which rec 2 answers by
   rule; the category would then measure template detection, not graph reasoning.
   Add (a) multi-hop cases whose source is *described*, not quoted (paraphrase+hop
   composition), and (b) stratify sampling by whether targets textually mention the
   source (dev 14/16 vs test 11/16, avg corpus quoters 56.5 vs 8.2 — §3b) so dev stops
   over-predicting lexical multi-hop by ~4×.
