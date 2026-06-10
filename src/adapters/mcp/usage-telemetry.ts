import {
  arrayOfRecords as arrayOfRecordsField,
  recordField as asRecord,
} from '../../core/unknown-fields.js';
import type { RuntimeLogger } from '../infra/logging/runtime-logger.js';
import type { FpfMcpTool } from './tools.js';

type UsageOutcome = 'ok' | 'error';
type TextShape = 'empty' | 'short' | 'medium' | 'long';
type SelectorShape = 'exact_id' | 'route_id' | 'anchor_id' | 'phrase' | 'token' | 'unknown';
export type UsageIntentCategory =
  | 'adoption_setup'
  | 'concept_definition'
  | 'route_selection'
  | 'work_evaluation'
  | 'troubleshooting'
  | 'pattern_lookup'
  | 'catalog_browse'
  | 'index_health'
  | 'unknown';

export interface McpUsageTelemetryEvent {
  schemaVersion: 3;
  event: 'mcp_tool_usage';
  toolName: string;
  outcome: UsageOutcome;
  durationMs: number;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: Record<string, unknown>;
  privacy: {
    rawInputLogged: false;
    rawQuestionLogged: false;
    rawSelectorLogged: false;
    rawOutputTextLogged: false;
  };
}

export function withMcpUsageTelemetry<TTool extends FpfMcpTool>(
  tool: TTool,
  logger: RuntimeLogger | undefined,
): TTool {
  if (!logger) {
    return tool;
  }

  return {
    ...tool,
    execute: async (input) => {
      const startedAt = Date.now();
      try {
        const output = await tool.execute(input);
        const event = createMcpUsageTelemetryEvent({
          toolName: tool.id,
          outcome: 'ok',
          durationMs: Date.now() - startedAt,
          input,
          output,
        });
        logger.info('MCP tool usage', { ...event });
        return output;
      } catch (error) {
        const event = createMcpUsageTelemetryEvent({
          toolName: tool.id,
          outcome: 'error',
          durationMs: Date.now() - startedAt,
          input,
          error,
        });
        logger.warn('MCP tool usage', { ...event });
        throw error;
      }
    },
  } as TTool;
}

export function createMcpUsageTelemetryEvent(input: {
  toolName: string;
  outcome: UsageOutcome;
  durationMs: number;
  input: unknown;
  output?: unknown;
  error?: unknown;
}): McpUsageTelemetryEvent {
  return {
    schemaVersion: 3,
    event: 'mcp_tool_usage',
    toolName: input.toolName,
    outcome: input.outcome,
    durationMs: input.durationMs,
    input: summarizeInput(input.input, input.toolName),
    ...(input.output === undefined ? {} : { output: summarizeOutput(input.toolName, input.output) }),
    ...(input.error === undefined ? {} : { error: summarizeError(input.error) }),
    privacy: {
      rawInputLogged: false,
      rawQuestionLogged: false,
      rawSelectorLogged: false,
      rawOutputTextLogged: false,
    },
  };
}

function summarizeInput(input: unknown, toolName: string): Record<string, unknown> {
  const record = asRecord(input);
  if (!record) {
    return {
      intentCategory: classifyIntentCategory(toolName, undefined),
    };
  }

  const summary: Record<string, unknown> = {
    intentCategory: classifyIntentCategory(toolName, record),
  };
  copyStringField(record, summary, 'mode');
  copyStringField(record, summary, 'kind');
  copyNumberField(record, summary, 'limit');
  copyNumberField(record, summary, 'maxChars');
  copyBooleanField(record, summary, 'forceRefresh');
  copyBooleanField(record, summary, 'force');

  if (typeof record.part === 'string') {
    summary.part = { shape: classifySelector(record.part) };
  }
  if (typeof record.status === 'string') {
    summary.statusFilter = { shape: classifySelector(record.status) };
  }
  if (typeof record.question === 'string') {
    summary.question = summarizeText(record.question);
  }
  if (typeof record.query === 'string') {
    summary.query = summarizeText(record.query);
  }
  if (typeof record.selector === 'string') {
    summary.selector = { shape: classifySelector(record.selector) };
  }
  if (typeof record.anchorId === 'string') {
    summary.anchor = { shape: classifySelector(record.anchorId) };
  }
  if (Array.isArray(record.citationIds)) {
    summary.citations = {
      count: record.citationIds.length,
      selectorShapes: countBy(
        record.citationIds
          .filter((item): item is string => typeof item === 'string')
          .map(classifySelector),
      ),
    };
  }
  if (typeof record.sessionId === 'string') {
    summary.sessionPresent = true;
  }

  return summary;
}

