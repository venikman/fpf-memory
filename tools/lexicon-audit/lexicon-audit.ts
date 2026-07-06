/**
 * lexicon-audit.ts — measure lexicon pollution in the compiled FPF catalog.
 *
 * The compiler mis-files a share of prose fragments, table residue, and bare
 * notation as `lexeme` vocabulary nodes. This classifier partitions every
 * canonical lexeme term into three disjoint bands and reports the fraction that
 * is clearly not a vocabulary term (the "hard-artifact floor"). Kept in the
 * Bun/TS toolchain to honor the repo's no-Python contract.
 *
 * Input: the JSON emitted by dump-lexicon.ts ({"provenance":..,"lexemes":[..]}),
 * a bare list of {canonical}, or a compiled snapshot.json (top-level "lexicon").
 *
 * Priority-ordered so each term lands in exactly one bucket:
 *   HARD   empty | no-letter | punctuation-led | prose/multi-sentence block
 *   SOFT   notation/table residue | trailing punctuation | overlong phrase
 *   CLEAN  everything else
 *
 * Usage:
 *   bun tools/lexicon-audit/dump-lexicon.ts --out /tmp/lex.json
 *   bun tools/lexicon-audit/lexicon-audit.ts /tmp/lex.json \
 *     [--gate 10] [--baseline-out tools/lexicon-audit/baseline-2026-07-03.json] [--examples 3]
 *
 * --gate PCT exits 1 when the hard floor exceeds PCT percent, compared on the
 * RAW ratio (not the rounded display value) so the CI ratchet cannot silently
 * pass a fractional overage.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const LETTER = /[A-Za-z]/;
const SENTENCE = /[.:;]\s+\S/;
const LEAD_ALNUM = /^[\p{L}\p{N}]/u;

type Band = 'hard' | 'soft' | 'clean';

function classify(raw: string): { band: Band; reason: string } {
  const c = (raw ?? '').trim();
  if (!c) return { band: 'hard', reason: 'empty' };
  if (!LETTER.test(c)) return { band: 'hard', reason: 'no-letter (symbol/number/citation)' };
  if (!LEAD_ALNUM.test(c)) return { band: 'hard', reason: 'punctuation-led fragment' };
  const words = c.split(/\s+/).filter(Boolean).length;
  if (c.length > 120 || words > 12 || (SENTENCE.test(c) && words > 10)) {
    return { band: 'hard', reason: 'prose/multi-sentence block' };
  }
  if (/[|]|::=|:=|⟨|\{/.test(c) || (c.includes('@') && c.length > 40)) {
    return { band: 'soft', reason: 'notation/table residue' };
  }
  if (/[,:;]$/.test(c)) return { band: 'soft', reason: 'trailing punctuation' };
  if (c.length > 60 || words > 8) return { band: 'soft', reason: 'overlong phrase' };
  return { band: 'clean', reason: 'clean' };
}

function loadCanonicals(path: string): { canon: string[]; provenance: Record<string, unknown> } {
  const data = JSON.parse(readFileSync(path, 'utf8')) as unknown;
  let rows: unknown[];
  let provenance: Record<string, unknown> = {};
  if (data && typeof data === 'object' && 'lexemes' in data) {
    provenance = ((data as Record<string, unknown>).provenance as Record<string, unknown>) ?? {};
    rows = (data as { lexemes: unknown[] }).lexemes;
  } else if (data && typeof data === 'object' && 'lexicon' in data) {
    rows = Object.values((data as { lexicon: Record<string, unknown> }).lexicon);
  } else if (Array.isArray(data)) {
    rows = data;
  } else {
    throw new Error(`unrecognized lexicon JSON shape in ${path}`);
  }
  const canon = rows
    .filter((r): r is Record<string, unknown> => !!r && typeof r === 'object')
    .map((r) => String(r.canonical ?? ''));
  return { canon, provenance };
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : undefined;
}

const input = process.argv[2];
if (!input || input.startsWith('--')) {
  process.stderr.write('usage: bun tools/lexicon-audit/lexicon-audit.ts <lexicon.json> [--gate N] [--baseline-out P] [--examples N]\n');
  process.exit(2);
}
const gate = arg('--gate') !== undefined ? Number(arg('--gate')) : undefined;
const baselineOut = arg('--baseline-out');
const exampleCap = arg('--examples') !== undefined ? Number(arg('--examples')) : 3;

const { canon, provenance } = loadCanonicals(input);
const n = canon.length;
if (n === 0) throw new Error('no lexemes found in input');

const bands: Record<Band, number> = { hard: 0, soft: 0, clean: 0 };
const reasons = new Map<string, number>();
const examples = new Map<string, string[]>();
for (const term of canon) {
  const { band, reason } = classify(term);
  bands[band] += 1;
  const key = `${band}:${reason}`;
  reasons.set(key, (reasons.get(key) ?? 0) + 1);
  const ex = examples.get(key) ?? [];
  if (ex.length < exampleCap) ex.push(term.slice(0, 70));
  examples.set(key, ex);
}

const pct = (x: number): number => Math.round((1000 * x) / n) / 10;
const rawPct = (x: number): number => (100 * x) / n;
const { hard, soft, clean } = bands;

if (provenance.sourceHash) {
  process.stdout.write(`source        : ${provenance.specPath ?? '?'}\n`);
  process.stdout.write(`sourceHash    : ${provenance.sourceHash}\n`);
  process.stdout.write(`compilerFP    : ${provenance.compilerFingerprint ?? '?'}\n`);
  process.stdout.write(`upstreamRef   : ${provenance.upstreamRef ?? '?'}\n`);
}
process.stdout.write(`lexemes       : ${n}\n`);
process.stdout.write(`${'-'.repeat(56)}\n`);
process.stdout.write(`HARD  ${String(hard).padStart(5)}  ${pct(hard).toFixed(1).padStart(5)}%   <-- artifact floor\n`);
process.stdout.write(`SOFT  ${String(soft).padStart(5)}  ${pct(soft).toFixed(1).padStart(5)}%\n`);
process.stdout.write(`CLEAN ${String(clean).padStart(5)}  ${pct(clean).toFixed(1).padStart(5)}%\n`);
process.stdout.write(`hard+soft polluted: ${pct(hard + soft).toFixed(1)}%   clean: ${pct(clean).toFixed(1)}%\n`);
process.stdout.write(`${'-'.repeat(56)}\n`);
for (const [key, count] of [...reasons.entries()].sort((a, b) => b[1] - a[1])) {
  const [band, reason] = key.split(/:(.+)/);
  process.stdout.write(`  ${band.padEnd(6)}${reason.padEnd(34)}${String(count).padStart(5)}  ${pct(count).toFixed(1).padStart(5)}%\n`);
  for (const ex of examples.get(key) ?? []) process.stdout.write(`         e.g. ${JSON.stringify(ex)}\n`);
}

if (baselineOut) {
  const summary = {
    provenance,
    lexemes: n,
    bands: { hard, soft, clean },
    pct: { hard: pct(hard), soft: pct(soft), clean: pct(clean) },
    reasons: Object.fromEntries(reasons),
  };
  writeFileSync(baselineOut, `${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`\nwrote baseline -> ${baselineOut}\n`);
}

if (gate !== undefined && rawPct(hard) > gate) {
  process.stderr.write(`\nGATE FAIL: hard-artifact floor ${rawPct(hard).toFixed(4)}% > ${gate}%\n`);
  process.exit(1);
}
