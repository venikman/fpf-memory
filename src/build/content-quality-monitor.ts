import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildDocsProjection,
  type PublicationManifestSummary,
} from '../core/documents.js';
import { WEBSITE_PUBLICATION_MANIFEST_PATH } from '../core/constants.js';
import type {
  RouteRecord,
  Snapshot,
} from '../core/types.js';
import {
  buildUpstreamSpecUrl,
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REPO,
} from './upstream-source.js';
import {
  validatePublishedSurface,
  type PublishCurrentManifest,
} from './published-surface.js';

export const DEFAULT_CONTENT_QUALITY_BASE_URL = 'https://fpf.sh';
export const DEFAULT_CONTENT_QUALITY_STATUS_URL = 'https://mcp.fpf.sh/api/fpf/status';

export const CONTENT_QUALITY_CURATED_DOCS = [
  { label: 'home', path: '/', sourcePath: 'docs/index.md' },
  { label: 'start-here', path: '/start-here', sourcePath: 'docs/start-here.md' },
  { label: 'work-packets', path: '/work-packets', sourcePath: 'docs/work-packets.md' },
  { label: 'connect-local', path: '/connect-local', sourcePath: 'docs/connect-local.md' },
  { label: 'connect-mcp', path: '/connect-mcp', sourcePath: 'docs/connect-mcp.md' },
  { label: 'mcp-recipes', path: '/mcp-recipes', sourcePath: 'docs/mcp-recipes.md' },
  {
    label: 'automation-playbook',
    path: '/automation-playbook',
    sourcePath: 'docs/automation-playbook.md',
  },
  {
    label: 'vercel-mcp-packaging',
    path: '/vercel-mcp-packaging',
    sourcePath: 'docs/vercel-mcp-packaging.md',
  },
  {
    label: 'fpf-reference-mcp-rename',
    path: '/fpf-reference-mcp-rename',
    sourcePath: 'docs/fpf-reference-mcp-rename.md',
  },
] as const;

export const CONTENT_QUALITY_QA_ANCHORS = [
  {
    id: 'A.10',
    title: 'Evidence Graph Referring',
    use: 'Compare route IDs, page URLs, hashes, and status payloads as explicit evidence.',
  },
  {
    id: 'B.3',
    title: 'Trust & Assurance Calculus',
    use: 'Treat content coherence as a publication assurance gate, not a visual preference.',
  },
  {
    id: 'E.19',
    title: 'Pattern Quality Gates',
    use: 'Fail when generated or curated pages point at stale FPF IDs.',
  },
  {
    id: 'E.21',
    title: 'FPF Pattern Quality Characteristic Space',
    use: 'Track coverage, selector validity, and source coherence separately.',
  },
  {
    id: 'G.6',
    title: 'Evidence Graph & Provenance Ledger',
    use: 'Emit machine-readable percentages and provenance for monitors and CI.',
  },
] as const;

export type ContentQualityMode = 'local' | 'live';
export type ContentQualityState = 'ok' | 'breach';

export interface ContentQualityMonitorConfig {
  mode?: ContentQualityMode;
  baseUrl?: string;
  statusUrl?: string;
  cwd?: string;
  now?: Date;
  fetchImpl?: typeof fetch;
}

export interface ContentQualityRouteProjection {
  indexPath: string;
  indexText: string;
  routePages: ContentQualityRoutePage[];
}

export interface ContentQualityRoutePage {
  routeId: string;
  staticPath: string;
  text: string;
}

export interface ContentQualityCuratedDoc {
  label: string;
  path: string;
  sourcePath?: string;
  text: string;
}

export interface HostedContentStatus {
  status: string;
  servedAt?: string;
  publication: {
    upstreamRef: string;
    publishedAt: string;
    sourceHash: string;
    compilerFingerprint?: string;
    specBytes?: number;
  };
  runtime: {
    sourceHash: string;
    snapshotSourceHash: string;
    currentSourceHash: string;
    builtAt?: string;
    snapshotExists: boolean;
    fresh?: boolean;
    snapshotConsistent?: boolean;
    artifactSourceMatchesConfiguredSource?: boolean;
  };
  freshness?: {
    publicationCurrentAgainstConfiguredSource: boolean;
    freshnessBasis: string;
    upstreamCurrentness: 'unknown';
  };
}

