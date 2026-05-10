export type Brand<TValue, TBrand extends string> = TValue & {
  readonly __brand: TBrand;
};

export type NodeId = Brand<string, 'NodeId'>;
export type AnchorId = Brand<string, 'AnchorId'>;
export type SessionId = Brand<string, 'SessionId'>;
export type SourceHash = Brand<string, 'SourceHash'>;
export type RouteId = Brand<string, 'RouteId'>;

export function asNodeId(value: string): NodeId {
  return value as NodeId;
}

export function asAnchorId(value: string): AnchorId {
  return value as AnchorId;
}

export function asSessionId(value: string): SessionId {
  return value as SessionId;
}

export function asSourceHash(value: string): SourceHash {
  return value as SourceHash;
}

export function asRouteId(value: string): RouteId {
  return value as RouteId;
}

export type AnswerMode = 'compact' | 'verbose' | 'proof';

export type AnswerStatus =
  | 'ok'
  | 'degraded'
  | 'not_found'
  | 'ambiguous'
  | 'unsupported'
  | 'stale_snapshot_prevented';

export type SectionRole =
  | 'definition'
  | 'solution'
  | 'relations'
  | 'conformance'
  | 'problem'
  | 'forces'
  | 'route_surface'
  | 'other';

export type NodeKind = 'pattern' | 'route' | 'lexeme' | 'preface';

export type RelationKind =
  | 'builds_on'
  | 'prerequisite_for'
  | 'used_by'
  | 'coordinates_with'
  | 'constrains'
  | 'refines'
  | 'enables'
  | 'informs'
  | 'constitutes'
  | 'constrained_by'
  | 'interacts_with'
  | 'route_step'
  | 'landing_on'
  | 'current_route_surface'
  | 'typical_next_owner'
  | 'common_wrong_reroute'
  | 'lexical_match'
  | 'explicit_reference'
  | 'outline_parent'
  | 'outline_child'
  | 'outline_prev_sibling'
  | 'outline_next_sibling'
  | 'route_hint';

export interface RelationEdge {
  from: string;
  relation: RelationKind;
  to: string;
  source: string;
}

export interface AnchorRef {
  id: string;
  nodeId?: string;
  heading: string;
  lineStart: number;
  lineEnd: number;
  path: string[];
  text: string;
  plainText: string;
  role: SectionRole;
}

export interface IndexMapNode {
  id: string;
  title: string;
  description: string;
  level: number;
  lineStart: number;
  lineEnd: number;
  path: string[];
  parentId?: string;
  childIds: string[];
  anchorId: string;
  /**
   * ISO date the most recent upstream commit touched this section's
   * line range (lineStart..lineEnd) in `FPF-Spec.md`. Populated at
   * publish time via `git blame --line-porcelain` on the upstream
   * clone; absent when blame data isn't available (e.g. local dev,
   * runtime rebuilds without an upstream checkout).
   */
  lastCommittedAt?: string;
  /** Short SHA of the commit that authored `lastCommittedAt`. */
  lastCommitSha?: string;
  metadata: {
    patternId?: string;
    part?: string;
    cluster?: string;
    role: SectionRole;
    routeBearing: boolean;
  };
}

export interface PatternRecord {
  id: string;
  title: string;
  status: string;
  description?: string;
  part?: string;
  cluster?: string;
  type?: string;
  normativity?: string;
  keywords: string[];
  queries: string[];
  aliases: string[];
  dependenciesRaw: string;
  sectionIds: string[];
  relations: RelationEdge[];
  searchableText: string;
}

export interface RouteRecord {
  id: string;
  name: string;
  description: string;
  firstHonestBurden?: string;
  orderedIds: string[];
  optionalIds: string[];
  landingIds: string[];
  routeSurfaces: string[];
  nextOwners: string[];
  reroutes: string[];
  citations: string[];
  anchorIds: string[];
  searchableText: string;
  constraints: string[];
}

export interface LexiconEntry {
  id: string;
  canonical: string;
  aliases: string[];
  symbolForms: string[];
  normalizedKeys: string[];
  linkedNodeIds: string[];
  sourceAnchorIds: string[];
  searchableText: string;
}

export interface CompiledNode {
  id: string;
  kind: NodeKind;
  title: string;
  status?: string;
  part?: string;
  cluster?: string;
  aliases: string[];
  anchorIds: string[];
  neighborEdges: RelationEdge[];
  searchableText: string;
  details: PatternRecord | RouteRecord | LexiconEntry;
}