function classifyIntentCategory(
  toolName: string,
  input: Record<string, unknown> | undefined,
): UsageIntentCategory {
  if (toolName === 'get_fpf_index_status' || toolName === 'refresh_fpf_index') {
    return 'index_health';
  }
  if (toolName === 'browse_fpf_catalog') {
    return 'catalog_browse';
  }

  const text = collectClassifiableInputText(input);
  const textCategory = text ? classifyIntentText(text) : 'unknown';
  if (textCategory !== 'unknown') {
    return textCategory;
  }

  if (
    toolName === 'read_fpf_doc' ||
    toolName === 'inspect_fpf_node' ||
    toolName === 'inspect_fpf_anchor' ||
    toolName === 'expand_fpf_citations' ||
    toolName === 'search_fpf' ||
    toolName === 'query_fpf_spec' ||
    toolName === 'ask_fpf' ||
    toolName === 'trace_fpf_path'
  ) {
    return 'pattern_lookup';
  }

  return 'unknown';
}

function collectClassifiableInputText(input: Record<string, unknown> | undefined): string {
  if (!input) {
    return '';
  }
  return ['question', 'query', 'selector', 'anchorId', 'part', 'status']
    .map((key) => input[key])
    .filter((value): value is string => typeof value === 'string')
    .join(' ')
    .toLowerCase();
}

function classifyIntentText(value: string): UsageIntentCategory {
  if (/\b(connect|setup|set up|install|configure|configuration|client|endpoint|mcp|claude|codex|chatgpt|http|streamable|start here)\b/u.test(value)) {
    return 'adoption_setup';
  }
  if (/\b(error|broken|fail|fails|failed|failure|not working|stale|debug|diagnose|fix|troubleshoot|404|405|timeout)\b/u.test(value)) {
    return 'troubleshooting';
  }
  if (/\b(evaluate|evaluation|review|rubric|score|assess|assessment|conformance|compliance|pr|pull request|branch|working tree|work)\b/u.test(value)) {
    return 'work_evaluation';
  }
  if (/\b(route|path|which route|where should|where do i start|first honest burden|reroute)\b/u.test(value)) {
    return 'route_selection';
  }
  if (/\b(define|definition|meaning|what is|what are|explain|glossary|concept)\b/u.test(value)) {
    return 'concept_definition';
  }
  if (/\b(pattern|catalog|id|citation|doc|document|read|lookup|search|find|anchor)\b/u.test(value)) {
    return 'pattern_lookup';
  }
  return 'unknown';
}

function summarizeOutput(toolName: string, output: unknown): Record<string, unknown> {
  const record = asRecord(output);
  if (!record) {
    return {};
  }

  const summary: Record<string, unknown> = {};
  copyStringField(record, summary, 'status');
  copyStringField(record, summary, 'mode');
  copyStringField(record, summary, 'resolvedAs');
  copyBooleanField(record, summary, 'shapeProduced');
  copyBooleanField(record, summary, 'fresh');
  copyBooleanField(record, summary, 'snapshotExists');
  copyBooleanField(record, summary, 'rebuilt');
  copyBooleanField(record, summary, 'truncated');
  copyBooleanField(record, summary, 'routeWins');
  copyBooleanField(record, summary, 'sufficient');
  copyBooleanField(record, summary, 'sessionApplied');
  copyStringField(record, summary, 'requestedShape');
  copyStringField(record, summary, 'reason');
  copyNumberField(record, summary, 'total');
  copyNumberField(record, summary, 'markdownChars');

  const usageIds = collectUsageIds(toolName, record);
  copyIdSummary(summary, 'candidate', usageIds.candidateIds);
  copyIdSummary(summary, 'resolved', usageIds.resolvedIds);
  copyIdSummary(summary, 'served', usageIds.servedIds);
  copyIdSummary(summary, 'cited', usageIds.citedIds);
  copyIdSummary(summary, 'docSurface', usageIds.docSurfaceIds);
  copyIdSummary(summary, 'servedRoute', usageIds.servedRouteIds);

  const ids = usageIds.resolvedIds;
  if (ids.length > 0) {
    summary.resolvedIds = ids.slice(0, 16);
    summary.resolvedIdCount = ids.length;
  }

  const kinds = collectResolvedKinds(record);
  if (kinds.length > 0) {
    summary.resolvedKinds = countBy(kinds);
  }

  addArrayCount(record, summary, 'ids');
  addArrayCount(record, summary, 'candidateIds');
  addArrayCount(record, summary, 'citations');
  addArrayCount(record, summary, 'constraints');
  addArrayCount(record, summary, 'gaps');
  addArrayCount(record, summary, 'groundingChain');
  addArrayCount(record, summary, 'entries');
  addArrayCount(record, summary, 'hits');
  addArrayCount(record, summary, 'anchors');
  addArrayCount(record, summary, 'neighbors');
  addArrayCount(record, summary, 'items');
  addArrayCount(record, summary, 'selectedNodeIds');
  addArrayCount(record, summary, 'selectedAnchorIds');
  addArrayCount(record, summary, 'candidateScores');
  addArrayCount(record, summary, 'frontierCandidates');
  addArrayCount(record, summary, 'retrievalHops');
  addArrayCount(record, summary, 'headings');
  addArrayCount(record, summary, 'addedIds');
  addArrayCount(record, summary, 'removedIds');
  addArrayCount(record, summary, 'changedIds');

  const itemStatuses = arrayOfRecords(record.items)
    .map((item) => item.status)
    .filter((item): item is string => typeof item === 'string');
  if (itemStatuses.length > 0) {
    summary.itemStatuses = countBy(itemStatuses);
  }

  const validation = asRecord(record.validation);
  if (validation) {
    summary.validation = numericFields(validation, [
      'parsedSections',
      'parsedPatterns',
      'parsedRoutes',
      'parsedLexiconEntries',
      'indexMapNodes',
      'missingRequiredFields',
    ]);
  }

  const compiler = asRecord(record.compiler);
  if (compiler) {
    summary.compiler = numericFields(compiler, [
      'compiledNodes',
      'patternNodes',
      'routeNodes',
      'lexiconEntries',
      'anchorCount',
    ]);
  }

  return summary;
}

