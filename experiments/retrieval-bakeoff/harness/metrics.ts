import type { CandidateReport, CaseResult, GoldCase } from './types.js';

export function bestRank(topIds: string[], expected: string[], k: number): number | null {
  const expectedSet = new Set(expected);
  for (let i = 0; i < Math.min(topIds.length, k); i++) {
    if (expectedSet.has(topIds[i]!)) return i + 1;
  }
  return null;
}

export function computeMetrics(
  cases: CaseResult[],
  gold: GoldCase[],
  k: number,
): CandidateReport['metrics'] {
  const goldById = new Map(gold.map((g) => [g.id, g]));
  const positive = cases.filter((c) => (goldById.get(c.caseId)?.expectedIds.length ?? 0) > 0);
  const negative = cases.filter((c) => (goldById.get(c.caseId)?.expectedIds.length ?? 0) === 0);

  const recallAt = (cutoff: number): number =>
    positive.length === 0
      ? 0
      : positive.filter((c) => c.rank !== null && c.rank <= cutoff).length / positive.length;

  const mrrAt10 =
    positive.length === 0
      ? 0
      : positive.reduce((sum, c) => sum + (c.rank !== null && c.rank <= 10 ? 1 / c.rank : 0), 0) /
        positive.length;

  // Binary relevance nDCG@10 with a single ideal hit at rank 1.
  const ndcgAt10 =
    positive.length === 0
      ? 0
      : positive.reduce(
          (sum, c) => sum + (c.rank !== null && c.rank <= 10 ? 1 / Math.log2(c.rank + 1) : 0),
          0,
        ) / positive.length;

  const negativeCleanRate =
    negative.length === 0 ? null : negative.filter((c) => c.topIds.length === 0).length / negative.length;

  const latencies = cases.map((c) => c.latencyMs).sort((a, b) => a - b);
  const pick = (q: number): number =>
    latencies.length === 0 ? 0 : latencies[Math.min(latencies.length - 1, Math.floor(q * latencies.length))]!;

  const perCategory: Record<string, { n: number; recallAt5: number; mrrAt10: number }> = {};
  for (const c of positive) {
    const bucket = (perCategory[c.category] ??= { n: 0, recallAt5: 0, mrrAt10: 0 });
    bucket.n += 1;
    if (c.rank !== null && c.rank <= 5) bucket.recallAt5 += 1;
    if (c.rank !== null && c.rank <= 10) bucket.mrrAt10 += 1 / c.rank;
  }
  for (const bucket of Object.values(perCategory)) {
    bucket.recallAt5 = bucket.n === 0 ? 0 : bucket.recallAt5 / bucket.n;
    bucket.mrrAt10 = bucket.n === 0 ? 0 : bucket.mrrAt10 / bucket.n;
  }

  return {
    n: cases.length,
    recallAt1: recallAt(1),
    recallAt5: recallAt(5),
    recallAt10: recallAt(Math.min(10, k)),
    mrrAt10,
    ndcgAt10,
    negativeCleanRate,
    latency: {
      p50Ms: pick(0.5),
      p95Ms: pick(0.95),
      meanMs: latencies.length === 0 ? 0 : latencies.reduce((a, b) => a + b, 0) / latencies.length,
    },
    perCategory,
  };
}

export function formatLeaderboard(reports: CandidateReport[]): string {
  const rows = [...reports].sort((a, b) => b.metrics.mrrAt10 - a.metrics.mrrAt10);
  const lines = [
    '| candidate | R@1 | R@5 | R@10 | MRR@10 | nDCG@10 | neg-clean | p50 ms | p95 ms | build ms | det |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | :-: |',
  ];
  for (const r of rows) {
    const m = r.metrics;
    lines.push(
      `| ${r.name} | ${pct(m.recallAt1)} | ${pct(m.recallAt5)} | ${pct(m.recallAt10)} | ${m.mrrAt10.toFixed(3)} | ${m.ndcgAt10.toFixed(3)} | ${m.negativeCleanRate === null ? '—' : pct(m.negativeCleanRate)} | ${m.latency.p50Ms.toFixed(2)} | ${m.latency.p95Ms.toFixed(2)} | ${Math.round(r.build.buildMs)} | ${r.deterministic ? '✓' : '✗'} |`,
    );
  }
  return lines.join('\n');
}

function pct(x: number): string {
  return `${(100 * x).toFixed(1)}%`;
}
