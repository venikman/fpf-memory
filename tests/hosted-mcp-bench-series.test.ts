import { describe, expect, it } from '@rstest/core';

import {
  buildSeriesSummary,
  formatSeriesOutput,
  parseSeriesArgs,
  type SeriesIteration,
  type SeriesOptions,
} from '../scripts/bench-hosted-mcp-series.js';
import type { BenchSummary } from '../scripts/bench-hosted-mcp.js';

describe('hosted MCP benchmark series harness', () => {
  it('parses series controls and bench-lite defaults', () => {
    const options = parseSeriesArgs(
      [
        '--iterations',
        '4',
        '--interval-ms=250',
        '--format',
        'jsonl',
        '--name',
        'proxy',
        '--url',
        'https://example.test/api/mcp/fpf_memory/mcp',
        '--scenario',
        'status',
      ],
      {},
    );

    expect(options.iterations).toBe(4);
    expect(options.intervalMs).toBe(250);
    expect(options.format).toBe('jsonl');
    expect(options.bench).toEqual({
      name: 'proxy',
      url: 'https://example.test/api/mcp/fpf_memory/mcp',
      requests: 12,
      clients: 1,
      warmup: 0,
      timeoutMs: 60000,
      scenario: 'status',
      format: 'json',
      outputPath: undefined,
    });
  });

  it('supports -- separator for forwarded benchmark options', () => {
    const options = parseSeriesArgs(
      [
        '--iterations',
        '2',
        '--interval-ms',
        '0',
        '--',
        '--name',
        'origin',
        '--url',
        'https://example.test/api/mcp/fpf_memory/mcp',
        '--requests',
        '6',
        '--clients',
        '2',
      ],
      {},
    );

    expect(options.iterations).toBe(2);
    expect(options.intervalMs).toBe(0);
    expect(options.bench.requests).toBe(6);
    expect(options.bench.clients).toBe(2);
  });

  it('builds JSONL iteration records and a final summary', () => {
    const options: SeriesOptions = {
      iterations: 2,
      intervalMs: 0,
      format: 'jsonl',
      bench: {
        name: 'proxy',
        url: 'https://example.test/api/mcp/fpf_memory/mcp',
        requests: 3,
        clients: 1,
        warmup: 0,
        timeoutMs: 60000,
        scenario: 'mixed',
        format: 'json',
      },
    };
    const iterations: SeriesIteration[] = [
      {
        iteration: 1,
        phase: 'cold-start',
        scheduledDelayMs: 0,
        summary: benchSummary({ ok: 3, failed: 0, sourceHash: 'sha256:one' }),
      },
      {
        iteration: 2,
        phase: 'soak',
        scheduledDelayMs: 0,
        summary: benchSummary({ ok: 2, failed: 1, sourceHash: 'sha256:two' }),
      },
    ];

    const summary = buildSeriesSummary(
      options,
      iterations,
      new Date('2026-05-04T00:00:00.000Z'),
      new Date('2026-05-04T00:00:02.000Z'),
      2000,
    );
    const lines = formatSeriesOutput(summary, 'jsonl').trim().split('\n').map((line) => JSON.parse(line));

    expect(summary.ok).toBe(5);
    expect(summary.failed).toBe(1);
    expect(summary.errorRate).toBe(0.17);
    expect(lines.map((line) => line.type)).toEqual(['iteration', 'iteration', 'summary']);
    expect(lines[0].phase).toBe('cold-start');
    expect(lines[2].runs).toHaveLength(2);
  });
});

function benchSummary(values: {
  ok: number;
  failed: number;
  sourceHash: string;
}): BenchSummary {
  return {
    name: 'proxy',
    endpoint: 'https://example.test/api/mcp/fpf_memory/mcp',
    scenario: 'mixed',
    clients: 1,
    requestedOperations: values.ok + values.failed,
    warmupOperations: 0,
    startedAt: '2026-05-04T00:00:00.000Z',
    finishedAt: '2026-05-04T00:00:01.000Z',
    durationMs: 1000,
    throughputPerSecond: values.ok,
    ok: values.ok,
    failed: values.failed,
    errorRate: values.failed / Math.max(values.ok + values.failed, 1),
    latencyMs: {
      count: values.ok,
      min: 10,
      mean: 20,
      p50: 20,
      p90: 30,
      p95: 35,
      p99: 39,
      max: 40,
    },
    byOperation: {
      status: undefined,
      browse: undefined,
      search: undefined,
      read: undefined,
      query: undefined,
    },
    correctness: {
      publicTools: ['get_fpf_index_status'],
      sourceHash: values.sourceHash,
      sseGet: {
        status: 200,
        contentType: 'text/event-stream',
      },
    },
    failures: [],
  };
}
