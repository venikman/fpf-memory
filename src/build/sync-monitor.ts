import { publishCurrentManifestSchema } from './published-surface.js';
import {
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REF,
  DEFAULT_UPSTREAM_REPO,
  normalizeUpstreamRef,
} from './upstream-source.js';

export const DEFAULT_SYNC_MONITOR_STATUS_URL = 'https://fpf.sh/api/fpf/status';
export const DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS = 10;

export const FPF_SYNC_QA_ANCHORS = [
  {
    id: 'B.5.1',
    title: 'Explore -> Shape -> Evidence -> Operate',
    use: 'Separate discovery, implementation, proof, and production monitoring.',
  },
  {
    id: 'A.10',
    title: 'Evidence Graph Referring',
    use: 'Treat upstream SHA, manifest hash, hosted status, and checks as explicit evidence.',
  },
  {
    id: 'B.3',
    title: 'Trust & Assurance Calculus',
    use: 'Gate publication on congruent source, snapshot, runtime, and deploy evidence.',
  },
  {
    id: 'E.19',
    title: 'Pattern Quality Gates',
    use: 'Run refresh and review gates before a changed spec reaches production.',
  },
  {
    id: 'E.21',
    title: 'FPF Pattern Quality Characteristic Space',
    use: 'Track freshness, coherence, recoverability, and traceability as separate characteristics.',
  },
  {
    id: 'G.6',
    title: 'Evidence Graph & Provenance Ledger',
    use: 'Preserve machine-readable provenance for every published surface.',
  },
] as const;

export interface SyncMonitorConfig {
  statusUrl?: string;
  upstreamOwner?: string;
  upstreamRepo?: string;
  upstreamRef?: string;
  maxDriftHours?: number;
  now?: Date;
  githubToken?: string;
  fetchImpl?: typeof fetch;
}

export interface UpstreamCommitStatus {
  owner: string;
  repo: string;
  ref: string;
  sha: string;
  committedAt: string;
  message: string;
  htmlUrl: string;
}

export interface HostedSyncStatus {
  status: string;
  servedAt: string;
  publication: {
    upstreamRef: string;
    publishedAt: string;
    sourceHash: string;
    compilerFingerprint: string;
    specBytes: number;
  };
  runtime: {
    sourceHash: string;
    snapshotSourceHash: string;
    currentSourceHash: string;
    builtAt: string;
    snapshotExists: boolean;
    fresh: boolean;
  };
}

export type SyncMonitorState = 'ok' | 'pending_sync' | 'breach';

export interface SyncMonitorReport {
  state: SyncMonitorState;
  ok: boolean;
  breached: boolean;
  needsSync: boolean;
  generatedAt: string;
  maxDriftHours: number;
  driftHours: number;
  runtimeFresh: boolean;
  sourceCoherent: boolean;
  upstreamAhead: boolean;
  upstream: UpstreamCommitStatus;
  hosted: HostedSyncStatus;
  quality: Array<{
    characteristic: string;
    status: 'pass' | 'pending' | 'fail';
    evidence: string;
    fpf: string[];
  }>;
  fpfAnchors: typeof FPF_SYNC_QA_ANCHORS;
  summary: string;
}

interface GitHubCommitResponse {
  sha?: unknown;
  html_url?: unknown;
  commit?: {
    message?: unknown;
    author?: { date?: unknown };
    committer?: { date?: unknown };
  };
}

export async function runFpfSyncMonitor(
  config: SyncMonitorConfig = {},
): Promise<SyncMonitorReport> {
  const fetchImpl = config.fetchImpl ?? fetch;
  const upstream = await fetchUpstreamCommit(config, fetchImpl);
  const hosted = await fetchHostedStatus(
    config.statusUrl ?? DEFAULT_SYNC_MONITOR_STATUS_URL,
    fetchImpl,
  );

  return evaluateFpfSyncMonitor({
    upstream,
    hosted,
    now: config.now ?? new Date(),
    maxDriftHours: config.maxDriftHours ?? DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS,
  });
}

