import { describe, expect, it } from '@rstest/core';

import {
  buildWeeklyMetricsReport,
  formatWeeklyMetricsMarkdown,
  interpretTokenMetadataResponse,
  interpretWebAnalyticsResponse,
  isoWeekId,
  resolveReviewWeekId,
  summarizeDeployments,
  summarizeGitActivity,
  tokenLedgerEntryError,
  unavailableFreshnessSection,
  webAnalyticsSectionError,
  withPreviousWindow,
  type WeeklyFreshnessSection,
} from '../src/build/weekly-metrics.js';

const NOW = new Date('2026-08-07T06:00:00.000Z');

describe('iso week identity', () => {
  it('computes ISO week ids across ordinary and year-boundary dates', () => {
    expect(isoWeekId(new Date('2026-08-07T12:00:00Z'))).toBe('2026-W32');
    expect(isoWeekId(new Date('2026-01-01T00:00:00Z'))).toBe('2026-W01');
    expect(isoWeekId(new Date('2025-12-29T00:00:00Z'))).toBe('2026-W01');
    expect(isoWeekId(new Date('2027-01-01T00:00:00Z'))).toBe('2026-W53');
  });

  it('derives the review week from the window midpoint, not the run date', () => {
    // Monday-morning cron: the trailing 7 days sit almost entirely in W32
    // even though the run itself happens in W33.
    expect(
      resolveReviewWeekId({
        start: '2026-08-03T06:00:00.000Z',
        end: '2026-08-10T06:00:00.000Z',
      }),
    ).toBe('2026-W32');
  });
});

describe('git activity summary', () => {
  it('separates sync publications from other commits', () => {
    const section = summarizeGitActivity([
      '642751dabc\t2026-08-04T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (7ba40a95 · 2026-08-04) (#271)',
      '0366b2dabc\t2026-08-03T08:00:00+00:00\tdocs: record About count drift; un-flake publish-current timeouts (#267)',
      '',
      'not-a-valid-line',
    ]);
    expect(section.state).toBe('ok');
    expect(section.totalCommits).toBe(2);
    expect(section.syncCommits).toBe(1);
    expect(section.otherCommits).toBe(1);
    expect(section.commits[0]).toEqual({
      hash: '642751da',
      date: '2026-08-04T09:00:00+00:00',
      subject: 'publish: sync FPF spec from ailev/FPF (7ba40a95 · 2026-08-04) (#271)',
      kind: 'sync',
    });
  });
});

describe('deployments summary', () => {
  it('reads the flat REST /v6/deployments shape', () => {
    const section = summarizeDeployments('fpf-sh', {
      pagination: { count: 3 },
      deployments: [
        { state: 'READY', target: 'production', created: 1785747843811 },
        { state: 'READY', target: null, created: 1785746904775 },
        { state: 'ERROR', target: 'production', created: 1785656711078 },
      ],
    });
    expect(section.state).toBe('ok');
    expect(section.total).toBe(3);
    expect(section.production).toBe(2);
    expect(section.preview).toBe(1);
    expect(section.errored).toBe(1);
    expect(section.latestProductionAt).toBe(new Date(1785747843811).toISOString());
  });

  it('reads the nested deployments wrapper shape', () => {
    const section = summarizeDeployments('fpf-reference-mcp', {
      deployments: {
        pagination: { count: 1 },
        deployments: [{ state: 'READY', target: 'production', created: 1785747884151 }],
      },
    });
    expect(section.state).toBe('ok');
    expect(section.total).toBe(1);
    expect(section.production).toBe(1);
  });

  it('reports an error state for unrecognizable payloads', () => {
    const section = summarizeDeployments('fpf-sh', { unexpected: true });
    expect(section.state).toBe('error');
    expect(section.detail).toContain('no recognizable deployments array');
  });
});

