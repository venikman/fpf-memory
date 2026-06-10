import type { z } from 'zod';

import {
  asSessionId,
  type AnswerMode,
  type AskFpfResult,
  type NodeKind,
  type QueryResult,
} from '../../core/types.js';
import type { FpfRuntime } from '../../runtime/runtime.js';
import type { RuntimeLogger } from '../infra/logging/runtime-logger.js';
import {
  askFpfInputSchema,
  askFpfResultSchema,
  browseFpfCatalogInputSchema,
  browseFpfCatalogResultSchema,
  expandCitationsResultSchema,
  expandFpfCitationsInputSchema,
  getFpfIndexStatusInputSchema,
  inspectAnchorResultSchema,
  inspectFpfAnchorInputSchema,
  inspectFpfNodeInputSchema,
  inspectResultSchema,
  queryFpfSpecInputSchema,
  queryResultSchema,
  readDocResultSchema,
  readFpfDocInputSchema,
  refreshFpfIndexInputSchema,
  runtimeStatusSchema,
  buildAuditSchema,
  searchFpfInputSchema,
  searchFpfResultSchema,
  traceFpfPathInputSchema,
  traceResultSchema,
} from '../../mcp/tool-contracts.js';
import { withMcpUsageTelemetry } from './usage-telemetry.js';

export interface McpToolDependencies {
  defaultQueryMode: AnswerMode;
  runtime: FpfRuntime;
  logger?: RuntimeLogger;
}

export interface FpfMcpTool<
  TInputSchema extends z.ZodType = z.ZodType,
  TOutput extends Record<string, unknown> = Record<string, unknown>,
  TOutputSchema extends z.ZodType<TOutput> = z.ZodType<TOutput>,
> {
  id: string;
  description: string;
  inputSchema: TInputSchema;
  outputSchema: TOutputSchema;
  execute: (input: z.infer<TInputSchema>) => Promise<z.infer<TOutputSchema>>;
}

export type FpfMcpToolMap = Record<string, FpfMcpTool>;

function createFpfMcpTool<
  TInputSchema extends z.ZodType,
  TOutput extends Record<string, unknown>,
  TOutputSchema extends z.ZodType<TOutput>,
>(
  tool: FpfMcpTool<TInputSchema, TOutput, TOutputSchema>,
): FpfMcpTool<TInputSchema, TOutput, TOutputSchema> {
  return tool;
}

