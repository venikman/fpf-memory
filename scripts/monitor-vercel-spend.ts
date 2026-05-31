import { appendFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

import {
  createVercelSpendConfigErrorReport,
  createVercelSpendMetricsUnavailableReport,
  createVercelSpendSnapshot,
  DEFAULT_LEGACY_FUNCTION_DURATION_USD_PER_GBHR,
  DEFAULT_VERCEL_SPEND_LEGACY_PATH,
  DEFAULT_VERCEL_SPEND_MAX_ERROR_INVOCATIONS,
  DEFAULT_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR,
  DEFAULT_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS,
  DEFAULT_VERCEL_SPEND_PROJECT,
  DEFAULT_VERCEL_SPEND_WINDOW_MINUTES,
  evaluateVercelSpendMonitor,
  formatVercelSpendMonitorMarkdown,
  parseVercelMetricsJson,
  type VercelSpendMonitorReport,
} from '../src/build/vercel-spend-monitor.js';
import { parseFlagMap, readOptionalString, readString } from './_args.js';

const flags = parseFlagMap(process.argv.slice(2));
const format = readString(
  flags,
  'format',
  process.env.FPF_VERCEL_SPEND_MONITOR_FORMAT ?? 'json',
);
const failOnBreach = flags.has('fail-on-breach');
const project = readString(
  flags,
  'project',
  process.env.FPF_VERCEL_PROJECT ?? DEFAULT_VERCEL_SPEND_PROJECT,
);
const scope = readOptionalString(flags, 'scope', process.env.FPF_VERCEL_SCOPE);
const token = readOptionalString(
  flags,
  'token',
  process.env.VERCEL_SPEND_MONITOR_TOKEN || process.env.VERCEL_TOKEN,
);
const windowMinutes = readPositiveNumber(
  flags,
  'window-minutes',
  process.env.FPF_VERCEL_SPEND_WINDOW_MINUTES,
  DEFAULT_VERCEL_SPEND_WINDOW_MINUTES,
);
const maxFunctionDurationGbhr = readNonNegativeNumber(
  flags,
  'max-function-duration-gbhr',
  process.env.FPF_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR,
  DEFAULT_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR,
);
const maxLegacyFunctionInvocations = readNonNegativeNumber(
  flags,
  'max-legacy-invocations',
  process.env.FPF_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS,
  DEFAULT_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS,
);
const maxErrorFunctionInvocations = readNonNegativeNumber(
  flags,
  'max-error-invocations',
  process.env.FPF_VERCEL_SPEND_MAX_ERROR_INVOCATIONS,
  DEFAULT_VERCEL_SPEND_MAX_ERROR_INVOCATIONS,
);
const functionDurationUsdPerGbhr = readPositiveNumber(
  flags,
  'function-duration-usd-per-gbhr',
  process.env.FPF_VERCEL_FUNCTION_DURATION_USD_PER_GBHR,
  DEFAULT_LEGACY_FUNCTION_DURATION_USD_PER_GBHR,
);
const legacyPath = readString(
  flags,
  'legacy-path',
  process.env.FPF_VERCEL_SPEND_LEGACY_PATH ?? DEFAULT_VERCEL_SPEND_LEGACY_PATH,
);
const thresholds = {
  maxFunctionDurationGbhr,
  maxLegacyFunctionInvocations,
  maxErrorFunctionInvocations,
  functionDurationUsdPerGbhr,
};

const common = [
  '--project',
  project,
  '--since',
  `${windowMinutes}m`,
  '--granularity',
  '5m',
  '--format',
  'json',
  ...(scope ? ['--scope', scope] : []),
  ...(token ? ['--token', token] : []),
];

const report = createReport();
const markdown = formatVercelSpendMonitorMarkdown(report);

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, renderGithubOutput(report), 'utf8');
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown, 'utf8');
}

if (format === 'markdown') {
  process.stdout.write(markdown);
} else if (format === 'json') {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  throw new Error('--format must be json or markdown.');
}

if (failOnBreach && (report.breached || report.operatorActionRequired)) {
  process.exitCode = 1;
}

