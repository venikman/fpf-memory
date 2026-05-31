import type { RuntimeLogger } from '../infra/logging/runtime-logger.js';
import type { FpfMcpTool } from './tools.js';

type UsageOutcome = 'ok' | 'error';
type TextShape = 'empty' | 'short' | 'medium' | 'long';
type SelectorShape = 'exact_id' | 'route_id' | 'anchor_id' | 'phrase' | 'token' | 'unknown';

export interface McpUsageTelemetryEvent {
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
    event: 'mcp_tool_usage',
    toolName: input.toolName,
    outcome: input.outcome,
    durationMs: input.durationMs,
    input: summarizeInput(input.input),
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

function summarizeInput(input: unknown): Record<string, unknown> {
  const record = asRecord(input);
  if (!record) {
    return {};
  }

  const summary: Record<string, unknown> = {};
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

  const ids = collectResolvedIds(toolName, record);
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

function collectResolvedIds(toolName: string, record: Record<string, unknown>): string[] {
  const ids: string[] = [];

  pushStrings(ids, record.ids);
  pushStrings(ids, record.candidateIds);
  pushStrings(ids, record.selectedNodeIds);
  pushString(ids, record.nodeId);

  const node = asRecord(record.node);
  pushString(ids, node?.id);

  const ownerNode = asRecord(record.ownerNode);
  pushString(ids, ownerNode?.id);

  for (const key of ['entries', 'hits', 'candidateScores', 'frontierCandidates'] as const) {
    for (const item of arrayOfRecords(record[key])) {
      pushString(ids, item.id);
      pushString(ids, item.nodeId);
      pushString(ids, item.targetId);
    }
  }

  for (const item of arrayOfRecords(record.items)) {
    const itemOwnerNode = asRecord(item.ownerNode);
    pushString(ids, itemOwnerNode?.id);
  }

  if (toolName === 'refresh_fpf_index') {
    pushCountedIds(ids, record.addedIds);
    pushCountedIds(ids, record.removedIds);
    pushCountedIds(ids, record.changedIds);
  }

  return unique(ids);
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
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is Record<string, unknown> => Boolean(asRecord(item)));
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined;
  }
  return value as Record<string, unknown>;
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
