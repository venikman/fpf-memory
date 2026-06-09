import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

import { describe, expect, it } from '@rstest/core';

import {
  buildUsageReportFromLines,
  configErrorUsageReport,
  formatUsageReportMarkdown,
} from '../src/build/usage-report.js';

const FIXTURE_PATH = 'tests/fixtures/usage/mcp_tool_usage.jsonl';
const NOW = new Date('2026-05-31T12:30:00.000Z');
const SENTINELS = [
  '__TEST_RAW_QUESTION_SHOULD_NOT_LEAK__',
  '__TEST_SESSION_SHOULD_NOT_LEAK__',
  '__TEST_ANSWER_SHOULD_NOT_LEAK__',
];

describe('usage report aggregation', () => {
  it('counts served, cited, resolved, candidate, doc, and route IDs separately', async () => {
    const report = await buildFixtureReport();

    expect(report.state).toBe('ok');
    expect(report.ok).toBe(true);
    expect(report.window.start).toBe('2026-05-30T12:30:00.000Z');
    expect(report.window.end).toBe('2026-05-31T12:30:00.000Z');
    expect(report.totals).toEqual({
      rawLineCount: 10,
      validEventCount: 8,
      invalidEventCount: 2,
      outOfWindowEventCount: 0,
      legacyEventCount: 1,
      unknownUnresolvedEventCount: 1,
    });

    expect(report.topServedPatternIds).toEqual([
      { id: 'A.1', count: 2 },
      { id: 'A.2', count: 2 },
    ]);
    expect(report.topCandidatePatternIds).toEqual([
      { id: 'A.1', count: 1 },
      { id: 'A.2', count: 1 },
      { id: 'A.3', count: 1 },
      { id: 'C.1', count: 1 },
      { id: 'C.2', count: 1 },
    ]);
    expect(report.topServedPatternIds).not.toContainEqual({ id: 'A.3', count: 1 });
    expect(report.topCitedPatternIds).toEqual([
      { id: 'A.10', count: 1 },
      { id: 'B.3', count: 1 },
    ]);
    expect(report.topResolvedPatternIds).toEqual([
      { id: 'A.1', count: 2 },
      { id: 'A.2', count: 2 },
      { id: 'A.9', count: 1 },
    ]);
    expect(report.topDocSurfaceIds).toEqual([{ id: 'generated/patterns/A.2', count: 1 }]);
    expect(report.topRouteIds).toEqual([{ id: 'route:project-alignment', count: 1 }]);
    expect(report.schemaVersions).toEqual([
      { id: '3', count: 4 },
      { id: '2', count: 3 },
      { id: '1', count: 1 },
    ]);
    expect(report.topServedPatterns[0]).toMatchObject({
      id: 'A.1',
      count: 2,
      kind: 'pattern',
      status: 'Stable',
      part: 'Part A - Kernel Architecture Cluster',
    });
    expect(report.topServedPatterns[0]?.title).toContain('Holonic Foundation');
    expect(report.topRoutes[0]).toMatchObject({
      id: 'route:project-alignment',
      count: 1,
      kind: 'route',
    });
  });

  it('reports tool counts and quality rates deterministically', async () => {
    const report = await buildFixtureReport();

    expect(report.topTools).toEqual([
      { id: 'query_fpf_spec', count: 2 },
      { id: 'read_fpf_doc', count: 2 },
      { id: 'search_fpf', count: 2 },
      { id: 'ask_fpf', count: 1 },
      { id: 'browse_fpf_catalog', count: 1 },
    ]);
    expect(report.emptyResultRateByTool).toContainEqual({
      toolName: 'search_fpf',
      calls: 2,
      count: 1,
      rate: 0.5,
    });
    expect(report.errorRateByTool).toContainEqual({
      toolName: 'query_fpf_spec',
      calls: 2,
      count: 1,
      rate: 0.5,
    });
    expect(report.ambiguousRateByTool).toContainEqual({
      toolName: 'query_fpf_spec',
      calls: 2,
      count: 1,
      rate: 0.5,
    });
    expect(report.statusCounts).toEqual([
      { id: 'ok', count: 5 },
      { id: 'ambiguous', count: 1 },
      { id: 'error', count: 1 },
      { id: 'not_found', count: 1 },
    ]);
    expect(report.durationByTool).toContainEqual({
      toolName: 'query_fpf_spec',
      calls: 2,
      averageMs: 10,
      p95Ms: 16,
      maxMs: 16,
    });
    expect(report.unknownUnresolvedRate).toBe(0.125);
    expect(report.operatorActionRequired).toBe(true);
    expect(report.triageFindings).toEqual([
      'query_fpf_spec error rate is 50% (1/2).',
      'search_fpf empty-result rate is 50% (1/2).',
    ]);
  });

  it('reports safe ask categories and input shapes without raw question text', async () => {
    const report = await buildFixtureReport();
    const markdown = formatUsageReportMarkdown(report);

    expect(report.topIntentCategories).toEqual([
      { id: 'pattern_lookup', count: 5 },
      { id: 'catalog_browse', count: 1 },
      { id: 'concept_definition', count: 1 },
      { id: 'route_selection', count: 1 },
    ]);
    expect(report.topInputShapes).toEqual([
      { id: 'question:short', count: 3 },
      { id: 'query:short', count: 2 },
      { id: 'selector:exact_id', count: 2 },
      { id: 'kind:route', count: 1 },
    ]);
    expect(report.topModes).toEqual([
      { id: 'full', count: 1 },
      { id: 'proof', count: 1 },
    ]);
    expect(markdown).toContain('## Asked');
    expect(markdown).toContain('## Returned');
    expect(markdown).toContain('## Popular FPF Material');
    expect(markdown).not.toContain('__TEST_RAW_QUESTION_SHOULD_NOT_LEAK__');
  });

  it('rejects privacy-sensitive fixture events and does not leak sentinel values', async () => {
    const report = await buildFixtureReport();
    const serialized = JSON.stringify(report);
    const markdown = formatUsageReportMarkdown(report);

    for (const sentinel of SENTINELS) {
      expect(serialized).not.toContain(sentinel);
      expect(markdown).not.toContain(sentinel);
    }
  });

  it('returns config_error for missing production log credentials', async () => {
    const report = await configErrorUsageReport({
      windowLabel: '24h',
      now: NOW,
      source: {
        kind: 'vercel',
        description: 'Vercel production logs for project fpf-reference-mcp',
        vercelQuery: 'vercel logs --project fpf-reference-mcp --query mcp_tool_usage --json',
      },
      message: 'Missing Vercel logs token. Set FPF_USAGE_REPORT_VERCEL_TOKEN or VERCEL_TOKEN.',
    });

    expect(report.state).toBe('config_error');
    expect(report.ok).toBe(false);
    expect(report.operatorActionRequired).toBe(true);
    expect(report.totals.validEventCount).toBe(0);
    expect(report.topServedPatternIds).toEqual([]);
    expect(report.triageFindings).toEqual([
      'Missing Vercel logs token. Set FPF_USAGE_REPORT_VERCEL_TOKEN or VERCEL_TOKEN.',
    ]);
    expect(report.caveats).toContain('No usage counts were produced.');
  });

  it('marks Vercel reports as capped when the query limit is reached', async () => {
    const contents = await readFile(FIXTURE_PATH, 'utf8');
    const report = await buildUsageReportFromLines({
      lines: contents.split(/\r?\n/u).filter(Boolean),
      windowLabel: '24h',
      now: NOW,
      source: {
        kind: 'vercel',
        description: 'Vercel production logs for project fpf-reference-mcp',
        vercelQuery: 'vercel logs --project fpf-reference-mcp --no-branch --query mcp_tool_usage --json --limit 10',
      },
    });

    expect(report.caveats).toContain(
      'Vercel returned the configured 10-line limit; reported counts are lower bounds for this window.',
    );
  });

  it('does not let Vercel CLI branch auto-detection hide production logs', () => {
    const env = { ...process.env };
    delete env.FPF_USAGE_REPORT_VERCEL_TOKEN;
    delete env.VERCEL_USAGE_REPORT_TOKEN;
    delete env.VERCEL_TOKEN;

    const result = spawnSync(
      'bun',
      [
        'scripts/usage-report.ts',
        '--source',
        'vercel',
        '--window',
        '7d',
        '--format',
        'json',
        '--no-write',
      ],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        env,
      },
    );

    expect(result.status).toBe(0);
    const report = JSON.parse(result.stdout) as { source?: { vercelQuery?: string } };
    expect(report.source?.vercelQuery).toContain('--no-branch');
  });
});

async function buildFixtureReport() {
  const contents = await readFile(FIXTURE_PATH, 'utf8');
  return buildUsageReportFromLines({
    lines: contents.split(/\r?\n/u).filter(Boolean),
    windowLabel: '24h',
    now: NOW,
    source: {
      kind: 'file',
      description: `Local log file: ${FIXTURE_PATH}`,
      logPath: FIXTURE_PATH,
    },
  });
}
