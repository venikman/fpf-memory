export const DEFAULT_VERCEL_SPEND_PROJECT = 'fpf-reference-mcp';
export const DEFAULT_VERCEL_SPEND_WINDOW_MINUTES = 30;
export const DEFAULT_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR = 0.25;
export const DEFAULT_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS = 0;
export const DEFAULT_VERCEL_SPEND_MAX_ERROR_INVOCATIONS = 0;
export const DEFAULT_VERCEL_SPEND_LEGACY_PATH = '/api/mcp/fpf_memory';
export const DEFAULT_LEGACY_FUNCTION_DURATION_USD_PER_GBHR = 0.18;

export const FUNCTION_DURATION_GBHR_FIELD =
  'vercel_function_invocation_function_duration_gbhr_sum';
export const FUNCTION_INVOCATION_COUNT_FIELD = 'vercel_function_invocation_count_sum';

export const VERCEL_SPEND_QA_ANCHORS = [
  {
    id: 'B.5.1',
    title: 'Explore -> Shape -> Evidence -> Operate',
    use: 'Keep production monitoring separate from remediation work.',
  },
  {
    id: 'A.10',
    title: 'Evidence Graph Referring',
    use: 'Treat metric windows, thresholds, request paths, and error rows as explicit evidence.',
  },
  {
    id: 'B.3',
    title: 'Trust & Assurance Calculus',
    use: 'Fail the monitor when cost-risk evidence crosses a declared assurance threshold.',
  },
  {
    id: 'E.21',
    title: 'FPF Pattern Quality Characteristic Space',
    use: 'Track spend, route isolation, platform errors, and traceability as separate characteristics.',
  },
] as const;

export type VercelSpendMonitorState =
  | 'ok'
  | 'breach'
  | 'config_error'
  | 'metrics_unavailable'
  | 'expected_blocked_traffic';

export type VercelSpendQualityStatus = 'pass' | 'fail' | 'warn' | 'not_available';

export interface VercelMetricRow {
  value: number;
  requestPath?: string;
  errorCode?: string;
  timestamp?: string;
}

export interface VercelSpendMetricSnapshot {
  functionDurationGbhr: number;
  legacyFunctionInvocations: number;
  errorFunctionInvocations: number;
  functionDurationRows: VercelMetricRow[];
  legacyInvocationRows: VercelMetricRow[];
  errorInvocationRows: VercelMetricRow[];
}

export interface VercelSpendMonitorThresholds {
  maxFunctionDurationGbhr: number;
  maxLegacyFunctionInvocations: number;
  maxErrorFunctionInvocations: number;
  functionDurationUsdPerGbhr: number;
}

export interface VercelSpendMonitorReport {
  state: VercelSpendMonitorState;
  ok: boolean;
  breached: boolean;
  metricsQueried: boolean;
  operatorActionRequired: boolean;
  generatedAt: string;
  project: string;
  windowMinutes: number;
  legacyPath: string;
  thresholds: VercelSpendMonitorThresholds;
  metrics: VercelSpendMetricSnapshot | null;
  estimatedFunctionDurationUsd: number | null;
  quality: Array<{
    characteristic: string;
    status: VercelSpendQualityStatus;
    evidence: string;
    fpf: string[];
  }>;
  fpfAnchors: typeof VERCEL_SPEND_QA_ANCHORS;
  summary: string;
  monitorError?: string;
}

