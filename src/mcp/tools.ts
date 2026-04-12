import { createTool } from '@mastra/core/tools';

import { FpfRuntime } from '../runtime/runtime.js';
import type { AnswerMode, AskFpfResult, QueryResult } from '../runtime/types.js';
import {
  askFpfInputSchema,
  askFpfResultSchema,
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
  traceFpfPathInputSchema,
  traceResultSchema,
} from './tool-contracts.js';

const runtime = new FpfRuntime();
const DEFAULT_QUERY_MODE: AnswerMode = 'verbose';

export const refreshFpfIndexTool = createTool({
  id: 'refresh_fpf_index',
  description:
    'Build or rebuild the local vectorless FPF index from FPF-spec.md and persist the artifact set.',
  inputSchema: refreshFpfIndexInputSchema,
  outputSchema: buildAuditSchema,
  execute: async ({ force }) => runtime.refresh(force ?? false),
});

export const queryFpfSpecTool = createTool({
  id: 'query_fpf_spec',
  description:
    'Answer questions against the local vectorless FPF runtime with auditable IDs, citations, constraints, and freshness metadata.',
  inputSchema: queryFpfSpecInputSchema,
  outputSchema: queryResultSchema,
  execute: async ({ question, mode, forceRefresh, sessionId }) =>
    runtime.query(question, mode ?? resolveDefaultQueryMode(), forceRefresh ?? false, sessionId),
});

export const askFpfTool = createTool({
  id: 'ask_fpf',
  description:
    'Return an FPF answer in markdown with grounding metadata using the local vectorless runtime.',
  inputSchema: askFpfInputSchema,
  outputSchema: askFpfResultSchema,
  execute: async ({ question, mode, forceRefresh, sessionId }) => {
    const result = await runtime.query(
      question,
      mode ?? resolveDefaultQueryMode(),
      forceRefresh ?? false,
      sessionId,
    );
    return renderAskFpfResult(result);
  },
});

export const getFpfIndexStatusTool = createTool({
  id: 'get_fpf_index_status',
  description:
    'Inspect whether the local FPF index exists, whether it is fresh against the current source hash, and which artifacts are present.',
  inputSchema: getFpfIndexStatusInputSchema,
  outputSchema: runtimeStatusSchema,
  execute: async () => runtime.status(),
});

export const inspectFpfNodeTool = createTool({
  id: 'inspect_fpf_node',
  description:
    'Inspect one compiled FPF node by exact ID, route name, or lexeme and return anchors plus neighboring relations.',
  inputSchema: inspectFpfNodeInputSchema,
  outputSchema: inspectResultSchema,
  execute: async ({ selector, kind, forceRefresh }) =>
    runtime.inspect(selector, kind ?? 'auto', forceRefresh ?? false),
});

export const readFpfDocTool = createTool({
  id: 'read_fpf_doc',
  description:
    'Resolve one FPF selector to the canonical generated markdown page and return exact text plus stable markdown/static paths.',
  inputSchema: readFpfDocInputSchema,
  outputSchema: readDocResultSchema,
  execute: async ({ selector, kind, forceRefresh }) =>
    runtime.readDoc(selector, kind ?? 'auto', forceRefresh ?? false),
});

export const inspectFpfAnchorTool = createTool({
  id: 'inspect_fpf_anchor',
  description:
    'Inspect one compiled FPF anchor by exact anchor ID and return raw anchor text plus owning node context.',
  inputSchema: inspectFpfAnchorInputSchema,
  outputSchema: inspectAnchorResultSchema,
  execute: async ({ anchorId, forceRefresh }) =>
    runtime.inspectAnchor(anchorId, forceRefresh ?? false),
});

export const expandFpfCitationsTool = createTool({
  id: 'expand_fpf_citations',
  description:
    'Expand multiple exact citation IDs into raw anchor text plus owning node context without adding new semantics.',
  inputSchema: expandFpfCitationsInputSchema,
  outputSchema: expandCitationsResultSchema,
  execute: async ({ citationIds, forceRefresh }) =>
    runtime.expandCitations(citationIds, forceRefresh ?? false),
});

export const traceFpfPathTool = createTool({
  id: 'trace_fpf_path',
  description:
    'Return the deterministic retrieval trace showing normalization, candidate scores, graph expansion, and selected slices.',
  inputSchema: traceFpfPathInputSchema,
  outputSchema: traceResultSchema,
  execute: async ({ question, mode, forceRefresh, sessionId }) =>
    runtime.trace(question, mode ?? 'compact', forceRefresh ?? false, sessionId),
});

export const fpfMcpTools = {
  refresh_fpf_index: refreshFpfIndexTool,
  get_fpf_index_status: getFpfIndexStatusTool,
  query_fpf_spec: queryFpfSpecTool,
  trace_fpf_path: traceFpfPathTool,
  inspect_fpf_node: inspectFpfNodeTool,
  read_fpf_doc: readFpfDocTool,
  inspect_fpf_anchor: inspectFpfAnchorTool,
  expand_fpf_citations: expandFpfCitationsTool,
  ask_fpf: askFpfTool,
} as const;

export function resolveDefaultQueryMode(env: NodeJS.ProcessEnv = process.env): AnswerMode {
  const mode = env.FPF_QUERY_DEFAULT_MODE?.trim().toLowerCase();
  return mode === 'compact' || mode === 'proof' || mode === 'verbose'
    ? (mode as AnswerMode)
    : DEFAULT_QUERY_MODE;
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
    `- Confidence: ${result.confidence}`,
    `- IDs: ${formatCodeList(result.ids)}`,
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