export interface ContentQualityEvaluationInput {
  mode: ContentQualityMode;
  snapshot: Snapshot;
  sourceHash: string;
  manifest?: PublicationManifestSummary;
  routeProjection: ContentQualityRouteProjection;
  curatedDocs: ContentQualityCuratedDoc[];
  expectedCuratedDocs?: ContentQualityCuratedDoc[];
  live?: ContentQualityLiveEvidence;
  now?: Date;
}

export interface ContentQualityLiveEvidence {
  baseUrl: string;
  statusUrl: string;
  hostedStatus: HostedContentStatus;
  websiteManifestUrl: string;
  websiteManifest: PublicationManifestSummary;
  upstreamSpecUrl: string;
  upstreamSourceHash: string;
}

export interface ContentQualityReport {
  state: ContentQualityState;
  ok: boolean;
  breached: boolean;
  mode: ContentQualityMode;
  generatedAt: string;
  sourceHash: string;
  upstreamRef?: string;
  routeCatalog: RouteCatalogQualityReport;
  curatedDocs: CuratedDocQualityReport[];
  live?: ContentQualityLiveReport;
  quality: ContentQualityCheck[];
  fpfAnchors: typeof CONTENT_QUALITY_QA_ANCHORS;
  summary: string;
}

export interface RouteCatalogQualityReport {
  expectedRoutes: number;
  routeIndexLinksFound: number;
  routePagesFound: number;
  routeContentRefsFound: number;
  routeContentRefsExpected: number;
  routePatternLinksFound: number;
  routePatternLinksExpected: number;
  routeIndexLinkCoveragePercent: number;
  routePageCoveragePercent: number;
  routeContentCoveragePercent: number;
  routePatternLinkCoveragePercent: number;
  missingIndexLinks: string[];
  missingRoutePages: string[];
  missingContentRefs: MissingRouteRef[];
  missingPatternLinks: MissingRouteRef[];
}

export interface MissingRouteRef {
  routeId: string;
  ref: string;
  expectedPath?: string;
}

export interface CuratedDocQualityReport {
  label: string;
  path: string;
  sourcePath?: string;
  routeSelectors: string[];
  unresolvedRouteSelectors: string[];
  patternLinks: string[];
  unresolvedPatternLinks: string[];
  expectedRouteSelectors?: string[];
  missingExpectedRouteSelectors: string[];
  unexpectedRouteSelectors: string[];
  routeSelectorCoveragePercent: number;
  patternLinkCoveragePercent: number;
}

export interface ContentQualityLiveReport {
  baseUrl: string;
  statusUrl: string;
  websiteManifestUrl: string;
  upstreamSpecUrl: string;
  upstreamSourceHash: string;
  statusSourceCoherent: boolean;
  websiteSourceMatchesPublished: boolean;
  upstreamSourceMatchesPublished: boolean;
  runtimeFresh: boolean;
  publishedRefMatchesManifest: boolean;
  websitePublishedRefMatchesManifest: boolean;
  hostedPublishedRef?: string;
  websitePublishedRef?: string;
  manifestUpstreamRef?: string;
}

export interface ContentQualityCheck {
  characteristic: string;
  status: 'pass' | 'fail';
  evidence: string;
  fpf: string[];
}

interface RouteExpectation {
  route: RouteRecord;
  staticPath: string;
  contentRefs: string[];
  patternLinkRefs: string[];
}

