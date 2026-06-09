import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  ARTIFACT_FILENAMES,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
} from '../core/constants.js';
import { publishCurrentManifestSchema } from './published-surface.js';

export const DEFAULT_USAGE_REPORT_LOG_PATH = '.runtime/logs/fpf-runtime.log';
export const DEFAULT_USAGE_REPORT_LIMIT = 20;
export const USAGE_PRIVACY_STATEMENT =
  'Usage reports aggregate sanitized MCP telemetry only. They do not include raw questions, prompts, answer text, selectors, markdown bodies, session IDs, IP addresses, or user identifiers.';
export const UNKNOWN_INTENT_CATEGORY = 'unknown';

export type UsageReportState = 'ok' | 'config_error';
export type UsageReportFormat = 'json' | 'markdown';
export type UsageReportSourceKind = 'file' | 'vercel';
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

export interface UsageWindow {
  label: string;
  start: string;
  end: string;
  durationMs: number;
}

export interface UsageReportPublication {
  upstreamRef: string;
  sourceHash: string;
  compilerFingerprint: string;
  publishedAt: string;
}

export interface UsageReportSource {
  kind: UsageReportSourceKind;
  description: string;
  logPath?: string;
  vercelQuery?: string;
}

export interface UsageRank {
  id: string;
  count: number;
}

export interface UsageMaterialRank extends UsageRank {
  title?: string;
  kind?: string;
  status?: string;
  part?: string;
  cluster?: string;
}

export interface UsageRate {
  toolName: string;
  calls: number;
  count: number;
  rate: number;
}

export interface UsageDurationByTool {
  toolName: string;
  calls: number;
  averageMs: number;
  p95Ms: number;
  maxMs: number;
}

export interface UsageReportTotals {
  rawLineCount: number;
  validEventCount: number;
  invalidEventCount: number;
  outOfWindowEventCount: number;
  legacyEventCount: number;
  unknownUnresolvedEventCount: number;
}

export interface UsageReport {
  state: UsageReportState;
  ok: boolean;
  generatedAt: string;
  window: UsageWindow;
  source: UsageReportSource;
  publication: UsageReportPublication;
  totals: UsageReportTotals;
  topServedPatternIds: UsageRank[];
  topCitedPatternIds: UsageRank[];
  topResolvedPatternIds: UsageRank[];
  topCandidatePatternIds: UsageRank[];
  topDocSurfaceIds: UsageRank[];
  topRouteIds: UsageRank[];
  topTools: UsageRank[];
  topIntentCategories: UsageRank[];
  topInputShapes: UsageRank[];
  topModes: UsageRank[];
  statusCounts: UsageRank[];
  schemaVersions: UsageRank[];
  emptyResultRateByTool: UsageRate[];
  errorRateByTool: UsageRate[];
  ambiguousRateByTool: UsageRate[];
  durationByTool: UsageDurationByTool[];
  topServedPatterns: UsageMaterialRank[];
  topCitedPatterns: UsageMaterialRank[];
  topResolvedPatterns: UsageMaterialRank[];
  topCandidatePatterns: UsageMaterialRank[];
  topRoutes: UsageMaterialRank[];
  unknownUnresolvedRate: number;
  operatorActionRequired: boolean;
  triageFindings: string[];
  summary: string;
  privacyStatement: string;
  caveats: string[];
}