describe('web analytics interpretation', () => {
  it('maps the real not-enabled 404 body to not_enabled', () => {
    const section = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 404,
      bodyText: '{"error":{"code":"not_found","message":"Web Analytics not found."}}',
    });
    expect(section.state).toBe('not_enabled');
  });

  it('extracts visitors and pageviews from flat and data-wrapped bodies', () => {
    expect(
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 200,
        bodyText: '{"visitors": 42, "pageviews": 128}',
      }),
    ).toMatchObject({ state: 'ok', current: { visitors: 42, pageviews: 128 } });
    expect(
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 200,
        bodyText: '{"data": [{"visitors": 7, "pageviews": 9}]}',
      }),
    ).toMatchObject({ state: 'ok', current: { visitors: 7, pageviews: 9 } });
  });

  it('flags partial counter responses instead of passing them as complete', () => {
    const partial = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 200,
      bodyText: '{"visitors": 42}',
    });
    expect(partial.state).toBe('ok');
    expect(partial.current).toEqual({ visitors: 42 });
    expect(partial.detail).toContain('missing the pageviews counter');

    const report = buildWeeklyMetricsReport({
      now: NOW,
      window: {
        label: '7d',
        start: '2026-07-31T06:00:00.000Z',
        end: '2026-08-07T06:00:00.000Z',
      },
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
      webAnalytics: [partial],
    });
    expect(report.findings.join('\n')).toContain('partial counters');
  });

  it('renders week-over-week delta columns when both windows have counts', () => {
    const section = withPreviousWindow(
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 200,
        bodyText: '{"visitors": 42, "pageviews": 128}',
      }),
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 200,
        bodyText: '{"visitors": 30, "pageviews": 90}',
      }),
    );
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window: {
        label: '7d',
        start: '2026-07-31T06:00:00.000Z',
        end: '2026-08-07T06:00:00.000Z',
      },
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
      webAnalytics: [section],
    });
    const markdown = formatWeeklyMetricsMarkdown(report);
    expect(markdown).toContain('Δ week-over-week');
    expect(markdown).toContain('+12 (+40%) / +38 (+42.2%)');
  });

  it('marks unrecognized 200 bodies as unparsed instead of guessing', () => {
    const section = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 200,
      bodyText: '{"shape": "unexpected"}',
    });
    expect(section.state).toBe('unparsed');
    expect(section.detail).toContain('unexpected');
  });

  it('maps auth failures to config_error', () => {
    const section = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 403,
      bodyText: '{"error":{"code":"forbidden"}}',
    });
    expect(section.state).toBe('config_error');
  });

  it('attaches previous-window counts, and surfaces a failed previous query', () => {
    const current = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 200,
      bodyText: '{"visitors": 42, "pageviews": 128}',
    });
    const previousOk = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 200,
      bodyText: '{"visitors": 30, "pageviews": 90}',
    });
    expect(withPreviousWindow(current, previousOk)).toMatchObject({
      state: 'ok',
      current: { visitors: 42, pageviews: 128 },
      previous: { visitors: 30, pageviews: 90 },
    });

    const previousFailed = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 500,
      bodyText: '{"error":{"code":"internal_error"}}',
    });
    const degraded = withPreviousWindow(current, previousFailed);
    expect(degraded.state).toBe('ok');
    expect(degraded.previous).toEqual({});
    expect(degraded.detail).toContain('Week-over-week comparison unavailable');
    expect(degraded.detail).toContain('error');
  });
});

