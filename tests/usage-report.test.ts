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
      unknownUnresolvedEventCount: 2,
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
      { id: '2', count: 7 },
      { id: '1', count: 1 },
    ]);
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
    expect(report.totals.validEventCount).toBe(0);
    expect(report.topServedPatternIds).toEqual([]);
    expect(report.caveats).toContain('No usage counts were produced.');
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