function createReport(): VercelSpendMonitorReport {
  const now = new Date();
  if (!token) {
    return createVercelSpendConfigErrorReport({
      project,
      windowMinutes,
      legacyPath,
      now,
      thresholds,
      message: 'VERCEL_SPEND_MONITOR_TOKEN or VERCEL_TOKEN is required; metrics were not queried.',
    });
  }

  try {
    const functionDurationMetrics = runVercelMetrics([
      'vercel.function_invocation.function_duration_gbhr',
      '--aggregation',
      'sum',
      '--group-by',
      'request_path',
      '--group-by',
      'error_code',
      ...common,
    ]);
    const legacyInvocationMetrics = runVercelMetrics([
      'vercel.function_invocation.count',
      '--group-by',
      'request_path',
      '--filter',
      `contains(request_path, '${escapeODataString(legacyPath)}')`,
      ...common,
    ]);
    const errorInvocationMetrics = runVercelMetrics([
      'vercel.function_invocation.count',
      '--group-by',
      'request_path',
      '--group-by',
      'error_code',
      '--filter',
      "error_code ne ''",
      ...common,
    ]);

    return evaluateVercelSpendMonitor({
      project,
      windowMinutes,
      legacyPath,
      now,
      thresholds,
      metrics: createVercelSpendSnapshot({
        functionDurationMetrics,
        legacyInvocationMetrics,
        errorInvocationMetrics,
      }),
    });
  } catch (error) {
    return createVercelSpendMetricsUnavailableReport({
      project,
      windowMinutes,
      legacyPath,
      now,
      thresholds,
      message: sanitizeMonitorError(error),
    });
  }
}

function runVercelMetrics(args: string[]): unknown {
  const commandArgs = ['--yes', 'vercel@latest', 'metrics', ...args, '--non-interactive'];
  const result = spawnSync('npx', commandArgs, {
    encoding: 'utf8',
    env: process.env,
    timeout: 120_000,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      [
        `vercel metrics failed with exit code ${result.status ?? 'unknown'}.`,
        result.stdout.trim(),
        result.stderr.trim(),
      ].filter(Boolean).join('\n'),
    );
  }
  return parseVercelMetricsJson(`${result.stdout}\n${result.stderr}`);
}

function renderGithubOutput(report: VercelSpendMonitorReport): string {
  return [
    ['state', report.state],
    ['ok', String(report.ok)],
    ['breached', String(report.breached)],
    ['metrics_queried', String(report.metricsQueried)],
    ['operator_action_required', String(report.operatorActionRequired)],
    ['project', report.project],
    ['window_minutes', String(report.windowMinutes)],
    ['function_duration_gbhr', metricValue(report.metrics?.functionDurationGbhr)],
    ['max_function_duration_gbhr', String(report.thresholds.maxFunctionDurationGbhr)],
    ['estimated_function_duration_usd', metricValue(report.estimatedFunctionDurationUsd ?? undefined)],
    ['legacy_function_invocations', metricValue(report.metrics?.legacyFunctionInvocations)],
    ['function_error_invocations', metricValue(report.metrics?.errorFunctionInvocations)],
    ['monitor_error', report.monitorError ?? ''],
    ['summary', report.summary],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function metricValue(value: number | undefined): string {
  return value === undefined ? 'not_queried' : String(value);
}

function readPositiveNumber(
  values: Map<string, string | true>,
  key: string,
  envValue: string | undefined,
  fallback: number,
): number {
  const parsed = readNumber(values, key, envValue, fallback);
  if (parsed <= 0) {
    throw new Error(`--${key} must be a positive number.`);
  }
  return parsed;
}

function readNonNegativeNumber(
  values: Map<string, string | true>,
  key: string,
  envValue: string | undefined,
  fallback: number,
): number {
  const parsed = readNumber(values, key, envValue, fallback);
  if (parsed < 0) {
    throw new Error(`--${key} must be a non-negative number.`);
  }
  return parsed;
}

function readNumber(
  values: Map<string, string | true>,
  key: string,
  envValue: string | undefined,
  fallback: number,
): number {
  const raw = readOptionalString(values, key, envValue) ?? String(fallback);
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`--${key} must be a finite number.`);
  }
  return parsed;
}

function escapeODataString(value: string): string {
  return value.replace(/'/gu, "''");
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').trim();
}

function sanitizeMonitorError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const withoutToken = token ? raw.split(token).join('[redacted-token]') : raw;
  return sanitizeOutputValue(withoutToken).slice(0, 900);
}