export async function runContentQualityMonitor(
  config: ContentQualityMonitorConfig = {},
): Promise<ContentQualityReport> {
  const cwd = resolve(config.cwd ?? process.cwd());
  const mode = config.mode ?? 'local';
  const fetchImpl = config.fetchImpl ?? fetch;
  const surface = await validatePublishedSurface({ cwd });
  const snapshot = await readPublishedSnapshot(surface.paths.publishedSnapshotPath);
  const manifest = surface.manifest;
  const routeProjection =
    mode === 'live'
      ? await fetchLiveRouteProjection(snapshot, config.baseUrl ?? DEFAULT_CONTENT_QUALITY_BASE_URL, fetchImpl)
      : buildLocalRouteProjection(snapshot, manifest);
  const localCuratedDocs = await readLocalCuratedDocs(cwd, snapshot, manifest);
  const curatedDocs =
    mode === 'live'
      ? await fetchLiveCuratedDocs(config.baseUrl ?? DEFAULT_CONTENT_QUALITY_BASE_URL, fetchImpl)
      : localCuratedDocs;
  const live =
    mode === 'live'
      ? await fetchLiveEvidence({
        baseUrl: config.baseUrl ?? DEFAULT_CONTENT_QUALITY_BASE_URL,
        statusUrl: config.statusUrl ?? DEFAULT_CONTENT_QUALITY_STATUS_URL,
        fetchImpl,
        manifest,
      })
      : undefined;

  return evaluateContentQuality({
    mode,
    snapshot,
    sourceHash: surface.sourceHash,
    manifest,
    routeProjection,
    curatedDocs,
    expectedCuratedDocs: mode === 'live' ? localCuratedDocs : undefined,
    live,
    now: config.now ?? new Date(),
  });
}

export function evaluateContentQuality(
  input: ContentQualityEvaluationInput,
): ContentQualityReport {
  const routeCatalog = evaluateRouteCatalog(input.snapshot, input.routeProjection);
  const expectedCuratedDocs = new Map(
    (input.expectedCuratedDocs ?? []).map((doc) => [doc.label, doc]),
  );
  const curatedDocs = input.curatedDocs.map((doc) =>
    evaluateCuratedDoc(input.snapshot, doc, expectedCuratedDocs.get(doc.label)),
  );
  const live = input.live
    ? evaluateLiveEvidence(input.sourceHash, input.manifest, input.live)
    : undefined;

  const staleCuratedRefs = curatedDocs.flatMap((doc) => [
    ...doc.unresolvedRouteSelectors.map((selector) => `${doc.label}:${selector}`),
    ...doc.unresolvedPatternLinks.map((selector) => `${doc.label}:${selector}`),
  ]);
  const driftedCuratedRefs = curatedDocs.flatMap((doc) => [
    ...doc.missingExpectedRouteSelectors.map((selector) => `${doc.label}:missing:${selector}`),
    ...doc.unexpectedRouteSelectors.map((selector) => `${doc.label}:unexpected:${selector}`),
  ]);
  const routeCatalogPass =
    routeCatalog.routeIndexLinkCoveragePercent === 100
    && routeCatalog.routePageCoveragePercent === 100
    && routeCatalog.routeContentCoveragePercent === 100
    && routeCatalog.routePatternLinkCoveragePercent === 100;
  const curatedPass = staleCuratedRefs.length === 0 && driftedCuratedRefs.length === 0;
  const livePass = live
    ? live.statusSourceCoherent
      && live.websiteSourceMatchesPublished
      && live.upstreamSourceMatchesPublished
      && live.runtimeFresh
      && live.publishedRefMatchesManifest
      && live.websitePublishedRefMatchesManifest
    : true;
  const monitoredMcpDocs = new Set(curatedDocs.map((doc) => doc.label));
  const mcpPagesPresent = [
    'connect-local',
    'connect-mcp',
    'mcp-recipes',
    'automation-playbook',
    'fpf-reference-mcp-rename',
  ]
    .every((label) => monitoredMcpDocs.has(label));

  const quality: ContentQualityCheck[] = [
    {
      characteristic: 'generated route coverage',
      status: routeCatalogPass ? 'pass' : 'fail',
      evidence:
        `index ${formatPercent(routeCatalog.routeIndexLinkCoveragePercent)}, pages ${formatPercent(routeCatalog.routePageCoveragePercent)}, content refs ${formatPercent(routeCatalog.routeContentCoveragePercent)}, pattern links ${formatPercent(routeCatalog.routePatternLinkCoveragePercent)}`,
      fpf: ['A.10', 'E.19', 'E.21'],
    },
    {
      characteristic: 'curated selector validity',
      status: curatedPass ? 'pass' : 'fail',
      evidence: curatedPass
        ? `${curatedDocs.length} curated pages have no stale route selectors, pattern links, or live selector drift`
        : `stale curated refs: ${[...staleCuratedRefs, ...driftedCuratedRefs].slice(0, 10).join(', ')}`,
      fpf: ['A.10', 'E.19'],
    },
    {
      characteristic: 'published source coherence',
      status: livePass ? 'pass' : 'fail',
      evidence: live
        ? `mcp source coherent=${String(live.statusSourceCoherent)}, website manifest matches=${String(live.websiteSourceMatchesPublished)}, raw upstream matches=${String(live.upstreamSourceMatchesPublished)}, runtime snapshot consistent=${String(live.runtimeFresh)}`
        : `local published source hash ${input.sourceHash}`,
      fpf: ['B.3', 'G.6'],
    },
    {
      characteristic: 'MCP context boundary',
      status: mcpPagesPresent ? 'pass' : 'fail',
      evidence: mcpPagesPresent
        ? 'MCP pages are monitored as curated docs; agents only need failing snippets/provenance, not whole MCP pages as default context'
        : 'one or more MCP curated docs are absent from the monitor input',
      fpf: ['B.3', 'E.21'],
    },
  ];

  const breached = quality.some((item) => item.status === 'fail');
  const state: ContentQualityState = breached ? 'breach' : 'ok';

  return {
    state,
    ok: !breached,
    breached,
    mode: input.mode,
    generatedAt: (input.now ?? new Date()).toISOString(),
    sourceHash: input.sourceHash,
    upstreamRef: input.manifest?.upstreamRef,
    routeCatalog,
    curatedDocs,
    live,
    quality,
    fpfAnchors: CONTENT_QUALITY_QA_ANCHORS,
    summary: summarizeContentQuality(
      state,
      routeCatalog,
      [...staleCuratedRefs, ...driftedCuratedRefs],
      live,
    ),
  };
}

