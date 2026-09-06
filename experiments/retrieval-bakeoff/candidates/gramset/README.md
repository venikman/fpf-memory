# gramset — exact trigram-set similarity (containment × Jaccard)

Implements recipe (b) of `research/fuzzy-hashing.md` at its stated conclusion:
at 9,155 docs, **exact** Jaccard/containment over stored gram sets via a gram
inverted index beats MinHash estimation (no estimator noise) and LSH (no
S-curve threshold cliff), and is still trivially fast. This candidate is
deliberately the "no tokenizer smarts, no IDF" end of the design space: no
token-level spell-fix, no BM25, no stopwords, no stemming, no graph use —
it measures how far raw character-gram overlap gets on this corpus.

## Algorithm

1. **Bounded doc text** (never gram 32 KB bodies — digest §b: a ~100-gram
   query vs a ~30k-gram doc has Jaccard ≤ ~0.005, structurally drowned):
   - lexeme, route: `title + aliases`
   - pattern, preface: `title + aliases + first 450 chars of text`
     (cut at a whole-word boundary: if the cut lands mid-ASCII-alnum-word the
     trailing fragment is dropped; a text shorter than 450 chars is kept whole)
2. **pg_trgm-style trigram set** per doc: explicit `toLowerCase()` + NFKD +
   strip U+0300–U+036F; words = ASCII `[a-z0-9]` runs; each word padded with
   2 leading + 1 trailing space (word-start grams counted ~2x for free —
   typos rarely hit first letters); sliding 3-gram window; **deduped set**
   (dedupe also makes the title-repeated-inside-text pitfall a non-issue).
3. **Inverted index** gram → doc postings. Query side runs the identical
   extraction, counts `c = |Q∩D|` per doc via one postings scan
   (Int32Array accumulator + touched list), then scores:

   ```
   C = c / |Q|                (query-side containment)
   J = c / (|Q| + |D| − c)    (exact Jaccard)
   score = C^0.55 · J^0.45    (weighted geometric blend)
   ```

4. **Exact tier** on top (digest §c, syslog-ng layered boosts): normalized
   (lowercase + NFKD-fold + whitespace-collapsed) **whole query** equal to a
   doc id / title / alias scores 1000 / 900 / 800 — unreachable by the [0,1]
   gram tier; ties inside a tier break id-ascending.
5. **Negative discipline**: a doc is emitted only if `c ≥ 2` and
   `score ≥ 0.30`; otherwise nothing is returned (harness scores empty
   results on nonsense as clean abstention).
6. **Determinism**: no randomness, no time, no locale ops; final ordering
   `(score desc, id asc)` with code-unit id comparison; scratch state reset
   per query.

### Why a *geometric* blend (documented deviation from a plain weighted sum)

The digest's recipe (b) says: rank by containment of the query in the doc,
with Jaccard to regularize size mismatch. A first cut used
`0.7·C + 0.3·J`. Measured on this corpus that fails, because of a corpus
quirk: **hub lexemes** (e.g. `lex:b-3`, `lex:a-15-1`) carry 70–115 aliases —
full titles of every pattern that references them — so their "bounded" text
is thousands of chars and their gram sets cover a large fraction of the only
~6k distinct grams in the whole vocabulary. Any English-looking query then
gets C ≈ 0.4–0.6 against some hub *by chance*, and an additive blend leaves
them an `α·C` floor that (a) leaked 4/10 dev negatives past any sane floor
and (b) stuffed top-10s. The multiplicative form `C^(1−w) · J^w` lets their
near-zero Jaccard drag the score down proportionally: same probes score
hubs ≤ 0.2 while real matches keep 0.4–0.95. Monotone in both C and J, in
[0,1], and equal to plain pg_trgm similarity when |Q| = |D| — so the 0.30
floor keeps its pg_trgm provenance.

## Parameters (provenance)

| param | value | provenance |
| --- | --- | --- |
| gram size | 3, pg_trgm padding (2 front / 1 back), deduped | digest §a (Angell/Freund/Willett; pg_trgm docs) |
| `textPrefixChars` | 450 | digest bound sketch was ~300; corpus patterns open with `ID Title` then a "Use This When" applicability paragraph — 450 keeps that paragraph in the bound. Dev sweep (category aggregates): 300→450 lifts task R@5 42→47% and paraphrase 29→57% with no loss elsewhere; 450→800 is noise-level but bleeds title R@5 (18→12%). |
| `jaccardWeight` w | 0.45 | dev sweep over {0.15…0.55}: MRR rises to w≈0.45–0.50, falls at 0.55; 0.45 keeps containment dominant (digest recipe b) and pushes dev negatives' best score down to 0.271 (floor headroom). |
| `scoreFloor` | 0.30 | pg_trgm's battle-tested `%` threshold (digest §a/§c); on dev: negatives' max top-1 score is 0.271 → 10/10 clean with ~0.03 margin, costing ≤0.002 MRR vs a 0.28 floor. |
| `minSharedGrams` | 2 | one shared trigram is noise; cheap guard below the floor's reach on very short queries. |
| exact tiers | 1000/900/800 | syslog-ng layered-boost pattern via digest §c ("tiers so far apart accumulation can't cross them"); mirrors the runtime's exact-ID +100. |
| query cap | 512 chars | safety only; gold questions are far shorter. |

Tuning discipline: parameters were chosen on `gold/dev.json` **aggregate /
per-category metrics only** (sweep script was a throwaway outside the repo);
no individual dev question or expected ID is special-cased, and the
committed candidate code never reads `gold/`.

## Dev results (gold/dev.json, 150 cases, k=10)

```
R@1 30.0%  R@5 41.4%  R@10 45.7%  MRR@10 0.352  nDCG@10 0.377
negative-clean 10/10  build 143 ms  query p50 0.33 ms  p95 0.67 ms  deterministic ✓
per-category R@5: title 18% · typo 41% · alias 75% · definition 82% ·
                  task 47% · paraphrase 57% · id-lookup 6% · multi-hop 0%
```

(Numbers from `bun harness/run.ts --gold dev --factory candidates/gramset/index.ts`;
see `results/dev-latest.json` for the run this README was written against.)

## Known, accepted limitations (the point of this design position)

- **id-lookup ≈ 0**: questions *embed* ids ("Open B.5.3 — …"). Trigrams of
  `b`/`5`/`3` are 2-gram stubs shared corpus-wide (digest pitfall: trigram
  similarity collapses on <4-char terms), and the allowed exact tier is
  whole-query equality only. The digest's fix — a token-equals-id tier — is
  token-level machinery that belongs to the other candidates.
- **title expects the pattern, gram-sets return its satellites**: every
  pattern title is mirrored verbatim in the alias lists of many tiny
  "satellite" lexemes, which are near-supersets of the same title grams with
  smaller |D|; any size-regularized set similarity ranks a dozen of them
  above the pattern doc. (With `textPrefixChars: 0` title R@5 hits 94% — but
  that abandons the mandated body bound and zeroes task/paraphrase.)
- **multi-hop 0%**: needs the neighbor graph, which this candidate ignores
  by design.

## Files

- `index.ts` — the whole candidate (zero deps, pure TS). Constructor accepts
  `Partial<GramsetParams>` for sweeps; the registry uses defaults.
