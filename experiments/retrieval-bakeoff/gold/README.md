# Gold query sets

Gold cases follow the `GoldCase` contract in `harness/types.ts`: a flat JSON
array of `{ id, question, expectedIds, category, source, provenance }`.
`expectedIds` is an equivalence set — a case is a hit at k when ANY expected ID
appears in the top-k. `expectedIds: []` marks a negative case (scored as
abstention discipline, not recall).

## Files

| File | Status | Contents |
| --- | --- | --- |
| `dev.json` | **open** | 150 cases = 110 generated + 40 handcrafted. Candidate authors may read it to understand query styles; special-casing individual questions is forbidden (see the experiment README). |
| `dev-generated.json` | open | The generated 110 alone (regenerable, see below). |
| `dev-handcrafted.json` | open | The handcrafted 40 alone (source of truth for the handcrafted half of `dev.json`). |
| `test.json` | **not yet materialized** | Created only after all candidates are frozen. Will be `--split test` generator output plus a held-out handcrafted set. |

## Generator

`gold/generate.ts` emits generated cases deterministically — a seeded
mulberry32 PRNG drives every sampling decision (no `Math.random`, no
`Date.now`). Same corpus + seed + split ⇒ byte-identical output.

```bash
cd experiments/retrieval-bakeoff
bun gold/generate.ts --split dev  --seed 20260831 --out gold/dev-generated.json
bun gold/generate.ts --split test --seed 20260831 --out gold/test-generated.json   # freeze-time only
```

**Seed used for `dev.json`: `20260831`.** The test split derives its own PRNG
stream (`seed ^ 0x9e3779b9`) from the same base seed, so materializing test
later requires only the same `--seed 20260831`.

**Split disjointness.** Dev is always generated first from the base seed. For
`--split test` the generator replays the dev sampling internally, collects the
doc IDs whose surface text dev questions were built from (pattern for
id-lookup/title/multi-hop, lexeme for alias/definition), and refuses to sample
those docs for test. IDs that appear only as *answers* (e.g. a `builds_on`
target) do not block reuse — disjointness is about question surfaces, not
answer sets.

Generator rules (= `provenance` value, one per category):

- `id-lookup` — question embeds a real pattern ID, stratified across parts.
- `title` — question quotes the exact node title.
- `alias` — question uses an alternate surface form: a pattern's extra alias
  (e.g. "U.Work"), a parenthesized short name from a title (e.g. "C-4"), or a
  clean concept lexeme whose title has zero content-word overlap with its
  linked pattern's title (e.g. "bounded context" → A.1.1). Expected =
  the pattern plus the lexeme when both exist.
- `typo` — deterministic seeded corruptions of this split's own title/alias
  phrases: 1-2 edits (adjacent swap, drop, double), only words ≥5 chars, never
  a word's first character.
- `definition` — "what does X mean" over clean concept lexeme titles;
  expected = lexeme + its linked pattern(s).
- `multi-hop` — "which pattern does <title> build on / refine?"; expected =
  all targets of that relation (equivalence set).
- `negative` — seeded mundane-word queries; every bank word is checked against
  corpus titles/aliases at generation time so the queries are guaranteed
  FPF-irrelevant. Expected `[]`.

Every emitted `expectedId` is validated against the corpus (generation throws
on an unknown ID); questions are deduped case-insensitively.

## Handcrafted cases

Categories `paraphrase` and `task` only, written by reading the actual pattern
texts (provenance = the pattern ID(s) consulted). Paraphrase questions were
checked to share **≤1 content word** with the expected pattern's title — they
describe the problem the pattern solves, not its name. Dev handcrafted cases
(`hc-dev-1..40`) cover 26 patterns spread across parts A-G.

## No-peeking rule

- `test.json` is materialized only after all candidates are frozen; nobody
  tunes on it.
- A second **held-out handcrafted set exists outside this repository** (same
  GoldCase shape, `hc-test-*` IDs, built on a disjoint set of patterns from
  dev's handcrafted ones). It is merged into `test.json` at freeze time.
  Its location is intentionally not written down here; candidate authors never
  see it before the freeze.
- Candidate code never reads anything under `gold/` (harness rule 2).