interface UsageEvent {
  timestamp: Date;
  schemaVersion: number;
  toolName: string;
  outcome: 'ok' | 'error';
  durationMs: number;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

interface UsageMaterialInfo {
  title?: string;
  kind?: string;
  status?: string;
  part?: string;
  cluster?: string;
}

export interface BuildUsageReportInput {
  lines: string[];
  source: UsageReportSource;
  windowLabel: string;
  now?: Date;
  cwd?: string;
  limit?: number;
}

export async function buildUsageReportFromLines(
  input: BuildUsageReportInput,
): Promise<UsageReport> {
  const now = input.now ?? new Date();
  const window = resolveUsageWindow(input.windowLabel, now);
  const publication = await readUsageReportPublication(input.cwd);
  const materialCatalog = await readUsageMaterialCatalog(input.cwd);
  const counts = createCounts();
  const toolCalls = new Map<string, number>();
  const schemaVersions = new Map<string, number>();
  const intentCategories = new Map<string, number>();
  const inputShapes = new Map<string, number>();
  const modes = new Map<string, number>();
  const statuses = new Map<string, number>();
  const emptyResults = new Map<string, number>();
  const errors = new Map<string, number>();
  const ambiguousResults = new Map<string, number>();
  const durations = new Map<string, number[]>();
  const totals: UsageReportTotals = {
    rawLineCount: input.lines.length,
    validEventCount: 0,
    invalidEventCount: 0,
    outOfWindowEventCount: 0,
    legacyEventCount: 0,
    unknownUnresolvedEventCount: 0,
  };

  for (const line of input.lines) {
    if (!line.trim()) {
      continue;
    }
    const parsed = parseUsageLogLine(line);
    if (!parsed.ok) {
      totals.invalidEventCount += 1;
      continue;
    }
    const event = parsed.event;
    if (event.timestamp < new Date(window.start) || event.timestamp > new Date(window.end)) {
      totals.outOfWindowEventCount += 1;
      continue;
    }

    totals.validEventCount += 1;
    if (event.schemaVersion < 2) {
      totals.legacyEventCount += 1;
    }
    increment(schemaVersions, String(event.schemaVersion));
    increment(toolCalls, event.toolName);
    increment(intentCategories, getEventIntentCategory(event));
    addInputShapeCounts(inputShapes, event.input);
    const mode = optionalString(event.input.mode);
    if (mode) {
      increment(modes, mode);
    }
    const status = getEventStatus(event);
    increment(statuses, status);
    addDuration(durations, event.toolName, event.durationMs);
    if (event.outcome === 'error') {
      increment(errors, event.toolName);
    }
    if (status === 'ambiguous') {
      increment(ambiguousResults, event.toolName);
    }
    if (isEmptyResult(event)) {
      increment(emptyResults, event.toolName);
    }

    const servedPatterns = stringArray(event.output.servedPatternIds);
    const citedPatterns = stringArray(event.output.citedPatternIds);
    const resolvedPatterns = stringArray(event.output.resolvedPatternIds);
    const candidatePatterns = stringArray(event.output.candidatePatternIds);
    const docSurfaces = stringArray(event.output.docSurfaceIds);
    const routes = stringArray(event.output.servedRouteIds);
    addAll(counts.servedPatternIds, servedPatterns);
    addAll(counts.citedPatternIds, citedPatterns);
    addAll(counts.resolvedPatternIds, resolvedPatterns);
    addAll(counts.candidatePatternIds, candidatePatterns);
    addAll(counts.docSurfaceIds, docSurfaces);
    addAll(counts.routeIds, routes);

    if (
      event.outcome === 'ok'
      &&
      servedPatterns.length === 0
      && citedPatterns.length === 0
      && resolvedPatterns.length === 0
      && candidatePatterns.length === 0
      && docSurfaces.length === 0
      && routes.length === 0
    ) {
      totals.unknownUnresolvedEventCount += 1;
    }
  }

  const limit = input.limit ?? DEFAULT_USAGE_REPORT_LIMIT;
  const topServedPatternIds = topCounts(counts.servedPatternIds, limit);
  const topCitedPatternIds = topCounts(counts.citedPatternIds, limit);
  const topResolvedPatternIds = topCounts(counts.resolvedPatternIds, limit);
  const topCandidatePatternIds = topCounts(counts.candidatePatternIds, limit);
  const topRouteIds = topCounts(counts.routeIds, limit);
  const topTools = topCounts(toolCalls, limit);
  const emptyResultRateByTool = rates(toolCalls, emptyResults);
  const errorRateByTool = rates(toolCalls, errors);
  const ambiguousRateByTool = rates(toolCalls, ambiguousResults);
  const unknownUnresolvedRate = calculateRate(
    totals.unknownUnresolvedEventCount,
    totals.validEventCount,
  );
  const triageFindings = buildTriageFindings({
    state: 'ok',
    totals,
    emptyResultRateByTool,
    errorRateByTool,
    unknownUnresolvedRate,
  });
  const report: UsageReport = {
    state: 'ok',
    ok: true,
    generatedAt: now.toISOString(),
    window,
    source: input.source,
    publication,
    totals,
    topServedPatternIds,
    topCitedPatternIds,
    topResolvedPatternIds,
    topCandidatePatternIds,
    topDocSurfaceIds: topCounts(counts.docSurfaceIds, limit),
    topRouteIds,
    topTools,
    topIntentCategories: topCounts(intentCategories, limit),
    topInputShapes: topCounts(inputShapes, limit),
    topModes: topCounts(modes, limit),
    statusCounts: topCounts(statuses, limit),
    schemaVersions: topCounts(schemaVersions, limit),
    emptyResultRateByTool,
    errorRateByTool,
    ambiguousRateByTool,
    durationByTool: durationStats(durations),
    topServedPatterns: enrichRanks(topServedPatternIds, materialCatalog),
    topCitedPatterns: enrichRanks(topCitedPatternIds, materialCatalog),
    topResolvedPatterns: enrichRanks(topResolvedPatternIds, materialCatalog),
    topCandidatePatterns: enrichRanks(topCandidatePatternIds, materialCatalog),
    topRoutes: enrichRanks(topRouteIds, materialCatalog),
    unknownUnresolvedRate,
    operatorActionRequired: triageFindings.length > 0,
    triageFindings,
    summary: '',
    privacyStatement: USAGE_PRIVACY_STATEMENT,
    caveats: buildCaveats(totals, input.source),
  };
  report.summary = buildUsageSummary(report);
  return report;
}

export function configErrorUsageReport(input: {
  windowLabel: string;
  now?: Date;
  source: UsageReportSource;
  message: string;
  cwd?: string;
}): Promise<UsageReport> {
  const now = input.now ?? new Date();
  return readUsageReportPublication(input.cwd).then((publication) => {
    const triageFindings = buildTriageFindings({
      state: 'config_error',
      totals: {
        rawLineCount: 0,
        validEventCount: 0,
        invalidEventCount: 0,
        outOfWindowEventCount: 0,
        legacyEventCount: 0,
        unknownUnresolvedEventCount: 0,
      },
      emptyResultRateByTool: [],
      errorRateByTool: [],
      unknownUnresolvedRate: 0,
      configMessage: input.message,
    });
    const report: UsageReport = {
      state: 'config_error' as const,
      ok: false,
      generatedAt: now.toISOString(),
      window: resolveUsageWindow(input.windowLabel, now),
      source: input.source,
      publication,
      totals: {
        rawLineCount: 0,
        validEventCount: 0,
        invalidEventCount: 0,
        outOfWindowEventCount: 0,
        legacyEventCount: 0,
        unknownUnresolvedEventCount: 0,
      },
      topServedPatternIds: [],
      topCitedPatternIds: [],
      topResolvedPatternIds: [],
      topCandidatePatternIds: [],
      topDocSurfaceIds: [],
      topRouteIds: [],
      topTools: [],
      topIntentCategories: [],
      topInputShapes: [],
      topModes: [],
      statusCounts: [],
      schemaVersions: [],
      emptyResultRateByTool: [],
      errorRateByTool: [],
      ambiguousRateByTool: [],
      durationByTool: [],
      topServedPatterns: [],
      topCitedPatterns: [],
      topResolvedPatterns: [],
      topCandidatePatterns: [],
      topRoutes: [],
      unknownUnresolvedRate: 0,
      operatorActionRequired: true,
      triageFindings,
      summary: '',
      privacyStatement: USAGE_PRIVACY_STATEMENT,
      caveats: [input.message, 'No usage counts were produced.'],
    };
    report.summary = buildUsageSummary(report);
    return report;
  });
}

export async function readUsageReportLinesFromFile(logPath: string): Promise<string[]> {
  const bytes = await readFile(logPath, 'utf8');
  return bytes.split(/\r?\n/u).filter((line) => line.trim().length > 0);
}

export function resolveUsageWindow(label: string, now: Date): UsageWindow {
  const durationMs = parseWindowMs(label);
  return {
    label,
    start: new Date(now.getTime() - durationMs).toISOString(),
    end: now.toISOString(),
    durationMs,
  };
}

export function formatUsageReportMarkdown(report: UsageReport): string {
  return `# FPF Weekly Usage Report

State: **${report.state}**

Window: ${report.window.start} -> ${report.window.end} (${report.window.label})

Source: ${report.source.description}

Publication: upstream \`${shortRef(report.publication.upstreamRef)}\`, source \`${report.publication.sourceHash}\`, compiler \`${report.publication.compilerFingerprint}\`

Summary: ${report.summary}

## Usage

- Adoption: ${report.totals.validEventCount > 0 ? 'observed production MCP usage' : 'no observed production MCP use'}
- Valid events: ${report.totals.validEventCount}
- Operator action required: ${report.operatorActionRequired ? 'yes' : 'no'}

### Top Tools

${rankTable(report.topTools)}

## Asked

Telemetry reports safe intent categories and coarse input shapes only; it does not infer exact raw questions.

### Intent Categories

${rankTable(report.topIntentCategories)}

### Input Shapes

${rankTable(report.topInputShapes)}

### Modes

${rankTable(report.topModes)}

## Returned

### Status Counts

${rankTable(report.statusCounts)}

### Empty Result Rate By Tool

${rateTable(report.emptyResultRateByTool)}

### Error Rate By Tool

${rateTable(report.errorRateByTool)}

### Ambiguous Rate By Tool

${rateTable(report.ambiguousRateByTool)}

### Duration By Tool

${durationTable(report.durationByTool)}

## Popular FPF Material

Served IDs are confirmed returned material. Cited/resolved IDs are grounding or resolution evidence. Candidate-only IDs represent demand or ambiguity, not confirmed served content.

### Top Served Patterns

${materialRankTable(report.topServedPatterns)}

### Top Cited Patterns

${materialRankTable(report.topCitedPatterns)}

### Top Resolved Patterns

${materialRankTable(report.topResolvedPatterns)}

### Top Candidate Patterns

${materialRankTable(report.topCandidatePatterns)}

### Top Routes

${materialRankTable(report.topRoutes)}

### Top Doc Surfaces

${rankTable(report.topDocSurfaceIds)}

## Data Quality

- Valid events: ${report.totals.validEventCount}
- Invalid events: ${report.totals.invalidEventCount}
- Out-of-window events: ${report.totals.outOfWindowEventCount}
- Legacy events: ${report.totals.legacyEventCount}
- Unknown/unresolved events: ${report.totals.unknownUnresolvedEventCount} (${formatPercent(report.unknownUnresolvedRate)})

### Schema Versions

${rankTable(report.schemaVersions)}

### Triage Findings

${findingList(report.triageFindings)}

### Caveats

${report.caveats.map((item) => `- ${item}`).join('\n')}

## Privacy

${report.privacyStatement}
`;
}

function parseUsageLogLine(line: string): { ok: true; event: UsageEvent } | { ok: false } {
  try {
    const record = JSON.parse(line) as unknown;
    const envelope = findUsageEnvelope(record);
    if (!envelope) {
      return { ok: false };
    }
    if (containsRawPrivateField(envelope.payload)) {
      return { ok: false };
    }
    const event = normalizeUsageEvent(envelope.payload, envelope.timestamp);
    return event ? { ok: true, event } : { ok: false };
  } catch {
    return { ok: false };
  }
}

function findUsageEnvelope(value: unknown): {
  payload: Record<string, unknown>;
  timestamp?: string;
} | undefined {
  const record = asRecord(value);
  if (!record) {
    return undefined;
  }

  if (record.event === 'mcp_tool_usage') {
    return { payload: record, timestamp: optionalString(record.time) ?? optionalString(record.timestamp) };
  }

  const data = asRecord(record.data);
  if (data?.event === 'mcp_tool_usage') {
    return {
      payload: data,
      timestamp: optionalString(record.time) ?? optionalString(record.timestamp),
    };
  }

  const message = optionalString(record.message) ?? optionalString(record.text);
  if (message?.trim().startsWith('{')) {
    try {
      const nested = JSON.parse(message) as unknown;
      const nestedEnvelope = findUsageEnvelope(nested);
      if (nestedEnvelope) {
        return {
          payload: nestedEnvelope.payload,
          timestamp:
            nestedEnvelope.timestamp
            ?? optionalString(record.time)
            ?? optionalString(record.timestamp),
        };
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function normalizeUsageEvent(
  payload: Record<string, unknown>,
  envelopeTimestamp?: string,
): UsageEvent | undefined {
  const toolName = optionalString(payload.toolName);
  const outcome = payload.outcome === 'error' ? 'error' : payload.outcome === 'ok' ? 'ok' : undefined;
  const timestamp = parseDate(optionalString(payload.time) ?? optionalString(payload.timestamp) ?? envelopeTimestamp);
  if (!toolName || !outcome || !timestamp) {
    return undefined;
  }
  return {
    timestamp,
    schemaVersion: typeof payload.schemaVersion === 'number' ? payload.schemaVersion : 1,
    toolName,
    outcome,
    durationMs: numeric(payload.durationMs) ?? 0,
    input: asRecord(payload.input) ?? {},
    output: asRecord(payload.output) ?? {},
  };
}

function containsRawPrivateField(value: unknown): boolean {
  return containsRawPrivateFieldInner(value, '');
}

function containsRawPrivateFieldInner(value: unknown, key: string): boolean {
  const lowerKey = key.toLowerCase();
  const sensitive = [
    'question',
    'prompt',
    'answer',
    'markdown',
    'selector',
    'sessionid',
    'ip',
    'userid',
    'useridentifier',
    'rawinput',
    'rawquestion',
  ];
  if (sensitive.includes(lowerKey) && typeof value === 'string') {
    return true;
  }
  if (Array.isArray(value)) {
    return value.some((item) => containsRawPrivateFieldInner(item, key));
  }
  const record = asRecord(value);
  if (!record) {
    return false;
  }
  return Object.entries(record).some(([childKey, childValue]) =>
    containsRawPrivateFieldInner(childValue, childKey),
  );
}

async function readUsageReportPublication(cwd = process.cwd()): Promise<UsageReportPublication> {
  const manifestPath = resolve(cwd, PUBLISHED_MANIFEST_PATH);
  const manifest = publishCurrentManifestSchema.parse(
    JSON.parse(await readFile(manifestPath, 'utf8')) as unknown,
  );
  return {
    upstreamRef: manifest.upstreamRef,
    sourceHash: manifest.sourceHash,
    compilerFingerprint: manifest.compilerFingerprint,
    publishedAt: manifest.publishedAt,
  };
}

async function readUsageMaterialCatalog(cwd = process.cwd()): Promise<Map<string, UsageMaterialInfo>> {
  const catalog = new Map<string, UsageMaterialInfo>();
  const snapshotPath = resolve(cwd, PUBLISHED_ARTIFACT_DIR, ARTIFACT_FILENAMES.snapshot);
  let snapshot: Record<string, unknown> | undefined;
  try {
    snapshot = asRecord(JSON.parse(await readFile(snapshotPath, 'utf8')) as unknown);
  } catch {
    return catalog;
  }
  const compiledNodes = asRecord(snapshot?.compiledNodes);
  if (!compiledNodes) {
    return catalog;
  }

  for (const [id, value] of Object.entries(compiledNodes)) {
    const node = asRecord(value);
    if (!node) {
      continue;
    }
    catalog.set(id, {
      title: optionalString(node.title),
      kind: optionalString(node.kind),
      status: optionalString(node.status),
      part: optionalString(node.part),
      cluster: optionalString(node.cluster),
    });
  }
  return catalog;
}

function enrichRanks(
  rows: UsageRank[],
  catalog: Map<string, UsageMaterialInfo>,
): UsageMaterialRank[] {
  return rows.map((row) => ({
    ...row,
    ...catalog.get(row.id),
  }));
}

function parseWindowMs(value: string): number {
  const match = /^(\d+)(m|h|d)$/iu.exec(value.trim());
  if (!match) {
    throw new Error('--window must use a duration like 30m, 24h, or 7d.');
  }
  const amount = Number.parseInt(match[1]!, 10);
  const unit = match[2]!.toLowerCase();
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('--window must be positive.');
  }
  if (unit === 'm') return amount * 60_000;
  if (unit === 'h') return amount * 60 * 60_000;
  return amount * 24 * 60 * 60_000;
}

function createCounts() {
  return {
    servedPatternIds: new Map<string, number>(),
    citedPatternIds: new Map<string, number>(),
    resolvedPatternIds: new Map<string, number>(),
    candidatePatternIds: new Map<string, number>(),
    docSurfaceIds: new Map<string, number>(),
    routeIds: new Map<string, number>(),
  };
}

function addAll(counts: Map<string, number>, ids: string[]): void {
  for (const id of ids) {
    increment(counts, id);
  }
}

function addInputShapeCounts(counts: Map<string, number>, input: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(input)) {
    if (key === 'intentCategory' || key === 'mode' || key === 'sessionPresent') {
      continue;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      increment(counts, `${key}:${String(value)}`);
      continue;
    }
    const record = asRecord(value);
    const shape = optionalString(record?.shape);
    if (shape) {
      increment(counts, `${key}:${shape}`);
      continue;
    }
    if (typeof record?.count === 'number') {
      increment(counts, `${key}:counted`);
    }
  }
}

function addDuration(durations: Map<string, number[]>, toolName: string, durationMs: number): void {
  if (!Number.isFinite(durationMs) || durationMs < 0) {
    return;
  }
  const values = durations.get(toolName) ?? [];
  values.push(durationMs);
  durations.set(toolName, values);
}

function increment(counts: Map<string, number>, key: string): void {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function topCounts(counts: Map<string, number>, limit: number): UsageRank[] {
  return [...counts.entries()]
    .sort(([leftId, leftCount], [rightId, rightCount]) =>
      rightCount - leftCount || leftId.localeCompare(rightId),
    )
    .slice(0, limit)
    .map(([id, count]) => ({ id, count }));
}

function rates(toolCalls: Map<string, number>, counts: Map<string, number>): UsageRate[] {
  return [...toolCalls.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([toolName, calls]) => {
      const count = counts.get(toolName) ?? 0;
      return {
        toolName,
        calls,
        count,
        rate: calls === 0 ? 0 : Math.round((count / calls) * 10_000) / 10_000,
      };
    });
}

function durationStats(durations: Map<string, number[]>): UsageDurationByTool[] {
  return [...durations.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([toolName, values]) => {
      const sorted = [...values].sort((left, right) => left - right);
      const calls = sorted.length;
      return {
        toolName,
        calls,
        averageMs: roundNumber(sum(sorted) / calls),
        p95Ms: sorted[Math.max(0, Math.ceil(calls * 0.95) - 1)] ?? 0,
        maxMs: sorted[calls - 1] ?? 0,
      };
    });
}

function getEventIntentCategory(event: UsageEvent): UsageIntentCategory {
  const category = optionalString(event.input.intentCategory);
  if (isUsageIntentCategory(category)) {
    return category;
  }
  return inferIntentCategoryFromTool(event.toolName);
}

function inferIntentCategoryFromTool(toolName: string): UsageIntentCategory {
  if (toolName === 'get_fpf_index_status' || toolName === 'refresh_fpf_index') {
    return 'index_health';
  }
  if (toolName === 'browse_fpf_catalog') {
    return 'catalog_browse';
  }
  if (
    toolName === 'query_fpf_spec' ||
    toolName === 'ask_fpf' ||
    toolName === 'search_fpf' ||
    toolName === 'read_fpf_doc' ||
    toolName === 'inspect_fpf_node' ||
    toolName === 'inspect_fpf_anchor' ||
    toolName === 'expand_fpf_citations' ||
    toolName === 'trace_fpf_path'
  ) {
    return 'pattern_lookup';
  }
  return UNKNOWN_INTENT_CATEGORY;
}

function isUsageIntentCategory(value: string | undefined): value is UsageIntentCategory {
  return value === 'adoption_setup'
    || value === 'concept_definition'
    || value === 'route_selection'
    || value === 'work_evaluation'
    || value === 'troubleshooting'
    || value === 'pattern_lookup'
    || value === 'catalog_browse'
    || value === 'index_health'
    || value === 'unknown';
}

function getEventStatus(event: UsageEvent): string {
  if (event.outcome === 'error') {
    return 'error';
  }
  return optionalString(event.output.status) ?? 'ok_no_status';
}

function calculateRate(count: number, calls: number): number {
  return calls === 0 ? 0 : Math.round((count / calls) * 10_000) / 10_000;
}

function buildTriageFindings(input: {
  state: UsageReportState;
  totals: UsageReportTotals;
  emptyResultRateByTool: UsageRate[];
  errorRateByTool: UsageRate[];
  unknownUnresolvedRate: number;
  configMessage?: string;
}): string[] {
  const findings: string[] = [];
  if (input.state === 'config_error') {
    findings.push(input.configMessage ?? 'Usage report configuration failed.');
    return findings;
  }

  for (const rate of input.errorRateByTool) {
    if (rate.count > 0) {
      findings.push(`${rate.toolName} error rate is ${formatPercent(rate.rate)} (${rate.count}/${rate.calls}).`);
    }
  }
  for (const rate of input.emptyResultRateByTool) {
    if (rate.calls > 0 && rate.rate > 0.2) {
      findings.push(`${rate.toolName} empty-result rate is ${formatPercent(rate.rate)} (${rate.count}/${rate.calls}).`);
    }
  }
  if (input.totals.validEventCount > 0 && input.unknownUnresolvedRate > 0.15) {
    findings.push(`Unknown/unresolved event rate is ${formatPercent(input.unknownUnresolvedRate)} (${input.totals.unknownUnresolvedEventCount}/${input.totals.validEventCount}).`);
  }
  return findings;
}

function buildUsageSummary(report: UsageReport): string {
  if (report.state === 'config_error') {
    return `Telemetry review did not run: ${report.triageFindings[0] ?? 'configuration error'}`;
  }
  const topTool = report.topTools[0];
  const topIntent = report.topIntentCategories[0];
  const topPattern = report.topServedPatterns[0];
  return [
    `${report.totals.validEventCount} valid MCP usage event${report.totals.validEventCount === 1 ? '' : 's'} observed`,
    topTool ? `top tool ${topTool.id} (${topTool.count})` : 'no top tool',
    topIntent ? `top intent ${topIntent.id} (${topIntent.count})` : 'no intent category',
    topPattern ? `top served pattern ${topPattern.id} (${topPattern.count})` : 'no served pattern',
    report.operatorActionRequired ? 'operator action required' : 'no operator action required',
  ].join('; ');
}

function isEmptyResult(event: UsageEvent): boolean {
  if (event.outcome === 'error') {
    return false;
  }
  const status = optionalString(event.output.status);
  if (status === 'not_found') {
    return true;
  }
  const total = numeric(event.output.total);
  if (total === 0) {
    return true;
  }
  return stringArray(event.output.servedIds).length === 0
    && stringArray(event.output.servedPatternIds).length === 0
    && (
      numeric(event.output.hitsCount) === 0
      || numeric(event.output.entriesCount) === 0
      || numeric(event.output.idsCount) === 0
      || numeric(event.output.itemsCount) === 0
    );
}

function buildCaveats(totals: UsageReportTotals, source: UsageReportSource): string[] {
  const caveats = [
    'Counts are event counts, not unique-user counts.',
    'Served IDs are counted only when telemetry explicitly marks them as served; candidate-only IDs are reported separately.',
    'Route IDs and doc surfaces are separate from pattern IDs.',
  ];
  if (totals.legacyEventCount > 0) {
    caveats.push('Legacy events may lack served/candidate/cited separation and are not promoted into served-pattern counts.');
  }
  if (source.kind === 'vercel') {
    caveats.push('Vercel log export availability and retention can limit historical windows.');
  }
  return caveats;
}

function rankTable(rows: UsageRank[]): string {
  if (rows.length === 0) {
    return '_No events in this window._';
  }
  return [
    '| ID | Count |',
    '| --- | ---: |',
    ...rows.map((row) => `| \`${escapeTable(row.id)}\` | ${row.count} |`),
  ].join('\n');
}

function materialRankTable(rows: UsageMaterialRank[]): string {
  if (rows.length === 0) {
    return '_No events in this window._';
  }
  return [
    '| ID | Count | Title | Kind | Status | Part | Cluster |',
    '| --- | ---: | --- | --- | --- | --- | --- |',
    ...rows.map((row) => [
      `\`${escapeTable(row.id)}\``,
      String(row.count),
      escapeTable(row.title ?? ''),
      escapeTable(row.kind ?? ''),
      escapeTable(row.status ?? ''),
      escapeTable(row.part ?? ''),
      escapeTable(row.cluster ?? ''),
    ].join(' | ')).map((row) => `| ${row} |`),
  ].join('\n');
}

function rateTable(rows: UsageRate[]): string {
  if (rows.length === 0) {
    return '_No tool calls in this window._';
  }
  return [
    '| Tool | Count | Calls | Rate |',
    '| --- | ---: | ---: | ---: |',
    ...rows.map((row) =>
      `| \`${escapeTable(row.toolName)}\` | ${row.count} | ${row.calls} | ${formatPercent(row.rate)} |`,
    ),
  ].join('\n');
}

function durationTable(rows: UsageDurationByTool[]): string {
  if (rows.length === 0) {
    return '_No tool calls in this window._';
  }
  return [
    '| Tool | Calls | Average ms | P95 ms | Max ms |',
    '| --- | ---: | ---: | ---: | ---: |',
    ...rows.map((row) =>
      `| \`${escapeTable(row.toolName)}\` | ${row.calls} | ${row.averageMs} | ${row.p95Ms} | ${row.maxMs} |`,
    ),
  ].join('\n');
}

function findingList(findings: string[]): string {
  if (findings.length === 0) {
    return '- None.';
  }
  return findings.map((finding) => `- ${finding}`).join('\n');
}

function escapeTable(value: string): string {
  return value.replace(/\|/gu, '\\|');
}

function formatPercent(value: number): string {
  return `${Math.round(value * 10_000) / 100}%`;
}

function shortRef(value: string): string {
  return value.slice(0, 8);
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function roundNumber(value: number): number {
  return Math.round(value * 100) / 100;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function numeric(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined;
  }
  return value as Record<string, unknown>;
}