export interface SnapshotIndexes {
  idIndex: Record<string, string[]>;
  titleIndex: Record<string, string[]>;
  aliasIndex: Record<string, string[]>;
  lexiconIndex: Record<string, string[]>;
  routeNameIndex: Record<string, string[]>;
  statusIndex: Record<string, string[]>;
  familyIndex: Record<string, string[]>;
}

export interface BuildValidation {
  parsedSections: number;
  parsedPatterns: number;
  parsedRoutes: number;
  parsedLexiconEntries: number;
  indexMapNodes: number;
  missingRequiredFields: number;
  unresolvedReferences: string[];
  duplicateIds: string[];
  /**
   * Section IDs encountered more than once during index-map
   * construction — the second-and-later occurrences silently
   * overwrote the first, so the index resolves to the last writer.
   * Currently non-zero in published spec snapshots; surfacing the
   * count here keeps the silent merges visible without changing
   * the merge behavior.
   */
  duplicateHeadings: string[];
  brokenRoutes: string[];
}

export interface HeuristicSeedRule {
  name: string;
  /** Outer array = AND, inner array = OR alternatives for each term group. */
  allOf: string[][];
  /** Outer array = OR groups, inner array = OR alternatives within each group. */
  anyOf: string[][];
  seedNodeIds: string[];
  seedScore: number;
  seedOrigin: FrontierOrigin;
  initialNodeIds: string[];
  routeId?: string;
  routeScore?: number;
}

export interface Snapshot {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
  compilerFingerprint?: string;
  compilerMode: 'local_vectorless';
  indexRoots: string[];
  indexMap: Record<string, IndexMapNode>;
  anchorMap: Record<string, AnchorRef>;
  patternGraph: {
    nodes: Record<string, PatternRecord>;
    relations: RelationEdge[];
  };
  routeGraph: {
    nodes: Record<string, RouteRecord>;
    relations: RelationEdge[];
  };
  lexicon: Record<string, LexiconEntry>;
  compiledNodes: Record<string, CompiledNode>;
  relationGraph: RelationEdge[];
  indexes: SnapshotIndexes;
  heuristicSeedRules?: HeuristicSeedRule[];
  validation: BuildValidation;
}

export type ChangeFamily =
  | 'no_change'
  | 'viewing_change'
  | 'slot_explicitness_change'
  | 'editioned_semantic_change'
  | 'entity_addition'
  | 'described_entity_retargeting';

export interface IndexingViewEntry {
  id: string;
  kind: NodeKind;
  title: string;
  status?: string;
  type?: string;
  normativity?: string;
  part?: string;
  cluster?: string;
  aliases: string[];
  anchorIds: string[];
  relationEdges: Array<{ from: string; relation: RelationKind; to: string }>;
}

export interface IndexingViewRoute {
  id: string;
  name: string;
  orderedIds: string[];
  optionalIds: string[];
  landingIds: string[];
  routeSurfaces: string[];
  constraints: string[];
  anchorIds: string[];
  citations: string[];
  nextOwners: string[];
  reroutes: string[];
}

export interface IndexingView {
  edition: string;
  sourceHash: string;
  builtAt: string;
  patterns: Record<string, IndexingViewEntry>;
  routes: Record<string, IndexingViewRoute>;
  anchorIds: string[];
  lexiconCanonicals: string[];
}

export interface RefreshSentinel {
  name: string;
  passed: boolean;
  detail?: string;
}

export interface RefreshClassification {
  changeFamily: ChangeFamily;
  sentinels: RefreshSentinel[];
  addedIds: string[];
  removedIds: string[];
  changedIds: string[];
}

export interface BuildAudit {
  sourcePath: string;
  sourceHash: string;
  previousSourceHash?: string;
  builtAt: string;
  rebuilt: boolean;
  reason:
    | 'forced'
    | 'compiler_changed'
    | 'missing_snapshot'
    | 'source_hash_changed'
    | 'snapshot_current';
  validation: BuildValidation;
  refreshClassification?: RefreshClassification;
  compiler: {
    mode: 'local_vectorless';
    compiledNodes: number;
    patternNodes: number;
    routeNodes: number;
    lexiconEntries: number;
    indexMapNodes: number;
    anchorCount: number;
  };
  artifacts: Record<string, string>;
}

