import { z } from 'zod';

export const answerModeSchema = z.enum(['compact', 'verbose', 'proof']);
export const nodeKindSchema = z.enum(['pattern', 'route', 'lexeme']);
export const selectorKindSchema = z.enum(['auto', 'id', 'route', 'lexeme']);
export const answerStatusSchema = z.enum([
  'ok',
  'not_found',
  'ambiguous',
  'unsupported',
  'stale_snapshot_prevented',
]);
export const anchorRoleSchema = z.enum([
  'definition',
  'solution',
  'relations',
  'conformance',
  'problem',
  'forces',
  'route_surface',
  'other',
]);
export const buildReasonSchema = z.enum([
  'forced',
  'missing_snapshot',
  'source_hash_changed',
  'snapshot_current',
]);
export const observabilityFormatSchema = z.enum(['flat', 'tree', 'normalized']);
export const observabilityLogLevelSchema = z.enum([
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
]);
export const resolvedAsSchema = z.enum(['id', 'route', 'lexeme', 'not_found']);
export const inspectStatusSchema = z.enum(['ok', 'not_found']);
export const frontierOriginSchema = z.enum([
  'exact_match',
  'reference_follow',
  'route_expansion',
  'adjacency',
  'lexical',
  'session_context',
]);
export const expandedCitationStatusSchema = z.enum(['ok', 'not_found']);

export const relationEdgeSchema = z
  .object({
    from: z.string(),
    relation: z.string(),
    to: z.string(),
  })
  .strict();

export const inspectNeighborSchema = z
  .object({
    id: z.string(),
    kind: nodeKindSchema,
    title: z.string(),
    relation: z.string(),
  })
  .strict();

export const docRefSchema = z
  .object({
    markdownPath: z.string(),
    staticPath: z.string(),
  })
  .strict();

export const anchorSchema = z
  .object({
    id: z.string(),
    nodeId: z.string().optional(),
    heading: z.string(),
    lineStart: z.number(),
    lineEnd: z.number(),
    path: z.array(z.string()),
    text: z.string(),
    plainText: z.string(),
    role: anchorRoleSchema,
  })
  .strict();

export const compiledNeighborEdgeSchema = z
  .object({
    from: z.string(),
    relation: z.string(),
    to: z.string(),
    source: z.string(),
  })
  .strict();

export const compiledNodeSchema = z
  .object({
    id: z.string(),
    kind: nodeKindSchema,
    title: z.string(),
    status: z.string().optional(),
    part: z.string().optional(),
    cluster: z.string().optional(),
    aliases: z.array(z.string()),
    anchorIds: z.array(z.string()),
    neighborEdges: z.array(compiledNeighborEdgeSchema),
    searchableText: z.string(),
    details: z.unknown(),
  })
  .strict();

export const snapshotWithRebuildSchema = z
  .object({
    sourceHash: z.string(),
    builtAt: z.string(),
    rebuilt: z.boolean(),
  })
  .strict();

export const changeFamilySchema = z.enum([
  'no_change',
  'viewing_change',
  'slot_explicitness_change',
  'editioned_semantic_change',
  'entity_addition',
  'described_entity_retargeting',
]);

export const refreshSentinelSchema = z
  .object({
    name: z.string(),
    passed: z.boolean(),
    detail: z.string().optional(),
  })
  .strict();

export const refreshClassificationSchema = z
  .object({
    changeFamily: changeFamilySchema,
    sentinels: z.array(refreshSentinelSchema),
    addedIds: z.array(z.string()),
    removedIds: z.array(z.string()),
    changedIds: z.array(z.string()),
  })
  .strict();

export const buildAuditSchema = z
  .object({
    sourcePath: z.string(),
    sourceHash: z.string(),
    previousSourceHash: z.string().optional(),
    builtAt: z.string(),
    rebuilt: z.boolean(),
    reason: buildReasonSchema,
    validation: z
      .object({
        parsedSections: z.number(),
        parsedPatterns: z.number(),
        parsedRoutes: z.number(),
        parsedLexiconEntries: z.number(),
        indexMapNodes: z.number(),
        missingRequiredFields: z.number(),
        unresolvedReferences: z.array(z.string()),
        duplicateIds: z.array(z.string()),
        brokenRoutes: z.array(z.string()),
      })
      .strict(),
    refreshClassification: refreshClassificationSchema.optional(),
    compiler: z
      .object({
        mode: z.literal('local_vectorless'),
        compiledNodes: z.number(),
        patternNodes: z.number(),
        routeNodes: z.number(),
        lexiconEntries: z.number(),
        indexMapNodes: z.number(),
        anchorCount: z.number(),
      })
      .strict(),
    artifacts: z.record(z.string(), z.string()),
  })
  .strict();

