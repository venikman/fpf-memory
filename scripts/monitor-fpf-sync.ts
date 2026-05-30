import { appendFile } from 'node:fs/promises';

import {
  DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS,
  DEFAULT_SYNC_MONITOR_STATUS_URL,
  formatSyncMonitorMarkdown,
  runFpfSyncMonitor,
  type SyncMonitorReport,
} from '../src/build/sync-monitor.js';
import {
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REF,
  DEFAULT_UPSTREAM_REPO,
} from '../src/build/upstream-source.js';
import {
  parseFlagMap,
  readOptionalString,
  readPositiveInteger,
  readString,
} from './_args.js';

const flags = parseFlagMap(process.argv.slice(2));
const format = readString(flags, 'format', process.env.FPF_SYNC_MONITOR_FORMAT ?? 'json');
const failOnBreach = flags.has('fail-on-breach');

const report = await runFpfSyncMonitor({
  statusUrl: readString(flags, 'status-url', process.env.FPF_SYNC_MONITOR_STATUS_URL ?? DEFAULT_SYNC_MONITOR_STATUS_URL),
  upstreamOwner: readString(flags, 'upstream-owner', process.env.FPF_UPSTREAM_OWNER ?? DEFAULT_UPSTREAM_OWNER),
  upstreamRepo: readString(flags, 'upstream-repo', process.env.FPF_UPSTREAM_REPO ?? DEFAULT_UPSTREAM_REPO),
  upstreamRef: readString(flags, 'upstream-ref', process.env.FPF_UPSTREAM_REF ?? DEFAULT_UPSTREAM_REF),
  maxDriftHours: readPositiveInteger(
    flags,
    'max-drift-hours',
    process.env.FPF_SYNC_MONITOR_MAX_DRIFT_HOURS,
    DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS,
  ),
  githubToken: readOptionalString(flags, 'github-token', process.env.GITHUB_TOKEN),
});

const markdown = formatSyncMonitorMarkdown(report);

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

if (failOnBreach && report.breached) {
  process.exitCode = 1;
}

function renderGithubOutput(report: SyncMonitorReport): string {
  return [
    ['state', report.state],
    ['ok', String(report.ok)],
    ['breached', String(report.breached)],
    ['needs_sync', String(report.needsSync)],
    ['upstream_ref', report.upstream.sha],
    ['upstream_short_ref', report.upstream.sha.slice(0, 8)],
    ['published_ref', report.hosted.publication.upstreamRef],
    ['published_short_ref', report.hosted.publication.upstreamRef.slice(0, 8)],
    ['drift_hours', String(report.driftHours)],
    ['max_drift_hours', String(report.maxDriftHours)],
    ['runtime_fresh', String(report.runtimeFresh)],
    ['source_coherent', String(report.sourceCoherent)],
    ['summary', report.summary],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').trim();
}
