# Adversarial audit — retrieval bake-off

Produced 2026-08-31 by an independent read-only auditor agent (no repo writes),
run after the candidate freeze (aec3c1d) and before publication of the final
report. Reproduced here verbatim as the audit record. The two trivially fixable
defects it found (types.ts negativeCleanRate comment, README pattern count)
were fixed in the same PR; the disclosure findings are carried into the README
"Limitations" section and the review packet.

## Findings (most severe first)

**1. MAJOR — The "held-out" test set was not structurally held out; both halves were obtainable before the freeze.**
Evidence:
- Generated half (110/150): `gold/generate.ts` + base seed + the exact materialization command (`bun gold/generate.ts --split test --seed 20260831`) were committed and documented in `gold/README.md` (lines 26–32) at d6db6f6 (12:59:44), *before any candidate existed*. Any candidate author could have run it. Regenerated during audit: byte-identical to committed `gold/test-generated.json`.
- Handcrafted half (40/150): found at `/tmp/fpf-bakeoff-holdout/test-handcrafted.json` — world-readable (`-rw-r--r--`), self-describing directory name, mtime **12:42:49** (before all candidate commits, 13:02–14:11), byte-identical to the 40 `hc-test-*` cases in committed `test.json`. `gold/README.md` claims its location "is intentionally not written down" and "candidate authors never see it" — but a one-line `grep -rl "hc-test" /tmp` finds it.
- Worse: `/tmp/fpf-bakeoff-holdout/test-generated-dryrun.json` (mtime **13:42:28**, byte-identical to committed test-generated.json) means the *complete* test set sat on disk 29 minutes before the fusion freeze (94eec6c, 14:11:23), spanning fusion's tuning window (`/tmp/fusion-sources.json` 13:45, `fusion-wave1.json` 13:50, `wave2` 13:56).
Mitigating evidence (why this is a limitation, not a demonstrated violation): no candidate code references gold paths, `/tmp`, the seed, or any question/ID map (exhaustive greps, finding 10); every candidate's dev→test delta is negative (bm25f MRR .838→.817, trigram .674→.645, graph-ppr .665→.585, rri .539→.469, gramset .352→.260, fusion .842→.832) — overfitting-shaped, not peeking-shaped; and the hc-test file's 12:42 mtime predates all candidates, so cases were not retrofitted around candidate behavior.
Remedy: publish with an explicit limitations paragraph ("held out by convention, not by construction"); next round, commit a hash of the holdout pre-freeze and keep the plaintext outside world-readable paths, and do not publish the test seed until freeze.

**2. MINOR — Fusion is the only candidate that *improves* on the exposed handcrafted-test half.** Handcrafted MRR: fusion dev .788 → test .808 (+.020) while bm25f drops .786 → .773; on the generated half both drop identically (−.022 vs −.024). Fusion is also the only candidate tuned while the full test set sat in `/tmp` (finding 1). Head-to-head on the 40 hc-test cases: fusion better on 5, worse on 3 — statistically weak at n=40, and ensemble variance-reduction is a plausible benign explanation. Remedy: publish the generated/handcrafted breakdown so readers can judge; optionally score fusion's neighboring ablation configs on test to show the chosen config is not a test-set outlier.

**3. MINOR — Title-category equivalence sets systematically exclude identically-titled lexeme docs, biasing against kind-agnostic candidates.** 33 of 34 title cases (dev+test) have a `lex:` doc whose title is *exactly* the quoted title but is absent from `expectedIds` (corpus has 307 such same-titled lexemes). Measured impact on dev: rri loses rank-1 to the same-titled lexeme on 4/17 title cases, gramset 1/17; bm25f's tuned "lexeme 0.9" multiplier is structurally rewarded. Inconsistent with alias/definition categories, which *do* include the lexeme. Consistent across dev/test, so the leaderboard is internally fair — but disclosed.