export function formatContentQualityMarkdown(report: ContentQualityReport): string {
  const qualityRows = report.quality
    .map((item) =>
      `| ${item.characteristic} | ${item.status} | ${escapeTableCell(item.evidence)} | ${item.fpf.join(', ')} |`,
    )
    .join('\n');
  const curatedRows = report.curatedDocs
    .map((doc) =>
      `| ${doc.label} | ${doc.path} | ${doc.routeSelectors.length} | ${doc.unresolvedRouteSelectors.length} | ${doc.missingExpectedRouteSelectors.length} | ${doc.unexpectedRouteSelectors.length} | ${doc.patternLinks.length} | ${doc.unresolvedPatternLinks.length} |`,
    )
    .join('\n');
  const anchorRows = report.fpfAnchors
    .map((anchor) => `- ${anchor.id} ${anchor.title}: ${anchor.use}`)
    .join('\n');
  const liveBlock = report.live
    ? `\n## Live Provenance\n\n- Base URL: ${report.live.baseUrl}\n- Website manifest URL: ${report.live.websiteManifestUrl}\n- Status URL: ${report.live.statusUrl}\n- Website upstream ref: ${report.live.websitePublishedRef ?? 'unknown'}\n- Hosted upstream ref: ${report.live.hostedPublishedRef ?? 'unknown'}\n- Manifest upstream ref: ${report.live.manifestUpstreamRef ?? 'unknown'}\n- Raw upstream spec: ${report.live.upstreamSpecUrl}\n- Raw upstream hash: ${report.live.upstreamSourceHash}\n`
    : '';

  return `# FPF Content Quality Monitor

State: **${report.state}**

${report.summary}

| Characteristic | Status | Evidence | FPF anchors |
| --- | --- | --- | --- |
${qualityRows}

## Route Coverage

- Expected routes: ${report.routeCatalog.expectedRoutes}
- Index links: ${report.routeCatalog.routeIndexLinksFound}/${report.routeCatalog.expectedRoutes} (${formatPercent(report.routeCatalog.routeIndexLinkCoveragePercent)})
- Route pages: ${report.routeCatalog.routePagesFound}/${report.routeCatalog.expectedRoutes} (${formatPercent(report.routeCatalog.routePageCoveragePercent)})
- Route content refs: ${report.routeCatalog.routeContentRefsFound}/${report.routeCatalog.routeContentRefsExpected} (${formatPercent(report.routeCatalog.routeContentCoveragePercent)})
- Route pattern links: ${report.routeCatalog.routePatternLinksFound}/${report.routeCatalog.routePatternLinksExpected} (${formatPercent(report.routeCatalog.routePatternLinkCoveragePercent)})

## Curated Pages

| Page | URL | Route selectors | Unresolved routes | Missing expected routes | Unexpected routes | Pattern links | Unresolved patterns |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
${curatedRows}
${liveBlock}
## Strategy Anchors

${anchorRows}
`;
}

