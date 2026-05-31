import { describe, expect, it } from '@rstest/core';

import {
  createVercelSpendConfigErrorReport,
  createVercelSpendMetricsUnavailableReport,
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
      project: 'fpf-reference-mcp',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      metrics: makeSnapshot({ functionDurationGbhr: 0.031 }),
    });

    expect(report.state).toBe('ok');
    expect(report.breached).toBe(false);
    expect(report.metricsQueried).toBe(true);
    expect(report.operatorActionRequired).toBe(false);
    expect(report.estimatedFunctionDurationUsd).toBe(0.01);
    expect(report.quality.every((item) => item.status === 'pass')).toBe(true);
  });

  it('breaches when Function Duration GB-hours cross the configured window threshold', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-reference-mcp',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds({ maxFunctionDurationGbhr: 0.25 }),
      metrics: makeSnapshot({ functionDurationGbhr: 1.2 }),
    });

    expect(report.state).toBe('breach');
    expect(report.operatorActionRequired).toBe(true);
    expect(report.summary).toContain('Function Duration reached 1.2 GB-hours');
    expect(report.quality.find((item) => item.characteristic === 'function-duration')?.status)
      .toBe('fail');
  });

  it('breaches if the legacy MCP route reaches Functions again', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-reference-mcp',
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

  it('classifies expected blocked legacy error rows without implying a spend breach', () => {
    const report = evaluateVercelSpendMonitor({
      project: 'fpf-reference-mcp',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      metrics: makeSnapshot({
        errorFunctionInvocations: 2,
        errorInvocationRows: [
          {
            value: 2,
            requestPath: '/api/mcp/fpf_memory/mcp',
            errorCode: '403_DENY_MITIGATED',
          },
        ],
      }),
    });

    expect(report.state).toBe('expected_blocked_traffic');
    expect(report.ok).toBe(true);
    expect(report.breached).toBe(false);
    expect(report.operatorActionRequired).toBe(false);
    expect(report.summary).toContain('expected blocked legacy traffic');
    expect(report.quality.find((item) => item.characteristic === 'platform-errors')?.status)
      .toBe('warn');
  });

  it('reports missing credentials as config_error with metrics not queried', () => {
    const report = createVercelSpendConfigErrorReport({
      project: 'fpf-reference-mcp',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      message: 'VERCEL_SPEND_MONITOR_TOKEN or VERCEL_TOKEN is required; metrics were not queried.',
    });

    expect(report.state).toBe('config_error');
    expect(report.ok).toBe(false);
    expect(report.breached).toBe(false);
    expect(report.metricsQueried).toBe(false);
    expect(report.operatorActionRequired).toBe(true);
    expect(report.metrics).toBeNull();
    expect(report.summary).toContain('Metrics were not queried');
    expect(formatVercelSpendMonitorMarkdown(report)).toContain('Function Duration: not_queried');
  });

  it('reports Vercel metrics CLI failures as metrics_unavailable', () => {
    const report = createVercelSpendMetricsUnavailableReport({
      project: 'fpf-reference-mcp',
      windowMinutes: 30,
      legacyPath: DEFAULT_VERCEL_SPEND_LEGACY_PATH,
      now: new Date('2026-05-30T23:50:00Z'),
      thresholds: makeThresholds(),
      message: 'vercel metrics failed with exit code 1.',
    });

    expect(report.state).toBe('metrics_unavailable');
    expect(report.ok).toBe(false);
    expect(report.breached).toBe(false);
    expect(report.metricsQueried).toBe(false);
    expect(report.monitorError).toContain('vercel metrics failed');
    expect(formatVercelSpendMonitorMarkdown(report)).toContain('Metrics queried: no');
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
      project: 'fpf-reference-mcp',
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