**4. MINOR — The "guaranteed FPF-irrelevant" negatives claim is false for template frame words.** Bank words are collision-checked against corpus titles/aliases, but template words are not — "Best ${w} **repair shop**…" injects "repair", a real title token (`A.6.M` "Module Relation Repair"). On dev negative-2 the baselines' top hit is literally A.6.M — penalized for a genuinely matching title. Similar: "recipe" (test negative-6). Affects `negativeCleanRate` comparability on ~1–2 of 10 negatives per split.

**5. MINOR — Contract comment misdocumented the negative metric** (types.ts said "empty or sub-threshold"; implementation counts only exactly-empty). Fixed in this PR.

**6. MINOR — Harness hardening gaps (verified un-exploited).** (a) run.ts trusts candidate-supplied `buildMs` — all seven self-reporting candidates measure honestly (verified by reading). (b) The shared `corpus.docs` array is passed by reference — no candidate mutates it (verified). (c) No harness-side query warmup — at most 1/150 latencies affected.

**7. NOTE — The harness itself uses a locale-dependent sort** (`corpus.ts` localeCompare for doc ordering). Identical for all candidates within a run (fair); cross-machine tie-break reproducibility not guaranteed.

**8. NOTE — graph-ppr's headline number is on a subset** (`results/graph-ppr-final.json` is dev-generated n=110: MRR .677; full dev is .665). Disclosed in its README; final report uses full-dev numbers.

**9. NOTE — Residual dev/test surface overlap and README nits.** One quoted surface appears in both splits ("module relation repair": dev definition-13 via the lexeme doc, test title-9 via pattern A.6.M) — permitted by the doc-ID-based disjointness rule, but textual overlap (1/110). README pattern count fixed in this PR.

**10. CLEAN — Everything else attacked held up.**
- *Git forensics*: test.json exists only in the post-freeze commit; each candidate commit touches only its own directory plus one registry line (raw diffs verified — pure additions); no other ref contains an earlier test.json; linear reflog.
- *Reproducibility*: the auditor re-ran the harness for **all 8 candidates on both dev and test**: every aggregate metric and all 2,400 per-case `topIds` lists match the committed results **byte-for-byte** (0 diffs). Corpus cache byte-identical to a fresh snapshot projection.
- *No gold-peeking in code*: no reads of `gold/`, no test/dev.json strings, no fs access outside the two disclosed baseline adapters, no hardcoded FPF IDs beyond documented exact-ID tiers, no question-conditional branches, no `Date.now`/`Math.random`/`toLocale*`/env deps in any scoring path.
- *Metrics*: bestRank correctly 1-based with cutoff; equivalence rule applied uniformly; negatives excluded from positive metrics; identical K, case order, and code path for every candidate; determinism checks passed everywhere under full independent re-runs.
- *Gold quality*: 20-case stratified sample all reasonable; all 32 multi-hop equivalence sets exactly equal the corpus `builds_on`/`refines` targets; dev/test normalized-question overlap 0; bm25f and fusion README tables match their result JSONs digit-for-digit.

## Verdict

The numbers are real: every committed and pending leaderboard figure reproduces
per-case byte-identically under independent re-runs, the harness treats all
candidates identically, the metric implementations are correct, and no trace of
gold-peeking machinery exists in any candidate. What does **not** hold up as
stated is the *hold-out claim itself*: the generated test half was
reconstructible from a published seed the entire time, the handcrafted half sat
world-readable in `/tmp` before any candidate was written, and the complete
test set existed on disk during fusion's final tuning window — so "held-out"
rests on the honesty of the candidate agents, not on the experiment's structure
(the uniformly negative dev→test deltas are good evidence that honesty held,
with the fusion handcrafted-half uptick noted as inconclusive at n=40). The
leaderboard can be published, but only with a limitations paragraph covering
findings 1–4, full-dev numbers for graph-ppr, and the generated/handcrafted
test breakdown; absent those disclosures, the phrase "genuinely held-out test
set" would overclaim.