function evaluateRouteCatalog(
  snapshot: Snapshot,
  projection: ContentQualityRouteProjection,
): RouteCatalogQualityReport {
  const expectations = buildRouteExpectations(snapshot);
  const pageByPath = new Map(projection.routePages.map((page) => [page.staticPath, page]));
  const pageById = new Map(projection.routePages.map((page) => [page.routeId, page]));
  const missingIndexLinks: string[] = [];
  const missingRoutePages: string[] = [];
  const missingContentRefs: MissingRouteRef[] = [];
  const missingPatternLinks: MissingRouteRef[] = [];

  let routeIndexLinksFound = 0;
  let routePagesFound = 0;
  let routeContentRefsFound = 0;
  let routeContentRefsExpected = 0;
  let routePatternLinksFound = 0;
  let routePatternLinksExpected = 0;

  for (const expectation of expectations) {
    if (containsProjectionToken(projection.indexText, expectation.staticPath)) {
      routeIndexLinksFound += 1;
    } else {
      missingIndexLinks.push(expectation.staticPath);
    }

    const routePage = pageByPath.get(expectation.staticPath) ?? pageById.get(expectation.route.id);
    if (!routePage) {
      missingRoutePages.push(expectation.staticPath);
      routeContentRefsExpected += expectation.contentRefs.length;
      routePatternLinksExpected += expectation.patternLinkRefs.length;
      for (const ref of expectation.contentRefs) {
        missingContentRefs.push({ routeId: expectation.route.id, ref });
      }
      for (const ref of expectation.patternLinkRefs) {
        missingPatternLinks.push({
          routeId: expectation.route.id,
          ref,
          expectedPath: patternStaticPath(ref),
        });
      }
      continue;
    }

    routePagesFound += 1;
    for (const ref of expectation.contentRefs) {
      routeContentRefsExpected += 1;
      if (containsProjectionToken(routePage.text, ref)) {
        routeContentRefsFound += 1;
      } else {
        missingContentRefs.push({ routeId: expectation.route.id, ref });
      }
    }

    for (const ref of expectation.patternLinkRefs) {
      const expectedPath = patternStaticPath(ref);
      routePatternLinksExpected += 1;
      if (containsProjectionToken(routePage.text, expectedPath)) {
        routePatternLinksFound += 1;
      } else {
        missingPatternLinks.push({ routeId: expectation.route.id, ref, expectedPath });
      }
    }
  }

  return {
    expectedRoutes: expectations.length,
    routeIndexLinksFound,
    routePagesFound,
    routeContentRefsFound,
    routeContentRefsExpected,
    routePatternLinksFound,
    routePatternLinksExpected,
    routeIndexLinkCoveragePercent: percent(routeIndexLinksFound, expectations.length),
    routePageCoveragePercent: percent(routePagesFound, expectations.length),
    routeContentCoveragePercent: percent(routeContentRefsFound, routeContentRefsExpected),
    routePatternLinkCoveragePercent: percent(routePatternLinksFound, routePatternLinksExpected),
    missingIndexLinks,
    missingRoutePages,
    missingContentRefs,
    missingPatternLinks,
  };
}