export function evaluateVercelSpendMonitor(input: {
  project: string;
  windowMinutes: number;
  legacyPath: string;
  now: Date;
  metrics: VercelSpendMetricSnapshot;
  thresholds: VercelSpendMonitorThresholds;
}): VercelSpendMonitorReport {
  const durationBreached =
    input.metrics.functionDurationGbhr > input.thresholds.maxFunctionDurationGbhr;
  const legacyBreached =
    input.metrics.legacyFunctionInvocations > input.thresholds.maxLegacyFunctionInvocations;
  const errorsBreached =
    input.metrics.errorFunctionInvocations > input.thresholds.maxErrorFunctionInvocations;
  const expectedBlockedTraffic =
    !durationBreached
    && !legacyBreached
    && errorsBreached
    && errorRowsAreExpectedBlockedTraffic(input.metrics.errorInvocationRows, input.legacyPath);
  const breached = durationBreached || legacyBreached || (errorsBreached && !expectedBlockedTraffic);
  const estimatedFunctionDurationUsd = roundMoney(
    input.metrics.functionDurationGbhr * input.thresholds.functionDurationUsdPerGbhr,
  );

  const quality: VercelSpendMonitorReport['quality'] = [
    {
      characteristic: 'function-duration',
      status: durationBreached ? 'fail' : 'pass',
      evidence: `${formatNumber(input.metrics.functionDurationGbhr)} GB-hours over ${input.windowMinutes}m; threshold ${formatNumber(input.thresholds.maxFunctionDurationGbhr)} GB-hours`,
      fpf: ['B.3', 'E.21'],
    },
    {
      characteristic: 'legacy-route-isolation',
      status: legacyBreached ? 'fail' : 'pass',
      evidence: `${formatNumber(input.metrics.legacyFunctionInvocations)} function invocations matched ${input.legacyPath}; threshold ${formatNumber(input.thresholds.maxLegacyFunctionInvocations)}`,
      fpf: ['B.5.1', 'A.10'],
    },
    {
      characteristic: 'platform-errors',
      status: expectedBlockedTraffic ? 'warn' : errorsBreached ? 'fail' : 'pass',
      evidence: expectedBlockedTraffic
        ? `${formatNumber(input.metrics.errorFunctionInvocations)} function error-code invocations match expected blocked legacy traffic; threshold ${formatNumber(input.thresholds.maxErrorFunctionInvocations)}`
        : `${formatNumber(input.metrics.errorFunctionInvocations)} function invocations had non-empty error_code; threshold ${formatNumber(input.thresholds.maxErrorFunctionInvocations)}`,
      fpf: ['B.3', 'E.21'],
    },
    {
      characteristic: 'traceability',
      status: 'pass',
      evidence: `project=${input.project}, window=${input.windowMinutes}m, generatedAt=${input.now.toISOString()}`,
      fpf: ['A.10'],
    },
  ];

  return {
    state: expectedBlockedTraffic ? 'expected_blocked_traffic' : breached ? 'breach' : 'ok',
    ok: !breached,
    breached,
    metricsQueried: true,
    operatorActionRequired: breached,
    generatedAt: input.now.toISOString(),
    project: input.project,
    windowMinutes: input.windowMinutes,
    legacyPath: input.legacyPath,
    thresholds: input.thresholds,
    metrics: input.metrics,
    estimatedFunctionDurationUsd,
    quality,
    fpfAnchors: VERCEL_SPEND_QA_ANCHORS,
    summary: summarizeSpendState({
      breached,
      durationBreached,
      legacyBreached,
      errorsBreached,
      expectedBlockedTraffic,
      metrics: input.metrics,
      thresholds: input.thresholds,
      windowMinutes: input.windowMinutes,
    }),
  };
}

export function createVercelSpendConfigErrorReport(input: {
  project: string;
  windowMinutes: number;
  legacyPath: string;
  now: Date;
  thresholds: VercelSpendMonitorThresholds;
  message: string;
}): VercelSpendMonitorReport {
  return createUnavailableVercelSpendReport({
    ...input,
    state: 'config_error',
    summary: `Metrics were not queried: ${input.message}`,
  });
}

export function createVercelSpendMetricsUnavailableReport(input: {
  project: string;
  windowMinutes: number;
  legacyPath: string;
  now: Date;
  thresholds: VercelSpendMonitorThresholds;
  message: string;
}): VercelSpendMonitorReport {
  return createUnavailableVercelSpendReport({
    ...input,
    state: 'metrics_unavailable',
    summary: `Vercel metrics were unavailable: ${input.message}`,
  });
}

