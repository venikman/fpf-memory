/**
 * Failure analysis over a results JSON produced by run.ts.
 *
 *   bun harness/analyze.ts results/dev-latest.json                # misses per candidate
 *   bun harness/analyze.ts results/dev-latest.json --candidate bm25f
 *   bun harness/analyze.ts results/dev-latest.json --diff bm25f,baseline-trace
 *
 * --diff prints cases where the first candidate misses (rank null or > 5) and
 * the second hits at rank ≤ 5, and vice versa — the interesting deltas.
 */
import path from 'node:path';

import { loadCorpus } from './corpus.js';
import type { CandidateReport, GoldCase } from './types.js';

const EXPERIMENT_ROOT = path.resolve(import.meta.dir, '..');

interface ResultsFile {
  goldSet: string;
  reports: CandidateReport[];
}

function parseArgs(argv: string[]): { file: string; candidate?: string; diff?: [string, string] } {
  const file = argv[0];
  if (!file) throw new Error('usage: bun harness/analyze.ts <results.json> [--candidate name] [--diff a,b]');
  let candidate: string | undefined;
  let diff: [string, string] | undefined;
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === '--candidate') candidate = argv[++i];
    else if (arg.startsWith('--candidate=')) candidate = arg.slice('--candidate='.length);
    else if (arg === '--diff' || arg.startsWith('--diff=')) {
      const raw = arg === '--diff' ? argv[++i] : arg.slice('--diff='.length);
      const parts = (raw ?? '').split(',').map((s) => s.trim());
      if (parts.length !== 2) throw new Error('--diff expects two comma-separated candidate names');
      diff = [parts[0]!, parts[1]!];
    } else throw new Error(`unknown argument: ${arg}`);
  }
  return { file, candidate, diff };
}

async function loadGoldFor(goldSet: string): Promise<Map<string, GoldCase>> {
  const files = goldSet === 'all' ? ['dev.json', 'test.json'] : [`${goldSet}.json`];
  const cases: GoldCase[] = [];
  for (const file of files) {
    const blob = Bun.file(path.join(EXPERIMENT_ROOT, 'gold', file));
    if (await blob.exists()) cases.push(...((await blob.json()) as GoldCase[]));
  }
  return new Map(cases.map((c) => [c.id, c]));
}

function label(corpusTitle: string | undefined, id: string): string {
  return corpusTitle ? `${id} (${corpusTitle.slice(0, 48)})` : id;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const resultsPath = path.resolve(EXPERIMENT_ROOT, options.file);
  const results = (await Bun.file(resultsPath).json()) as ResultsFile;
  const gold = await loadGoldFor(results.goldSet);
  const corpus = await loadCorpus();
  const title = (id: string): string | undefined => corpus.byId.get(id)?.title;

  if (options.diff) {
    const [aName, bName] = options.diff;
    const a = results.reports.find((r) => r.name === aName);
    const b = results.reports.find((r) => r.name === bName);
    if (!a || !b) throw new Error(`--diff candidates not found in results (have: ${results.reports.map((r) => r.name).join(', ')})`);
    const bCases = new Map(b.cases.map((c) => [c.caseId, c]));
    for (const [first, second, dir] of [
      [a, b, `${aName} misses, ${bName} hits`],
      [b, a, `${bName} misses, ${aName} hits`],
    ] as const) {
      console.log(`\n## ${dir}\n`);
      const otherCases = first === a ? bCases : new Map(a.cases.map((c) => [c.caseId, c]));
      for (const c of first.cases) {
        const goldCase = gold.get(c.caseId);
        if (!goldCase || goldCase.expectedIds.length === 0) continue;
        const other = otherCases.get(c.caseId);
        const firstMiss = c.rank === null || c.rank > 5;
        const otherHit = other && other.rank !== null && other.rank <= 5;
        if (firstMiss && otherHit) {
          console.log(
            `- [${goldCase.category}] ${c.caseId}: "${goldCase.question}"\n    expected ${goldCase.expectedIds.map((id) => label(title(id), id)).join(' | ')} · ${first.name} rank ${c.rank ?? '∅'} vs ${second.name} rank ${other.rank}\n    ${first.name} top: ${c.topIds.slice(0, 5).join(', ')}`,
          );
        }
      }
    }
    return;
  }

  for (const report of results.reports) {
    if (options.candidate && report.name !== options.candidate) continue;
    const misses = report.cases.filter((c) => {
      const goldCase = gold.get(c.caseId);
      return goldCase && goldCase.expectedIds.length > 0 && (c.rank === null || c.rank > 5);
    });
    console.log(`\n## ${report.name} — ${misses.length} miss(es) beyond rank 5\n`);
    for (const c of misses) {
      const goldCase = gold.get(c.caseId)!;
      console.log(
        `- [${goldCase.category}] ${c.caseId} rank=${c.rank ?? '∅'}: "${goldCase.question}"\n    expected: ${goldCase.expectedIds.map((id) => label(title(id), id)).join(' | ')}\n    got: ${c.topIds.slice(0, 5).map((id) => label(title(id), id)).join(', ')}`,
      );
    }
  }
}

await main();
