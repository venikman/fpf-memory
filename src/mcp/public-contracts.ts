import { z } from 'zod';

export const answerModeSchema = z.enum(['compact', 'verbose', 'proof']);
export const answerStatusSchema = z.enum([
  'ok',
  'not_found',
  'ambiguous',
  'unsupported',
  'stale_snapshot_prevented',
]);
export const lmStudioApiStyleSchema = z.enum(['responses', 'lmstudio_chat', 'chat_completions']);
export const observabilityFormatSchema = z.enum(['flat', 'tree', 'normalized']);
export const observabilityLogLevelSchema = z.enum([
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
]);

export const relationEdgeSchema = z
  .object({
    from: z.string(),
    relation: z.string(),
    to: z.string(),
  })
  .strict();

export const snapshotWithRebuildSchema = z
  .object({
    sourceHash: z.string(),
    builtAt: z.string(),
    rebuilt: z.boolean(),
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
        apiStyle: lmStudioApiStyleSchema.optional(),
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
      })
      .strict(),
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

export type QueryFpfSpecInput = z.infer<typeof queryFpfSpecInputSchema>;
export type AskFpfInput = z.infer<typeof askFpfInputSchema>;
export type GetFpfIndexStatusInput = z.infer<typeof getFpfIndexStatusInputSchema>;
