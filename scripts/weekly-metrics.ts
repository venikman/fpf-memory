import { spawnSync } from 'node:child_process';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { runFpfSyncMonitor } from '../src/build/sync-monitor.js';
import { resolveUsageWindow } from '../src/build/usage-report.js';
import {
  buildWeeklyMetricsReport,
  DEFAULT_WEEKLY_METRICS_PROJECTS,
  DEFAULT_WEEKLY_METRICS_TEAM_ID,
  DEFAULT_WEEKLY_METRICS_WINDOW,
  deploymentsSectionError,
  freshnessFromSyncMonitor,
  formatWeeklyMetricsMarkdown,
  interpretWebAnalyticsResponse,
  summarizeDeployments,
  summarizeGitActivity,
  unavailableFreshnessSection,
  unavailableGitSection,
  webAnalyticsSectionError,
  withPreviousWindow,
  type WeeklyDeploymentsSection,
  type WeeklyMetricsProjectRef,
  type WeeklyMetricsReport,
  type WeeklyWebAnalyticsSection,
} from '../src/build/weekly-metrics.js';
import { parseFlagMap, readOptionalString, readOutputFormat, readString } from './_args.js';

const VERCEL_API_BASE = 'https://api.vercel.com';
const FETCH_TIMEOUT_MS = 30_000;
const DEPLOYMENTS_PAGE_LIMIT = 100;
// 5 pages x 100 rows covers ~16x the busiest observed week; if a window ever
// exceeds it, the section says the counts are lower bounds instead of
// pretending the page was the whole window.
const DEPLOYMENTS_MAX_PAGES = 5;

const flags = parseFlagMap(process.argv.slice(2));
const windowLabel = readString(
  flags,
  'window',
  process.env.FPF_WEEKLY_METRICS_WINDOW ?? DEFAULT_WEEKLY_METRICS_WINDOW,
);
const format = readOutputFormat(
  readString(flags, 'format', process.env.FPF_WEEKLY_METRICS_FORMAT ?? 'markdown'),
);
const noWrite = flags.has('no-write');
const outputPath = readOptionalString(flags, 'output', process.env.FPF_WEEKLY_METRICS_OUTPUT)
  ?? resolve('reports/weekly', `weekly-metrics-${windowLabel.replace(/[^a-z0-9.-]/giu, '-')}.${format === 'json' ? 'json' : 'md'}`);
const teamId = readString(
  flags,
  'team-id',
  process.env.FPF_VERCEL_TEAM_ID ?? DEFAULT_WEEKLY_METRICS_TEAM_ID,
);
const vercelToken = readOptionalString(
  flags,
  'token',
  process.env.VERCEL_WEEKLY_METRICS_TOKEN || process.env.VERCEL_TOKEN,
);
const projects = parseProjects(
  readOptionalString(flags, 'projects', process.env.FPF_WEEKLY_METRICS_PROJECTS),
);

const now = new Date();
const window = resolveUsageWindow(windowLabel, now);

const freshness = await loadFreshness();
const git = loadGitActivity(window.start);
const deployments: WeeklyDeploymentsSection[] = [];
const webAnalytics: WeeklyWebAnalyticsSection[] = [];
for (const project of projects) {
  deployments.push(await loadDeployments(project));
  webAnalytics.push(await loadWebAnalytics(project));
}

const report = buildWeeklyMetricsReport({
  now,
  window: { label: window.label, start: window.start, end: window.end },
  freshness,
  git,
  deployments,
  webAnalytics,
});
const rendered = format === 'json'
  ? `${JSON.stringify(report, null, 2)}\n`
  : formatWeeklyMetricsMarkdown(report);

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

if (flags.has('fail-on-findings') && report.operatorActionRequired) {
  process.exitCode = 1;
}

async function loadFreshness() {
  try {
    const monitorReport = await runFpfSyncMonitor({
      statusUrl: readOptionalString(flags, 'status-url', process.env.FPF_SYNC_MONITOR_STATUS_URL),
      githubToken: readOptionalString(flags, 'github-token', process.env.GITHUB_TOKEN),
      now,
    });
    return freshnessFromSyncMonitor(monitorReport);
  } catch (error) {
    return unavailableFreshnessSection(errorMessage(error));
  }
}

function loadGitActivity(sinceIso: string) {
  const result = spawnSync(
    'git',
    ['log', `--since=${sinceIso}`, '--no-merges', '--pretty=format:%H%x09%cI%x09%s'],
    { encoding: 'utf8' },
  );
  if (result.error) {
    return unavailableGitSection(`git log failed to run: ${result.error.message}`);
  }
  if (result.status !== 0) {
    return unavailableGitSection(
      `git log exited ${result.status ?? 'unknown'}: ${(result.stderr ?? '').trim().slice(0, 300)}`,
    );
  }
  return summarizeGitActivity(result.stdout.split(/\r?\n/u));
}

