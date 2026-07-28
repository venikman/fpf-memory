import { describe, expect, it } from '@rstest/core';

import {
  evaluateFpfSyncMonitor,
  formatSyncMonitorMarkdown,
  runFpfSyncMonitor,
  type HostedSyncStatus,
  type UpstreamCommitStatus,
} from '../src/build/sync-monitor.js';

describe('FPF sync monitor', () => {
  it('passes when mcp.fpf.sh is fresh and published from upstream HEAD', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT }),
      hosted: makeHosted({ upstreamRef: SHA_CURRENT }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('ok');
    expect(report.needsSync).toBe(false);
    expect(report.breached).toBe(false);
    expect(report.quality.every((item) => item.status === 'pass')).toBe(true);
  });

  it('marks recent upstream drift as pending sync and recoverable by automation', () => {
    const report = evaluateFpfSyncMonitor({
      // Upstream HEAD is 1h old, the published artifact is 4h old. The two
      // candidate metrics disagree on purpose: the old code measured HEAD and
      // would report 1h here.
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-30T11:00:00Z',
      }),
      hosted: makeHosted({ upstreamRef: SHA_PUBLISHED }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('pending_sync');
    expect(report.ok).toBe(true);
    expect(report.needsSync).toBe(true);
    expect(report.driftHours).toBe(4);
    expect(report.evidence.basis).toBe('published_upstream_date');
    expect(report.quality.find((item) => item.characteristic === 'freshness')?.status).toBe(
      'pending',
    );
  });

  it('breaches when the published artifact has been stale past the SLO', () => {
    const report = evaluateFpfSyncMonitor({
      // Upstream committed 30 minutes ago; the breach comes from the
      // publication being 16h old, not from the age of upstream HEAD.
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-30T11:30:00Z',
      }),
      hosted: makeHosted({
        upstreamRef: SHA_PUBLISHED,
        upstreamDate: '2026-05-29T20:00:00Z',
      }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('breach');
    expect(report.breached).toBe(true);
    expect(report.needsSync).toBe(true);
    expect(report.driftHours).toBe(16);
    expect(report.summary).toContain('exceeding the 10h sync SLO');
  });

  it('does not treat internal snapshot consistency as upstream currentness', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-30T11:30:00Z',
      }),
      hosted: makeHosted({
        upstreamRef: SHA_PUBLISHED,
        upstreamDate: '2026-05-29T20:00:00Z',
        runtimeFresh: true,
      }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.runtimeFresh).toBe(true);
    expect(report.sourceCoherent).toBe(true);
    expect(report.upstreamAhead).toBe(true);
    expect(report.state).toBe('breach');
    expect(report.summary).toContain('exceeding the 10h sync SLO');
  });

  it('accepts the transitional legacy runtime.fresh field while parsing hosted status', async () => {
    const fetchImpl = Object.assign(
      async (url: Parameters<typeof fetch>[0]) => {
        if (String(url).includes('api.github.com')) {
          return jsonResponse({
            sha: SHA_CURRENT,
            html_url: `https://github.com/ailev/FPF/commit/${SHA_CURRENT}`,
            commit: {
              message: 'quality improvement campaign results',
              author: { date: '2026-05-30T08:00:00Z' },
            },
          });
        }

        const status = makeHosted({ upstreamRef: SHA_CURRENT });
        return jsonResponse({
          ...status,
          runtime: {
            ...status.runtime,
            snapshotConsistent: undefined,
            artifactSourceMatchesConfiguredSource: undefined,
            fresh: true,
          },
        });
      },
      { preconnect: fetch.preconnect },
    ) satisfies typeof fetch;

    const report = await runFpfSyncMonitor({
      fetchImpl,
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.runtimeFresh).toBe(true);
    expect(report.state).toBe('ok');
  });

  it('breaches when the hosted runtime is internally stale', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT }),
      hosted: makeHosted({
        upstreamRef: SHA_CURRENT,
        status: 'stale',
        runtimeFresh: false,
      }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('breach');
    expect(report.runtimeFresh).toBe(false);
    expect(report.needsSync).toBe(false);
    expect(report.quality.find((item) => item.characteristic === 'coherence')?.status).toBe(
      'fail',
    );
  });

  it('renders the FPF-grounded QA strategy in markdown', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT }),
      hosted: makeHosted({ upstreamRef: SHA_CURRENT }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    const markdown = formatSyncMonitorMarkdown(report);

    expect(markdown).toContain('B.5.1');
    expect(markdown).toContain('A.10');
    expect(markdown).toContain('B.3');
    expect(markdown).toContain('E.19');
    expect(markdown).toContain('G.6');
  });

  it('sends GitHub API headers required by the hosted monitor', async () => {
    let githubHeaders: HeadersInit | undefined;
    const fetchImpl = Object.assign(
      async (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
        if (String(url).includes('api.github.com')) {
          githubHeaders = init?.headers;
          return jsonResponse({
            sha: SHA_CURRENT,
            html_url: `https://github.com/ailev/FPF/commit/${SHA_CURRENT}`,
            commit: {
              message: 'quality improvement campaign results',
              author: { date: '2026-05-30T08:00:00Z' },
            },
          });
        }

        return jsonResponse(makeHosted({ upstreamRef: SHA_CURRENT }));
      },
      { preconnect: fetch.preconnect },
    ) satisfies typeof fetch;

    await runFpfSyncMonitor({
      fetchImpl,
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(githubHeaders).toMatchObject({
      Accept: 'application/vnd.github+json',
      'User-Agent': 'fpf-reference-sync-monitor',
    });
  });

  // The 2026-07-16 → 2026-07-28 outage in one assertion. Production served a
  // 16-day-old publication while the monitor reported "behind by 0.1h, within
  // the 26h sync SLO" — because it measured the age of upstream HEAD, which
  // resets on every upstream push. The fresher upstream got, the healthier we
  // looked. This is the only test that stops the bug recurring.
  it('breaches on a long-stale publication even when upstream HEAD is minutes old', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-30T11:00:00Z',
      }),
      hosted: makeHosted({
        upstreamRef: SHA_PUBLISHED,
        upstreamDate: '2026-05-28T20:00:00Z',
      }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 26,
    });

    expect(report.state).toBe('breach');
    expect(report.driftHours).toBe(40);
  });

  it('measures from the oldest unpublished commit, so an upstream quiet gap is not a breach', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT, committedAt: '2026-05-30T11:00:00Z' }),
      // Published 6 days ago, but upstream was silent until 10h ago — the
      // pipeline has only had 10h to publish anything, so this is healthy.
      hosted: makeHosted({ upstreamRef: SHA_PUBLISHED, upstreamDate: '2026-05-24T12:00:00Z' }),
      backlog: {
        aheadBy: 3,
        oldestUnpublishedSha: 'abc',
        oldestUnpublishedCommittedAt: '2026-05-30T02:00:00Z',
        compareUrl: 'https://github.com/ailev/FPF/compare/a...b',
      },
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 26,
    });

    expect(report.evidence.basis).toBe('oldest_unpublished_commit');
    expect(report.driftHours).toBe(10);
    expect(report.state).toBe('pending_sync');
  });

  it('clamps a rewritten-history commit date to the publication date', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT, committedAt: '2026-05-30T11:00:00Z' }),
      hosted: makeHosted({ upstreamRef: SHA_PUBLISHED, upstreamDate: '2026-05-30T08:00:00Z' }),
      backlog: {
        aheadBy: 1,
        oldestUnpublishedSha: 'abc',
        // Older than what we already published — a force-push artifact. Drift
        // can never predate the publication it is measured against.
        oldestUnpublishedCommittedAt: '2026-05-20T00:00:00Z',
        compareUrl: null,
      },
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 26,
    });

    expect(report.evidence.measuredFrom).toBe('2026-05-30T08:00:00.000Z');
    expect(report.driftHours).toBe(4);
  });

  it('falls back to publishedAt when the hosted status carries no upstreamDate', () => {
    const hosted = makeHosted({ upstreamRef: SHA_PUBLISHED });
    delete hosted.publication.upstreamDate;

    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT, committedAt: '2026-05-30T11:00:00Z' }),
      hosted,
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 26,
    });

    expect(report.evidence.basis).toBe('published_at');
    expect(report.driftHours).toBe(2);
  });

  it('fails closed and carries an evidence link when no publication date parses', () => {
    const hosted = makeHosted({ upstreamRef: SHA_PUBLISHED });
    hosted.publication.upstreamDate = 'not-a-date';
    hosted.publication.publishedAt = 'also-not-a-date';

    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({ sha: SHA_CURRENT, committedAt: '2026-05-30T11:00:00Z' }),
      hosted,
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 26,
    });

    expect(report.state).toBe('breach');
    expect(report.evidence.basis).toBe('unknown');
    expect(formatSyncMonitorMarkdown(report)).toContain(report.evidence.publishedCommitUrl);
  });
});

