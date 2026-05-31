import { describe, expect, it } from '@rstest/core';

import {
  createVercelSpendConfigErrorReport,
  createVercelSpendSnapshot,
  DEFAULT_LEGACY_FUNCTION_DURATION_USD_PER_GBHR,
  DEFAULT_VERCEL_SPEND_LEGACY_PATH,
  evaluateVercelSpendMonitor,
  formatVercelSpendMonitorMarkdown,
  parseVercelMetricsJson,
  type VercelSpendMetricSnapshot,
  type VercelSpendMonitorThresholds,
} from '../src/build/vercel-spend-monitor.js';

describe('Vercel spend monitor', () => {
  it('passes when Function Duration, legacy route traffic, and errors stay under threshold', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      metrics: makeSnapshot({ functionDurationGbhr: 0.031 }),
    });

    expect(report.state).toBe('ok');
    expect(report.breached).toBe(false);
    expect(report.estimatedFunctionDurationUsd).toBe(0.01);
    expect(report.quality.every((item) => item.status === 'pass')).toBe(true);
  });

  it('breaches when Function Duration GB-hours cross the configured window threshold', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds({ maxFunctionDurationGbhr: 0.25 }),
      metrics: makeSnapshot({ functionDurationGbhr: 1.2 }),
    });

    expect(report.state).toBe('breach');
    expect(report.summary).toContain('Function Duration reached 1.2 GB-hours');
    expect(report.quality.find((item) => item.characteristic === 'function-duration')?.status)
      .toBe('fail');
  });

  it('breaches if the legacy MCP route reaches Functions again', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      metrics: makeSnapshot({ legacyFunctionInvocations: 1 }),
    });

    expect(report.state).toBe('breach');
    expect(report.summary).toContain('legacy MCP route reached 1 function invocations');
    expect(report.quality.find((item) => item.characteristic === 'legacy-route-isolation')?.status)
      .toBe('fail');
  });

  it('reports missing Vercel metrics credentials as configuration failure, not spend breach', () => {
    const report = createVercelSpendConfigErrorReport({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-31T01:56:00Z'),
      thresholds: makeThresholds(),
      message:
        'VERCEL_TOKEN is required for scheduled Vercel metrics monitoring; configure the repository secret and rerun before treating this as a spend breach.',
    });

    expect(report.state).toBe('config_error');
    expect(report.ok).toBe(false);
    expect(report.breached).toBe(false);
    expect(report.summary).toContain('failed before metrics were queried');
    expect(report.summary).toContain('VERCEL_TOKEN is required');
    expect(report.quality.find((item) => item.characteristic === 'monitor-configuration')?.status)
      .toBe('fail');
  });

  it('builds a snapshot from Vercel metric summaries', () => {
    const snapshot = createVercelSpendSnapshot({
      functionDurationMetrics: metricResponse([
        {
          request_path: '/api/mcp/fpf_reference/mcp',
          error_code: '',
          vercel_function_invocation_function_duration_gbhr_sum: 0.03,
        },
        {
          request_path: '/api/fpf/status',
          error_code: '',
          vercel_function_invocation_function_duration_gbhr_sum: 0.01,
        },
      ]),
      legacyInvocationMetrics: metricResponse([
        {
          request_path: '/api/mcp/fpf_memory/mcp',
          vercel_function_invocation_count_sum: 2,
        },
      ]),
      errorInvocationMetrics: metricResponse([
        {
          request_path: '/api/mcp/fpf_reference/mcp',
          error_code: 'FUNCTION_INVOCATION_TIMEOUT',
          vercel_function_invocation_count_sum: 3,
        },
      ]),
    });

    expect(snapshot.functionDurationGbhr).toBe(0.04);
    expect(snapshot.legacyFunctionInvocations).toBe(2);
    expect(snapshot.errorFunctionInvocations).toBe(3);
  });

  it('parses Vercel CLI JSON even when the CLI prints status banners', () => {
    const parsed = parseVercelMetricsJson(`Vercel CLI 54.6.1
Retrieving project...
${JSON.stringify(metricResponse([]))}
`);

    expect(parsed).toEqual(metricResponse([]));
  });

  it('renders markdown with explicit thresholds and FPF anchors', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      metrics: makeSnapshot({ functionDurationGbhr: 0.02 }),
    });

    const markdown = formatVercelSpendMonitorMarkdown(report);

    expect(markdown).toContain('Function Duration: 0.25 GB-hours per 30m');
    expect(markdown).toContain('Legacy function invocations: 0');
    expect(markdown).toContain('B.5.1');
    expect(markdown).toContain('A.10');
  });

  it('renders config failures without implying observed spend', () => {
    const report = createVercelSpendConfigErrorReport({
      project: 'fpf-sh',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-31T01:56:00Z'),
      thresholds: makeThresholds(),
      message: 'VERCEL_TOKEN is required for scheduled Vercel metrics monitoring.',
    });

    const markdown = formatVercelSpendMonitorMarkdown(report);
    const observedSection = markdown.slice(markdown.indexOf('## Observed'));

    expect(markdown).toContain('State: **config_error**');
    expect(markdown).toContain('monitor-configuration | fail');
    expect(markdown).toContain('Metrics were not queried');
    expect(observedSection).not.toContain('Function Duration: 0 GB-hours');
    expect(observedSection).not.toContain('Legacy function invocations: 0');
  });
});

function makeSnapshot(
  overrides: Partial<VercelSpendMetricSnapshot> = {},
): VercelSpendMetricSnapshot {
  return {
    functionDurationGbhr: 0,
    legacyFunctionInvocations: 0,
    errorFunctionInvocations: 0,
    functionDurationRows: [],
    legacyInvocationRows: [],
    errorInvocationRows: [],
    ...overrides,
  };
}

function makeThresholds(
  overrides: Partial<VercelSpendMonitorThresholds> = {},
): VercelSpendMonitorThresholds {
  return {
    maxFunctionDurationGbhr: 0.25,
    maxLegacyFunctionInvocations: 0,
    maxErrorFunctionInvocations: 0,
    functionDurationUsdPerGbhr: DEFAULT_LEGACY_FUNCTION_DURATION_USD_PER_GBHR,
    ...overrides,
  };
}

function metricResponse(summary: Array<Record<string, unknown>>) {
  return {
    query: {
      metric: 'vercel.function_invocation.count',
      aggregation: 'sum',
    },
    summary,
    data: [],
  };
}
