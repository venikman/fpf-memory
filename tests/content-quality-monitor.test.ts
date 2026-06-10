import { describe, expect, it } from '@rstest/core';

import {
  evaluateContentQuality,
  formatContentQualityMarkdown,
  type ContentQualityCuratedDoc,
  type ContentQualityRouteProjection,
  type HostedContentStatus,
} from '../src/build/content-quality-monitor.js';
import type {
  PatternRecord,
  RouteRecord,
  Snapshot,
} from '../src/core/types.js';

describe('FPF content quality monitor', () => {
  it('passes when generated routes and curated docs resolve against the snapshot', () => {
    const report = evaluateContentQuality({
      mode: 'local',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs(),
      now: new Date('2026-05-30T16:00:00Z'),
    });

    expect(report.state).toBe('ok');
    expect(report.routeCatalog.routeIndexLinkCoveragePercent).toBe(100);
    expect(report.routeCatalog.routeContentCoveragePercent).toBe(100);
    expect(report.routeCatalog.routePatternLinkCoveragePercent).toBe(100);
    expect(report.curatedDocs.every((doc) => doc.unresolvedRouteSelectors.length === 0)).toBe(
      true,
    );
  });

  it('breaches when a curated work packet points at a stale route selector', () => {
    const report = evaluateContentQuality({
      mode: 'local',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs({
        'work-packets': 'Use route:boundary-unpacking-claim-routing.',
      }),
      now: new Date('2026-05-30T16:00:00Z'),
    });

    expect(report.state).toBe('breach');
    expect(report.curatedDocs.find((doc) => doc.label === 'work-packets')?.unresolvedRouteSelectors)
      .toEqual(['route:boundary-unpacking-claim-routing']);
    expect(report.quality.find((item) => item.characteristic === 'curated selector validity')?.status)
      .toBe('fail');
  });

  it('breaches when route catalog links or route page contents are missing', () => {
    const projection = makeRouteProjection({
      indexText: '[project](/generated/routes/route_project-alignment)',
      reviewText: 'Route route:writing-or-reviewing-patterns A.3',
    });
    const report = evaluateContentQuality({
      mode: 'local',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: projection,
      curatedDocs: makeCuratedDocs(),
      now: new Date('2026-05-30T16:00:00Z'),
    });

    expect(report.state).toBe('breach');
    expect(report.routeCatalog.missingIndexLinks).toEqual([
      '/generated/routes/route_writing-or-reviewing-patterns',
    ]);
    expect(report.routeCatalog.missingPatternLinks).toContainEqual({
      routeId: 'route:writing-or-reviewing-patterns',
      ref: 'A.3',
      expectedPath: '/generated/patterns/A.3',
    });
    expect(report.routeCatalog.routeIndexLinkCoveragePercent).toBe(50);
  });

  it('breaches live mode when hosted status or raw upstream hash diverges', () => {
    const report = evaluateContentQuality({
      mode: 'live',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs(),
      live: {
        baseUrl: 'https://fpf.sh',
        statusUrl: 'https://mcp.fpf.sh/api/fpf/status',
        hostedStatus: makeHostedStatus({ sourceHash: 'sha256:wrong' }),
        websiteManifestUrl: 'https://fpf.sh/fpf-publication-manifest.json',
        websiteManifest: makeManifest(),
        upstreamSpecUrl: 'https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md',
        upstreamSourceHash: 'sha256:wrong',
      },
      now: new Date('2026-05-30T16:00:00Z'),
    });

    expect(report.state).toBe('breach');
    expect(report.live?.statusSourceCoherent).toBe(false);
    expect(report.live?.upstreamSourceMatchesPublished).toBe(false);
    expect(report.quality.find((item) => item.characteristic === 'published source coherence')?.status)
      .toBe('fail');
  });

  it('breaches live mode when the website manifest is stale even if MCP is fresh', () => {
    const report = evaluateContentQuality({
      mode: 'live',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs(),
      live: {
        baseUrl: 'https://fpf.sh',
        statusUrl: 'https://mcp.fpf.sh/api/fpf/status',
        hostedStatus: makeHostedStatus(),
        websiteManifestUrl: 'https://fpf.sh/fpf-publication-manifest.json',
        websiteManifest: { ...makeManifest(), sourceHash: 'sha256:website-stale' },
        upstreamSpecUrl: 'https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md',
        upstreamSourceHash: SOURCE_HASH,
      },
      now: new Date('2026-05-30T16:00:00Z'),
    });

    expect(report.state).toBe('breach');
    expect(report.live?.statusSourceCoherent).toBe(true);
    expect(report.live?.websiteSourceMatchesPublished).toBe(false);
    expect(report.quality.find((item) => item.characteristic === 'published source coherence')?.status)
      .toBe('fail');
  });

  it('breaches live mode when curated route selectors differ from repo docs', () => {
    const report = evaluateContentQuality({
      mode: 'live',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs({
        'work-packets': 'Use route:project-alignment.',
      }),
      expectedCuratedDocs: makeCuratedDocs({
        'work-packets': 'Use route:writing-or-reviewing-patterns.',
      }),
      live: {
        baseUrl: 'https://fpf.sh',
        statusUrl: 'https://mcp.fpf.sh/api/fpf/status',
        hostedStatus: makeHostedStatus(),
        websiteManifestUrl: 'https://fpf.sh/fpf-publication-manifest.json',
        websiteManifest: makeManifest(),
        upstreamSpecUrl: 'https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md',
        upstreamSourceHash: SOURCE_HASH,
      },
      now: new Date('2026-05-30T16:00:00Z'),
    });

    const workPackets = report.curatedDocs.find((doc) => doc.label === 'work-packets');
    expect(report.state).toBe('breach');
    expect(workPackets?.missingExpectedRouteSelectors).toEqual([
      'route:writing-or-reviewing-patterns',
    ]);
    expect(workPackets?.unexpectedRouteSelectors).toEqual(['route:project-alignment']);
  });

  it('renders percentages and FPF QA anchors in markdown', () => {
    const report = evaluateContentQuality({
      mode: 'local',
      snapshot: makeSnapshot(),
      sourceHash: SOURCE_HASH,
      manifest: makeManifest(),
      routeProjection: makeRouteProjection(),
      curatedDocs: makeCuratedDocs(),
      now: new Date('2026-05-30T16:00:00Z'),
    });

    const markdown = formatContentQualityMarkdown(report);

    expect(markdown).toContain('100%');
    expect(markdown).toContain('A.10');
    expect(markdown).toContain('E.19');
    expect(markdown).toContain('fpf.sh keeps one monitored MCP compatibility bridge');
  });
});

