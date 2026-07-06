#!/usr/bin/env python3
"""lexicon_audit.py — measure lexicon pollution in the compiled FPF catalog.

The compiler mis-files a large share of prose fragments, table residue, and
bare notation as `lexeme` vocabulary nodes. This classifier partitions every
canonical lexeme term into three disjoint bands and reports the fraction that
is clearly not a vocabulary term (the "hard-artifact floor").

Input: the JSON emitted by dump-lexicon.ts, i.e. {"provenance":..,"lexemes":[..]}.
Also accepts a bare list of {"canonical":..} objects, or a compiled
snapshot.json (its top-level "lexicon" record).

Classification is priority-ordered, so each term lands in exactly one bucket:

  HARD  (artifact floor)
    empty                            blank after strip
    no-letter                        no A-Za-z at all: { }, Δ-0, [0,1], arxiv ids
    punctuation-led                  first char not alphanumeric: ", the ..." / "{...}"
    prose-block                      long / multi-sentence text mis-filed as a term
  SOFT  (suspicious, review)
    notation-residue                 grammar/table fragments: | ::= := ⟨ { @...
    trailing-punctuation             ends in , : ;
    overlong-phrase                  long single phrase, no hard signal
  CLEAN
    everything else

Usage:
    bun tools/lexicon-audit/dump-lexicon.ts --out /tmp/lex.json
    python3 tools/lexicon-audit/lexicon_audit.py /tmp/lex.json [--gate 10] \
        [--baseline-out tools/lexicon-audit/baseline-2026-07-03.json] [--examples 3]

--gate PCT exits 1 when the hard-artifact floor exceeds PCT percent, so the
tool doubles as a CI ratchet once the compile-time cleanup lands.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter

_LETTER = re.compile(r"[A-Za-z]")
_SENTENCE = re.compile(r"[.:;]\s+\S")


def classify(raw: str) -> tuple[str, str]:
    c = (raw or "").strip()
    if not c:
        return "hard", "empty"
    if not _LETTER.search(c):
        return "hard", "no-letter (symbol/number/citation)"
    if not c[0].isalnum():
        return "hard", "punctuation-led fragment"
    words = len(c.split())
    if len(c) > 120 or words > 12 or (_SENTENCE.search(c) and words > 10):
        return "hard", "prose/multi-sentence block"
    if any(tok in c for tok in ("|", "::=", ":=", "⟨", "{")) or ("@" in c and len(c) > 40):
        return "soft", "notation/table residue"
    if c[-1] in ",:;":
        return "soft", "trailing punctuation"
    if len(c) > 60 or words > 8:
        return "soft", "overlong phrase"
    return "clean", "clean"


def load_canonicals(path: str) -> tuple[list[str], dict]:
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    provenance: dict = {}
    if isinstance(data, dict) and "lexemes" in data:  # dump-lexicon.ts export
        provenance = data.get("provenance", {})
        rows = data["lexemes"]
    elif isinstance(data, dict) and "lexicon" in data:  # snapshot.json
        rows = list(data["lexicon"].values())
    elif isinstance(data, list):  # bare list
        rows = data
    else:
        raise SystemExit(f"unrecognized lexicon JSON shape in {path}")
    canon = [str(r.get("canonical", "")) for r in rows if isinstance(r, dict)]
    return canon, provenance


def main() -> int:
    ap = argparse.ArgumentParser(description="Audit FPF lexicon pollution.")
    ap.add_argument("input", help="lexicon export (dump-lexicon.ts) or snapshot.json")
    ap.add_argument("--gate", type=float, default=None,
                    help="exit 1 if hard-artifact %% exceeds this threshold")
    ap.add_argument("--baseline-out", default=None, help="write machine-readable summary here")
    ap.add_argument("--examples", type=int, default=3, help="examples per reason (default 3)")
    args = ap.parse_args()

    canon, provenance = load_canonicals(args.input)
    n = len(canon)
    if n == 0:
        raise SystemExit("no lexemes found in input")

    bands: Counter[str] = Counter()
    reasons: Counter[tuple[str, str]] = Counter()
    examples: dict[tuple[str, str], list[str]] = {}
    for term in canon:
        band, reason = classify(term)
        bands[band] += 1
        reasons[(band, reason)] += 1
        examples.setdefault((band, reason), [])
        if len(examples[(band, reason)]) < args.examples:
            examples[(band, reason)].append(term[:70])

    hard, soft, clean = bands["hard"], bands["soft"], bands["clean"]
    pct = lambda x: round(100 * x / n, 1)

    if provenance:
        print(f"source        : {provenance.get('specPath', '?')}")
        print(f"sourceHash    : {provenance.get('sourceHash', '?')}")
        print(f"compilerFP    : {provenance.get('compilerFingerprint', '?')}")
        print(f"upstreamRef   : {provenance.get('upstreamRef', '?')}")
    print(f"lexemes       : {n}")
    print("-" * 56)
    print(f"HARD  {hard:5d}  {pct(hard):5.1f}%   <-- artifact floor")
    print(f"SOFT  {soft:5d}  {pct(soft):5.1f}%")
    print(f"CLEAN {clean:5d}  {pct(clean):5.1f}%")
    print(f"hard+soft polluted: {pct(hard + soft):.1f}%   clean: {pct(clean):.1f}%")
    print("-" * 56)
    for (band, reason), count in sorted(reasons.items(), key=lambda kv: -kv[1]):
        print(f"  {band:<6}{reason:<34}{count:5d}  {pct(count):5.1f}%")
        for ex in examples[(band, reason)]:
            print(f"         e.g. {ex!r}")

    summary = {
        "provenance": provenance,
        "lexemes": n,
        "bands": {"hard": hard, "soft": soft, "clean": clean},
        "pct": {"hard": pct(hard), "soft": pct(soft), "clean": pct(clean)},
        "reasons": {f"{b}:{r}": c for (b, r), c in reasons.items()},
    }
    if args.baseline_out:
        with open(args.baseline_out, "w", encoding="utf-8") as fh:
            json.dump(summary, fh, indent=2)
        print(f"\nwrote baseline -> {args.baseline_out}")

    if args.gate is not None and pct(hard) > args.gate:
        print(f"\nGATE FAIL: hard-artifact floor {pct(hard)}% > {args.gate}%", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