function evaluateCuratedDoc(
  snapshot: Snapshot,
  doc: ContentQualityCuratedDoc,
  expectedDoc?: ContentQualityCuratedDoc,
): CuratedDocQualityReport {
  const routeSelectors = extractRouteSelectors(doc.text);
  const expectedRouteSelectors = expectedDoc ? extractRouteSelectors(expectedDoc.text) : undefined;
  const patternLinks = extractPatternLinks(doc.text);
  const unresolvedRouteSelectors = routeSelectors.filter(
    (selector) => !snapshot.routeGraph.nodes[selector],
  );
  const unresolvedPatternLinks = patternLinks.filter(
    (link) => !snapshot.patternGraph.nodes[link],
  );

  return {
    label: doc.label,
    path: doc.path,
    sourcePath: doc.sourcePath,
    routeSelectors,
    unresolvedRouteSelectors,
    patternLinks,
    unresolvedPatternLinks,
    expectedRouteSelectors,
    missingExpectedRouteSelectors: expectedRouteSelectors
      ? expectedRouteSelectors.filter((selector) => !routeSelectors.includes(selector))
      : [],
    unexpectedRouteSelectors: expectedRouteSelectors
      ? routeSelectors.filter((selector) => !expectedRouteSelectors.includes(selector))
      : [],
    routeSelectorCoveragePercent: percent(
      routeSelectors.length - unresolvedRouteSelectors.length,
      routeSelectors.length,
    ),
    patternLinkCoveragePercent: percent(
      patternLinks.length - unresolvedPatternLinks.length,
      patternLinks.length,
    ),
  };
}

function evaluateLiveEvidence(
  sourceHash: string,
  manifest: PublicationManifestSummary | undefined,
  live: ContentQualityLiveEvidence,
): ContentQualityLiveReport {
  const hosted = live.hostedStatus;
  const statusSourceCoherent =
    hosted.status === 'ok'
    && hosted.publication.sourceHash === sourceHash
    && hosted.runtime.sourceHash === sourceHash
    && hosted.runtime.snapshotSourceHash === sourceHash
    && hosted.runtime.currentSourceHash === sourceHash;

  return {
    baseUrl: live.baseUrl,
    statusUrl: live.statusUrl,
    websiteManifestUrl: live.websiteManifestUrl,
    upstreamSpecUrl: live.upstreamSpecUrl,
    upstreamSourceHash: live.upstreamSourceHash,
    statusSourceCoherent,
    websiteSourceMatchesPublished: live.websiteManifest.sourceHash === sourceHash,
    upstreamSourceMatchesPublished: live.upstreamSourceHash === sourceHash,
    runtimeFresh:
      hosted.runtime.snapshotExists
      && (hosted.runtime.snapshotConsistent ?? hosted.runtime.fresh ?? false),
    publishedRefMatchesManifest: manifest?.upstreamRef
      ? hosted.publication.upstreamRef === manifest.upstreamRef
      : true,
    websitePublishedRefMatchesManifest: manifest?.upstreamRef
      ? live.websiteManifest.upstreamRef === manifest.upstreamRef
      : true,
    hostedPublishedRef: hosted.publication.upstreamRef,
    websitePublishedRef: live.websiteManifest.upstreamRef,
    manifestUpstreamRef: manifest?.upstreamRef,
  };
}

function buildRouteExpectations(snapshot: Snapshot): RouteExpectation[] {
  return Object.values(snapshot.routeGraph.nodes)
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((route) => {
      const contentRefs = uniqueStrings([
        route.id,
        ...route.orderedIds,
        ...route.optionalIds,
        ...route.landingIds,
        ...route.routeSurfaces,
        ...route.nextOwners,
        ...route.reroutes,
        ...route.citations,
      ]);
      const linkedRefs = uniqueStrings([
        ...route.orderedIds,
        ...route.optionalIds,
        ...route.landingIds,
        ...route.routeSurfaces,
        ...route.nextOwners,
        ...route.reroutes,
      ]);
      const patternLinkRefs = linkedRefs.filter((ref) => Boolean(snapshot.patternGraph.nodes[ref]));
      return {
        route,
        staticPath: routeStaticPath(route.id),
        contentRefs,
        patternLinkRefs,
      };
    });
}