describe('token ledger interpretation', () => {
  const tokenBody = (expiresAt?: number) => JSON.stringify({
    token: {
      id: 'abc123',
      name: 'fpf spend monitor',
      type: 'token',
      activeAt: 1756400000000,
      createdAt: 1740000000000,
      ...(expiresAt === undefined ? {} : { expiresAt }),
    },
  });

  it('reports ok with days left for a token expiring beyond the horizon', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_SPEND_MONITOR_TOKEN',
      status: 200,
      bodyText: tokenBody(NOW.getTime() + 200 * 86_400_000),
      now: NOW,
    });
    expect(entry).toMatchObject({
      state: 'ok',
      tokenName: 'fpf spend monitor',
      daysLeft: 200,
    });
  });

  it('flags a token inside the 30-day warning window', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_TOKEN',
      status: 200,
      bodyText: tokenBody(NOW.getTime() + 12 * 86_400_000),
      now: NOW,
    });
    expect(entry.state).toBe('expiring_soon');
    expect(entry.daysLeft).toBe(12);
  });

  it('reports never-expiring tokens as ok with a null expiry', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_TOKEN',
      status: 200,
      bodyText: tokenBody(),
      now: NOW,
    });
    expect(entry.state).toBe('ok');
    expect(entry.expiresAt).toBeNull();
  });

  it('marks a past expiry as expired even when metadata still answers', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_TOKEN',
      status: 200,
      bodyText: tokenBody(NOW.getTime() - 86_400_000),
      now: NOW,
    });
    expect(entry.state).toBe('expired');
  });

  it('maps a rejected probe to invalid — the loudest verdict, not an error', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_TOKEN',
      status: 401,
      bodyText: '{"error":{"code":"forbidden"}}',
      now: NOW,
    });
    expect(entry.state).toBe('invalid');
    expect(entry.detail).toContain('expired or revoked');
  });

  it('marks unrecognized 200 bodies as error instead of guessing', () => {
    const entry = interpretTokenMetadataResponse({
      secret: 'VERCEL_TOKEN',
      status: 200,
      bodyText: '{"shape":"unexpected"}',
      now: NOW,
    });
    expect(entry.state).toBe('error');
  });

  it('promotes dead, expiring, and missing tokens to findings and renders the section', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window: {
        label: '7d',
        start: '2026-07-31T06:00:00.000Z',
        end: '2026-08-07T06:00:00.000Z',
      },
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
      webAnalytics: [],
      tokenLedger: [
        interpretTokenMetadataResponse({
          secret: 'VERCEL_SPEND_MONITOR_TOKEN',
          status: 200,
          bodyText: tokenBody(NOW.getTime() + 200 * 86_400_000),
          now: NOW,
        }),
        interpretTokenMetadataResponse({
          secret: 'VERCEL_TOKEN',
          status: 401,
          bodyText: '{"error":{"code":"forbidden"}}',
          now: NOW,
        }),
        interpretTokenMetadataResponse({
          secret: 'FPF_USAGE_REPORT_VERCEL_TOKEN',
          status: 200,
          bodyText: tokenBody(NOW.getTime() + 5 * 86_400_000),
          now: NOW,
        }),
        tokenLedgerEntryError('VERCEL_GHOST_TOKEN', 'not_configured', 'FPF_TOKEN_LEDGER_VERCEL_GHOST_TOKEN was empty — the repo secret is missing or the workflow stopped passing it.'),
      ],
    });

    expect(report.operatorActionRequired).toBe(true);
    const findings = report.findings.join('\n');
    expect(findings).toContain('Vercel token VERCEL_TOKEN is dead (invalid)');
    expect(findings).toContain('Vercel token FPF_USAGE_REPORT_VERCEL_TOKEN expires in 5 days');
    expect(findings).toContain('Repo secret VERCEL_GHOST_TOKEN is not configured');
    expect(findings).not.toContain('VERCEL_SPEND_MONITOR_TOKEN');
    expect(report.summary).toContain('tokens 1/4 ok');

    const markdown = formatWeeklyMetricsMarkdown(report);
    expect(markdown).toContain('## Vercel token ledger');
    expect(markdown).toContain('| VERCEL_SPEND_MONITOR_TOKEN | ok | fpf spend monitor |');
    expect(markdown).toContain('| VERCEL_TOKEN | invalid |');
    expect(markdown).toContain('`GET /v5/user/tokens/current`');
  });

  it('omits the ledger section and caveat entirely when no probe was requested', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window: {
        label: '7d',
        start: '2026-07-31T06:00:00.000Z',
        end: '2026-08-07T06:00:00.000Z',
      },
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
      webAnalytics: [],
    });
    expect(report.findings).toHaveLength(0);
    const markdown = formatWeeklyMetricsMarkdown(report);
    expect(markdown).not.toContain('## Vercel token ledger');
    expect(markdown).not.toContain('tokens/current');
  });
});