export function createMcpTools(dependencies: McpToolDependencies) {
  const { runtime } = dependencies;
  const withTelemetry = <TTool extends FpfMcpTool>(tool: TTool): TTool =>
    withMcpUsageTelemetry(tool, dependencies.logger);

  const runQuery = async (input: {
    question: string;
    mode: AnswerMode | undefined;
    forceRefresh: boolean;
    sessionId: string | undefined;
  }) =>
    runtime.query(
      input.question.trim(),
      input.mode ?? dependencies.defaultQueryMode,
      input.forceRefresh,
      input.sessionId ? asSessionId(input.sessionId) : undefined,
    );

  const refreshFpfIndexTool = withTelemetry(createFpfMcpTool({
    id: 'refresh_fpf_index',
    description:
      'Build or rebuild the compiler-backed vectorless FPF index from the configured spec source and persist the artifact set.',
    inputSchema: refreshFpfIndexInputSchema,
    outputSchema: buildAuditSchema,
    execute: async ({ force }) => runtime.refresh(force ?? false),
  }));

  const queryFpfSpecTool = withTelemetry(createFpfMcpTool({
    id: 'query_fpf_spec',
    description:
      'Answer questions against the compiler-backed vectorless FPF runtime with auditable IDs, citations, constraints, and freshness metadata.',
    inputSchema: queryFpfSpecInputSchema,
    outputSchema: queryResultSchema,
    execute: async ({ question, mode, forceRefresh, sessionId }) =>
      runQuery({
        question,
        mode,
        forceRefresh: forceRefresh ?? false,
        sessionId,
      }),
  }));

  const askFpfTool = withTelemetry(createFpfMcpTool({
    id: 'ask_fpf',
    description:
      'Return an FPF answer in markdown with grounding metadata using the compiler-backed vectorless runtime.',
    inputSchema: askFpfInputSchema,
    outputSchema: askFpfResultSchema,
    execute: async ({ question, mode, forceRefresh, sessionId }) => {
      const result = await runQuery({
        question,
        mode,
        forceRefresh: forceRefresh ?? false,
        sessionId,
      });
      return renderAskFpfResult(result);
    },
  }));

  const getFpfIndexStatusTool = withTelemetry(createFpfMcpTool({
    id: 'get_fpf_index_status',
    description:
      'Inspect whether the current FPF runtime index exists, whether it is fresh against the current source hash, and which artifacts are present.',
    inputSchema: getFpfIndexStatusInputSchema,
    outputSchema: runtimeStatusSchema,
    execute: async () => runtime.status(),
  }));

  const inspectFpfNodeTool = withTelemetry(createFpfMcpTool({
    id: 'inspect_fpf_node',
    description:
      'Inspect one compiled FPF node by exact ID, route name, or lexeme and return anchors plus neighboring relations.',
    inputSchema: inspectFpfNodeInputSchema,
    outputSchema: inspectResultSchema,
    execute: async ({ selector, kind, forceRefresh }) =>
      runtime.inspect(selector.trim(), kind ?? 'auto', forceRefresh ?? false),
  }));

  const readFpfDocTool = withTelemetry(createFpfMcpTool({
    id: 'read_fpf_doc',
    description:
      'Resolve one FPF selector to the canonical generated markdown page and return exact text plus stable markdown/static paths. Pass `mode: "preview"` for headings + size + a short snippet without the full markdown body.',
    inputSchema: readFpfDocInputSchema,
    outputSchema: readDocResultSchema,
    execute: async ({ selector, kind, mode, maxChars, forceRefresh }) =>
      runtime.readDoc(selector.trim(), kind ?? 'auto', {
        mode,
        maxChars,
        forceRefresh: forceRefresh ?? false,
      }),
  }));

  const inspectFpfAnchorTool = withTelemetry(createFpfMcpTool({
    id: 'inspect_fpf_anchor',
    description:
      'Inspect one compiled FPF anchor by exact anchor ID and return raw anchor text plus owning node context.',
    inputSchema: inspectFpfAnchorInputSchema,
    outputSchema: inspectAnchorResultSchema,
    execute: async ({ anchorId, forceRefresh }) =>
      runtime.inspectAnchor(anchorId.trim(), forceRefresh ?? false),
  }));

  const expandFpfCitationsTool = withTelemetry(createFpfMcpTool({
    id: 'expand_fpf_citations',
    description:
      'Expand multiple exact citation IDs into raw anchor text plus owning node context without adding new semantics.',
    inputSchema: expandFpfCitationsInputSchema,
    outputSchema: expandCitationsResultSchema,
    execute: async ({ citationIds, forceRefresh }) =>
      runtime.expandCitations(citationIds, forceRefresh ?? false),
  }));

  const traceFpfPathTool = withTelemetry(createFpfMcpTool({
    id: 'trace_fpf_path',
    description:
      'Return the deterministic retrieval trace showing normalization, candidate scores, graph expansion, and selected slices.',
    inputSchema: traceFpfPathInputSchema,
    outputSchema: traceResultSchema,
    execute: async ({ question, mode, forceRefresh, sessionId }) =>
      runtime.trace(
        question.trim(),
        mode ?? 'compact',
        forceRefresh ?? false,
        sessionId ? asSessionId(sessionId) : undefined,
      ),
  }));

  const browseFpfCatalogTool = withTelemetry(createFpfMcpTool({
    id: 'browse_fpf_catalog',
    description:
      'Browse the FPF catalog of compiled patterns, routes, and lexicon entries. Filter by part, status, or kind to discover relevant material before drilling into individual nodes. Results are paged: pass the previous response\'s `nextOffset` as `offset` to fetch the next page.',
    inputSchema: browseFpfCatalogInputSchema,
    outputSchema: browseFpfCatalogResultSchema,
    execute: async ({ part, status, kind, limit, offset, forceRefresh }) =>
      runtime.browse({
        part,
        status,
        kind: kind as NodeKind | undefined,
        limit,
        offset,
        forceRefresh: forceRefresh ?? false,
      }),
  }));

  const searchFpfTool = withTelemetry(createFpfMcpTool({
    id: 'search_fpf',
    description:
      'Full-text search across all compiled FPF nodes. Returns ranked hits with contextual snippets. Use this to find patterns, routes, or lexicon entries by keyword or concept.',
    inputSchema: searchFpfInputSchema,
    outputSchema: searchFpfResultSchema,
    execute: async ({ query, kind, limit, forceRefresh }) =>
      runtime.search(query.trim(), {
        kind: kind as NodeKind | undefined,
        limit,
        forceRefresh: forceRefresh ?? false,
      }),
  }));

  const fpfPublicTools = {
    browse_fpf_catalog: browseFpfCatalogTool,
    search_fpf: searchFpfTool,
    ask_fpf: askFpfTool,
    query_fpf_spec: queryFpfSpecTool,
    read_fpf_doc: readFpfDocTool,
    get_fpf_index_status: getFpfIndexStatusTool,
  } as const;

  const fpfExpertTools = {
    inspect_fpf_node: inspectFpfNodeTool,
    inspect_fpf_anchor: inspectFpfAnchorTool,
    expand_fpf_citations: expandFpfCitationsTool,
    trace_fpf_path: traceFpfPathTool,
  } as const;

  const fpfAdminTools = {
    refresh_fpf_index: refreshFpfIndexTool,
  } as const;

  const fpfMcpTools = {
    ...fpfPublicTools,
    ...fpfExpertTools,
    ...fpfAdminTools,
  } as const;

  return {
    refreshFpfIndexTool,
    queryFpfSpecTool,
    askFpfTool,
    getFpfIndexStatusTool,
    inspectFpfNodeTool,
    readFpfDocTool,
    inspectFpfAnchorTool,
    expandFpfCitationsTool,
    traceFpfPathTool,
    browseFpfCatalogTool,
    searchFpfTool,
    fpfPublicTools,
    fpfExpertTools,
    fpfAdminTools,
    fpfMcpTools,
  };
}