function buildLocalRouteProjection(
  snapshot: Snapshot,
  manifest: PublishCurrentManifest,
): ContentQualityRouteProjection {
  const projection = buildDocsProjection(snapshot, manifest);
  const indexPage = projection.pages.find((page) => page.staticPath === '/generated/routes/index');
  if (!indexPage) {
    throw new Error('Generated route index page is missing from docs projection.');
  }

  return {
    indexPath: indexPage.staticPath,
    indexText: indexPage.markdown,
    routePages: projection.pages
      .filter((page) => page.kind === 'route' && page.nodeId)
      .map((page) => ({
        routeId: page.nodeId ?? '',
        staticPath: page.staticPath,
        text: page.markdown,
      })),
  };
}

async function fetchLiveRouteProjection(
  snapshot: Snapshot,
  baseUrl: string,
  fetchImpl: typeof fetch,
): Promise<ContentQualityRouteProjection> {
  const routes = Object.values(snapshot.routeGraph.nodes)
    .sort((left, right) => left.id.localeCompare(right.id));
  const routePages = await Promise.all(
    routes.map(async (route) => {
      const staticPath = routeStaticPath(route.id);
      return {
        routeId: route.id,
        staticPath,
        text: await fetchText(fetchImpl, baseUrl, staticPath),
      };
    }),
  );

  return {
    indexPath: '/generated/routes',
    indexText: await fetchText(fetchImpl, baseUrl, '/generated/routes'),
    routePages,
  };
}

async function fetchLiveCuratedDocs(
  baseUrl: string,
  fetchImpl: typeof fetch,
): Promise<ContentQualityCuratedDoc[]> {
  return Promise.all(
    CONTENT_QUALITY_CURATED_DOCS.map(async (doc) => ({
      label: doc.label,
      path: doc.path,
      sourcePath: doc.sourcePath,
      text: await fetchText(fetchImpl, baseUrl, doc.path),
    })),
  );
}

async function fetchLiveEvidence(input: {
  baseUrl: string;
  statusUrl: string;
  fetchImpl: typeof fetch;
  manifest: PublishCurrentManifest;
}): Promise<ContentQualityLiveEvidence> {
  const upstreamSpecUrl = buildUpstreamSpecUrl({
    owner: DEFAULT_UPSTREAM_OWNER,
    repo: DEFAULT_UPSTREAM_REPO,
    ref: input.manifest.upstreamRef,
  });
  const websiteManifestUrl = new URL(
    WEBSITE_PUBLICATION_MANIFEST_PATH,
    input.baseUrl,
  ).toString();
  const [hostedStatus, websiteManifest, upstreamSpecText] = await Promise.all([
    fetchJsonUrl<HostedContentStatus>(input.fetchImpl, input.statusUrl),
    fetchJsonUrl<PublicationManifestSummary>(input.fetchImpl, websiteManifestUrl),
    fetchTextUrl(input.fetchImpl, upstreamSpecUrl),
  ]);

  return {
    baseUrl: input.baseUrl,
    statusUrl: input.statusUrl,
    hostedStatus,
    websiteManifestUrl,
    websiteManifest,
    upstreamSpecUrl,
    upstreamSourceHash: hashText(upstreamSpecText),
  };
}

async function readPublishedSnapshot(snapshotPath: string): Promise<Snapshot> {
  const snapshotText = await readFile(snapshotPath, 'utf8');
  return JSON.parse(snapshotText) as Snapshot;
}

async function readLocalCuratedDocs(
  cwd: string,
  snapshot: Snapshot,
  manifest: PublishCurrentManifest,
): Promise<ContentQualityCuratedDoc[]> {
  const homePage = buildDocsProjection(snapshot, manifest).pages
    .find((page) => page.staticPath === '/');

  return Promise.all(
    CONTENT_QUALITY_CURATED_DOCS.map(async (doc) => {
      if (doc.label === 'home') {
        return {
          label: doc.label,
          path: doc.path,
          sourcePath: doc.sourcePath,
          text: homePage?.markdown ?? '',
        };
      }

      return {
        label: doc.label,
        path: doc.path,
        sourcePath: doc.sourcePath,
        text: await readFile(resolve(cwd, doc.sourcePath), 'utf8'),
      };
    }),
  );
}