/**
 * Output shapes a caller may request in their question (e.g. "give me
 * a checklist for…", "compare A and B", "template for FPF kickoff").
 * Surfaced on QueryResult.requestedShape so the renderer / caller can
 * tell whether the requested shape was honored.
 */
export type RequestedShape =
  | 'template'
  | 'checklist'
  | 'table'
  | 'matrix'
  | 'compare';

export interface QueryResult {
  mode: AnswerMode;
  question: string;
  answer: string;
  ids: string[];
  relations: Array<Pick<RelationEdge, 'from' | 'relation' | 'to'>>;
  constraints: string[];
  citations: string[];
  confidence: number | null;
  gaps: string[];
  candidateIds?: string[];
  /** Output shape detected in the question (e.g. "checklist", "table"). */
  requestedShape?: RequestedShape;
  /**
   * Whether the projector produced output that matches `requestedShape`.
   * `false` when the shape was asked for but only prose was returned —
   * caller should treat that as a usability gap, not a satisfied
   * answer.
   */
  shapeProduced?: boolean;
  snapshot: {
    sourceHash: string;
    builtAt: string;
    rebuilt: boolean;
  };
  status: AnswerStatus;
  groundingChain?: string[];
}

export interface AskFpfResult {
  question: string;
  mode: AnswerMode;
  markdown: string;
  ids: string[];
  citations: string[];
  constraints: string[];
  gaps: string[];
  confidence: number | null;
  candidateIds?: string[];
  requestedShape?: RequestedShape;
  shapeProduced?: boolean;
  status: AnswerStatus;
  snapshot: {
    sourceHash: string;
    builtAt: string;
    rebuilt: boolean;
  };
  groundingChain?: string[];
}

export interface TraceCandidate {
  nodeId: string;
  kind: NodeKind;
  score: number;
  reasons: string[];
}

export type FrontierOrigin =
  | 'exact_match'
  | 'reference_follow'
  | 'route_expansion'
  | 'adjacency'
  | 'lexical'
  | 'session_context';

export interface FrontierCandidate {
  targetId: string;
  kind: NodeKind;
  reason: string;
  score: number;
  origin: FrontierOrigin;
}

export interface GraphExpansion {
  from: string;
  relation: RelationKind;
  to: string;
  reason: string;
}

export interface RetrievalHop {
  iteration: number;
  reason: string;
  addedNodeIds: string[];
  addedAnchorIds: string[];
  sufficientAfter: boolean;
}

export interface FollowedReference {
  from: string;
  to: string;
  relation: RelationKind;
  source: string;
}

export interface TraceResult {
  mode: AnswerMode;
  question: string;
  normalizedQuestion: string;
  detected: {
    ids: string[];
    lexemes: string[];
    routeNames: string[];
    familyTerms: string[];
    statusTerms: string[];
  };
  candidateScores: TraceCandidate[];
  frontierCandidates: FrontierCandidate[];
  graphExpansions: GraphExpansion[];
  selectedNodeIds: string[];
  selectedAnchorIds: string[];
  excludedNodeIds: string[];
  followedReferences: FollowedReference[];
  retrievalHops: RetrievalHop[];
  sessionApplied: boolean;
  sessionReusedNodeIds: string[];
  sessionMateriallyChanged: boolean;
  routeWins: boolean;
  sufficient: boolean;
  status: AnswerStatus;
  snapshot: {
    sourceHash: string;
    builtAt: string;
    rebuilt: boolean;
  };
}

export interface InspectNeighbor {
  id: string;
  kind: NodeKind;
  title: string;
  relation: RelationKind;
}

export interface DocRef {
  markdownPath: string;
  staticPath: string;
}

export interface InspectResult {
  selector: string;
  resolvedAs: 'id' | 'route' | 'lexeme' | 'not_found';
  status: 'ok' | 'not_found';
  node?: CompiledNode;
  anchors: AnchorRef[];
  neighbors: InspectNeighbor[];
  docRef?: DocRef;
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}

export interface ReadDocResult {
  selector: string;
  resolvedAs: 'id' | 'route' | 'lexeme' | 'not_found';
  status: 'ok' | 'not_found';
  nodeId?: string;
  title?: string;
  docRef?: DocRef;
  /** Page markdown. Omitted in preview mode; truncated when maxChars set. */
  markdown?: string;
  /** Full character count of the page markdown, before truncation. */
  markdownChars?: number;
  /** Whether `markdown` was truncated to fit a caller-supplied maxChars. */
  truncated?: boolean;
  /** H2 / H3 heading text in document order, for outline navigation. */
  headings?: string[];
  /** Short text-content preview, set when mode: "preview". */
  preview?: string;
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}