const SOURCE_HASH = 'sha256:published';
const UPSTREAM_REF = '2e112078bb209e5e3a511c3bd1aa6b1b2e299efe';

function makeSnapshot(): Snapshot {
  const patterns = {
    'A.1': makePattern('A.1', 'Role and work boundary'),
    'A.2': makePattern('A.2', 'Evidence surface'),
    'A.3': makePattern('A.3', 'Review path'),
  };
  const routes = {
    'route:project-alignment': makeRoute({
      id: 'route:project-alignment',
      name: 'project alignment',
      orderedIds: ['A.1', 'A.2'],
    }),
    'route:writing-or-reviewing-patterns': makeRoute({
      id: 'route:writing-or-reviewing-patterns',
      name: 'writing or reviewing patterns',
      orderedIds: ['A.3'],
    }),
  };

  return {
    sourcePath: 'published/current/FPF-Spec.md',
    sourceHash: SOURCE_HASH,
    builtAt: '2026-05-30T16:00:00Z',
    compilerFingerprint: 'sha256:compiler',
    compilerMode: 'local_vectorless',
    indexRoots: [],
    indexMap: {},
    anchorMap: {},
    patternGraph: { nodes: patterns, relations: [] },
    routeGraph: { nodes: routes, relations: [] },
    lexicon: {},
    compiledNodes: {},
    relationGraph: [],
    indexes: {
      idIndex: {},
      titleIndex: {},
      aliasIndex: {},
      lexiconIndex: {},
      routeNameIndex: {},
      statusIndex: {},
      familyIndex: {},
    },
    validation: {
      parsedSections: 0,
      parsedPatterns: 3,
      parsedRoutes: 2,
      parsedLexiconEntries: 0,
      indexMapNodes: 0,
      missingRequiredFields: 0,
      unresolvedReferences: [],
      duplicateIds: [],
      duplicateHeadings: [],
      brokenRoutes: [],
    },
  };
}

function makePattern(id: string, title: string): PatternRecord {
  return {
    id,
    title,
    status: 'Active',
    keywords: [],
    queries: [],
    aliases: [],
    dependenciesRaw: '',
    sectionIds: [],
    relations: [],
    searchableText: `${id} ${title}`,
  };
}

