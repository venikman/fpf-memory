import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { performance } from 'node:perf_hooks';

import {
  parseBenchArgs,
  runBenchmark,
  type BenchOptions,
  type BenchSummary,
} from './bench-hosted-mcp.js';
import {
  parseFlagMap,
  readNonNegativeInteger,
  readOptionalString,
  readPositiveInteger,
  readString,
  round,
} from './_args.js';

const DEFAULT_ITERATIONS = 3;
const DEFAULT_INTERVAL_MS = 60_000;
const DEFAULT_LITE_REQUESTS = 12;
const DEFAULT_LITE_CLIENTS = 1;
const DEFAULT_LITE_WARMUP = 0;

type SeriesFormat = 'json' | 'jsonl';
type SeriesPhase = 'cold-start' | 'idle' | 'soak';

export interface SeriesOptions {
  iterations: number;
  intervalMs: number;
  format: SeriesFormat;
  outputPath?: string;
  bench: BenchOptions;
}

export interface SeriesIteration {
  iteration: number;
  phase: SeriesPhase;
  scheduledDelayMs: number;
  summary: BenchSummary;
}

export interface SeriesSummary {
  name: string;
  endpoint: string;
  iterations: number;
  intervalMs: number;
  scenario: BenchOptions['scenario'];
  clients: number;
  requestsPerIteration: number;
  warmupPerIteration: number;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  ok: number;
  failed: number;
  errorRate: number;
  runs: Array<{
    iteration: number;
    phase: SeriesPhase;
    scheduledDelayMs: number;
    startedAt: string;
    finishedAt: string;
    durationMs: number;
    ok: number;
    failed: number;
    throughputPerSecond: number;
    latencyMs: BenchSummary['latencyMs'];
    sourceHash?: string;
    failures: BenchSummary['failures'];
  }>;
}

interface ParsedSeriesArgs {
  seriesArgs: string[];
  benchArgs: string[];
}

export function parseSeriesArgs(
  args: string[],
  env: NodeJS.ProcessEnv = process.env,
): SeriesOptions {
  const { seriesArgs, benchArgs } = splitSeriesArgs(args);
  const values = parseFlagMap(seriesArgs);
  const defaultedBenchArgs = applyBenchLiteDefaults(benchArgs, env);
  const bench = parseBenchArgs(defaultedBenchArgs, env);

  return {
    iterations: readPositiveInteger(
      values,
      'iterations',
      env.FPF_MCP_BENCH_SERIES_ITERATIONS,
      DEFAULT_ITERATIONS,
    ),
    intervalMs: readNonNegativeInteger(
      values,
      'interval-ms',
      env.FPF_MCP_BENCH_SERIES_INTERVAL_MS,
      DEFAULT_INTERVAL_MS,
    ),
    format: readSeriesFormat(readString(values, 'format', env.FPF_MCP_BENCH_SERIES_FORMAT ?? 'json')),
    outputPath: readOptionalString(values, 'output', env.FPF_MCP_BENCH_SERIES_OUTPUT),
    bench,
  };
}

export async function runBenchmarkSeries(options: SeriesOptions): Promise<SeriesSummary> {
  const startedAt = new Date();
  const start = performance.now();
  const iterations: SeriesIteration[] = [];

  for (let index = 0; index < options.iterations; index += 1) {
    const scheduledDelayMs = index === 0 ? 0 : options.intervalMs;
    if (scheduledDelayMs > 0) {
      await sleep(scheduledDelayMs);
    }

    const iteration = index + 1;
    const phase = phaseForIteration(iteration, options.iterations);
    const bench = await runBenchmark({
      ...options.bench,
      name: `${options.bench.name}-${phase}-${iteration}`,
    });
    iterations.push({
      iteration,
      phase,
      scheduledDelayMs,
      summary: bench,
    });
  }

  return buildSeriesSummary(options, iterations, startedAt, new Date(), performance.now() - start);
}

