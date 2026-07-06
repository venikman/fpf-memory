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
python3 tools/lexicon-audit/lexicon_audit.py /tmp/lex.json \
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

Pinned to `sourceHash sha256:f916341a…621ccf2b`, `compilerFingerprint
sha256:0c8fc337…f945a29` — both verified equal to the live `mcp.fpf.sh`
deployment, so these are the deployed catalog's real numbers, not an estimate.

| Band | Count | % of 9,034 lexemes |
|---|---|---|
| **HARD (artifact floor)** | **2,626** | **29.1%** |
| SOFT | 880 | 9.7% |
| CLEAN | 5,528 | 61.2% |
| polluted (hard+soft) | 3,506 | 38.8% |

Largest contributors: prose/multi-sentence blocks (17.1%) and punctuation-led
fragments (11.6%). Full machine-readable summary in `baseline-2026-07-03.json`.

### Change vs the retired 2026-06-08 snapshot

The prior maintainer sweep measured the 06-08 snapshot with a separate (not
committed) classifier. Re-baselined here on 07-03:

| Metric | 06-08 (prior sweep) | 07-03 (this tool) |
|---|---|---|
| lexemes | 7,866 | 9,034 |
| hard-artifact floor | 31.2% | 29.1% |
| clean | ~66% | 61.2% |
| avg aliases / lexeme | 2.72 | 2.868 |
| max aliases | 368× | 123× |

The catalog grew ~15% with the ontic-turn content; pollution stayed structurally
the same (~30% floor). This is a different classifier implementation than the
06-08 sweep, so the ~2-point delta is measurement noise, not a real improvement —
the point is that the problem **persists on the live snapshot**.

## Next (not done here)

1. **Compile-time filter** — drop hard-artifact terms in `index-projector.ts`
   (`buildLexicon`) at the source, then re-run this audit to certify the floor
   dropping toward the gate.
2. **Wire the gate into CI** — add to `fpf-content-quality.yml` in baseline-lock
   mode (fail on regression above the committed baseline), *after* the filter
   lands. Wiring it today would red the pipeline (floor 29.1% ≫ 10% aspirational
   gate). That change touches a workflow surface and is intentionally left for a
   gated follow-up.
