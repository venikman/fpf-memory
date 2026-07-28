import { z } from 'zod';

import { publishCurrentManifestSchema } from './published-surface.js';
import {
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REF,
  DEFAULT_UPSTREAM_REPO,
  normalizeUpstreamRef,
} from './upstream-source.js';

export const DEFAULT_SYNC_MONITOR_STATUS_URL = 'https://mcp.fpf.sh/api/fpf/status';
// Drift = how long production has been late on an upstream commit it could
// already have published: now − (oldest unpublished upstream commit date),
// falling back to the published artifact's own upstream date. It is NOT the
// age of upstream HEAD — that resets on every upstream commit and can never
// breach. The worker runs twice daily (05:17/17:17 UTC), so the healthy worst
// case is ~13h; a breach past 26h means two consecutive slots failed to
// publish a commit that was already available.
export const DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS = 26;

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
    // Optional on purpose: staged deployments and responses cached from before
    // #169 omit it. A required field would make the sentinel *throw* precisely
    // when the deployment is odd — an alarm that crashes reports nothing.
    upstreamDate?: string;
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
    snapshotConsistent: boolean;
    artifactSourceMatchesConfiguredSource: boolean;
  };
  freshness?: {
    publicationCurrentAgainstConfiguredSource: boolean;
    freshnessBasis: string;
    upstreamCurrentness: 'unknown';
  };
}

export type SyncMonitorState = 'ok' | 'pending_sync' | 'breach';

export type FreshnessBasis =
  | 'oldest_unpublished_commit'
  | 'published_upstream_date'
  | 'published_at'
  | 'unknown';

export interface UpstreamBacklog {
  aheadBy: number;
  oldestUnpublishedSha: string | null;
  oldestUnpublishedCommittedAt: string | null;
  compareUrl: string | null;
}

export interface SyncFreshnessEvidence {
  basis: FreshnessBasis;
  /** The timestamp the drift clock runs from: the fact the verdict is computed on. */
  measuredFrom: string | null;
  publishedUpstreamRef: string;
  publishedUpstreamDate: string | null;
  publishedCommitUrl: string;
  upstreamCommitUrl: string;
  compareUrl: string | null;
  unpublishedCommits: number | null;
  hostedStatusUrl: string;
}

export interface SyncMonitorReport {
  state: SyncMonitorState;
  ok: boolean;
  breached: boolean;
  needsSync: boolean;
  generatedAt: string;
  maxDriftHours: number;
  driftHours: number;
  evidence: SyncFreshnessEvidence;
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
  const statusUrl = config.statusUrl ?? DEFAULT_SYNC_MONITOR_STATUS_URL;
  const upstream = await fetchUpstreamCommit(config, fetchImpl);
  const hosted = await fetchHostedStatus(statusUrl, fetchImpl);
  // Only when the refs actually differ: keeps the healthy path to one GitHub
  // call, and keeps the existing fetch-mock tests (which answer ANY
  // api.github.com URL with a commit payload) from seeing a compare request.
  const backlog = hosted.publication.upstreamRef !== upstream.sha
    ? await fetchUpstreamBacklog(config, fetchImpl, hosted.publication.upstreamRef, upstream.sha)
    : undefined;

  return evaluateFpfSyncMonitor({
    upstream,
    hosted,
    backlog,
    statusUrl,
    now: config.now ?? new Date(),
    maxDriftHours: config.maxDriftHours ?? DEFAULT_SYNC_MONITOR_MAX_DRIFT_HOURS,
  });
}

