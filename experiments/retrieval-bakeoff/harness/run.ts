/**
 * Bake-off runner.
 *
 *   bun harness/run.ts --gold dev                 # all candidates, dev set
 *   bun harness/run.ts --gold dev --candidates bm25f,trigram
 *   bun harness/run.ts --gold all --out .cache/runs/full.json
 *
 * Writes a JSON report and prints a markdown leaderboard.
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';

import { loadCorpus } from './corpus.js';
import { loadGold } from './gold.js';
import { bestRank, computeMetrics, formatLeaderboard } from './metrics.js';
import { createCandidates } from './registry.js';
import type { CandidateReport, CaseResult } from './types.js';

const EXPERIMENT_ROOT = path.resolve(import.meta.dir, '..');
const K = 10;

interface CliOptions {
  gold: string;
  candidates?: string[];
  /** Paths to unregistered candidate modules (default-exporting a Retriever class). */
  factories?: string[];
  out?: string;
  quiet: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { gold: 'dev', quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    const next = (): string => {
      const value = argv[++i];
      if (value === undefined) throw new Error(`missing value for ${arg}`);
      return value;
    };
    if (arg === '--gold') options.gold = next();
    else if (arg.startsWith('--gold=')) options.gold = arg.slice('--gold='.length);
    else if (arg === '--candidates') options.candidates = next().split(',').map((s) => s.trim());
    else if (arg.startsWith('--candidates=')) options.candidates = arg.slice('--candidates='.length).split(',').map((s) => s.trim());
    else if (arg === '--factory') (options.factories ??= []).push(next());
    else if (arg.startsWith('--factory=')) (options.factories ??= []).push(arg.slice('--factory='.length));
    else if (arg === '--out') options.out = next();
    else if (arg.startsWith('--out=')) options.out = arg.slice('--out='.length);
    else if (arg === '--quiet') options.quiet = true;
    else throw new Error(`unknown argument: ${arg}`);
  }
  return options;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const corpus = await loadCorpus();
  const gold = await loadGold(options.gold);

  // Validate gold against corpus so a bad generator fails loudly, not silently.
  for (const goldCase of gold) {
    for (const id of goldCase.expectedIds) {
      if (!corpus.byId.has(id)) {
        throw new Error(`gold case ${goldCase.id} expects unknown corpus id: ${id}`);
      }
    }
  }

  const candidates =
    options.factories && options.factories.length > 0
      ? await Promise.all(
          options.factories.map(async (modulePath) => {
            const resolved = path.resolve(EXPERIMENT_ROOT, modulePath);
            const CandidateClass = (await import(resolved)).default as new () => import('./types.js').Retriever;
            return new CandidateClass();
          }),
        )
      : await createCandidates(options.candidates);
  if (candidates.length === 0) {
    throw new Error('no candidates registered — add entries to harness/registry.ts');
  }
  if (!options.quiet) {
    console.log(
      `corpus: ${corpus.docs.length} docs (${corpus.sourceHash.slice(0, 18)}…) · gold "${options.gold}": ${gold.length} cases · candidates: ${candidates.map((c) => c.name).join(', ')}`,
    );
  }

  const reports: CandidateReport[] = [];
  for (const candidate of candidates) {
    const buildStart = performance.now();
    const build = await candidate.build(corpus.docs);
    build.buildMs = build.buildMs || performance.now() - buildStart;

    const cases: CaseResult[] = [];
    const firstRun = new Map<string, string>();
    for (const goldCase of gold) {
      const start = performance.now();
      const hits = await candidate.query(goldCase.question, K);
      const latencyMs = performance.now() - start;
      const topIds = hits.slice(0, K).map((h) => h.id);
      firstRun.set(goldCase.id, topIds.join('|'));
      cases.push({
        caseId: goldCase.id,
        category: goldCase.category,
        rank: goldCase.expectedIds.length > 0 ? bestRank(topIds, goldCase.expectedIds, K) : null,
        latencyMs,
        topIds,
      });
    }

    // Repeatability: re-query every case on this instance and compare ranked IDs.
    let deterministic = true;
    for (const goldCase of gold) {
      const again = (await candidate.query(goldCase.question, K)).slice(0, K).map((h) => h.id).join('|');
      if (again !== firstRun.get(goldCase.id)) {
        deterministic = false;
        console.error(`  ✗ non-deterministic on case ${goldCase.id} (${candidate.name})`);
      }
    }

    const report: CandidateReport = {
      name: candidate.name,
      build,
      goldSet: options.gold,
      k: K,
      cases,
      metrics: computeMetrics(cases, gold, K),
      deterministic,
    };
    reports.push(report);
    if (!options.quiet) {
      const m = report.metrics;
      console.log(
        `· ${candidate.name}: R@5 ${(100 * m.recallAt5).toFixed(1)}% MRR ${m.mrrAt10.toFixed(3)} p50 ${m.latency.p50Ms.toFixed(2)}ms build ${Math.round(build.buildMs)}ms${deterministic ? '' : '  ⚠ NON-DETERMINISTIC'}`,
      );
    }
  }

  const outPath = path.resolve(
    EXPERIMENT_ROOT,
    options.out ?? path.join('.cache', 'runs', `${options.gold}-latest.json`),
  );
  mkdirSync(path.dirname(outPath), { recursive: true });
  await Bun.write(
    outPath,
    JSON.stringify({ sourceHash: corpus.sourceHash, goldSet: options.gold, k: K, reports }, null, 1),
  );

  console.log(`\n${formatLeaderboard(reports)}\n\nreport: ${path.relative(EXPERIMENT_ROOT, outPath)}`);
}

await main();
