import { spawnSync } from 'node:child_process';
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import {
  buildUsageReportFromLines,
  configErrorUsageReport,
  formatUsageReportMarkdown,
} from '../src/build/usage-report.js';

import { getRuntimeLogger, resetRuntimeLoggerForTests } from '../src/adapters/infra/logging/runtime-logger.js';
import { createMcpUsageTelemetryEvent } from '../src/adapters/mcp/usage-telemetry.js';

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
    expect(report.countsAvailable).toBe(true);
    expect(report.window.start).toBe('2026-05-30T12:30:00.000Z');
    expect(report.window.end).toBe('2026-05-31T12:30:00.000Z');
    expect(report.totals).toEqual({
      rawLineCount: 10,
      validEventCount: 8,
      invalidEventCount: 2,
      outOfWindowEventCount: 0,
      legacyEventCount: 1,
      unknownUnresolvedEligibleEventCount: 8,
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
    expect(report.topServedPatterns[0]?.title).toBe('Recognize a Whole with Parts (U.Holon and Admitted Holon Kinds)');
    expect(report.topRoutes[0]).toMatchObject({
      id: 'route:project-alignment',
      count: 1,
      kind: 'route',
    });
  });

  it('reads every telemetry message from a CLI request row without duplicating its display message', async () => {
    const event = {
      event: 'mcp_tool_usage', schemaVersion: 3, toolName: 'get_fpf_index_status',
      outcome: 'ok', durationMs: 1, input: { intentCategory: 'index_health' }, output: {},
    };
    const message = JSON.stringify(event);
    const report = await buildUsageReportFromLines({
      lines: [JSON.stringify({
        timestamp: NOW.getTime(), message,
        logs: [{ message: 'unrelated diagnostic' }, { message }, { message }],
      })],
      source: { kind: 'vercel', description: 'Synthetic CLI request row' },
      windowLabel: '24h', now: NOW,
    });
    expect(report.totals.rawLineCount).toBe(1);
    expect(report.totals.validEventCount).toBe(2);
    expect(report.totals.invalidEventCount).toBe(0);
    expect(report.topTools).toEqual([{ id: 'get_fpf_index_status', count: 2 }]);
  });

  it('accepts a healthy mixed runtime log through the file CLI quality gate', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'fpf-usage-mixed-'));
    const priorVercel = process.env.VERCEL;
    delete process.env.VERCEL;
    try {
      const logPath = join(directory, 'fpf-runtime.log');
      const logger = getRuntimeLogger({ filePath: logPath, level: 'info', serviceName: 'fpf-runtime' });
      logger.info('MCP stdio server start');
      logger.info('Hosted MCP server start', { port: 3000 });
      logger.info('CLI command start', { command: 'query', args: ['__PRIVATE_CLI_ARGUMENT__'] });
      logger.info('MCP tool usage', { ...createMcpUsageTelemetryEvent({
        toolName: 'get_fpf_index_status', outcome: 'ok', durationMs: 1,
        input: {}, output: { fresh: true },
      }) });
      logger.info('CLI command finished', { command: 'query', exitCode: 0 });
      await logger.flush?.();

      const result = spawnSync('bun', ['scripts/usage-report.ts', '--source', 'file', '--log-path', logPath, '--format', 'json', '--no-write', '--fail-on-quality-breach'], {
        cwd: process.cwd(), encoding: 'utf8',
        env: { ...process.env, GITHUB_OUTPUT: '', GITHUB_STEP_SUMMARY: '' },
      });
      expect(result.status).toBe(0);
      const report = JSON.parse(result.stdout);
      expect(report.totals).toMatchObject({ rawLineCount: 5, validEventCount: 1, invalidEventCount: 0 });
      expect(report.operatorActionRequired).toBe(false);
      expect(result.stdout).not.toContain('__PRIVATE_CLI_ARGUMENT__');
    } finally {
      await resetRuntimeLoggerForTests();
      if (priorVercel === undefined) delete process.env.VERCEL;
      else process.env.VERCEL = priorVercel;
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('does not skip malformed telemetry inside an otherwise valid runtime logger envelope', async () => {
    const report = await buildUsageReportFromLines({
      lines: [JSON.stringify({
        time: NOW.toISOString(), level: 'info', service: 'fpf-runtime', logFile: 'fpf-runtime.log',
        message: 'MCP tool usage', data: { event: 'mcp_tool_usage', toolName: 'get_fpf_index_status' },
      })],
      source: { kind: 'file', description: 'Malformed usage envelope' }, windowLabel: '24h', now: NOW,
    });
    expect(report.totals.invalidEventCount).toBe(1);
    expect(report.operatorActionRequired).toBe(true);
  });

  it('flags incomplete telemetry instead of treating an unparsed export as zero activity', async () => {
    const report = await buildUsageReportFromLines({
      lines: [JSON.stringify({ timestamp: NOW.getTime(), logs: [
        { message: '{"event":"mcp_tool_usage",', messageTruncated: true },
      ] })],
      source: { kind: 'vercel', description: 'Truncated CLI export' }, windowLabel: '24h', now: NOW,
    });
    expect(report.totals.validEventCount).toBe(0);
    expect(report.totals.invalidEventCount).toBe(1);
    expect(report.operatorActionRequired).toBe(true);
    expect(report.triageFindings.join(' ')).toContain('counts may be incomplete');
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
      '2 log entries could not be parsed as sanitized MCP telemetry; counts may be incomplete.',
      'query_fpf_spec error rate is 50% (1/2).',
      'search_fpf empty-result rate is 50% (1/2).',
    ]);
  });

  it('excludes index-health calls from unresolved material quality breaches', async () => {
    const lines = [
      JSON.stringify({
        schemaVersion: 3,
        event: 'mcp_tool_usage',
        time: '2026-05-31T12:00:00.000Z',
        toolName: 'get_fpf_index_status',
        outcome: 'ok',
        durationMs: 5,
        input: { intentCategory: 'index_health' },
        output: { fresh: true, snapshotExists: true },
        privacy: {
          rawInputLogged: false,
          rawQuestionLogged: false,
          rawSelectorLogged: false,
          rawOutputTextLogged: false,
        },
      }),
      JSON.stringify({
        schemaVersion: 3,
        event: 'mcp_tool_usage',
        time: '2026-05-31T12:01:00.000Z',
        toolName: 'get_fpf_index_status',
        outcome: 'ok',
        durationMs: 6,
        input: {},
        output: { fresh: true, snapshotExists: true },
        privacy: {
          rawInputLogged: false,
          rawQuestionLogged: false,
          rawSelectorLogged: false,
          rawOutputTextLogged: false,
        },
      }),
      JSON.stringify({
        schemaVersion: 3,
        event: 'mcp_tool_usage',
        time: '2026-05-31T12:02:00.000Z',
        toolName: 'query_fpf_spec',
        outcome: 'ok',
        durationMs: 20,
        input: { intentCategory: 'pattern_lookup', query: { shape: 'short' } },
        output: {
          status: 'ok',
          servedIds: ['A.6'],
          servedPatternIds: ['A.6'],
          servedPatternIdCount: 1,
          resolvedPatternIds: ['A.6'],
          resolvedPatternIdCount: 1,
        },
        privacy: {
          rawInputLogged: false,
          rawQuestionLogged: false,
          rawSelectorLogged: false,
          rawOutputTextLogged: false,
        },
      }),
      JSON.stringify({
        schemaVersion: 3,
        event: 'mcp_tool_usage',
        time: '2026-05-31T12:03:00.000Z',
        toolName: 'ask_fpf',
        outcome: 'ok',
        durationMs: 26,
        input: { intentCategory: 'concept_definition', question: { shape: 'short' } },
        output: {
          status: 'ok',
          servedIds: ['A.6'],
          servedPatternIds: ['A.6'],
          servedPatternIdCount: 1,
          citedIds: ['A.6'],
          citedPatternIds: ['A.6'],
          citedPatternIdCount: 1,
        },
        privacy: {
          rawInputLogged: false,
          rawQuestionLogged: false,
          rawSelectorLogged: false,
          rawOutputTextLogged: false,
        },
      }),
    ];

    const report = await buildUsageReportFromLines({
      lines,
      windowLabel: '24h',
      now: NOW,
      source: {
        kind: 'file',
        description: 'Synthetic issue #202 telemetry sample',
        logPath: 'synthetic',
      },
    });

    expect(report.totals.validEventCount).toBe(4);
    expect(report.totals.unknownUnresolvedEligibleEventCount).toBe(2);
    expect(report.totals.unknownUnresolvedEventCount).toBe(0);
    expect(report.unknownUnresolvedRate).toBe(0);
    expect(report.operatorActionRequired).toBe(false);
    expect(report.triageFindings).toEqual([]);
    expect(report.topIntentCategories).toEqual([
      { id: 'index_health', count: 2 },
      { id: 'concept_definition', count: 1 },
      { id: 'pattern_lookup', count: 1 },
    ]);
    expect(report.topServedPatternIds).toEqual([{ id: 'A.6', count: 2 }]);
    expect(report.caveats).toContain(
      'Index-health calls are included in usage totals but excluded from unknown/unresolved material-resolution quality.',
    );
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
    expect(report.countsAvailable).toBe(false);
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

  it('writes a failed-source report and GitHub verdict when the log CLI fails, without leaking stderr or reporting zero use', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'fpf-usage-cli-'));
    try {
      const executable = join(directory, 'npx');
      await writeFile(executable, '#!/bin/sh\necho "private raw log and token $VERCEL_TOKEN" >&2\nexit 1\n');
      await chmod(executable, 0o755);
      const output = join(directory, 'github-output');
      const result = spawnSync('bun', ['scripts/usage-report.ts', '--source', 'vercel', '--format', 'markdown', '--no-write', '--fail-on-quality-breach'], {
        cwd: process.cwd(), encoding: 'utf8',
        env: { ...process.env, PATH: `${directory}:${process.env.PATH}`, FPF_USAGE_REPORT_VERCEL_TOKEN: 'test-only-secret', FPF_USAGE_REPORT_CREDENTIAL_SOURCE: 'VERCEL_SPEND_MONITOR_TOKEN', GITHUB_OUTPUT: output, GITHUB_STEP_SUMMARY: '' },
      });
      expect(result.status).toBe(1);
      expect(result.stdout).toContain('State: **source_error**');
      expect(result.stdout).toContain('Valid events: unavailable');
      expect(result.stdout).toContain('unknown — telemetry collection failed');
      expect(result.stdout).not.toContain('private raw log');
      expect(result.stdout).not.toContain('test-only-secret');
      const verdict = await readFile(output, 'utf8');
      expect(verdict).toContain('state=source_error');
      expect(verdict).toContain('operator_action_required=true');
      expect(verdict).toContain('valid_event_count=\n');
      expect(verdict).toContain('credential_source=VERCEL_SPEND_MONITOR_TOKEN');
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('turns an export timeout into a report instead of losing the weekly sample', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'fpf-usage-timeout-'));
    try {
      const executable = join(directory, 'npx');
      await writeFile(executable, '#!/usr/bin/env bun\nsetInterval(() => {}, 1000);\n');
      await chmod(executable, 0o755);
      const result = spawnSync('bun', ['scripts/usage-report.ts', '--source', 'vercel', '--format', 'json', '--no-write', '--vercel-timeout-ms', '100'], {
        cwd: process.cwd(), encoding: 'utf8', timeout: 10000,
        env: { ...process.env, PATH: `${directory}:${process.env.PATH}`, FPF_USAGE_REPORT_VERCEL_TOKEN: 'test-only-secret', GITHUB_OUTPUT: '', GITHUB_STEP_SUMMARY: '' },
      });
      expect(result.status).toBe(0);
      const report = JSON.parse(result.stdout);
      expect(report.state).toBe('source_error');
      expect(report.countsAvailable).toBe(false);
      expect(report.summary).toContain('ETIMEDOUT');
      expect(report.operatorActionRequired).toBe(true);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('does not let Vercel CLI branch auto-detection hide production logs', () => {
    const env = { ...process.env };
    delete env.FPF_USAGE_REPORT_VERCEL_TOKEN;
    delete env.VERCEL_USAGE_REPORT_TOKEN;
    delete env.VERCEL_SPEND_MONITOR_TOKEN;
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