export function evaluateFpfSyncMonitor(input: {
  upstream: UpstreamCommitStatus;
  hosted: HostedSyncStatus;
  now: Date;
  maxDriftHours: number;
  backlog?: UpstreamBacklog;
  statusUrl?: string;
}): SyncMonitorReport {
  const sourceCoherent =
    input.hosted.publication.sourceHash === input.hosted.runtime.currentSourceHash
    && input.hosted.runtime.sourceHash === input.hosted.runtime.currentSourceHash
    && input.hosted.runtime.snapshotSourceHash === input.hosted.runtime.currentSourceHash;
  const runtimeFresh =
    input.hosted.status === 'ok'
    && input.hosted.runtime.snapshotExists
    && input.hosted.runtime.snapshotConsistent
    && sourceCoherent;
  const upstreamAhead = input.hosted.publication.upstreamRef !== input.upstream.sha;
  const publishedRefShort = input.hosted.publication.upstreamRef.slice(0, 8);
  const evidence = resolveFreshnessEvidence(input, upstreamAhead);
  const sinceMs = evidence.measuredFrom === null
    ? null
    : input.now.getTime() - Date.parse(evidence.measuredFrom);
  const driftHours = upstreamAhead && sinceMs !== null && Number.isFinite(sinceMs)
    ? roundHours(Math.max(sinceMs, 0) / 3_600_000)
    : 0;
  // Fail closed: if we cannot prove freshness we do not get to pass.
  const driftUnknown = upstreamAhead && evidence.basis === 'unknown';
  const driftBreached = upstreamAhead && (driftUnknown || driftHours > input.maxDriftHours);
  const breached = !runtimeFresh || driftBreached;
  const state: SyncMonitorState = breached ? 'breach' : upstreamAhead ? 'pending_sync' : 'ok';

  const quality: SyncMonitorReport['quality'] = [
    {
      characteristic: 'freshness',
      status: upstreamAhead ? (driftBreached ? 'fail' : 'pending') : 'pass',
      evidence: upstreamAhead
        ? `published ${publishedRefShort} has been behind for ${driftHours}h (basis ${evidence.basis} @ ${evidence.measuredFrom ?? 'unknown'}); upstream head ${input.upstream.sha.slice(0, 8)}; evidence ${evidence.compareUrl ?? evidence.publishedCommitUrl}`
        : `published upstreamRef matches ${input.upstream.sha.slice(0, 8)} (${evidence.publishedCommitUrl})`,
      fpf: ['E.19', 'E.21'],
    },
    {
      characteristic: 'coherence',
      status: runtimeFresh ? 'pass' : 'fail',
      evidence: runtimeFresh
        ? `hosted runtime snapshot is internally consistent at ${input.hosted.runtime.currentSourceHash}`
        : `hosted status=${input.hosted.status}, snapshotConsistent=${String(input.hosted.runtime.snapshotConsistent)}, sourceCoherent=${String(sourceCoherent)}`,
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
    evidence,
    runtimeFresh,
    sourceCoherent,
    upstreamAhead,
    upstream: input.upstream,
    hosted: input.hosted,
    quality,
    fpfAnchors: FPF_SYNC_QA_ANCHORS,
    summary: summarizeState(state, upstreamAhead, driftHours, input.maxDriftHours, evidence.basis),
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

- Upstream head: [${report.upstream.sha}](${report.upstream.htmlUrl}) (${report.upstream.committedAt})
- Published: [${report.evidence.publishedUpstreamRef}](${report.evidence.publishedCommitUrl}) — upstream date ${report.evidence.publishedUpstreamDate ?? 'unknown'}, published ${report.hosted.publication.publishedAt}
- Freshness clock: ${report.driftHours}h since ${report.evidence.measuredFrom ?? 'unknown'} (basis: ${report.evidence.basis}, limit ${report.maxDriftHours}h)
- Unpublished upstream commits: ${report.evidence.unpublishedCommits ?? 'unknown'}${report.evidence.compareUrl ? ` — [compare](${report.evidence.compareUrl})` : ''}
- Hosted status: ${report.evidence.hostedStatusUrl}
- Hosted source hash: ${report.hosted.runtime.currentSourceHash}

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
      'User-Agent': 'fpf-reference-sync-monitor',
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

async function fetchUpstreamBacklog(
  config: SyncMonitorConfig,
  fetchImpl: typeof fetch,
  publishedRef: string,
  upstreamSha: string,
): Promise<UpstreamBacklog | undefined> {
  const owner = config.upstreamOwner ?? DEFAULT_UPSTREAM_OWNER;
  const repo = config.upstreamRepo ?? DEFAULT_UPSTREAM_REPO;
  const range = `${encodeURIComponent(publishedRef)}...${encodeURIComponent(upstreamSha)}`;
  const url = `https://api.github.com/repos/${owner}/${repo}/compare/${range}`;
  // Must never throw: a 404 on rewritten upstream history or a 403 on the
  // anonymous rate limit has to degrade to published_upstream_date, not take
  // the sentinel down. A monitor that crashes reports nothing.
  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'fpf-reference-sync-monitor',
        ...(config.githubToken ? { Authorization: `Bearer ${config.githubToken}` } : {}),
      },
    });
    if (!response.ok) return undefined;
    const body = await response.json() as {
      ahead_by?: unknown;
      html_url?: unknown;
      commits?: Array<{
        sha?: unknown;
        commit?: { committer?: { date?: unknown }; author?: { date?: unknown } };
      }>;
    };
    const commits = Array.isArray(body.commits) ? body.commits : [];
    const oldest = commits[0];
    // Committer date, not author date: a rebase or cherry-pick preserves the
    // author date and would otherwise register as an instant multi-day breach.
    const oldestAt = oldest?.commit?.committer?.date ?? oldest?.commit?.author?.date;
    return {
      aheadBy: typeof body.ahead_by === 'number' ? body.ahead_by : commits.length,
      oldestUnpublishedSha: typeof oldest?.sha === 'string' ? oldest.sha : null,
      oldestUnpublishedCommittedAt: typeof oldestAt === 'string' ? oldestAt : null,
      compareUrl: typeof body.html_url === 'string' ? body.html_url : null,
    };
  } catch {
    return undefined;
  }
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
    // The manifest key is `upstreamCommittedAt`; the hosted JSON renames it to
    // `upstreamDate` (status-page.ts). Picking the manifest name would throw
    // on every live response — extend with the wire name, and keep it optional
    // so an older deployment degrades instead of killing the sentinel.
    .extend({ upstreamDate: z.string().min(1).optional() })
    .parse(record.publication);
  const runtime = requireRecord(record.runtime, 'hosted runtime');
  const legacyFresh = typeof runtime.fresh === 'boolean' ? runtime.fresh : undefined;
  const snapshotConsistent =
    typeof runtime.snapshotConsistent === 'boolean'
      ? runtime.snapshotConsistent
      : legacyFresh;
  if (snapshotConsistent === undefined) {
    throw new Error('hosted runtime missing runtime.snapshotConsistent.');
  }
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
      snapshotConsistent,
      artifactSourceMatchesConfiguredSource:
        typeof runtime.artifactSourceMatchesConfiguredSource === 'boolean'
          ? runtime.artifactSourceMatchesConfiguredSource
          : snapshotConsistent,
    },
    freshness: typeof record.freshness === 'object' && record.freshness !== null
      ? {
        publicationCurrentAgainstConfiguredSource: requireBoolean(
          (record.freshness as Record<string, unknown>).publicationCurrentAgainstConfiguredSource,
          'freshness.publicationCurrentAgainstConfiguredSource',
        ),
        freshnessBasis: requireString(
          (record.freshness as Record<string, unknown>).freshnessBasis,
          'freshness.freshnessBasis',
        ),
        upstreamCurrentness: 'unknown',
      }
      : undefined,
  };
}