export function createVercelSpendSnapshot(input: {
  functionDurationMetrics: unknown;
  legacyInvocationMetrics: unknown;
  errorInvocationMetrics: unknown;
}): VercelSpendMetricSnapshot {
  const functionDurationRows = extractMetricRows(
    input.functionDurationMetrics,
    FUNCTION_DURATION_GBHR_FIELD,
  );
  const legacyInvocationRows = extractMetricRows(
    input.legacyInvocationMetrics,
    FUNCTION_INVOCATION_COUNT_FIELD,
  );
  const errorInvocationRows = extractMetricRows(
    input.errorInvocationMetrics,
    FUNCTION_INVOCATION_COUNT_FIELD,
  );

  return {
    functionDurationGbhr: sumRows(functionDurationRows),
    legacyFunctionInvocations: sumRows(legacyInvocationRows),
    errorFunctionInvocations: sumRows(errorInvocationRows),
    functionDurationRows,
    legacyInvocationRows,
    errorInvocationRows,
  };
}

export function parseVercelMetricsJson(output: string): unknown {
  const start = output.indexOf('{');
  const end = output.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Vercel metrics output did not contain a JSON object.');
  }
  return JSON.parse(output.slice(start, end + 1)) as unknown;
}

export function formatVercelSpendMonitorMarkdown(report: VercelSpendMonitorReport): string {
  const qualityRows = report.quality
    .map((item) =>
      `| ${item.characteristic} | ${item.status} | ${item.evidence.replace(/\|/gu, '\\|')} | ${item.fpf.join(', ')} |`,
    )
    .join('\n');
  const anchorRows = report.fpfAnchors
    .map((anchor) => `- ${anchor.id} ${anchor.title}: ${anchor.use}`)
    .join('\n');

  return `# Vercel Spend Monitor

State: **${report.state}**

${report.summary}

- Metrics queried: ${report.metricsQueried ? 'yes' : 'no'}
- Operator action required: ${report.operatorActionRequired ? 'yes' : 'no'}

| Characteristic | Status | Evidence | FPF anchors |
| --- | --- | --- | --- |
${qualityRows}

## Thresholds

- Function Duration: ${formatNumber(report.thresholds.maxFunctionDurationGbhr)} GB-hours per ${report.windowMinutes}m
- Legacy function invocations: ${formatNumber(report.thresholds.maxLegacyFunctionInvocations)} matching \`${report.legacyPath}\`
- Function error-code invocations: ${formatNumber(report.thresholds.maxErrorFunctionInvocations)}
- Estimated legacy Function Duration rate: $${formatNumber(report.thresholds.functionDurationUsdPerGbhr)} per GB-hour

## Observed

- Function Duration: ${formatMaybeNumber(report.metrics?.functionDurationGbhr)} GB-hours${report.estimatedFunctionDurationUsd === null ? '' : ` (~$${formatNumber(report.estimatedFunctionDurationUsd)})`}
- Legacy function invocations: ${formatMaybeNumber(report.metrics?.legacyFunctionInvocations)}
- Function error-code invocations: ${formatMaybeNumber(report.metrics?.errorFunctionInvocations)}

## Strategy Anchors

${anchorRows}
`;
}

function extractMetricRows(metricResponse: unknown, valueField: string): VercelMetricRow[] {
  const record = requireRecord(metricResponse, 'Vercel metrics response');
  const summary = record.summary;
  if (!Array.isArray(summary)) {
    throw new Error('Vercel metrics response summary was not an array.');
  }
  return summary.map((row, index) => parseMetricRow(row, valueField, index));
}

function parseMetricRow(row: unknown, valueField: string, index: number): VercelMetricRow {
  const record = requireRecord(row, `Vercel metric summary row ${index}`);
  const value = record[valueField];
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error(`Vercel metric summary row ${index} missing numeric ${valueField}.`);
  }
  return {
    value,
    requestPath: optionalString(record.request_path),
    errorCode: optionalString(record.error_code),
    timestamp: optionalString(record.timestamp),
  };
}