async function loadDeployments(project: WeeklyMetricsProjectRef): Promise<WeeklyDeploymentsSection> {
  if (!vercelToken) {
    return deploymentsSectionError(
      project.name,
      'config_error',
      'Missing Vercel token. Set VERCEL_WEEKLY_METRICS_TOKEN or VERCEL_TOKEN.',
    );
  }
  const sinceMs = Date.parse(window.start);
  const rows: unknown[] = [];
  let untilMs = Date.parse(window.end);
  let truncated = false;
  try {
    // /v6/deployments returns newest-first pages; pagination.next is the
    // cursor for the next (older) page, walked via `until` until the window
    // start or the page cap is reached.
    for (let page = 0; page < DEPLOYMENTS_MAX_PAGES; page += 1) {
      const url = new URL('/v6/deployments', VERCEL_API_BASE);
      url.searchParams.set('projectId', project.projectId);
      url.searchParams.set('teamId', teamId);
      url.searchParams.set('since', String(sinceMs));
      url.searchParams.set('until', String(untilMs));
      url.searchParams.set('limit', String(DEPLOYMENTS_PAGE_LIMIT));
      const response = await vercelFetch(url);
      if (!response.ok) {
        return deploymentsSectionError(
          project.name,
          response.status === 401 || response.status === 403 ? 'config_error' : 'error',
          `Deployments query failed with HTTP ${response.status}.`,
        );
      }
      const payload = await response.json() as {
        deployments?: unknown[];
        pagination?: { next?: number | null };
      };
      if (!Array.isArray(payload.deployments)) {
        return deploymentsSectionError(
          project.name,
          'error',
          `Deployments response had no recognizable deployments array (page ${page + 1}).`,
        );
      }
      const pageRows = payload.deployments;
      rows.push(...pageRows);
      const next = payload.pagination?.next;
      if (typeof next !== 'number' || next <= sinceMs || pageRows.length < DEPLOYMENTS_PAGE_LIMIT) {
        return summarizeDeployments(project.name, { deployments: rows });
      }
      untilMs = next;
      truncated = page === DEPLOYMENTS_MAX_PAGES - 1;
    }
    const section = summarizeDeployments(project.name, { deployments: rows });
    if (truncated) {
      section.detail = `Pagination stopped after ${DEPLOYMENTS_MAX_PAGES} pages; counts are lower bounds for this window.`;
    }
    return section;
  } catch (error) {
    return deploymentsSectionError(project.name, 'error', errorMessage(error));
  }
}

async function loadWebAnalytics(project: WeeklyMetricsProjectRef): Promise<WeeklyWebAnalyticsSection> {
  if (!vercelToken) {
    return webAnalyticsSectionError(
      project.name,
      'config_error',
      'Missing Vercel token. Set VERCEL_WEEKLY_METRICS_TOKEN or VERCEL_TOKEN.',
    );
  }
  try {
    const current = await queryWebAnalyticsCount(project, window.start, window.end);
    if (current.state !== 'ok') {
      return current;
    }
    // Same-length window immediately before this one, for week-over-week deltas.
    const previousStart = new Date(Date.parse(window.start) - window.durationMs).toISOString();
    const previous = await queryWebAnalyticsCount(project, previousStart, window.start);
    return withPreviousWindow(current, previous);
  } catch (error) {
    return webAnalyticsSectionError(project.name, 'error', errorMessage(error));
  }
}

async function queryWebAnalyticsCount(
  project: WeeklyMetricsProjectRef,
  sinceIso: string,
  untilIso: string,
): Promise<WeeklyWebAnalyticsSection> {
  const url = new URL('/v1/query/web-analytics/visits/count', VERCEL_API_BASE);
  url.searchParams.set('projectId', project.projectId);
  url.searchParams.set('teamId', teamId);
  url.searchParams.set('since', sinceIso);
  url.searchParams.set('until', untilIso);
  const response = await vercelFetch(url);
  return interpretWebAnalyticsResponse({
    project: project.name,
    status: response.status,
    bodyText: await response.text(),
  });
}

function vercelFetch(url: URL): Promise<Response> {
  return fetch(url, {
    headers: { Authorization: `Bearer ${vercelToken}` },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

function parseProjects(raw: string | undefined): WeeklyMetricsProjectRef[] {
  if (!raw) {
    return DEFAULT_WEEKLY_METRICS_PROJECTS;
  }
  const projectRefs = raw.split(',').map((entry) => {
    const [name, projectId] = entry.split(':').map((part) => part.trim());
    if (!name || !projectId) {
      throw new Error('--projects entries must use name:projectId, comma-separated.');
    }
    return { name, projectId };
  });
  if (projectRefs.length === 0) {
    throw new Error('--projects must list at least one name:projectId entry.');
  }
  return projectRefs;
}

function renderGithubOutput(reportValue: WeeklyMetricsReport): string {
  return [
    ['state', reportValue.operatorActionRequired ? 'attention' : 'ok'],
    ['review_week', reportValue.window.reviewWeekId],
    ['findings_count', String(reportValue.findings.length)],
    ['summary', reportValue.summary],
    ['freshness_state', reportValue.freshness.state],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').replace(/\s+/gu, ' ').trim();
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