const SHA_CURRENT = '2e112078bb209e5e3a511c3bd1aa6b1b2e299efe';
const SHA_PUBLISHED = 'ae1ff1c7a231a2ec78d244b40d7805a5538c6608';
const SOURCE_HASH = 'sha256:73c08fb554cc5920f4bf5497e0d356ab6d3bcd5bdb605f8dcc2f82587565005e';

function makeUpstream(overrides: Partial<UpstreamCommitStatus>): UpstreamCommitStatus {
  return {
    owner: 'ailev',
    repo: 'FPF',
    ref: 'main',
    sha: SHA_CURRENT,
    committedAt: '2026-05-30T08:00:00Z',
    message: 'quality improvement campaign results',
    htmlUrl: `https://github.com/ailev/FPF/commit/${SHA_CURRENT}`,
    ...overrides,
  };
}

function makeHosted(
  overrides: Partial<{
    upstreamRef: string;
    upstreamDate: string;
    status: string;
    runtimeFresh: boolean;
    sourceHash: string;
  }>,
): HostedSyncStatus {
  const sourceHash = overrides.sourceHash ?? SOURCE_HASH;
  return {
    status: overrides.status ?? 'ok',
    servedAt: '2026-05-30T12:00:00Z',
    publication: {
      upstreamRef: overrides.upstreamRef ?? SHA_CURRENT,
      // The published artifact's own upstream date. The fixture could not
      // express this before, which is exactly why no test caught the bug.
      upstreamDate: overrides.upstreamDate ?? '2026-05-30T08:00:00Z',
      publishedAt: '2026-05-30T10:00:00Z',
      sourceHash,
      compilerFingerprint: 'sha256:compiler',
      specBytes: 7_999_874,
    },
    runtime: {
      sourceHash,
      snapshotSourceHash: sourceHash,
      currentSourceHash: sourceHash,
      builtAt: '2026-05-30T10:00:00Z',
      snapshotExists: true,
      snapshotConsistent: overrides.runtimeFresh ?? true,
      artifactSourceMatchesConfiguredSource: overrides.runtimeFresh ?? true,
    },
    freshness: {
      publicationCurrentAgainstConfiguredSource: overrides.runtimeFresh ?? true,
      freshnessBasis: overrides.runtimeFresh ?? true ? 'source_hash_match' : 'unknown',
      upstreamCurrentness: 'unknown',
    },
  };
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