function summarizeState(
  state: SyncMonitorState,
  upstreamAhead: boolean,
  driftHours: number,
  maxDriftHours: number,
  basis: FreshnessBasis,
): string {
  if (state === 'ok') {
    return 'mcp.fpf.sh is coherent and published from the current upstream ref.';
  }
  if (upstreamAhead && basis === 'unknown') {
    return 'mcp.fpf.sh freshness cannot be proven: the hosted status carries no parseable publication date. Treating as a breach.';
  }
  if (upstreamAhead && state === 'pending_sync') {
    return `mcp.fpf.sh has been behind upstream for ${driftHours}h, within the ${maxDriftHours}h sync SLO.`;
  }
  return upstreamAhead
    ? `mcp.fpf.sh has been behind upstream for ${driftHours}h, exceeding the ${maxDriftHours}h sync SLO.`
    : 'mcp.fpf.sh hosted runtime is not internally coherent.';
}

function resolveFreshnessEvidence(
  input: {
    upstream: UpstreamCommitStatus;
    hosted: HostedSyncStatus;
    backlog?: UpstreamBacklog;
    statusUrl?: string;
  },
  upstreamAhead: boolean,
): SyncFreshnessEvidence {
  const publishedRef = input.hosted.publication.upstreamRef;
  const publishedUpstreamDate = input.hosted.publication.upstreamDate ?? null;
  // Lower clamp: a rebased/force-pushed upstream history can carry commit
  // dates older than what we already published. Drift can never predate the
  // publication it is measured against.
  const floorMs = parseMs(publishedUpstreamDate)
    ?? parseMs(input.hosted.publication.publishedAt);
  const candidates: Array<[FreshnessBasis, string | null]> = [
    ['oldest_unpublished_commit', clampToFloor(input.backlog?.oldestUnpublishedCommittedAt ?? null, floorMs)],
    ['published_upstream_date', publishedUpstreamDate],
    // Degraded tier: publish-current.ts anchors publishedAt to
    // upstreamCommittedAt, so in practice this equals the tier above. It
    // exists so a deployment predating `publication.upstreamDate` degrades
    // instead of failing closed.
    ['published_at', input.hosted.publication.publishedAt],
  ];
  let basis: FreshnessBasis = 'unknown';
  let measuredFrom: string | null = null;
  if (upstreamAhead) {
    for (const [candidateBasis, at] of candidates) {
      if (parseMs(at) === undefined) continue;
      basis = candidateBasis;
      measuredFrom = at;
      break;
    }
  }

  const repoUrl = `https://github.com/${input.upstream.owner}/${input.upstream.repo}`;
  return {
    basis,
    measuredFrom,
    publishedUpstreamRef: publishedRef,
    publishedUpstreamDate,
    publishedCommitUrl: `${repoUrl}/commit/${publishedRef}`,
    upstreamCommitUrl: input.upstream.htmlUrl,
    compareUrl: input.backlog?.compareUrl
      ?? (upstreamAhead ? `${repoUrl}/compare/${publishedRef}...${input.upstream.sha}` : null),
    unpublishedCommits: input.backlog?.aheadBy ?? null,
    hostedStatusUrl: input.statusUrl ?? DEFAULT_SYNC_MONITOR_STATUS_URL,
  };
}

function parseMs(value: string | null | undefined): number | undefined {
  if (typeof value !== 'string' || value.length === 0) return undefined;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : undefined;
}

function clampToFloor(value: string | null, floorMs: number | undefined): string | null {
  const ms = parseMs(value);
  if (ms === undefined) return null;
  if (floorMs !== undefined && ms < floorMs) return new Date(floorMs).toISOString();
  return value;
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
