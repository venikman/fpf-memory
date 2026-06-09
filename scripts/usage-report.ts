import { spawnSync } from 'node:child_process';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import {
  buildUsageReportFromLines,
  configErrorUsageReport,
  DEFAULT_USAGE_REPORT_LOG_PATH,
  formatUsageReportMarkdown,
  readUsageReportLinesFromFile,
  type UsageReport,
  type UsageReportFormat,
  type UsageReportSource,
  type UsageReportSourceKind,
} from '../src/build/usage-report.js';
import {
  parseFlagMap,
  readOptionalString,
  readOutputFormat,
  readPositiveInteger,
  readString,
} from './_args.js';

const DEFAULT_USAGE_REPORT_WINDOW = '24h';
const DEFAULT_USAGE_REPORT_PROJECT = 'fpf-reference-mcp';
const DEFAULT_USAGE_REPORT_VERCEL_LIMIT = 1000;
const DEFAULT_USAGE_REPORT_VERCEL_TIMEOUT_MS = 300_000;
const VERCEL_LOGS_MAX_BUFFER_BYTES = 64 * 1024 * 1024;

const flags = parseFlagMap(process.argv.slice(2));
const windowLabel = readString(
  flags,
  'window',
  process.env.FPF_USAGE_REPORT_WINDOW ?? DEFAULT_USAGE_REPORT_WINDOW,
);
const format = readOutputFormat(
  readString(flags, 'format', process.env.FPF_USAGE_REPORT_FORMAT ?? 'markdown'),
) as UsageReportFormat;
const sourceKind = readUsageSourceKind(
  readString(flags, 'source', process.env.FPF_USAGE_REPORT_SOURCE ?? 'file'),
);
const noWrite = flags.has('no-write');
const outputPath = readOptionalString(flags, 'output', process.env.FPF_USAGE_REPORT_OUTPUT)
  ?? defaultOutputPath(windowLabel, format);

const report = sourceKind === 'vercel'
  ? await runVercelUsageReport(windowLabel)
  : await runFileUsageReport(windowLabel);
const rendered = renderReport(report, format);

if (!noWrite) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, rendered, 'utf8');
}

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, renderGithubOutput(report), 'utf8');
}
if (process.env.GITHUB_STEP_SUMMARY && format === 'markdown') {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, rendered, 'utf8');
}

process.stdout.write(rendered);
if (!rendered.endsWith('\n')) {
  process.stdout.write('\n');
}

if (flags.has('fail-on-config-error') && report.state === 'config_error') {
  process.exitCode = 1;
}
if (flags.has('fail-on-quality-breach') && report.operatorActionRequired) {
  process.exitCode = 1;
}

async function runFileUsageReport(window: string): Promise<UsageReport> {
  const logPath = readString(
    flags,
    'log-path',
    process.env.FPF_USAGE_REPORT_LOG_PATH
      ?? process.env.FPF_RUNTIME_LOG_PATH
      ?? DEFAULT_USAGE_REPORT_LOG_PATH,
  );
  const lines = await readUsageReportLinesFromFile(logPath);
  return buildUsageReportFromLines({
    lines,
    windowLabel: window,
    source: {
      kind: 'file',
      description: `Local log file: ${logPath}`,
      logPath,
    },
    limit: readReportLimit(),
  });
}

async function runVercelUsageReport(window: string): Promise<UsageReport> {
  const project = readString(
    flags,
    'project',
    process.env.FPF_USAGE_REPORT_VERCEL_PROJECT ?? DEFAULT_USAGE_REPORT_PROJECT,
  );
  const scope = readOptionalString(flags, 'scope', process.env.FPF_VERCEL_SCOPE);
  const token = readOptionalString(
    flags,
    'token',
    process.env.FPF_USAGE_REPORT_VERCEL_TOKEN
      || process.env.VERCEL_USAGE_REPORT_TOKEN
      || process.env.VERCEL_TOKEN,
  );
  const vercelLimit = readPositiveInteger(
    flags,
    'vercel-limit',
    process.env.FPF_USAGE_REPORT_VERCEL_LIMIT,
    DEFAULT_USAGE_REPORT_VERCEL_LIMIT,
  );
  const source = vercelSource(project, window, scope, vercelLimit);

  if (!token) {
    return configErrorUsageReport({
      windowLabel: window,
      source,
      message: 'Missing Vercel logs token. Set FPF_USAGE_REPORT_VERCEL_TOKEN or VERCEL_TOKEN.',
    });
  }

  const lines = runVercelLogs({
    project,
    window,
    scope,
    token,
    limit: vercelLimit,
  });
  return buildUsageReportFromLines({
    lines,
    windowLabel: window,
    source,
    limit: readReportLimit(),
  });
}