export function evaluateFpfSyncMonitor(input: {
  upstream: UpstreamCommitStatus;
  hosted: HostedSyncStatus;
  now: Date;
  maxDriftHours: number;
}): SyncMonitorReport {
  const sourceCoherent =
    input.hosted.publication.sourceHash === input.hosted.runtime.currentSourceHash
    && input.hosted.runtime.sourceHash === input.hosted.runtime.currentSourceHash
    && input.hosted.runtime.snapshotSourceHash === input.hosted.runtime.currentSourceHash;
  const runtimeFresh =
    input.hosted.status === 'ok'
    && input.hosted.runtime.snapshotExists
    && input.hosted.runtime.fresh
    && sourceCoherent;
  const upstreamAhead = input.hosted.publication.upstreamRef !== input.upstream.sha;
  const driftHours = upstreamAhead
    ? roundHours((input.now.getTime() - Date.parse(input.upstream.committedAt)) / 3_600_000)
    : 0;
  const driftBreached = upstreamAhead && driftHours > input.maxDriftHours;
  const breached = !runtimeFresh || driftBreached;
  const state: SyncMonitorState = breached ? 'breach' : upstreamAhead ? 'pending_sync' : 'ok';

  const quality: SyncMonitorReport['quality'] = [
    {
      characteristic: 'freshness',
      status: upstreamAhead ? (driftBreached ? 'fail' : 'pending') : 'pass',
      evidence: upstreamAhead
        ? `published ${input.hosted.publication.upstreamRef.slice(0, 8)} lags upstream ${input.upstream.sha.slice(0, 8)} by ${driftHours}h`
        : `published upstreamRef matches ${input.upstream.sha.slice(0, 8)}`,
      fpf: ['E.19', 'E.21'],
    },
    {
      characteristic: 'coherence',
      status: runtimeFresh ? 'pass' : 'fail',
      evidence: runtimeFresh
        ? `hosted runtime is fresh at ${input.hosted.runtime.currentSourceHash}`
        : `hosted status=${input.hosted.status}, fresh=${String(input.hosted.runtime.fresh)}, sourceCoherent=${String(sourceCoherent)}`,
      fpf: ['B.3', 'A.10'],
    },
    {
      characteristic: 'recoverability',
      status: upstreamAhead ? 'pending' : 'pass',
      evidence: upstreamAhead
        ? 'monitor workflow should trigger sync-fpf.yml for the upstream ref'
        : 'no recovery action required',
      fpf: ['B.5.1', 'E.19'],
    },
    {
      characteristic: 'traceability',
      status: 'pass',
      evidence: `manifest sourceHash=${input.hosted.publication.sourceHash}, publishedAt=${input.hosted.publication.publishedAt}`,
      fpf: ['G.6', 'A.10'],
    },
  ];

  return {
    state,
    ok: state !== 'breach',
    breached,
    needsSync: upstreamAhead,
    generatedAt: input.now.toISOString(),
    maxDriftHours: input.maxDriftHours,
    driftHours,
    runtimeFresh,
    sourceCoherent,
    upstreamAhead,
    upstream: input.upstream,
    hosted: input.hosted,
    quality,
    fpfAnchors: FPF_SYNC_QA_ANCHORS,
    summary: summarizeState(state, upstreamAhead, driftHours, input.maxDriftHours),
  };
}

export function formatSyncMonitorMarkdown(report: SyncMonitorReport): string {
  const qualityRows = report.quality
    .map((item) =>
      `| ${item.characteristic} | ${item.status} | ${item.evidence.replace(/\|/gu, '\\|')} | ${item.fpf.join(', ')} |`,
    )
    .join('\n');
  const anchorRows = report.fpfAnchors
    .map((anchor) => `- ${anchor.id} ${anchor.title}: ${anchor.use}`)
    .join('\n');

  return `# FPF Sync Monitor

State: **${report.state}**

${report.summary}

| Characteristic | Status | Evidence | FPF anchors |
| --- | --- | --- | --- |
${qualityRows}

## Provenance

- Upstream: [${report.upstream.sha}](${report.upstream.htmlUrl}) (${report.upstream.committedAt})
- Published: ${report.hosted.publication.upstreamRef} (${report.hosted.publication.publishedAt})
- Hosted source hash: ${report.hosted.runtime.currentSourceHash}
- Max drift: ${report.maxDriftHours}h

## Strategy Anchors

${anchorRows}
`;
}