export const queryResultSchema = z
  .object({
    mode: answerModeSchema,
    question: z.string(),
    answer: z.string(),
    ids: z.array(z.string()),
    relations: z.array(relationEdgeSchema),
    constraints: z.array(z.string()),
    citations: z.array(z.string()),
    confidence: z.number(),
    gaps: z.array(z.string()),
    snapshot: snapshotWithRebuildSchema,
    status: answerStatusSchema,
    groundingChain: z.array(z.string()).optional(),
  })
  .strict();

export const askFpfResultSchema = z
  .object({
    question: z.string(),
    mode: answerModeSchema,
    markdown: z.string(),
    ids: z.array(z.string()),
    citations: z.array(z.string()),
    constraints: z.array(z.string()),
    gaps: z.array(z.string()),
    confidence: z.number(),
    status: answerStatusSchema,
    snapshot: snapshotWithRebuildSchema,
    groundingChain: z.array(z.string()).optional(),
  })
  .strict();

export const runtimeStatusSchema = z
  .object({
    sourcePath: z.string(),
    sourceHash: z.string().optional(),
    builtAt: z.string().optional(),
    snapshotExists: z.boolean(),
    currentSourceHash: z.string(),
    fresh: z.boolean(),
    compilerMode: z.literal('local_vectorless'),
    artifacts: z.record(z.string(), z.boolean()),
    synthesizer: z
      .object({
        configured: z.boolean(),
        provider: z.string().optional(),
        model: z.string().optional(),
        baseUrl: z.string().optional(),
      })
      .strict(),
    observability: z
      .object({
        configured: z.boolean(),
        filePath: z.string(),
        format: observabilityFormatSchema,
        includeInternalSpans: z.boolean(),
        logLevel: observabilityLogLevelSchema,
        excludeModelChunks: z.boolean(),
      })
      .strict(),
    sessionCache: z
      .object({
        enabled: z.boolean(),
        maxSessions: z.number(),
        activeSessions: z.number(),
        persistent: z.boolean(),
      })
      .strict(),
  })
  .strict();

export const traceDetectedSchema = z
  .object({
    ids: z.array(z.string()),
    lexemes: z.array(z.string()),
    routeNames: z.array(z.string()),
    familyTerms: z.array(z.string()),
    statusTerms: z.array(z.string()),
  })
  .strict();

export const candidateScoreSchema = z
  .object({
    nodeId: z.string(),
    kind: nodeKindSchema,
    score: z.number(),
    reasons: z.array(z.string()),
  })
  .strict();

export const frontierCandidateSchema = z
  .object({
    targetId: z.string(),
    kind: nodeKindSchema,
    reason: z.string(),
    score: z.number(),
    origin: frontierOriginSchema,
  })
  .strict();

export const graphExpansionSchema = z
  .object({
    from: z.string(),
    relation: z.string(),
    to: z.string(),
    reason: z.string(),
  })
  .strict();

export const followedReferenceSchema = z
  .object({
    from: z.string(),
    to: z.string(),
    relation: z.string(),
    source: z.string(),
  })
  .strict();

export const retrievalHopSchema = z
  .object({
    iteration: z.number(),
    reason: z.string(),
    addedNodeIds: z.array(z.string()),
    addedAnchorIds: z.array(z.string()),
    sufficientAfter: z.boolean(),
  })
  .strict();

export const traceResultSchema = z
  .object({
    mode: answerModeSchema,
    question: z.string(),
    normalizedQuestion: z.string(),
    detected: traceDetectedSchema,
    candidateScores: z.array(candidateScoreSchema),
    frontierCandidates: z.array(frontierCandidateSchema),
    graphExpansions: z.array(graphExpansionSchema),
    selectedNodeIds: z.array(z.string()),
    selectedAnchorIds: z.array(z.string()),
    excludedNodeIds: z.array(z.string()),
    followedReferences: z.array(followedReferenceSchema),
    retrievalHops: z.array(retrievalHopSchema),
    sessionApplied: z.boolean(),
    sessionReusedNodeIds: z.array(z.string()),
    sessionMateriallyChanged: z.boolean(),
    routeWins: z.boolean(),
    sufficient: z.boolean(),
    status: answerStatusSchema,
    snapshot: snapshotWithRebuildSchema,
  })
  .strict();

