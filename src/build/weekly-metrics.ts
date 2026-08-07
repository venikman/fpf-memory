import type { SyncMonitorReport } from './sync-monitor.js';

export const DEFAULT_WEEKLY_METRICS_WINDOW = '7d';
export const DEFAULT_WEEKLY_METRICS_TEAM_ID = 'team_CnO1I5xd2OS0lzbbc4RkW7Ym';
/**
 * Vercel project IDs are stable non-secret identifiers (the same values the
 * dashboard and `.vercel/project.json` carry). Names are for display; IDs are
 * what the REST endpoints filter on.
 */
export const DEFAULT_WEEKLY_METRICS_PROJECTS: WeeklyMetricsProjectRef[] = [
  { name: 'fpf-sh', projectId: 'prj_v1m4lj8APIk5pa64swCSSbXCkCsM' },
  { name: 'fpf-reference-mcp', projectId: 'prj_JHTcSEQmHm4pcHzOeA2dSVpjIdXA' },
];

export interface WeeklyMetricsProjectRef {
  name: string;
  projectId: string;
}

export interface WeeklyMetricsWindow {
  label: string;
  start: string;
  end: string;
  /** ISO week the review covers, derived from the window midpoint. */
  reviewWeekId: string;
}

export type WeeklyFreshnessState = 'ok' | 'pending_sync' | 'breach' | 'unavailable';

export interface WeeklyFreshnessSection {
  state: WeeklyFreshnessState;
  summary: string;
  driftHours?: number;
  maxDriftHours?: number;
  publishedUpstreamRef?: string;
  publishedUpstreamDate?: string | null;
  evidenceUrl?: string;
  detail?: string;
}

export type WeeklyCommitKind = 'sync' | 'other';

export interface WeeklyCommit {
  hash: string;
  date: string;
  subject: string;
  kind: WeeklyCommitKind;
}

export interface WeeklyGitSection {
  state: 'ok' | 'unavailable';
  totalCommits: number;
  syncCommits: number;
  otherCommits: number;
  commits: WeeklyCommit[];
  detail?: string;
}

export type WeeklySectionState = 'ok' | 'config_error' | 'error';

export interface WeeklyDeploymentsSection {
  project: string;
  state: WeeklySectionState;
  total: number;
  production: number;
  preview: number;
  errored: number;
  latestProductionAt: string | null;
  /** True when pagination stopped before the window was exhausted — counts are lower bounds. */
  truncated?: boolean;
  detail?: string;
}

export type WeeklyWebAnalyticsState =
  | 'ok'
  | 'not_enabled'
  | 'config_error'
  | 'unparsed'
  | 'error';

export interface WeeklyWebAnalyticsCounts {
  visitors?: number;
  pageviews?: number;
}

export interface WeeklyWebAnalyticsSection {
  project: string;
  state: WeeklyWebAnalyticsState;
  current: WeeklyWebAnalyticsCounts;
  previous: WeeklyWebAnalyticsCounts;
  detail?: string;
}

/**
 * Verdict of the separately produced MCP usage report (`usage:report`),
 * carried via its GITHUB_OUTPUT keys so a failing or breaching usage sample
 * surfaces as a top-level finding instead of hiding inside the embedded
 * details block. Absent when no usage sample was requested (local runs).
 */
export interface WeeklyUsageSampleSection {
  state: string;
  operatorActionRequired: boolean;
  summary?: string;
  /** True when the runtime-log export hit its line cap — event counts are lower bounds. */
  exportCapped?: boolean;
}

export interface WeeklyMetricsReport {
  generatedAt: string;
  window: WeeklyMetricsWindow;
  freshness: WeeklyFreshnessSection;
  git: WeeklyGitSection;
  deployments: WeeklyDeploymentsSection[];
  webAnalytics: WeeklyWebAnalyticsSection[];
  usageSample?: WeeklyUsageSampleSection;
  findings: string[];
  operatorActionRequired: boolean;
  summary: string;
  caveats: string[];
}

const SYNC_COMMIT_PATTERN = /^publish: sync FPF spec/u;
const MAX_LISTED_COMMITS = 30;

