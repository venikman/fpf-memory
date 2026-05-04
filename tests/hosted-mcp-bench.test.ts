import { describe, expect, it } from '@rstest/core';

import {
  buildOperationPlan,
  formatMarkdownSummary,
  parseBenchArgs,
  readJsonRpcResponse,
  summarizeDurations,
  type BenchSummary,
} from '../scripts/bench-hosted-mcp.js';

describe('hosted MCP benchmark harness', () => {
  it('parses CLI options and env fallbacks', () => {
    const options = parseBenchArgs(
      [
        '--name',
        'origin',
        '--url',
        'https://example.test/api/mcp/fpf_memory/mcp',
        '--requests',
        '40',
        '--clients=4',
        '--warmup',
        '0',
        '--timeout-ms',
        '90000',
        '--scenario',
        'discovery',
        '--format',
        'markdown',
      ],
      {},
    );

    expect(options).toEqual({
      name: 'origin',
      url: 'https://example.test/api/mcp/fpf_memory/mcp',
      requests: 40,
      clients: 4,
      warmup: 0,
      timeoutMs: 90000,
      scenario: 'discovery',
      format: 'markdown',
      outputPath: undefined,
    });
  });

  it('builds deterministic weighted operation plans', () => {
    expect(buildOperationPlan('mixed', 12)).toEqual([
      'status',
      'browse',
      'search',
      'search',
      'read',
      'read',
      'read',
      'query',
      'query',
      'query',
      'status',
      'browse',
    ]);
    expect(buildOperationPlan('query', 3)).toEqual(['query', 'query', 'query']);
  });

  it('summarizes duration percentiles', () => {
    expect(
      summarizeDurations([
        { durationMs: 10 },
        { durationMs: 20 },
        { durationMs: 30 },
        { durationMs: 40 },
      ]),
    ).toEqual({
      count: 4,
      min: 10,
      mean: 25,
      p50: 25,
      p90: 37,
      p95: 38.5,
      p99: 39.7,
      max: 40,
    });
  });

  it('formats markdown summaries for run comparison', () => {
    const summary: BenchSummary = {
      name: 'origin',
      endpoint: 'https://example.test/api/mcp/fpf_memory/mcp',
      scenario: 'mixed',
      clients: 5,
      requestedOperations: 10,
      warmupOperations: 1,
      startedAt: '2026-05-04T00:00:00.000Z',
      finishedAt: '2026-05-04T00:00:01.000Z',
      durationMs: 1000,
      throughputPerSecond: 10,
      ok: 10,
      failed: 0,
      errorRate: 0,
      latencyMs: {
        count: 10,
        min: 1,
        mean: 2,
        p50: 2,
        p90: 3,
        p95: 4,
        p99: 5,
        max: 6,
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
        sourceHash: 'sha256:test',
        sseGet: {
          status: 200,
          contentType: 'text/event-stream',
        },
      },
      failures: [],
    };

    const markdown = formatMarkdownSummary(summary);

    expect(markdown).toContain('# MCP benchmark: origin');
    expect(markdown).toContain('| operation | count | mean ms |');
    expect(markdown).toContain('Fresh source hash: sha256:test');
  });

  it('parses the matching JSON-RPC response from multi-event SSE bodies', () => {
    const message = readJsonRpcResponse(
      200,
      'text/event-stream',
      [
        'event: notification',
        'data: {"jsonrpc":"2.0","method":"progress"}',
        '',
        'event: message',
        'data: {"jsonrpc":"2.0","id":2,"result":{"ok":true}}',
        '',
        'event: message',
        'data: {"jsonrpc":"2.0","id":3,"result":{"wrong":true}}',
        '',
      ].join('\n'),
      2,
    );

    expect(message).toEqual({
      jsonrpc: '2.0',
      id: 2,
      result: { ok: true },
    });
  });

  it('preserves HTTP status context for non-JSON error bodies', () => {
    const message = readJsonRpcResponse(500, 'text/html', '<h1>upstream failed</h1>', 7);

    expect(message).toEqual({
      jsonrpc: '2.0',
      id: 7,
      error: {
        code: -32000,
        message: '<h1>upstream failed</h1>',
      },
    });
  });
});