export const inspectResultSchema = z
  .object({
    selector: z.string(),
    resolvedAs: resolvedAsSchema,
    status: inspectStatusSchema,
    node: compiledNodeSchema.optional(),
    anchors: z.array(anchorSchema),
    neighbors: z.array(inspectNeighborSchema),
    docRef: docRefSchema.optional(),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export const readDocResultSchema = z
  .object({
    selector: z.string(),
    resolvedAs: resolvedAsSchema,
    status: inspectStatusSchema,
    nodeId: z.string().optional(),
    title: z.string().optional(),
    docRef: docRefSchema.optional(),
    markdown: z.string().optional(),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export const inspectAnchorResultSchema = z
  .object({
    anchorId: z.string(),
    status: inspectStatusSchema,
    anchor: anchorSchema.optional(),
    ownerNode: compiledNodeSchema.optional(),
    neighbors: z.array(inspectNeighborSchema),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export const expandedCitationSchema = z
  .object({
    citationId: z.string(),
    status: expandedCitationStatusSchema,
    anchor: anchorSchema.optional(),
    ownerNode: compiledNodeSchema.optional(),
    neighbors: z.array(inspectNeighborSchema),
  })
  .strict();

export const expandCitationsResultSchema = z
  .object({
    citationIds: z.array(z.string()),
    items: z.array(expandedCitationSchema),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export const refreshFpfIndexInputSchema = z
  .object({
    force: z.boolean().optional(),
  })
  .strict();

export const queryFpfSpecInputSchema = z
  .object({
    question: z.string().min(1),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).optional(),
  })
  .strict();

export const askFpfInputSchema = z
  .object({
    question: z.string().min(1),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).optional(),
  })
  .strict();

export const getFpfIndexStatusInputSchema = z.object({}).strict();

export const inspectFpfNodeInputSchema = z
  .object({
    selector: z.string().min(1),
    kind: selectorKindSchema.optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const readFpfDocInputSchema = z
  .object({
    selector: z.string().min(1),
    kind: selectorKindSchema.optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const inspectFpfAnchorInputSchema = z
  .object({
    anchorId: z.string().min(1),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const expandFpfCitationsInputSchema = z
  .object({
    citationIds: z.array(z.string().min(1)).min(1),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const traceFpfPathInputSchema = z
  .object({
    question: z.string().min(1),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).optional(),
  })
  .strict();

export type RefreshFpfIndexInput = z.infer<typeof refreshFpfIndexInputSchema>;
export type QueryFpfSpecInput = z.infer<typeof queryFpfSpecInputSchema>;
export type AskFpfInput = z.infer<typeof askFpfInputSchema>;
export type GetFpfIndexStatusInput = z.infer<typeof getFpfIndexStatusInputSchema>;
export type InspectFpfNodeInput = z.infer<typeof inspectFpfNodeInputSchema>;
export type ReadFpfDocInput = z.infer<typeof readFpfDocInputSchema>;
export type InspectFpfAnchorInput = z.infer<typeof inspectFpfAnchorInputSchema>;
export type ExpandFpfCitationsInput = z.infer<typeof expandFpfCitationsInputSchema>;
export type TraceFpfPathInput = z.infer<typeof traceFpfPathInputSchema>;

// ---------------------------------------------------------------------------
// Discovery layer schemas (browse / search)
// ---------------------------------------------------------------------------

export const catalogEntrySchema = z
  .object({
    id: z.string(),
    kind: nodeKindSchema,
    title: z.string(),
    status: z.string().optional(),
    part: z.string().optional(),
    cluster: z.string().optional(),
    description: z.string(),
  })
  .strict();

export const browseFpfCatalogInputSchema = z
  .object({
    part: z.string().optional(),
    status: z.string().optional(),
    kind: nodeKindSchema.optional(),
    limit: z.number().int().min(1).max(500).optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const browseFpfCatalogResultSchema = z
  .object({
    entries: z.array(catalogEntrySchema),
    total: z.number(),
    filters: z
      .object({
        part: z.string().optional(),
        status: z.string().optional(),
        kind: nodeKindSchema.optional(),
      })
      .strict(),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export const searchHitSchema = z
  .object({
    id: z.string(),
    kind: nodeKindSchema,
    title: z.string(),
    status: z.string().optional(),
    part: z.string().optional(),
    score: z.number(),
    snippet: z.string(),
  })
  .strict();

export const searchFpfInputSchema = z
  .object({
    query: z.string().min(1),
    kind: nodeKindSchema.optional(),
    limit: z.number().int().min(1).max(100).optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const searchFpfResultSchema = z
  .object({
    query: z.string(),
    hits: z.array(searchHitSchema),
    total: z.number(),
    snapshot: z
      .object({
        sourceHash: z.string(),
        builtAt: z.string(),
      })
      .strict(),
  })
  .strict();

export type BrowseFpfCatalogInput = z.infer<typeof browseFpfCatalogInputSchema>;
export type SearchFpfInput = z.infer<typeof searchFpfInputSchema>;