export function renderAskFpfResult(result: QueryResult): AskFpfResult {
  return {
    question: result.question,
    mode: result.mode,
    markdown: renderMarkdown(result),
    ids: result.ids,
    citations: result.citations,
    constraints: result.constraints,
    gaps: result.gaps,
    confidence: result.confidence,
    candidateIds: result.candidateIds,
    requestedShape: result.requestedShape,
    shapeProduced: result.shapeProduced,
    status: result.status,
    snapshot: result.snapshot,
    groundingChain: result.groundingChain,
  };
}

function renderMarkdown(result: QueryResult): string {
  const lines: string[] = ['## Result', '', result.answer];

  if (result.constraints.length > 0) {
    lines.push(
      '',
      '## Constraints',
      '',
      ...result.constraints.map((constraint) => `- ${sanitizeListItem(constraint)}`),
    );
  }

  if (result.gaps.length > 0) {
    lines.push('', '## Gaps', '', ...result.gaps.map((gap) => `- ${sanitizeListItem(gap)}`));
  }

  lines.push(
    '',
    '## Grounding',
    '',
    `- Mode: \`${result.mode}\``,
    `- Status: \`${result.status}\``,
    `- Confidence: ${result.confidence ?? 'n/a'}`,
    `- IDs: ${formatCodeList(result.ids)}`,
    ...(result.candidateIds ? [`- Candidate IDs: ${formatCodeList(result.candidateIds)}`] : []),
    `- Citations: ${formatCodeList(result.citations)}`,
    `- Snapshot: \`${result.snapshot.sourceHash}\` at \`${result.snapshot.builtAt}\``,
  );

  if (result.groundingChain && result.groundingChain.length > 0) {
    lines.push(
      '',
      '## Grounding Chain',
      '',
      ...result.groundingChain.map((item) => `- ${sanitizeListItem(item)}`),
    );
  }

  return lines.join('\n');
}

function sanitizeListItem(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatCodeList(items: string[]): string {
  return items.length > 0 ? items.map((item) => `\`${item}\``).join(', ') : 'none';
}