export function isoWeekId(date: Date): string {
  const probe = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = probe.getUTCDay() || 7;
  probe.setUTCDate(probe.getUTCDate() + 4 - weekday);
  const yearStart = Date.UTC(probe.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((probe.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${probe.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/**
 * The review week is taken from the window midpoint so a Monday-morning run
 * over the trailing 7 days reports the ISO week that the window actually
 * covers, not the week the cron happens to fire in.
 */
export function resolveReviewWeekId(window: { start: string; end: string }): string {
  const startMs = Date.parse(window.start);
  const endMs = Date.parse(window.end);
  return isoWeekId(new Date(startMs + (endMs - startMs) / 2));
}

export function freshnessFromSyncMonitor(report: SyncMonitorReport): WeeklyFreshnessSection {
  return {
    state: report.state,
    summary: report.summary,
    driftHours: report.driftHours,
    maxDriftHours: report.maxDriftHours,
    publishedUpstreamRef: report.evidence.publishedUpstreamRef,
    publishedUpstreamDate: report.evidence.publishedUpstreamDate,
    evidenceUrl: report.evidence.compareUrl ?? report.evidence.publishedCommitUrl,
  };
}

export function unavailableFreshnessSection(detail: string): WeeklyFreshnessSection {
  return {
    state: 'unavailable',
    summary: 'Freshness could not be measured this run.',
    detail,
  };
}

export function summarizeGitActivity(lines: string[]): WeeklyGitSection {
  const commits: WeeklyCommit[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }
    const [hash, date, ...subjectParts] = line.split('\t');
    const subject = subjectParts.join('\t');
    if (!hash || !date || !subject) {
      continue;
    }
    commits.push({
      hash: hash.slice(0, 8),
      date,
      subject,
      kind: SYNC_COMMIT_PATTERN.test(subject) ? 'sync' : 'other',
    });
  }
  const syncCommits = commits.filter((commit) => commit.kind === 'sync').length;
  return {
    state: 'ok',
    totalCommits: commits.length,
    syncCommits,
    otherCommits: commits.length - syncCommits,
    commits: commits.slice(0, MAX_LISTED_COMMITS),
  };
}

export function unavailableGitSection(detail: string): WeeklyGitSection {
  return {
    state: 'unavailable',
    totalCommits: 0,
    syncCommits: 0,
    otherCommits: 0,
    commits: [],
    detail,
  };
}

/**
 * Accepts both the flat REST `/v6/deployments` shape (`{ deployments: [...] }`)
 * and the nested wrapper some clients emit (`{ deployments: { deployments } }`).
 */
export function summarizeDeployments(project: string, payload: unknown): WeeklyDeploymentsSection {
  const rows = readDeploymentRows(payload);
  if (rows === undefined) {
    return {
      project,
      state: 'error',
      total: 0,
      production: 0,
      preview: 0,
      errored: 0,
      latestProductionAt: null,
      detail: 'Deployments response had no recognizable deployments array.',
    };
  }
  let production = 0;
  let errored = 0;
  let latestProductionMs: number | null = null;
  for (const row of rows) {
    const record = asRecord(row) ?? {};
    const state = optionalString(record.state) ?? optionalString(record.readyState) ?? '';
    if (state === 'ERROR' || state === 'CANCELED') {
      errored += 1;
    }
    if (optionalString(record.target) === 'production') {
      production += 1;
      const createdMs = numeric(record.created) ?? numeric(record.createdAt);
      if (createdMs !== undefined && (latestProductionMs === null || createdMs > latestProductionMs)) {
        latestProductionMs = createdMs;
      }
    }
  }
  return {
    project,
    state: 'ok',
    total: rows.length,
    production,
    preview: rows.length - production,
    errored,
    latestProductionAt: latestProductionMs === null ? null : new Date(latestProductionMs).toISOString(),
  };
}

export function deploymentsSectionError(
  project: string,
  state: WeeklySectionState,
  detail: string,
): WeeklyDeploymentsSection {
  return {
    project,
    state,
    total: 0,
    production: 0,
    preview: 0,
    errored: 0,
    latestProductionAt: null,
    detail,
  };
}

export function interpretWebAnalyticsResponse(input: {
  project: string;
  status: number;
  bodyText: string;
  previous?: WeeklyWebAnalyticsCounts;
}): WeeklyWebAnalyticsSection {
  const base: WeeklyWebAnalyticsSection = {
    project: input.project,
    state: 'error',
    current: {},
    previous: input.previous ?? {},
  };
  if (input.status === 404 && /not_found/u.test(input.bodyText)) {
    return {
      ...base,
      state: 'not_enabled',
      detail: 'Web Analytics is not enabled for this project yet.',
    };
  }
  if (input.status === 401 || input.status === 403) {
    return {
      ...base,
      state: 'config_error',
      detail: `Web Analytics query was rejected with HTTP ${input.status}; check the Vercel token scope.`,
    };
  }
  if (input.status !== 200) {
    return {
      ...base,
      state: 'error',
      detail: `Web Analytics query failed with HTTP ${input.status}: ${excerpt(input.bodyText)}`,
    };
  }
  const counts = extractWebAnalyticsCounts(input.bodyText);
  if (counts === undefined) {
    return {
      ...base,
      state: 'unparsed',
      detail: `Web Analytics responded 200 but no visitor/pageview counts were recognized: ${excerpt(input.bodyText)}`,
    };
  }
  const missing = [
    ...(counts.visitors === undefined ? ['visitors'] : []),
    ...(counts.pageviews === undefined ? ['pageviews'] : []),
  ];
  if (missing.length > 0) {
    // Partial evidence must stay visible: keep what was recognized but say
    // what was not, so an API shape change can't quietly shrink the report.
    return {
      ...base,
      state: 'ok',
      current: counts,
      detail: `Response was missing the ${missing.join(' and ')} counter: ${excerpt(input.bodyText)}`,
    };
  }
  return { ...base, state: 'ok', current: counts };
}

export function webAnalyticsSectionError(
  project: string,
  state: WeeklyWebAnalyticsState,
  detail: string,
): WeeklyWebAnalyticsSection {
  return { project, state, current: {}, previous: {}, detail };
}

/**
 * Attaches the previous-window counts to a current-window section. A failed
 * previous-window query must not silently render as "no data": the section
 * keeps its current counts but carries an explicit note that the
 * week-over-week comparison is missing and why.
 */
export function withPreviousWindow(
  current: WeeklyWebAnalyticsSection,
  previous: WeeklyWebAnalyticsSection,
): WeeklyWebAnalyticsSection {
  if (previous.state === 'ok') {
    if (!previous.detail) {
      return { ...current, previous: previous.current };
    }
    // A partial previous window (one counter missing) keeps its warning: the
    // missing delta must stay visible, not vanish into a dash.
    const partialNote = `Previous window: ${previous.detail}`;
    return {
      ...current,
      previous: previous.current,
      detail: current.detail ? `${current.detail} ${partialNote}` : partialNote,
    };
  }
  const note = `Week-over-week comparison unavailable: previous-window query returned ${previous.state}${previous.detail ? ` — ${previous.detail}` : ''}`;
  return {
    ...current,
    previous: {},
    detail: current.detail ? `${current.detail} ${note}` : note,
  };
}

export function buildWeeklyMetricsReport(input: {
  now: Date;
  window: { label: string; start: string; end: string };
  freshness: WeeklyFreshnessSection;
  git: WeeklyGitSection;
  deployments: WeeklyDeploymentsSection[];
  webAnalytics: WeeklyWebAnalyticsSection[];
  usageSample?: WeeklyUsageSampleSection;
}): WeeklyMetricsReport {
  const findings: string[] = [];

  if (input.freshness.state === 'breach') {
    findings.push(
      `Publication freshness is breached: ${input.freshness.summary}`,
    );
  } else if (input.freshness.state === 'unavailable') {
    findings.push(
      `Freshness could not be measured: ${input.freshness.detail ?? 'unknown error'}`,
    );
  }

  if (input.git.state === 'unavailable') {
    findings.push(`Repository activity could not be read: ${input.git.detail ?? 'unknown error'}`);
  } else if (
    input.git.syncCommits === 0
    && (input.freshness.state === 'breach' || input.freshness.state === 'unavailable')
  ) {
    // Zero syncs on a quiet upstream week is healthy — it only becomes
    // evidence of missed publication work when freshness is breached, or
    // unprovable, in the same window.
    findings.push(
      'No sync publications merged to main in this window while freshness was not provably ok.',
    );
  }

  if (input.usageSample) {
    if (input.usageSample.state !== 'ok') {
      findings.push(
        `MCP usage telemetry sample did not run cleanly (${input.usageSample.state})${input.usageSample.summary ? `: ${input.usageSample.summary}` : '.'}`,
      );
    } else if (input.usageSample.operatorActionRequired) {
      findings.push(
        `MCP usage telemetry sample requires operator action${input.usageSample.summary ? `: ${input.usageSample.summary}` : '.'}`,
      );
    } else if (input.usageSample.exportCapped) {
      findings.push(
        'MCP usage telemetry export hit its line cap; usage counts are lower bounds for the sample window.',
      );
    }
  }

  for (const section of input.deployments) {
    if (section.state !== 'ok') {
      findings.push(
        `Deployments for ${section.project} could not be summarized: ${section.detail ?? section.state}`,
      );
      continue;
    }
    if (section.errored > 0) {
      findings.push(
        `${section.project} had ${section.errored} errored/canceled deployment${section.errored === 1 ? '' : 's'} in this window.`,
      );
    }
    if (section.truncated) {
      findings.push(
        `Deployment counts for ${section.project} are lower bounds: ${section.detail ?? 'pagination stopped before the window was exhausted'}`,
      );
    }
  }

  for (const section of input.webAnalytics) {
    if (section.state === 'not_enabled') {
      findings.push(
        `Web Analytics is not enabled for ${section.project}; visitor metrics are blind until it is switched on.`,
      );
    } else if (section.state !== 'ok') {
      findings.push(
        `Web Analytics for ${section.project} did not produce counts (${section.state}): ${section.detail ?? ''}`.trim(),
      );
    } else if (section.current.visitors === undefined || section.current.pageviews === undefined) {
      findings.push(
        `Web Analytics for ${section.project} returned partial counters; evidence is incomplete: ${section.detail ?? 'a counter was missing from the response'}`,
      );
    } else if (
      section.previous.visitors === undefined
      || section.previous.pageviews === undefined
    ) {
      // The previous window failed or came back partial: the promised
      // week-over-week delta is missing, which is a guard verdict, not a
      // footnote.
      findings.push(
        `Week-over-week evidence for ${section.project} is incomplete: ${section.detail ?? 'the previous-window query did not produce both counters'}`,
      );
    }
  }

  const window: WeeklyMetricsWindow = {
    ...input.window,
    reviewWeekId: resolveReviewWeekId(input.window),
  };
  const report: WeeklyMetricsReport = {
    generatedAt: input.now.toISOString(),
    window,
    freshness: input.freshness,
    git: input.git,
    deployments: input.deployments,
    webAnalytics: input.webAnalytics,
    ...(input.usageSample ? { usageSample: input.usageSample } : {}),
    findings,
    operatorActionRequired: findings.length > 0,
    summary: '',
    caveats: [
      'Deployment counts include preview deployments created for pull-request branches.',
      'Web Analytics counts are Vercel-reported visitors and pageviews for the window, not unique humans across devices.',
      'MCP tool-usage telemetry comes from the separate usage report (`bun run usage:report`); Vercel runtime-log retention is much shorter than this window, so that report samples the trailing hours, not the full week.',
    ],
  };
  report.summary = buildSummary(report);
  return report;
}

export function formatWeeklyMetricsMarkdown(report: WeeklyMetricsReport): string {
  return `# Weekly Metrics Review ${report.window.reviewWeekId}

State: **${report.operatorActionRequired ? 'attention' : 'ok'}**

Window: ${report.window.start} -> ${report.window.end} (${report.window.label})

Generated: ${report.generatedAt}

Summary: ${report.summary}

## Findings

${findingList(report.findings)}

## Publication freshness (mcp.fpf.sh)

- State: **${report.freshness.state}**
- ${report.freshness.summary}
${freshnessDetails(report.freshness)}

## Repository activity (main)

- Commits: ${report.git.totalCommits} (sync publications: ${report.git.syncCommits}, other: ${report.git.otherCommits})${report.git.detail ? `\n- ${report.git.detail}` : ''}

${commitTable(report.git.commits)}

## Vercel deployments

${deploymentTable(report.deployments)}

## Web Analytics

${webAnalyticsTable(report.webAnalytics)}

${webAnalyticsNotes(report.webAnalytics)}

${usageSampleSection(report.usageSample)}## Caveats

${report.caveats.map((item) => `- ${item}`).join('\n')}
`;
}

function buildSummary(report: WeeklyMetricsReport): string {
  const deploymentsTotal = report.deployments.reduce(
    (total, section) => total + (section.state === 'ok' ? section.total : 0),
    0,
  );
  const analyticsSummary = report.webAnalytics
    .map((section) => {
      if (section.state === 'ok') {
        const visitors = section.current.visitors ?? 'n/a';
        const pageviews = section.current.pageviews ?? 'n/a';
        return `${section.project} ${String(visitors)} visitors / ${String(pageviews)} pageviews`;
      }
      return `${section.project} analytics ${section.state}`;
    })
    .join('; ');
  return [
    `freshness ${report.freshness.state}${report.freshness.driftHours !== undefined ? ` (drift ${report.freshness.driftHours}h vs ${report.freshness.maxDriftHours ?? '?'}h SLO)` : ''}`,
    `${report.git.totalCommits} commits (${report.git.syncCommits} syncs)`,
    `${deploymentsTotal} deployments`,
    analyticsSummary,
    report.operatorActionRequired
      ? `${report.findings.length} finding${report.findings.length === 1 ? '' : 's'} need review`
      : 'no findings',
  ].filter(Boolean).join('; ');
}

function freshnessDetails(section: WeeklyFreshnessSection): string {
  const lines: string[] = [];
  if (section.driftHours !== undefined && section.maxDriftHours !== undefined) {
    lines.push(`- Drift: ${section.driftHours}h against the ${section.maxDriftHours}h SLO`);
  }
  if (section.publishedUpstreamRef) {
    lines.push(
      `- Published upstream ref: \`${section.publishedUpstreamRef.slice(0, 8)}\`${section.publishedUpstreamDate ? ` (${section.publishedUpstreamDate})` : ''}`,
    );
  }
  if (section.evidenceUrl) {
    lines.push(`- Evidence: ${section.evidenceUrl}`);
  }
  if (section.detail) {
    lines.push(`- Detail: ${section.detail}`);
  }
  return lines.join('\n');
}

function commitTable(commits: WeeklyCommit[]): string {
  if (commits.length === 0) {
    return '_No commits in this window._';
  }
  return [
    '| Date | Kind | Subject |',
    '| --- | --- | --- |',
    ...commits.map(
      (commit) => `| ${commit.date.slice(0, 10)} | ${commit.kind} | ${escapeTable(commit.subject)} |`,
    ),
  ].join('\n');
}

function deploymentTable(sections: WeeklyDeploymentsSection[]): string {
  if (sections.length === 0) {
    return '_No projects configured._';
  }
  const rows = [
    '| Project | State | Total | Production | Preview | Errored | Latest production |',
    '| --- | --- | ---: | ---: | ---: | ---: | --- |',
    ...sections.map((section) =>
      `| ${section.project} | ${section.state} | ${section.total} | ${section.production} | ${section.preview} | ${section.errored} | ${section.latestProductionAt ?? '—'} |`,
    ),
  ];
  const notes = sections
    .filter((section) => section.detail)
    .map((section) => `- ${section.project}: ${section.detail}`);
  return [...rows, ...(notes.length > 0 ? ['', ...notes] : [])].join('\n');
}

function webAnalyticsTable(sections: WeeklyWebAnalyticsSection[]): string {
  if (sections.length === 0) {
    return '_No projects configured._';
  }
  return [
    '| Project | State | Visitors | Pageviews | Prev (v / pv) | Δ week-over-week (v / pv) |',
    '| --- | --- | ---: | ---: | ---: | ---: |',
    ...sections.map((section) =>
      `| ${section.project} | ${section.state} | ${formatCount(section.current.visitors)} | ${formatCount(section.current.pageviews)} | ${formatCount(section.previous.visitors)} / ${formatCount(section.previous.pageviews)} | ${formatDelta(section.current.visitors, section.previous.visitors)} / ${formatDelta(section.current.pageviews, section.previous.pageviews)} |`,
    ),
  ].join('\n');
}

function formatDelta(current: number | undefined, previous: number | undefined): string {
  if (current === undefined || previous === undefined) {
    return '—';
  }
  const diff = current - previous;
  const signed = `${diff >= 0 ? '+' : ''}${diff}`;
  if (previous === 0) {
    return signed;
  }
  const pct = Math.round((diff / previous) * 1000) / 10;
  return `${signed} (${pct >= 0 ? '+' : ''}${pct}%)`;
}

function webAnalyticsNotes(sections: WeeklyWebAnalyticsSection[]): string {
  const notes = sections
    .filter((section) => section.detail)
    .map((section) => `- ${section.project}: ${section.detail}`);
  return notes.join('\n');
}

function usageSampleSection(sample: WeeklyUsageSampleSection | undefined): string {
  if (!sample) {
    return '';
  }
  return `## MCP usage telemetry sample

- State: **${sample.state}**
- Operator action required: ${sample.operatorActionRequired ? 'yes' : 'no'}${sample.summary ? `\n- Summary: ${sample.summary}` : ''}${sample.exportCapped ? '\n- Export capped: yes — usage counts are lower bounds for the sample window.' : ''}
- The full sample is attached below this report by the workflow.

`;
}

function findingList(findings: string[]): string {
  if (findings.length === 0) {
    return '- None.';
  }
  return findings.map((finding) => `- ${finding}`).join('\n');
}

function readDeploymentRows(payload: unknown): unknown[] | undefined {
  const record = asRecord(payload);
  if (!record) {
    return undefined;
  }
  if (Array.isArray(record.deployments)) {
    return record.deployments;
  }
  const nested = asRecord(record.deployments);
  if (nested && Array.isArray(nested.deployments)) {
    return nested.deployments;
  }
  return undefined;
}

function extractWebAnalyticsCounts(bodyText: string): WeeklyWebAnalyticsCounts | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return undefined;
  }
  const candidates: unknown[] = [parsed];
  const record = asRecord(parsed);
  if (record) {
    candidates.push(record.data, record.result, record.totals);
    if (Array.isArray(record.data) && record.data.length > 0) {
      candidates.push(record.data[0]);
    }
  }
  for (const candidate of candidates) {
    const candidateRecord = asRecord(candidate);
    if (!candidateRecord) {
      continue;
    }
    const visitors = numeric(candidateRecord.visitors) ?? numeric(candidateRecord.devices);
    const pageviews =
      numeric(candidateRecord.pageviews)
      ?? numeric(candidateRecord.views)
      ?? numeric(candidateRecord.total)
      ?? numeric(candidateRecord.count);
    if (visitors !== undefined || pageviews !== undefined) {
      return {
        ...(visitors === undefined ? {} : { visitors }),
        ...(pageviews === undefined ? {} : { pageviews }),
      };
    }
  }
  return undefined;
}

function formatCount(value: number | undefined): string {
  return value === undefined ? '—' : String(value);
}

function excerpt(value: string): string {
  const normalized = value.replace(/\s+/gu, ' ').trim();
  return normalized.length > 200 ? `${normalized.slice(0, 200)}…` : normalized;
}

function escapeTable(value: string): string {
  return value.replace(/\|/gu, '\\|');
}

function numeric(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined;
  }
  return value as Record<string, unknown>;
}