function makeRoute(overrides: Partial<RouteRecord> & Pick<RouteRecord, 'id' | 'name'>): RouteRecord {
  return {
    id: overrides.id,
    name: overrides.name,
    description: `${overrides.name} route`,
    orderedIds: overrides.orderedIds ?? [],
    optionalIds: overrides.optionalIds ?? [],
    landingIds: overrides.landingIds ?? [],
    routeSurfaces: overrides.routeSurfaces ?? [],
    nextOwners: overrides.nextOwners ?? [],
    reroutes: overrides.reroutes ?? [],
    citations: overrides.citations ?? [],
    anchorIds: overrides.anchorIds ?? [],
    searchableText: overrides.searchableText ?? overrides.name,
    constraints: overrides.constraints ?? [],
    firstHonestBurden: overrides.firstHonestBurden,
  };
}

function makeRouteProjection(overrides: {
  indexText?: string;
  projectText?: string;
  reviewText?: string;
} = {}): ContentQualityRouteProjection {
  return {
    indexPath: '/generated/routes',
    indexText: overrides.indexText ?? [
      '[project](/generated/routes/route_project-alignment)',
      '[review](/generated/routes/route_writing-or-reviewing-patterns)',
    ].join('\n'),
    routePages: [
      {
        routeId: 'route:project-alignment',
        staticPath: '/generated/routes/route_project-alignment',
        text: overrides.projectText ?? [
          'Route route:project-alignment',
          'A.1 /generated/patterns/A.1',
          'A.2 /generated/patterns/A.2',
        ].join('\n'),
      },
      {
        routeId: 'route:writing-or-reviewing-patterns',
        staticPath: '/generated/routes/route_writing-or-reviewing-patterns',
        text: overrides.reviewText ?? [
          'Route route:writing-or-reviewing-patterns',
          'A.3 /generated/patterns/A.3',
        ].join('\n'),
      },
    ],
  };
}

function makeCuratedDocs(overrides: Record<string, string> = {}): ContentQualityCuratedDoc[] {
  const docs = [
    { label: 'home', path: '/', sourcePath: 'docs/index.md', text: '' },
    {
      label: 'start-here',
      path: '/start-here',
      sourcePath: 'docs/start-here.md',
      text: 'Start with route:project-alignment.',
    },
    {
      label: 'work-packets',
      path: '/work-packets',
      sourcePath: 'docs/work-packets.md',
      text: 'Use route:writing-or-reviewing-patterns and /generated/patterns/A.3.',
    },
    {
      label: 'connect-mcp',
      path: '/connect-mcp',
      sourcePath: 'docs/connect-mcp.md',
      text: 'Ask for route:project-alignment.',
    },
    {
      label: 'automation-playbook',
      path: '/automation-playbook',
      sourcePath: 'docs/automation-playbook.md',
      text: 'Keep publication evidence bounded.',
    },
  ];

  return docs.map((doc) => ({
    ...doc,
    text: overrides[doc.label] ?? doc.text,
  }));
}

function makeManifest(): {
  channel: string;
  sourceHash: string;
  upstreamRef: string;
  publishedAt: string;
  upstreamRepoUrl: string;
  upstreamCommittedAt: string;
} {
  return {
    channel: 'current',
    sourceHash: SOURCE_HASH,
    upstreamRef: UPSTREAM_REF,
    publishedAt: '2026-05-30T16:00:00Z',
    upstreamRepoUrl: 'https://github.com/ailev/FPF',
    upstreamCommittedAt: '2026-05-29T22:34:53Z',
  };
}

function makeHostedStatus(overrides: { sourceHash?: string } = {}): HostedContentStatus {
  const sourceHash = overrides.sourceHash ?? SOURCE_HASH;
  return {
    status: 'ok',
    servedAt: '2026-05-30T16:00:00Z',
    publication: {
      upstreamRef: UPSTREAM_REF,
      publishedAt: '2026-05-30T16:00:00Z',
      sourceHash,
    },
    runtime: {
      sourceHash,
      snapshotSourceHash: sourceHash,
      currentSourceHash: sourceHash,
      snapshotExists: true,
      snapshotConsistent: true,
      artifactSourceMatchesConfiguredSource: true,
    },
    freshness: {
      publicationCurrentAgainstConfiguredSource: true,
      freshnessBasis: 'source_hash_match',
      upstreamCurrentness: 'unknown',
    },
  };
}
