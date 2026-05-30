import { describe, expect, it } from '@rstest/core';

import {
  formatQaMarkdownSummary,
  parseQaBenchArgs,
  runQaCase,
  type QaBenchSummary,
} from '../scripts/bench-mcp-qa.js';

describe('MCP Q&A benchmark harness', () => {
  it('parses CLI options and env fallbacks', () => {
    const options = parseQaBenchArgs(
      [
        '--name',
        'origin',
        '--url',
        'https://example.test/api/mcp/fpf_reference/mcp',
        '--timeout-ms=90000',
        '--case-set',
        'core',
        '--format',
        'markdown',
      ],
      {},
    );

    expect(options).toEqual({
      name: 'origin',
      url: 'https://example.test/api/mcp/fpf_reference/mcp',
      timeoutMs: 90000,
      caseSet: 'core',
      format: 'markdown',
      outputPath: undefined,
    });
  });

  it('flags missing expected IDs and unknown returned IDs', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'ok',
            confidence: 0.9,
            ids: ['A.15', 'not-real'],
            candidateIds: [],
            gaps: [],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'case',
        question: 'question',
        mode: 'compact',
        expectedIds: ['A.1.1'],
        allowedStatuses: ['ok'],
      },
      new Set(['A.1.1', 'A.15']),
    );

    expect(result.ok).toBe(false);
    expect(result.failures).toContain('missing expected id A.1.1');
    expect(result.failures).toContain('returned unknown id not-real');
  });

  it('skips unknown-ID failures when the catalog listing was truncated', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'ok',
            confidence: 0.9,
            ids: ['A.15', 'not-loaded-from-truncated-catalog'],
            candidateIds: [],
            gaps: [],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'case',
        question: 'question',
        mode: 'compact',
        allowedStatuses: ['ok'],
      },
      new Set(['A.15', '__fpf_known_ids_incomplete__']),
    );

    expect(result.ok).toBe(true);
    expect(result.warnings).toContain(
      'unknown-id check skipped for not-loaded-from-truncated-catalog because catalog listing was truncated',
    );
  });

  it('flags high-confidence degraded synthesis answers', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'ok',
            confidence: 0.98,
            ids: ['A.1.1'],
            candidateIds: [],
            gaps: ['Local synthesis skipped: LM Studio failed with 404.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'case',
        question: 'question',
        mode: 'verbose',
        expectedIds: ['A.1.1'],
        allowedStatuses: ['ok'],
      },
      new Set(['A.1.1']),
    );

    expect(result.ok).toBe(false);
    expect(result.failures).toContain('degraded synthesis gap conflicts with status=ok');
    expect(result.failures).toContain('degraded synthesis confidence 0.98 exceeded 0.5');
  });

  it('accepts degraded answers that expose expected retrieval candidates without committed ids', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'degraded',
            confidence: null,
            ids: [],
            candidateIds: ['A.1.1'],
            gaps: ['Local synthesis skipped: configured local synthesizer reported unavailable.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'case',
        question: 'question',
        mode: 'verbose',
        expectedIds: ['A.1.1'],
        allowedStatuses: ['ok', 'degraded'],
      },
      new Set(['A.1.1']),
    );

    expect(result.ok).toBe(true);
  });

  it('accepts low-confidence unsupported abstentions for low-signal cases', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'unsupported',
            confidence: 0.2,
            ids: [],
            candidateIds: ['C.26'],
            gaps: ['Re-ask with the work context and desired output.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'low_signal_abstain',
        question: 'banana wallpaper coffee quantum spoon',
        mode: 'compact',
        allowedStatuses: ['not_found', 'ambiguous', 'degraded', 'unsupported'],
        maxConfidence: 0.3,
      },
      new Set(['C.26']),
    );

    expect(result.ok).toBe(true);
  });

  it('flags overconfident low-signal abstentions', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'unsupported',
            confidence: 0.6,
            ids: [],
            candidateIds: ['C.26'],
            gaps: ['Re-ask with the work context and desired output.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'low_signal_abstain',
        question: 'banana wallpaper coffee quantum spoon',
        mode: 'compact',
        allowedStatuses: ['not_found', 'ambiguous', 'degraded', 'unsupported'],
        maxConfidence: 0.3,
      },
      new Set(['C.26']),
    );

    expect(result.ok).toBe(false);
    expect(result.failures).toContain('confidence 0.6 exceeded 0.3');
  });

  it('requires numeric confidence for low-signal max-confidence gates', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'unsupported',
            confidence: null,
            ids: [],
            candidateIds: ['C.26'],
            gaps: ['Re-ask with the work context and desired output.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'low_signal_abstain',
        question: 'banana wallpaper coffee quantum spoon',
        mode: 'compact',
        allowedStatuses: ['not_found', 'ambiguous', 'degraded', 'unsupported'],
        maxConfidence: 0.3,
      },
      new Set(['C.26']),
    );

    expect(result.ok).toBe(false);
    expect(result.failures).toContain('confidence was <missing> instead of a number');
  });

  it('requires degraded answers to null confidence', async () => {
    const fakeClient = {
      async callTool() {
        return {
          result: {},
          httpStatus: 200,
          contentType: 'application/json',
          bodyBytes: 2,
          structuredContent: {
            status: 'degraded',
            confidence: 0.45,
            ids: [],
            candidateIds: ['A.1.1'],
            gaps: ['Local synthesis skipped: configured local synthesizer reported unavailable.'],
          },
        };
      },
    };

    const result = await runQaCase(
      fakeClient as never,
      {
        id: 'case',
        question: 'question',
        mode: 'verbose',
        expectedIds: ['A.1.1'],
        allowedStatuses: ['ok', 'degraded'],
      },
      new Set(['A.1.1']),
    );

    expect(result.ok).toBe(false);
    expect(result.failures).toContain('degraded answer confidence was 0.45 instead of null');
  });

  it('formats markdown summaries', () => {
    const summary: QaBenchSummary = {
      name: 'origin',
      endpoint: 'https://example.test/api/mcp/fpf_reference/mcp',
      caseSet: 'core',
      startedAt: '2026-05-04T00:00:00.000Z',
      finishedAt: '2026-05-04T00:00:01.000Z',
      durationMs: 1000,
      sourceHash: 'sha256:test',
      knownIdCount: 2,
      cases: [
        {
          id: 'case',
          question: 'question',
          mode: 'compact',
          ok: true,
          durationMs: 10,
          status: 'ok',
          confidence: 0.8,
          ids: ['A.1.1'],
          candidateIds: [],
          expectedIds: ['A.1.1'],
          expectedAnyIds: [],
          failures: [],
          warnings: [],
        },
      ],
      sessionCheck: {
        ok: true,
        failures: [],
        freshIds: ['route:project-alignment'],
        sessionIds: ['route:project-alignment'],
        primeIds: ['C.16'],
      },
      ok: 2,
      failed: 0,
    };

    const markdown = formatQaMarkdownSummary(summary);

    expect(markdown).toContain('# MCP Q&A benchmark: origin');
    expect(markdown).toContain('# MCP Q&A benchmark: origin\n\nEndpoint:');
    expect(markdown).toContain('Known IDs: 2\n\n| case | ok | status |');
    expect(markdown).toContain('| case | ok | status |');
    expect(markdown).toContain('|  |\n\nSession check: ok');
    expect(markdown).toContain('Session check: ok');
  });
});