export function buildSeriesSummary(
  options: SeriesOptions,
  iterations: SeriesIteration[],
  startedAt: Date,
  finishedAt: Date,
  durationMs: number,
): SeriesSummary {
  const ok = iterations.reduce((total, iteration) => total + iteration.summary.ok, 0);
  const failed = iterations.reduce((total, iteration) => total + iteration.summary.failed, 0);
  const total = ok + failed;

  return {
    name: options.bench.name,
    endpoint: options.bench.url,
    iterations: options.iterations,
    intervalMs: options.intervalMs,
    scenario: options.bench.scenario,
    clients: options.bench.clients,
    requestsPerIteration: options.bench.requests,
    warmupPerIteration: options.bench.warmup,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: round(durationMs),
    ok,
    failed,
    errorRate: round(failed / Math.max(total, 1)),
    runs: iterations.map((iteration) => ({
      iteration: iteration.iteration,
      phase: iteration.phase,
      scheduledDelayMs: iteration.scheduledDelayMs,
      startedAt: iteration.summary.startedAt,
      finishedAt: iteration.summary.finishedAt,
      durationMs: iteration.summary.durationMs,
      ok: iteration.summary.ok,
      failed: iteration.summary.failed,
      throughputPerSecond: iteration.summary.throughputPerSecond,
      latencyMs: iteration.summary.latencyMs,
      sourceHash: iteration.summary.correctness.sourceHash,
      failures: iteration.summary.failures,
    })),
  };
}

export function formatSeriesOutput(
  summary: SeriesSummary,
  format: SeriesFormat,
): string {
  if (format === 'jsonl') {
    return [
      ...summary.runs.map((run) => JSON.stringify({ type: 'iteration', ...run })),
      JSON.stringify({ type: 'summary', ...summary }),
      '',
    ].join('\n');
  }
  return `${JSON.stringify(summary, null, 2)}\n`;
}

function splitSeriesArgs(args: string[]): ParsedSeriesArgs {
  const separatorIndex = args.indexOf('--');
  if (separatorIndex >= 0) {
    return {
      seriesArgs: args.slice(0, separatorIndex),
      benchArgs: args.slice(separatorIndex + 1),
    };
  }

  const seriesKeys = new Set(['iterations', 'interval-ms', 'format', 'output']);
  // This fallback keeps old invocations working. Use `--` before bench flags
  // when a forwarded option could collide with series-level option names.
  const seriesArgs: string[] = [];
  const benchArgs: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected positional argument: ${token}`);
    }
    const key = token.slice(2).split('=', 1)[0];
    const target = seriesKeys.has(key) ? seriesArgs : benchArgs;
    target.push(token);
    if (!token.includes('=')) {
      const next = args[index + 1];
      if (next && !next.startsWith('--')) {
        target.push(next);
        index += 1;
      }
    }
  }

  return { seriesArgs, benchArgs };
}

function applyBenchLiteDefaults(args: string[], env: NodeJS.ProcessEnv): string[] {
  const result = [...args];
  addDefaultFlag(result, 'requests', env.FPF_MCP_BENCH_REQUESTS, `${DEFAULT_LITE_REQUESTS}`);
  addDefaultFlag(result, 'clients', env.FPF_MCP_BENCH_CLIENTS, `${DEFAULT_LITE_CLIENTS}`);
  addDefaultFlag(result, 'warmup', env.FPF_MCP_BENCH_WARMUP, `${DEFAULT_LITE_WARMUP}`);
  return result;
}

function addDefaultFlag(
  args: string[],
  key: string,
  envValue: string | undefined,
  fallback: string,
): void {
  if (envValue !== undefined || hasFlag(args, key)) {
    return;
  }
  args.push(`--${key}`, fallback);
}

function hasFlag(args: string[], key: string): boolean {
  return args.some((arg) => arg === `--${key}` || arg.startsWith(`--${key}=`));
}

function phaseForIteration(iteration: number, iterations: number): SeriesPhase {
  if (iteration === 1) {
    return 'cold-start';
  }
  if (iteration === iterations) {
    return 'soak';
  }
  return 'idle';
}

function readSeriesFormat(value: string): SeriesFormat {
  if (value === 'json' || value === 'jsonl') {
    return value;
  }
  throw new Error(`Unknown series format: ${value}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main(): Promise<void> {
  const options = parseSeriesArgs(process.argv.slice(2));
  const summary = await runBenchmarkSeries(options);
  const output = formatSeriesOutput(summary, options.format);

  if (options.outputPath) {
    await mkdir(dirname(options.outputPath), { recursive: true });
    await writeFile(options.outputPath, output, 'utf8');
  }

  process.stdout.write(output);
  if (summary.failed > 0) {
    process.exitCode = 1;
  }
}

if (import.meta.main) {
  await main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
