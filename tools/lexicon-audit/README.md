# Lexicon pollution audit

Measures how much of the compiled FPF `lexeme` catalog is **not** actually
vocabulary — prose fragments, table residue, and bare notation that the
compiler mis-files as lexemes. This is the reproducible, committed form of the
2026-07-05 maintainer sweep's lexicon finding, re-baselined against the live
`2026-07-03` publication.

## Why

`lexeme` nodes dominate the catalog (9,034 of 9,737 nodes on 07-03) and are
inherited as search aliases, so pollution here directly degrades retrieval
precision. The audit gives a defensible floor for "how much is junk" and a gate
that can ratchet the number down once a compile-time filter lands
(see *Next* below).

## Run

```bash
# 1. compile the committed publication spec -> lexicon export (+ provenance)
bun tools/lexicon-audit/dump-lexicon.ts --out /tmp/lex.json

# 2. classify, print the report, (optionally) gate and write a baseline
bun tools/lexicon-audit/lexicon-audit.ts /tmp/lex.json \
    --gate 10 --baseline-out tools/lexicon-audit/baseline-2026-07-03.json
```

`dump-lexicon.ts` compiles with the repo's own deterministic compiler and
stamps the export with `sourceHash` + `compilerFingerprint`, so a report is
always pinned to an exact published artifact. Override the spec with
`FPF_SPEC_SOURCE_PATH`. The audit also reads a raw `snapshot.json` directly.

## Classification (priority-ordered, disjoint)

| Band | Reason | Signal |
|---|---|---|
| HARD | `empty` | blank after strip |
| HARD | `no-letter` | no `A-Za-z` at all — `{ }`, `Δ-0`, `[0,1]`, arxiv ids |
| HARD | `punctuation-led` | first char not alphanumeric — `", not by ..."`, `"{...}"` |
| HARD | `prose/multi-sentence block` | `len>120`, `>12` words, or a sentence boundary + `>10` words |
| SOFT | `notation/table residue` | contains `\|` `::=` `:=` `⟨` `{`, or `@` in a long term |
| SOFT | `trailing punctuation` | ends in `, : ;` |
| SOFT | `overlong phrase` | `len>60` or `>8` words, no hard signal |
| CLEAN | — | everything else |

The HARD total is the **artifact floor**: terms that are unambiguously not
vocabulary. SOFT are review-worthy borderlines. The rules are deliberately
conservative (a real term wrongly marked HARD is the cost we avoid), so the true
pollution is likely *higher* than the floor.

## Baseline — 2026-07-03 publication (`f7c7e93f`)

All numbers pinned to `sourceHash sha256:f916341a…621ccf2b`. The measurement
was taken on the **deployed** compiler (`compilerFingerprint sha256:0c8fc337…`,
verified equal to live `mcp.fpf.sh`) and re-certified after the filter landed.

### Before the compile-time filter (deployed compiler)

| Band | Count | % of 9,034 lexemes |
|---|---|---|
| **HARD (artifact floor)** | **2,626** | **29.1%** |
| SOFT | 880 | 9.7% |
| CLEAN | 5,528 | 61.2% |
| polluted (hard+soft) | 3,506 | 38.8% |

Largest contributors: prose/multi-sentence blocks (17.1%) and punctuation-led
fragments (11.6%).

### After the compile-time filter (`shouldIndexLexeme`, current compiler)

`shouldIndexLexeme` now rejects the HARD band at compile time. It drops
**exactly** the 2,626 hard artifacts (compiler ↔ audit agree to the term), no
legitimate vocabulary — Greek operator symbols like `Γ_time` / `Φ_plane` are
kept. `baseline-2026-07-03.json` holds this post-filter state (new
`compilerFingerprint sha256:722e13d0…`, not yet deployed).

| Band | Count | % of 6,421 lexemes |
|---|---|---|
| **HARD (artifact floor)** | **0** | **0.0%** |
| SOFT | 886 | 13.8% |
| CLEAN | 5,535 | 86.2% |

`tests/lexicon-hygiene.test.ts` locks this — it fails if a compiler change
reintroduces any hard artifact.

### Change vs the retired 2026-06-08 snapshot

The prior maintainer sweep measured the 06-08 snapshot with a separate (not
committed) classifier. Re-baselined here on 07-03:

| Metric | 06-08 (prior sweep) | 07-03 pre-filter | 07-03 post-filter |
|---|---|---|---|
| lexemes | 7,866 | 9,034 | 6,421 |
| hard-artifact floor | 31.2% | 29.1% | **0.0%** |
| clean | ~66% | 61.2% | **86.2%** |

The ontic-turn content grew the catalog ~15%; the ~30% pollution floor was
structural (different classifier than the 06-08 sweep, so treat the pre-filter
delta as measurement noise). The filter removes it at the source.

## Next (not done here)

1. **Wire the gate into CI** — add `lexicon-audit.ts --gate` to
   `fpf-content-quality.yml` in baseline-lock mode (fail on regression above the
   committed baseline). Now safe: the post-filter floor is 0%, well under any
   gate. Left as a gated follow-up because it edits a workflow surface.
2. **Deploy** — `published/current/**` has been regenerated with the new
   compiler (fingerprint `722e13d0`, snapshot 117→87 MB) and committed, so
   `validate:published` passes; the cleanup reaches production on the next prod
   deploy of `main`.
3. **SOFT band** — math-formula notation (`Γ_time=rolling(180d)`, `α(v) = id`)
   still lands in CLEAN/SOFT; a later pass can tighten these once the operator
   symbols worth keeping are enumerated.
