import { describe, expect, it } from '@rstest/core';

import {
  evaluateFpfSyncMonitor,
  formatSyncMonitorMarkdown,
  runFpfSyncMonitor,
  type HostedSyncStatus,
  type UpstreamCommitStatus,
} from '../src/build/sync-monitor.js';

describe('FPF sync monitor', () => {
  it('passes when fpf.sh is fresh and published from upstream HEAD', () => {
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
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-30T08:00:00Z',
      }),
      hosted: makeHosted({ upstreamRef: SHA_PUBLISHED }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('pending_sync');
    expect(report.ok).toBe(true);
    expect(report.needsSync).toBe(true);
    expect(report.driftHours).toBe(4);
    expect(report.quality.find((item) => item.characteristic === 'freshness')?.status).toBe(
      'pending',
    );
  });

  it('breaches when upstream drift exceeds the SLO', () => {
    const report = evaluateFpfSyncMonitor({
      upstream: makeUpstream({
        sha: SHA_CURRENT,
        committedAt: '2026-05-29T20:00:00Z',
      }),
      hosted: makeHosted({ upstreamRef: SHA_PUBLISHED }),
      now: new Date('2026-05-30T12:00:00Z'),
      maxDriftHours: 10,
    });

    expect(report.state).toBe('breach');
    expect(report.breached).toBe(true);
    expect(report.needsSync).toBe(true);
    expect(report.summary).toContain('exceeding the 10h sync SLO');
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
      'User-Agent': 'fpf-memory-sync-monitor',
    });
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
      fresh: overrides.runtimeFresh ?? true,
    },
  };
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