async function fetchUpstreamCommit(
  config: SyncMonitorConfig,
  fetchImpl: typeof fetch,
): Promise<UpstreamCommitStatus> {
  const owner = config.upstreamOwner ?? DEFAULT_UPSTREAM_OWNER;
  const repo = config.upstreamRepo ?? DEFAULT_UPSTREAM_REPO;
  const ref = normalizeUpstreamRef(config.upstreamRef ?? DEFAULT_UPSTREAM_REF);
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(ref)}`;
  const response = await fetchImpl(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'fpf-memory-sync-monitor',
      ...(config.githubToken ? { Authorization: `Bearer ${config.githubToken}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`sync-monitor: GitHub API ${response.status} for ${url}`);
  }
  const body = await response.json() as GitHubCommitResponse;
  const sha = requireString(body.sha, 'commit.sha');
  const committedAt = requireString(
    body.commit?.author?.date ?? body.commit?.committer?.date,
    'commit.author.date',
  );
  return {
    owner,
    repo,
    ref,
    sha,
    committedAt,
    message: typeof body.commit?.message === 'string' ? body.commit.message : '',
    htmlUrl: requireString(body.html_url, 'html_url'),
  };
}

async function fetchHostedStatus(
  statusUrl: string,
  fetchImpl: typeof fetch,
): Promise<HostedSyncStatus> {
  const response = await fetchImpl(statusUrl, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`sync-monitor: hosted status HTTP ${response.status} for ${statusUrl}`);
  }
  const body = await response.json() as unknown;
  return parseHostedStatus(body);
}

function parseHostedStatus(value: unknown): HostedSyncStatus {
  const record = requireRecord(value, 'hosted status');
  const publication = publishCurrentManifestSchema
    .pick({
      upstreamRef: true,
      publishedAt: true,
      sourceHash: true,
      compilerFingerprint: true,
      specBytes: true,
    })
    .parse(record.publication);
  const runtime = requireRecord(record.runtime, 'hosted runtime');
  return {
    status: requireString(record.status, 'status'),
    servedAt: requireString(record.servedAt, 'servedAt'),
    publication,
    runtime: {
      sourceHash: requireString(runtime.sourceHash, 'runtime.sourceHash'),
      snapshotSourceHash: requireString(runtime.snapshotSourceHash, 'runtime.snapshotSourceHash'),
      currentSourceHash: requireString(runtime.currentSourceHash, 'runtime.currentSourceHash'),
      builtAt: requireString(runtime.builtAt, 'runtime.builtAt'),
      snapshotExists: requireBoolean(runtime.snapshotExists, 'runtime.snapshotExists'),
      fresh: requireBoolean(runtime.fresh, 'runtime.fresh'),
    },
  };
}

function summarizeState(
  state: SyncMonitorState,
  upstreamAhead: boolean,
  driftHours: number,
  maxDriftHours: number,
): string {
  if (state === 'ok') {
    return 'fpf.sh is coherent and published from the current upstream ref.';
  }
  if (upstreamAhead && state === 'pending_sync') {
    return `fpf.sh is behind upstream by ${driftHours}h, within the ${maxDriftHours}h sync SLO.`;
  }
  return upstreamAhead
    ? `fpf.sh is behind upstream by ${driftHours}h, exceeding the ${maxDriftHours}h sync SLO.`
    : 'fpf.sh hosted runtime is not internally coherent.';
}

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} was not an object.`);
  }
  return value as Record<string, unknown>;
}

function requireString(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${label} was not a non-empty string.`);
  }
  return value;
}

function requireBoolean(value: unknown, label: string): boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`${label} was not a boolean.`);
  }
  return value;
}

function roundHours(value: number): number {
  return Math.round(value * 10) / 10;
}