interface UsageIdSummary {
  candidateIds: string[];
  resolvedIds: string[];
  servedIds: string[];
  citedIds: string[];
  docSurfaceIds: string[];
  servedRouteIds: string[];
}

function collectUsageIds(toolName: string, record: Record<string, unknown>): UsageIdSummary {
  const candidateIds: string[] = [];
  const resolvedIds: string[] = [];
  const servedIds: string[] = [];
  const citedIds: string[] = [];
  const docSurfaceIds: string[] = [];

  pushStrings(servedIds, record.ids);
  pushStrings(resolvedIds, record.ids);
  pushStrings(candidateIds, record.candidateIds);
  pushStrings(candidateIds, nodeIdsFromRecords(record.candidateScores));
  pushStrings(candidateIds, nodeIdsFromRecords(record.frontierCandidates));
  pushStrings(resolvedIds, record.selectedNodeIds);
  pushStrings(servedIds, record.selectedNodeIds);
  pushString(resolvedIds, record.nodeId);
  pushString(servedIds, record.nodeId);
  pushCitationIds(citedIds, record.citations);
  pushCitationIds(citedIds, record.selectedAnchorIds);

  const node = asRecord(record.node);
  pushString(resolvedIds, node?.id);
  pushString(servedIds, node?.id);

  const ownerNode = asRecord(record.ownerNode);
  pushString(resolvedIds, ownerNode?.id);
  pushString(servedIds, ownerNode?.id);

  for (const key of ['entries', 'hits'] as const) {
    for (const item of arrayOfRecords(record[key])) {
      pushString(resolvedIds, item.id);
      pushString(resolvedIds, item.nodeId);
      pushString(resolvedIds, item.targetId);
      pushString(servedIds, item.id);
      pushString(servedIds, item.nodeId);
      pushString(servedIds, item.targetId);
    }
  }

  for (const item of arrayOfRecords(record.items)) {
    const itemOwnerNode = asRecord(item.ownerNode);
    pushString(resolvedIds, itemOwnerNode?.id);
    pushString(servedIds, itemOwnerNode?.id);
  }

  const docRef = asRecord(record.docRef);
  pushString(docSurfaceIds, docRef?.markdownPath);
  pushString(docSurfaceIds, docRef?.staticPath);
  if (toolName === 'read_fpf_doc') {
    pushString(docSurfaceIds, record.nodeId);
  }

  if (toolName === 'refresh_fpf_index') {
    pushCountedIds(resolvedIds, record.addedIds);
    pushCountedIds(resolvedIds, record.removedIds);
    pushCountedIds(resolvedIds, record.changedIds);
  }

  return {
    candidateIds: unique(candidateIds.map(normalizeUsageId).filter(isNonEmptyString)),
    resolvedIds: unique(resolvedIds.map(normalizeUsageId).filter(isNonEmptyString)),
    servedIds: unique(servedIds.map(normalizeUsageId).filter(isNonEmptyString)),
    citedIds: unique(citedIds.map(normalizeUsageId).filter(isNonEmptyString)),
    docSurfaceIds: unique(docSurfaceIds.map(normalizeDocSurfaceId).filter(isNonEmptyString)),
    servedRouteIds: unique(servedIds.map(normalizeUsageId).filter(isRouteId)),
  };
}