function routeStaticPath(routeId: string): string {
  return `/generated/routes/route_${routeId.replace(/^route:/u, '')}`;
}

function patternStaticPath(patternId: string): string {
  return `/generated/patterns/${patternId}`;
}

function extractRouteSelectors(text: string): string[] {
  return uniqueStrings(
    [...text.matchAll(/\broute:[a-z0-9][a-z0-9-]*/gu)].map((match) => match[0]),
  );
}

function extractPatternLinks(text: string): string[] {
  return uniqueStrings(
    [...text.matchAll(/\/generated\/patterns\/([A-Z]\.\d+(?:\.[A-Za-z0-9]+)*(?::[A-Za-z0-9.]+)?)/gu)]
      .map((match) => match[1])
      .filter((value): value is string => Boolean(value)),
  );
}

function containsProjectionToken(text: string, needle: string): boolean {
  return text.includes(needle) || htmlToSearchText(text).includes(needle);
}

function htmlToSearchText(text: string): string {
  return text
    .replace(/<script\b[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&quot;/gu, '"')
    .replace(/&#39;/gu, "'")
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
    .replace(/\s+/gu, ' ');
}

async function fetchJsonUrl<T>(
  fetchImpl: typeof fetch,
  url: string,
): Promise<T> {
  const text = await fetchTextUrl(fetchImpl, url);
  return JSON.parse(text) as T;
}

async function fetchText(
  fetchImpl: typeof fetch,
  baseUrl: string,
  path: string,
): Promise<string> {
  return fetchTextUrl(fetchImpl, new URL(path, baseUrl).toString());
}

async function fetchTextUrl(fetchImpl: typeof fetch, url: string): Promise<string> {
  const response = await fetchImpl(url, {
    headers: {
      Accept: 'text/html,application/json,text/plain;q=0.9,*/*;q=0.8',
      'User-Agent': 'fpf-reference-content-quality-monitor',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function hashText(text: string): string {
  return `sha256:${createHash('sha256').update(text).digest('hex')}`;
}

function percent(found: number, expected: number): number {
  if (expected === 0) return 100;
  return Math.round((found / expected) * 10_000) / 100;
}

function formatPercent(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 2)}%`;
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/gu, '\\|');
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function summarizeContentQuality(
  state: ContentQualityState,
  routeCatalog: RouteCatalogQualityReport,
  staleCuratedRefs: string[],
  live: ContentQualityLiveReport | undefined,
): string {
  if (state === 'ok') {
    const liveSuffix = live
      ? ` Live website manifest, mcp.fpf.sh status, and raw upstream spec hash match ${live.upstreamSourceHash}.`
      : '';
    return `Content projection matches the published FPF source: route index, route pages, route refs, and curated selectors are all 100%.${liveSuffix}`;
  }

  const failed = [
    routeCatalog.missingIndexLinks.length > 0
      ? `${routeCatalog.missingIndexLinks.length} missing route index links`
      : '',
    routeCatalog.missingRoutePages.length > 0
      ? `${routeCatalog.missingRoutePages.length} missing route pages`
      : '',
    routeCatalog.missingContentRefs.length > 0
      ? `${routeCatalog.missingContentRefs.length} missing route content refs`
      : '',
    routeCatalog.missingPatternLinks.length > 0
      ? `${routeCatalog.missingPatternLinks.length} missing route pattern links`
      : '',
    staleCuratedRefs.length > 0 ? `${staleCuratedRefs.length} stale curated refs` : '',
    live && (
      !live.statusSourceCoherent
      || !live.websiteSourceMatchesPublished
      || !live.upstreamSourceMatchesPublished
      || !live.runtimeFresh
    )
      ? 'live source coherence failed'
      : '',
  ].filter(Boolean);

  return `Content quality breach: ${failed.join(', ')}.`;
}
