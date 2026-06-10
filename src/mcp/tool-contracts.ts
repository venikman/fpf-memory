import { z } from 'zod';

// Public, unauthenticated MCP tools accept user-supplied strings; without
// caps a single 4 MB payload can drive the runtime into Vercel's
// `maxDuration` ceiling. These limits are generous for legitimate use
// (a 2000-character question is far longer than anything a person types)
// and refuse pathological input at the schema boundary.
const MAX_QUESTION_LENGTH = 2_000;
const MAX_SEARCH_QUERY_LENGTH = 1_000;
const MAX_SELECTOR_LENGTH = 256;
const MAX_FILTER_LENGTH = 64;
const MAX_CITATION_COUNT = 50;
const MAX_BROWSE_OFFSET = 100_000;

export const answerModeSchema = z.enum(['compact', 'verbose', 'proof']);
export const nodeKindSchema = z.enum(['pattern', 'route', 'lexeme', 'preface']);
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
  'compiler_changed',
  'missing_snapshot',
  'source_hash_changed',
  'snapshot_current',
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
        duplicateHeadings: z.array(z.string()),
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

const requestedShapeSchema = z.enum([
  'template',
  'checklist',
  'table',
  'matrix',
  'compare',
]);

export const queryResultSchema = z
  .object({
    mode: answerModeSchema,
    question: z.string(),
    answer: z.string(),
    ids: z.array(z.string()),
    relations: z.array(relationEdgeSchema),
    constraints: z.array(z.string()),
    citations: z.array(z.string()),
    confidence: z.number().nullable(),
    gaps: z.array(z.string()),
    candidateIds: z.array(z.string()).optional(),
    requestedShape: requestedShapeSchema.optional(),
    shapeProduced: z.boolean().optional(),
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
    confidence: z.number().nullable(),
    candidateIds: z.array(z.string()).optional(),
    requestedShape: requestedShapeSchema.optional(),
    shapeProduced: z.boolean().optional(),
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
    /**
     * Page markdown. Omitted when `mode: "preview"`; truncated when
     * `maxChars` is set (signaled by `truncated: true`).
     */
    markdown: z.string().optional(),
    /**
     * Full character count of the page's markdown — independent of
     * truncation, so callers know the original size before deciding
     * whether to re-fetch with a higher `maxChars` or follow the
     * `docRef` link.
     */
    markdownChars: z.number().int().nonnegative().optional(),
    /** Whether `markdown` was truncated to fit `maxChars`. */
    truncated: z.boolean().optional(),
    /**
     * H2 / H3 heading text in document order. Lets a caller see
     * the page's outline without paying for the full markdown.
     */
    headings: z.array(z.string()).optional(),
    /**
     * Short text-content preview suitable for an MCP fallback
     * surface or a search-result hover card. Set when
     * `mode: "preview"` is requested; empty otherwise.
     */
    preview: z.string().optional(),
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
    question: z.string().min(1).max(MAX_QUESTION_LENGTH),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).max(MAX_SELECTOR_LENGTH).optional(),
  })
  .strict();

export const askFpfInputSchema = z
  .object({
    question: z.string().min(1).max(MAX_QUESTION_LENGTH),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).max(MAX_SELECTOR_LENGTH).optional(),
  })
  .strict();

// No parameters. Legacy MCP clients that cannot send an empty arguments
// object invent a placeholder argument (historically `random_string`), so
// that one known key is accepted — bounded by the selector cap — and
// discarded before the strict empty object validates. Everything else
// (unknown keys, non-string or oversized placeholders) is rejected at the
// schema boundary, keeping the public input-cap policy intact while the
// advertised schema stays parameterless.
const STATUS_PLACEHOLDER_KEYS = ['random_string'] as const;
export const getFpfIndexStatusInputSchema = z.preprocess((value) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return value;
  }
  const entries = { ...(value as Record<string, unknown>) };
  for (const key of STATUS_PLACEHOLDER_KEYS) {
    const placeholder = entries[key];
    if (typeof placeholder === 'string' && placeholder.length <= MAX_SELECTOR_LENGTH) {
      delete entries[key];
    }
  }
  return entries;
}, z.object({}).strict());

export const inspectFpfNodeInputSchema = z
  .object({
    selector: z.string().min(1).max(MAX_SELECTOR_LENGTH),
    kind: selectorKindSchema.optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const readFpfDocInputSchema = z
  .object({
    selector: z.string().min(1).max(MAX_SELECTOR_LENGTH),
    kind: selectorKindSchema.optional(),
    /**
     * `"preview"`: omit full markdown; return headings, char count,
     *   and a short preview snippet.
     * `"full"` (default): return the full markdown; still includes the
     *   metadata fields (headings, markdownChars).
     */
    mode: z.enum(['preview', 'full']).optional(),
    /**
     * Cap returned `markdown` to this many UTF-16 code units. Doc
     * pages can run >100 KB; default-mode callers exploring a
     * catalog usually want a bounded slice. When truncated,
     * `truncated: true` is set and a `…` marker is appended.
     */
    maxChars: z
      .number()
      .int()
      .min(100)
      .max(200000)
      .optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const inspectFpfAnchorInputSchema = z
  .object({
    anchorId: z.string().min(1).max(MAX_SELECTOR_LENGTH),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const expandFpfCitationsInputSchema = z
  .object({
    citationIds: z
      .array(z.string().min(1).max(MAX_SELECTOR_LENGTH))
      .min(1)
      .max(MAX_CITATION_COUNT),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const traceFpfPathInputSchema = z
  .object({
    question: z.string().min(1).max(MAX_QUESTION_LENGTH),
    mode: answerModeSchema.optional(),
    forceRefresh: z.boolean().optional(),
    sessionId: z.string().min(1).max(MAX_SELECTOR_LENGTH).optional(),
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
    part: z.string().max(MAX_FILTER_LENGTH).optional(),
    status: z.string().max(MAX_FILTER_LENGTH).optional(),
    kind: nodeKindSchema.optional(),
    /** Page size. Defaults to 50; capped at 500. */
    limit: z.number().int().min(1).max(500).optional(),
    /**
     * Zero-based paging offset into the filtered catalog ordering. Walk
     * pages by passing the previous response's `nextOffset`. Bounded well
     * above the catalog size to refuse pathological values on the public
     * endpoint.
     */
    offset: z.number().int().min(0).max(MAX_BROWSE_OFFSET).optional(),
    forceRefresh: z.boolean().optional(),
  })
  .strict();

export const browseFpfCatalogResultSchema = z
  .object({
    entries: z.array(catalogEntrySchema),
    total: z.number(),
    /** Zero-based index of the first returned entry in the full ordering. */
    offset: z.number(),
    /** Offset of the next page; omitted on the last page. */
    nextOffset: z.number().optional(),
    filters: z
      .object({
        part: z.string().optional(),
        status: z.string().optional(),
        kind: nodeKindSchema.optional(),
      })
      .strict(),
    didYouMean: z
      .object({
        part: z.string().optional(),
      })
      .strict()
      .optional(),
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
    linkedNodeIds: z.array(z.string()).optional(),
  })
  .strict();

export const searchFpfInputSchema = z
  .object({
    query: z.string().min(1).max(MAX_SEARCH_QUERY_LENGTH),
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