function sumRows(rows: VercelMetricRow[]): number {
  return rows.reduce((total, row) => total + row.value, 0);
}

function summarizeSpendState(input: {
  breached: boolean;
  durationBreached: boolean;
  legacyBreached: boolean;
  errorsBreached: boolean;
  expectedBlockedTraffic: boolean;
  metrics: VercelSpendMetricSnapshot;
  thresholds: VercelSpendMonitorThresholds;
  windowMinutes: number;
}): string {
  if (input.expectedBlockedTraffic) {
    return 'Vercel reported function error-code rows, but they match expected blocked legacy traffic rather than a Function Duration or canonical MCP breach.';
  }

  if (!input.breached) {
    return `Vercel Function Duration and MCP route guardrails are within thresholds for the last ${input.windowMinutes}m.`;
  }

  const reasons: string[] = [];
  if (input.durationBreached) {
    reasons.push(
      `Function Duration reached ${formatNumber(input.metrics.functionDurationGbhr)} GB-hours over ${input.windowMinutes}m`,
    );
  }
  if (input.legacyBreached) {
    reasons.push(
      `legacy MCP route reached ${formatNumber(input.metrics.legacyFunctionInvocations)} function invocations`,
    );
  }
  if (input.errorsBreached) {
    reasons.push(
      `function error-code rows reached ${formatNumber(input.metrics.errorFunctionInvocations)} invocations`,
    );
  }
  return `Vercel spend guardrail breached: ${reasons.join('; ')}.`;
}

function createUnavailableVercelSpendReport(input: {
  state: 'config_error' | 'metrics_unavailable';
  project: string;
  windowMinutes: number;
  legacyPath: string;
  now: Date;
  thresholds: VercelSpendMonitorThresholds;
  message: string;
  summary: string;
}): VercelSpendMonitorReport {
  return {
    state: input.state,
    ok: false,
    breached: false,
    metricsQueried: false,
    operatorActionRequired: true,
    generatedAt: input.now.toISOString(),
    project: input.project,
    windowMinutes: input.windowMinutes,
    legacyPath: input.legacyPath,
    thresholds: input.thresholds,
    metrics: null,
    estimatedFunctionDurationUsd: null,
    quality: [
      {
        characteristic: 'function-duration',
        status: 'not_available',
        evidence: `not queried: ${input.message}`,
        fpf: ['B.3', 'E.21'],
      },
      {
        characteristic: 'legacy-route-isolation',
        status: 'not_available',
        evidence: `not queried: ${input.message}`,
        fpf: ['B.5.1', 'A.10'],
      },
      {
        characteristic: 'platform-errors',
        status: 'not_available',
        evidence: `not queried: ${input.message}`,
        fpf: ['B.3', 'E.21'],
      },
      {
        characteristic: 'traceability',
        status: 'fail',
        evidence: `project=${input.project}, window=${input.windowMinutes}m, generatedAt=${input.now.toISOString()}`,
        fpf: ['A.10'],
      },
    ],
    fpfAnchors: VERCEL_SPEND_QA_ANCHORS,
    summary: input.summary,
    monitorError: input.message,
  };
}

function errorRowsAreExpectedBlockedTraffic(
  rows: VercelMetricRow[],
  legacyPath: string,
): boolean {
  return rows.length > 0 && rows.every((row) => {
    const requestPath = row.requestPath ?? '';
    const errorCode = row.errorCode ?? '';
    return requestPath.startsWith(legacyPath)
      && /403|blocked|deny|forbidden|mitigated/iu.test(errorCode);
  });
}

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} was not an object.`);
  }
  return value as Record<string, unknown>;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(4).replace(/0+$/u, '').replace(/\.$/u, '');
}

function formatMaybeNumber(value: number | undefined): string {
  return value === undefined ? 'not_queried' : formatNumber(value);
}
