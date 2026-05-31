import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PUBLISHED_MANIFEST_PATH } from '../core/constants.js';
import { publishCurrentManifestSchema } from './published-surface.js';

export const DEFAULT_USAGE_REPORT_LOG_PATH = '.runtime/logs/fpf-runtime.log';
export const DEFAULT_USAGE_REPORT_LIMIT = 20;
export const USAGE_PRIVACY_STATEMENT =
  'Usage reports aggregate sanitized MCP telemetry only. They do not include raw questions, prompts, answer text, selectors, markdown bodies, session IDs, IP addresses, or user identifiers.';

export type UsageReportState = 'ok' | 'config_error';
export type UsageReportFormat = 'json' | 'markdown';
export type UsageReportSourceKind = 'file' | 'vercel';

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

export interface UsageRate {
  toolName: string;
  calls: number;
  count: number;
  rate: number;
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
  schemaVersions: UsageRank[];
  emptyResultRateByTool: UsageRate[];
  errorRateByTool: UsageRate[];
  privacyStatement: string;
  caveats: string[];
}

interface UsageEvent {
  timestamp: Date;
  schemaVersion: number;
  toolName: string;
  outcome: 'ok' | 'error';
  output: Record<string, unknown>;
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
  const counts = createCounts();
  const toolCalls = new Map<string, number>();
  const schemaVersions = new Map<string, number>();
  const emptyResults = new Map<string, number>();
  const errors = new Map<string, number>();
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
    if (event.outcome === 'error') {
      increment(errors, event.toolName);
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
  return {
    state: 'ok',
    ok: true,
    generatedAt: now.toISOString(),
    window,
    source: input.source,
    publication,
    totals,
    topServedPatternIds: topCounts(counts.servedPatternIds, limit),
    topCitedPatternIds: topCounts(counts.citedPatternIds, limit),
    topResolvedPatternIds: topCounts(counts.resolvedPatternIds, limit),
    topCandidatePatternIds: topCounts(counts.candidatePatternIds, limit),
    topDocSurfaceIds: topCounts(counts.docSurfaceIds, limit),
    topRouteIds: topCounts(counts.routeIds, limit),
    topTools: topCounts(toolCalls, limit),
    schemaVersions: topCounts(schemaVersions, limit),
    emptyResultRateByTool: rates(toolCalls, emptyResults),
    errorRateByTool: rates(toolCalls, errors),
    privacyStatement: USAGE_PRIVACY_STATEMENT,
    caveats: buildCaveats(totals, input.source),
  };
}

export function configErrorUsageReport(input: {
  windowLabel: string;
  now?: Date;
  source: UsageReportSource;
  message: string;
  cwd?: string;
}): Promise<UsageReport> {
  const now = input.now ?? new Date();
  return readUsageReportPublication(input.cwd).then((publication) => ({
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
    schemaVersions: [],
    emptyResultRateByTool: [],
    errorRateByTool: [],
    privacyStatement: USAGE_PRIVACY_STATEMENT,
    caveats: [input.message, 'No usage counts were produced.'],
  }));
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
  return `# FPF Usage Report

State: **${report.state}**

Window: ${report.window.start} -> ${report.window.end} (${report.window.label})

Source: ${report.source.description}

Publication: upstream \`${shortRef(report.publication.upstreamRef)}\`, source \`${report.publication.sourceHash}\`, compiler \`${report.publication.compilerFingerprint}\`

## Top Served FPF IDs

${rankTable(report.topServedPatternIds)}

## Top Cited FPF IDs

${rankTable(report.topCitedPatternIds)}

## Top Resolved FPF IDs

${rankTable(report.topResolvedPatternIds)}

## Top Candidate FPF IDs

${rankTable(report.topCandidatePatternIds)}

## Top Doc Surfaces

${rankTable(report.topDocSurfaceIds)}

## Top Route IDs

${rankTable(report.topRouteIds)}

## Top Tools

${rankTable(report.topTools)}

## Schema Versions

${rankTable(report.schemaVersions)}

## Empty Result Rate By Tool

${rateTable(report.emptyResultRateByTool)}

## Error Rate By Tool

${rateTable(report.errorRateByTool)}

## Event Quality

- Valid events: ${report.totals.validEventCount}
- Invalid events: ${report.totals.invalidEventCount}
- Out-of-window events: ${report.totals.outOfWindowEventCount}
- Legacy events: ${report.totals.legacyEventCount}
- Unknown/unresolved events: ${report.totals.unknownUnresolvedEventCount}

## Privacy

${report.privacyStatement}

## Caveats

${report.caveats.map((item) => `- ${item}`).join('\n')}
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

function escapeTable(value: string): string {
  return value.replace(/\|/gu, '\\|');
}

function formatPercent(value: number): string {
  return `${Math.round(value * 10_000) / 100}%`;
}

function shortRef(value: string): string {
  return value.slice(0, 8);
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
