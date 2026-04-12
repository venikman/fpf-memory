export type AnswerMode = 'compact' | 'verbose' | 'proof';

export type AnswerStatus =
  | 'ok'
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

export type NodeKind = 'pattern' | 'route' | 'lexeme';

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
  brokenRoutes: string[];
}

export interface Snapshot {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
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
  validation: BuildValidation;
}

export interface BuildAudit {
  sourcePath: string;
  sourceHash: string;
  previousSourceHash?: string;
  builtAt: string;
  rebuilt: boolean;
  reason:
    | 'forced'
    | 'missing_snapshot'
    | 'source_hash_changed'
    | 'snapshot_current';
  validation: BuildValidation;
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

export interface QueryResult {
  mode: AnswerMode;
  question: string;
  answer: string;
  ids: string[];
  relations: Array<Pick<RelationEdge, 'from' | 'relation' | 'to'>>;
  constraints: string[];
  citations: string[];
  confidence: number;
  gaps: string[];
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
  confidence: number;
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
  markdown?: string;
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
    apiStyle?: 'responses' | 'lmstudio_chat';
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
  };
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
  apiStyle?: 'responses' | 'lmstudio_chat';
}

export interface LocalAnswerSynthesizer {
  isAvailable(): Promise<boolean> | boolean;
  synthesize(
    input: AnswerSynthesizerInput,
  ): Promise<AnswerSynthesizerOutput> | AnswerSynthesizerOutput;
  describe?(): LocalAnswerSynthesizerInfo;
}
