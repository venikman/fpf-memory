/**
 * Default when `FPF_SPEC_SOURCE_PATH` is unset.
 *
 * Points at the committed publication surface (`published/current/`) so
 * tests, docs:generate, and rspress all read the same FPF the last
 * pre-push run published. Local memory preparation overrides this via
 * `FPF_PUBLISH_SOURCE_PATH` (see `scripts/publish-current.ts`).
 */
export const DEFAULT_SOURCE_PATH = 'published/current/FPF-Spec.md';
export const DEFAULT_ARTIFACT_DIR = '.runtime/fpf-index';

/**
 * The committed publication surface. Owned by local pre-push; CI and
 * the docs pipeline consume it read-only. See the repo-shape section of
 * the implementation plan and `scripts/publish-current.ts`.
 */
export const PUBLISHED_CHANNEL_DIR = 'published/current';
export const PUBLISHED_SPEC_PATH = `${PUBLISHED_CHANNEL_DIR}/FPF-Spec.md`;
export const PUBLISHED_ARTIFACT_DIR = `${PUBLISHED_CHANNEL_DIR}/fpf-index`;
export const PUBLISHED_MANIFEST_PATH = `${PUBLISHED_CHANNEL_DIR}/manifest.json`;

/**
 * Default upstream working copy for `publish:current`. Gitignored and
 * refreshed by `bun run spec:download`.
 */
export const DEFAULT_PUBLISH_SOURCE_PATH = '.fpf-upstream/FPF-Spec.md';

/**
 * Where the hosted deploy bundle stages its runtime inputs.
 *
 * Deliberately non-dotfile because Mastra's `bunx mastra server deploy`
 * zip step silently excludes dotfile directories from the upload
 * artifact. Staging under `.fpf-upstream/`/`.runtime/` looks correct
 * locally but arrives empty in the container, forcing a 16-18 s cold
 * compile on the first tool call. A plain `hosted/` prefix survives
 * the zip and lets the hosted runtime boot with a pre-compiled
 * snapshot in ~1-2 s.
 */
export const HOSTED_STAGED_SOURCE_PATH = 'hosted/FPF-Spec.md';
export const HOSTED_STAGED_ARTIFACT_DIR = 'hosted/fpf-index';
export const SERVERLESS_ARTIFACT_DIR = '/tmp/fpf-memory/fpf-index';

export const HOSTED_MCP_ENDPOINT =
  'https://fpf-memory-mcp-proxy.vercel.app/api/mcp/fpf_memory/mcp';

export const ARTIFACT_FILENAMES = {
  snapshot: 'snapshot.json',
  buildAudit: 'build-audit.json',
  indexMap: 'index-map.json',
  patternGraph: 'pattern-graph.json',
  routeGraph: 'route-graph.json',
  lexicon: 'lexicon.json',
  anchorMap: 'anchor-map.json',
  indexingView: 'indexing-view.json',
} as const;

export const SESSION_CACHE_FILENAME = 'session-cache.json';

export const PREFACE_MARKER = '# **Preface** (non-normative)';
export const PREFACE_ROUTE_CITATION = 'Preface/Where to start';
export const ROUTE_INDEX_CITATION = 'J.4';

export const PROJECT_ALIGNMENT_ROUTE_NAME = 'project alignment';
export const BOUNDARY_BURDEN_ROUTE_NAME = 'boundary burden';

export const MAX_HOPS = 6;
export const MAX_SELECTED_ANCHORS = 12;
export const MAX_EXCLUDED = 5;
export const MAX_SYNTHESIS_SLICES = 8;

export const PART_C_LABEL = 'Part C - Kernel Extension Specifications';

export const PART_C_CLUSTER_LABELS = [
  'Cluster C.I - Core CALs / LOGs / CHRs',
  'Cluster C.II - Domain-Specific Patterns',
  'Cluster C.III - Meta-Infrastructure CALs',
  'Cluster C.IV - Composite & Macro-Scale',
] as const;