function collectResolvedKinds(record: Record<string, unknown>): string[] {
  const kinds: string[] = [];

  const node = asRecord(record.node);
  pushString(kinds, node?.kind);

  const ownerNode = asRecord(record.ownerNode);
  pushString(kinds, ownerNode?.kind);

  for (const key of ['entries', 'hits', 'candidateScores', 'frontierCandidates'] as const) {
    for (const item of arrayOfRecords(record[key])) {
      pushString(kinds, item.kind);
    }
  }

  for (const item of arrayOfRecords(record.items)) {
    const itemOwnerNode = asRecord(item.ownerNode);
    pushString(kinds, itemOwnerNode?.kind);
  }

  return kinds;
}

function summarizeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
    };
  }
  return {
    type: typeof error,
  };
}

function summarizeText(value: string): { shape: TextShape } {
  const normalizedLength = value.trim().length;
  if (normalizedLength === 0) {
    return { shape: 'empty' };
  }
  if (normalizedLength <= 80) {
    return { shape: 'short' };
  }
  if (normalizedLength <= 240) {
    return { shape: 'medium' };
  }
  return { shape: 'long' };
}

function classifySelector(value: string): SelectorShape {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'unknown';
  }
  if (/^route:[a-z0-9][a-z0-9-]*$/i.test(trimmed)) {
    return 'route_id';
  }
  if (/^[A-Z](?:\.[A-Z0-9]+)+(?:[-._][A-Z0-9]+)*$/i.test(trimmed)) {
    return 'exact_id';
  }
  if (/^[A-Z](?:\.[A-Z0-9]+)+(?:[-._][A-Z0-9]+)*[:/][^\\s]+$/i.test(trimmed)) {
    return 'anchor_id';
  }
  if (/\s/.test(trimmed)) {
    return 'phrase';
  }
  return 'token';
}

function copyStringField(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  key: string,
): void {
  const value = source[key];
  if (typeof value === 'string') {
    target[key] = value;
  }
}

function copyNumberField(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  key: string,
): void {
  const value = source[key];
  if (typeof value === 'number' && Number.isFinite(value)) {
    target[key] = value;
  }
}

function copyBooleanField(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  key: string,
): void {
  const value = source[key];
  if (typeof value === 'boolean') {
    target[key] = value;
  }
}

function addArrayCount(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  key: string,
): void {
  const value = source[key];
  if (Array.isArray(value)) {
    target[`${key}Count`] = value.length;
  }
}

function numericFields(
  source: Record<string, unknown>,
  keys: string[],
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      result[key] = value;
    }
  }
  return result;
}

function arrayOfRecords(value: unknown): Array<Record<string, unknown>> {
  return arrayOfRecordsField(value) ?? [];
}

function pushString(target: string[], value: unknown): void {
  if (typeof value === 'string' && value) {
    target.push(value);
  }
}

function pushStrings(target: string[], value: unknown): void {
  if (!Array.isArray(value)) {
    return;
  }
  for (const item of value) {
    pushString(target, item);
  }
}

function pushCitationIds(target: string[], value: unknown): void {
  if (!Array.isArray(value)) {
    return;
  }
  for (const item of value) {
    if (typeof item === 'string') {
      target.push(normalizeCitationId(item));
    }
  }
}

function nodeIdsFromRecords(value: unknown): string[] {
  return arrayOfRecords(value)
    .flatMap((item) => [item.id, item.nodeId, item.targetId])
    .filter((item): item is string => typeof item === 'string');
}

function copyIdSummary(
  target: Record<string, unknown>,
  prefix: 'candidate' | 'resolved' | 'served' | 'cited' | 'docSurface' | 'servedRoute',
  ids: string[],
): void {
  if (ids.length === 0) {
    return;
  }
  target[`${prefix}Ids`] = ids.slice(0, 16);
  target[`${prefix}IdCount`] = ids.length;
  const patternIds = ids.filter(isPatternId);
  if (patternIds.length > 0) {
    target[`${prefix}PatternIds`] = patternIds.slice(0, 16);
    target[`${prefix}PatternIdCount`] = patternIds.length;
  }
}

function normalizeUsageId(value: string): string {
  return value.trim();
}

function normalizeCitationId(value: string): string {
  const trimmed = value.trim();
  if (isRouteId(trimmed)) {
    return trimmed;
  }
  return trimmed.split(/[:/]/u)[0] ?? trimmed;
}

function normalizeDocSurfaceId(value: string): string {
  return value.trim().replace(/^docs\//u, '').replace(/\.md$/u, '');
}

function isPatternId(value: string): boolean {
  return /^[A-Z](?:\.[A-Z0-9]+)+(?:[-._][A-Z0-9]+)*$/iu.test(value);
}

function isRouteId(value: string): boolean {
  return /^route:[a-z0-9][a-z0-9-]*$/iu.test(value);
}

function isNonEmptyString(value: string): boolean {
  return value.length > 0;
}

function pushCountedIds(target: string[], value: unknown): void {
  if (!Array.isArray(value)) {
    return;
  }
  for (const item of value.slice(0, 16)) {
    pushString(target, item);
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function countBy(values: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
}