describe('weekly metrics report', () => {
  const window = {
    label: '7d',
    start: '2026-07-31T06:00:00.000Z',
    end: '2026-08-07T06:00:00.000Z',
  };
  const breachedFreshness: WeeklyFreshnessSection = {
    state: 'breach',
    summary: 'published 9dd92159 has been behind for 94.6h (SLO 26h)',
    driftHours: 94.6,
    maxDriftHours: 26,
    publishedUpstreamRef: '9dd9215969126625d449a40e8ca4d1df9ac903f8',
    publishedUpstreamDate: '2026-08-03T07:24:46Z',
    evidenceUrl: 'https://github.com/ailev/FPF/compare/9dd92159...HEAD',
  };

  it('collects findings for breach, missing syncs, and disabled analytics', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window,
      freshness: breachedFreshness,
      git: summarizeGitActivity([]),
      deployments: [
        summarizeDeployments('fpf-sh', {
          deployments: [{ state: 'ERROR', target: 'production', created: 1785747843811 }],
        }),
      ],
      webAnalytics: [
        interpretWebAnalyticsResponse({
          project: 'fpf-sh',
          status: 404,
          bodyText: '{"error":{"code":"not_found"}}',
        }),
      ],
    });

    expect(report.operatorActionRequired).toBe(true);
    expect(report.window.reviewWeekId).toBe('2026-W32');
    expect(report.findings).toHaveLength(4);
    expect(report.findings.join('\n')).toContain('freshness is breached');
    expect(report.findings.join('\n')).toContain('No sync publications');
    expect(report.findings.join('\n')).toContain('errored/canceled deployment');
    expect(report.findings.join('\n')).toContain('Web Analytics is not enabled for fpf-sh');
  });

  it('does not flag zero syncs on a quiet upstream week with freshness ok', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window,
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tdocs: tidy the playbook (#9)',
      ]),
      deployments: [],
      webAnalytics: [],
    });
    expect(report.findings).toHaveLength(0);
    expect(report.operatorActionRequired).toBe(false);
  });

  it('folds the usage-sample verdict into the top-level findings', () => {
    const base = {
      now: NOW,
      window,
      freshness: { state: 'ok', summary: 'published matches upstream head' } as WeeklyFreshnessSection,
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
      webAnalytics: [],
    };

    const broken = buildWeeklyMetricsReport({
      ...base,
      usageSample: { state: 'absent', operatorActionRequired: true, summary: 'usage report produced no outputs' },
    });
    expect(broken.findings.join('\n')).toContain('usage telemetry sample did not run cleanly (absent)');
    expect(broken.operatorActionRequired).toBe(true);
    expect(formatWeeklyMetricsMarkdown(broken)).toContain('## MCP usage telemetry sample');

    const breaching = buildWeeklyMetricsReport({
      ...base,
      usageSample: { state: 'ok', operatorActionRequired: true, summary: 'ask_fpf error rate is 40%' },
    });
    expect(breaching.findings.join('\n')).toContain('requires operator action: ask_fpf error rate is 40%');

    const clean = buildWeeklyMetricsReport({
      ...base,
      usageSample: { state: 'ok', operatorActionRequired: false, summary: '12 valid events' },
    });
    expect(clean.findings).toHaveLength(0);
  });

  it('promotes lower-bound evidence (capped pagination, capped export) to findings', () => {
    const base = {
      now: NOW,
      window,
      freshness: { state: 'ok', summary: 'published matches upstream head' } as WeeklyFreshnessSection,
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      webAnalytics: [],
    };

    const truncatedSection = summarizeDeployments('fpf-sh', {
      deployments: [{ state: 'READY', target: 'production', created: 1785747843811 }],
    });
    truncatedSection.truncated = true;
    truncatedSection.detail = 'Pagination stopped after 5 pages; counts are lower bounds for this window.';
    const truncatedReport = buildWeeklyMetricsReport({ ...base, deployments: [truncatedSection] });
    expect(truncatedReport.findings.join('\n')).toContain('Deployment counts for fpf-sh are lower bounds');

    const cappedReport = buildWeeklyMetricsReport({
      ...base,
      deployments: [],
      usageSample: { state: 'ok', operatorActionRequired: false, exportCapped: true },
    });
    expect(cappedReport.findings.join('\n')).toContain('usage counts are lower bounds');
    expect(formatWeeklyMetricsMarkdown(cappedReport)).toContain('Export capped: yes');
  });

  it('reports ok with no findings on a healthy week', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window,
      freshness: { state: 'ok', summary: 'published matches upstream head' },
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [
        summarizeDeployments('fpf-sh', {
          deployments: [{ state: 'READY', target: 'production', created: 1785747843811 }],
        }),
      ],
      webAnalytics: [
        withPreviousWindow(
          interpretWebAnalyticsResponse({
            project: 'fpf-sh',
            status: 200,
            bodyText: '{"visitors": 10, "pageviews": 25}',
          }),
          interpretWebAnalyticsResponse({
            project: 'fpf-sh',
            status: 200,
            bodyText: '{"visitors": 8, "pageviews": 20}',
          }),
        ),
      ],
    });

    expect(report.operatorActionRequired).toBe(false);
    expect(report.findings).toHaveLength(0);
    expect(report.summary).toContain('freshness ok');
    expect(report.summary).toContain('no findings');
  });

  it('promotes incomplete week-over-week evidence to a finding', () => {
    const base = {
      now: NOW,
      window,
      freshness: { state: 'ok', summary: 'published matches upstream head' } as WeeklyFreshnessSection,
      git: summarizeGitActivity([
        'abcdef1234\t2026-08-01T09:00:00+00:00\tpublish: sync FPF spec from ailev/FPF (aaaa · 2026-08-01) (#1)',
      ]),
      deployments: [],
    };
    const current = interpretWebAnalyticsResponse({
      project: 'fpf-sh',
      status: 200,
      bodyText: '{"visitors": 10, "pageviews": 25}',
    });

    const partialPrevious = withPreviousWindow(
      current,
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 200,
        bodyText: '{"visitors": 8}',
      }),
    );
    expect(partialPrevious.detail).toContain('Previous window:');
    const partialReport = buildWeeklyMetricsReport({ ...base, webAnalytics: [partialPrevious] });
    expect(partialReport.findings.join('\n')).toContain('Week-over-week evidence for fpf-sh is incomplete');

    const failedPrevious = withPreviousWindow(
      current,
      interpretWebAnalyticsResponse({
        project: 'fpf-sh',
        status: 500,
        bodyText: '{"error":{"code":"internal_error"}}',
      }),
    );
    const failedReport = buildWeeklyMetricsReport({ ...base, webAnalytics: [failedPrevious] });
    expect(failedReport.findings.join('\n')).toContain('Week-over-week evidence for fpf-sh is incomplete');
  });

  it('renders markdown with every section and degrades gracefully', () => {
    const report = buildWeeklyMetricsReport({
      now: NOW,
      window,
      freshness: unavailableFreshnessSection('status endpoint timed out'),
      git: summarizeGitActivity([]),
      deployments: [],
      webAnalytics: [
        webAnalyticsSectionError('fpf-sh', 'config_error', 'Missing Vercel token.'),
      ],
    });
    const markdown = formatWeeklyMetricsMarkdown(report);

    expect(markdown).toContain('# Weekly Metrics Review 2026-W32');
    expect(markdown).toContain('State: **attention**');
    expect(markdown).toContain('## Publication freshness (mcp.fpf.sh)');
    expect(markdown).toContain('status endpoint timed out');
    expect(markdown).toContain('_No commits in this window._');
    expect(markdown).toContain('| fpf-sh | config_error |');
    expect(markdown).toContain('## Caveats');
  });
});