function runVercelLogs(input: {
  project: string;
  window: string;
  scope: string | undefined;
  token: string;
  limit: number;
}): string[] {
  const args = [
    '--yes',
    'vercel@54.7.1',
    'logs',
    '--project',
    input.project,
    '--environment',
    'production',
    '--no-branch',
    '--source',
    'serverless',
    '--since',
    input.window,
    '--query',
    'mcp_tool_usage',
    '--json',
    '--limit',
    String(input.limit),
    '--non-interactive',
    ...(input.scope ? ['--scope', input.scope] : []),
    '--token',
    input.token,
  ];
  const result = spawnSync('npx', args, {
    encoding: 'utf8',
    env: process.env,
    maxBuffer: VERCEL_LOGS_MAX_BUFFER_BYTES,
    timeout: readVercelLogsTimeoutMs(),
  });

  if (result.error) {
    throw new Error(formatVercelSpawnError(result.error));
  }
  if (result.status !== 0) {
    throw new Error(
      [
        `vercel logs failed with exit code ${result.status ?? 'unknown'}.`,
        sanitizeVercelFailureOutput(result.stderr, input.token),
      ].filter(Boolean).join('\n'),
    );
  }
  return result.stdout.split(/\r?\n/u).filter((line) => line.trim().length > 0);
}

function formatVercelSpawnError(error: Error): string {
  const maybeCode = (error as Error & { code?: unknown }).code;
  const code = typeof maybeCode === 'string' ? ` (${maybeCode})` : '';
  return `vercel logs failed to run${code}.`;
}

function sanitizeVercelFailureOutput(value: string, token: string): string {
  const redacted = token
    ? value.replaceAll(token, '[redacted-vercel-token]')
    : value;
  return redacted.trim().slice(0, 4000);
}

function vercelSource(
  project: string,
  window: string,
  scope: string | undefined,
  limit: number,
): UsageReportSource {
  const query = [
    'vercel logs',
    '--project',
    project,
    '--environment production',
    '--no-branch',
    '--source serverless',
    `--since ${window}`,
    '--query mcp_tool_usage',
    '--json',
    `--limit ${limit}`,
    ...(scope ? [`--scope ${scope}`] : []),
  ].join(' ');
  return {
    kind: 'vercel',
    description: `Vercel production logs for project ${project}`,
    vercelQuery: query,
  };
}

function renderReport(report: UsageReport, outputFormat: UsageReportFormat): string {
  return outputFormat === 'json'
    ? `${JSON.stringify(report, null, 2)}\n`
    : formatUsageReportMarkdown(report);
}

function readReportLimit(): number {
  return readPositiveInteger(
    flags,
    'limit',
    process.env.FPF_USAGE_REPORT_LIMIT,
    20,
  );
}

function readVercelLogsTimeoutMs(): number {
  return readPositiveInteger(
    flags,
    'vercel-timeout-ms',
    process.env.FPF_USAGE_REPORT_VERCEL_TIMEOUT_MS,
    DEFAULT_USAGE_REPORT_VERCEL_TIMEOUT_MS,
  );
}

function readUsageSourceKind(value: string): UsageReportSourceKind {
  if (value === 'file' || value === 'vercel') {
    return value;
  }
  throw new Error('--source must be file or vercel.');
}

function defaultOutputPath(window: string, format: UsageReportFormat): string {
  const filename = `top-fpf-patterns-${window.replace(/[^a-z0-9.-]/giu, '-')}.${format === 'json' ? 'json' : 'md'}`;
  return resolve('reports/usage', filename);
}

function renderGithubOutput(report: UsageReport): string {
  return [
    ['state', report.state],
    ['ok', String(report.ok)],
    ['operator_action_required', String(report.operatorActionRequired)],
    ['summary', report.summary],
    ['valid_event_count', String(report.totals.validEventCount)],
    ['invalid_event_count', String(report.totals.invalidEventCount)],
    ['unknown_unresolved_event_count', String(report.totals.unknownUnresolvedEventCount)],
    ['unknown_unresolved_rate', String(report.unknownUnresolvedRate)],
    ['top_tool', report.topTools[0]?.id ?? ''],
    ['top_intent_category', report.topIntentCategories[0]?.id ?? ''],
    ['top_served_pattern', report.topServedPatterns[0]?.id ?? ''],
    ['triage_findings', report.triageFindings.join(' | ')],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').replace(/\s+/gu, ' ').trim();
}
