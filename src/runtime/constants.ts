export const DEFAULT_SOURCE_PATH = 'FPF-spec.md';
export const DEFAULT_ARTIFACT_DIR = '.runtime/fpf-index';

export const ARTIFACT_FILENAMES = {
  snapshot: 'snapshot.json',
  buildAudit: 'build-audit.json',
  indexMap: 'index-map.json',
  patternGraph: 'pattern-graph.json',
  routeGraph: 'route-graph.json',
  lexicon: 'lexicon.json',
  anchorMap: 'anchor-map.json',
} as const;

export const PREFACE_MARKER = '# **Preface** (non-normative)';
export const PREFACE_ROUTE_CITATION = 'Preface/Where to start';
export const ROUTE_INDEX_CITATION = 'J.4';

export const PART_C_LABEL = 'Part C - Kernel Extension Specifications';

export const PART_C_CLUSTER_LABELS = [
  'Cluster C.I - Core CALs / LOGs / CHRs',
  'Cluster C.II - Domain-Specific Patterns',
  'Cluster C.III - Meta-Infrastructure CALs',
  'Cluster C.IV - Composite & Macro-Scale',
] as const;