export interface InspectAnchorResult {
  anchorId: string;
  status: 'ok' | 'not_found';
  anchor?: AnchorRef;
  ownerNode?: CompiledNode;
  neighbors: InspectNeighbor[];
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}

export interface ExpandedCitation {
  citationId: string;
  status: 'ok' | 'not_found';
  anchor?: AnchorRef;
  ownerNode?: CompiledNode;
  neighbors: InspectNeighbor[];
}

export interface ExpandCitationsResult {
  citationIds: string[];
  items: ExpandedCitation[];
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}

export interface RuntimeStatus {
  sourcePath: string;
  sourceHash?: string;
  builtAt?: string;
  snapshotExists: boolean;
  currentSourceHash: string;
  fresh: boolean;
  compilerMode: 'local_vectorless';
  artifacts: Record<string, boolean>;
  synthesizer: {
    configured: boolean;
    provider?: string;
    model?: string;
    baseUrl?: string;
    availability?: SynthesizerAvailabilityState;
    checkedAt?: string;
    failure?: SynthesizerAvailabilityFailure;
  };
  observability: {
    configured: boolean;
    filePath: string;
    format: 'flat' | 'tree' | 'normalized';
    includeInternalSpans: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    excludeModelChunks: boolean;
  };
  sessionCache: {
    enabled: boolean;
    maxSessions: number;
    activeSessions: number;
    persistent: boolean;
  };
}

export type SynthesizerAvailabilityState =
  | 'not_configured'
  | 'available'
  | 'degraded'
  | 'unavailable'
  | 'unknown';

export interface SynthesizerAvailabilityFailure {
  message: string;
  httpStatus?: number;
  endpoint?: string;
}

export interface AnswerSlice {
  anchorId: string;
  nodeId?: string;
  heading: string;
  role: SectionRole;
  lineStart: number;
  lineEnd: number;
  text: string;
  plainText: string;
}

export interface AnswerSynthesizerInput {
  question: string;
  mode: AnswerMode;
  trace: TraceResult;
  nodes: CompiledNode[];
  slices: AnswerSlice[];
  deterministicResult: QueryResult;
}

export interface AnswerSynthesizerOutput {
  answer?: string;
  constraints?: string[];
  confidence?: number;
  gaps?: string[];
  groundingChain?: string[];
}

export interface LocalAnswerSynthesizerInfo {
  provider: string;
  model?: string;
  baseUrl?: string;
}

export interface LocalAnswerSynthesizerAvailability {
  availability: Exclude<SynthesizerAvailabilityState, 'not_configured'>;
  checkedAt: string;
  failure?: SynthesizerAvailabilityFailure;
}

export interface LocalAnswerSynthesizer {
  isAvailable(): Promise<boolean> | boolean;
  synthesize(
    input: AnswerSynthesizerInput,
  ): Promise<AnswerSynthesizerOutput> | AnswerSynthesizerOutput;
  describe?(): LocalAnswerSynthesizerInfo;
  checkAvailability?():
    | Promise<LocalAnswerSynthesizerAvailability>
    | LocalAnswerSynthesizerAvailability;
}

// ---------------------------------------------------------------------------
// Discovery layer types (browse / search)
// ---------------------------------------------------------------------------

export interface CatalogEntry {
  id: string;
  kind: NodeKind;
  title: string;
  status?: string;
  part?: string;
  cluster?: string;
  description: string;
}

export interface BrowseCatalogResult {
  entries: CatalogEntry[];
  total: number;
  filters: {
    part?: string;
    status?: string;
    kind?: NodeKind;
  };
  didYouMean?: {
    part?: string;
  };
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}

export interface SearchHit {
  id: string;
  kind: NodeKind;
  title: string;
  status?: string;
  part?: string;
  score: number;
  snippet: string;
  /**
   * For `kind: "lexeme"` hits, the pattern / route IDs the lexeme is
   * linked to. Lexemes are vocabulary entries — readers that find a
   * lexeme in search results need a path to the actionable pattern
   * page, otherwise the hit is a dead-end. Undefined on non-lexeme
   * hits.
   */
  linkedNodeIds?: string[];
}

export interface SearchResult {
  query: string;
  hits: SearchHit[];
  total: number;
  snapshot: {
    sourceHash: string;
    builtAt: string;
  };
}
