import { appendFile } from 'node:fs/promises';

import {
  DEFAULT_CONTENT_QUALITY_BASE_URL,
  DEFAULT_CONTENT_QUALITY_STATUS_URL,
  formatContentQualityMarkdown,
  runContentQualityMonitor,
  type ContentQualityMode,
  type ContentQualityReport,
} from '../src/build/content-quality-monitor.js';
import { parseFlagMap, readString } from './_args.js';

const flags = parseFlagMap(process.argv.slice(2));
const format = readString(
  flags,
  'format',
  process.env.FPF_CONTENT_QUALITY_MONITOR_FORMAT ?? 'json',
);
const mode = readMode(
  readString(flags, 'mode', process.env.FPF_CONTENT_QUALITY_MONITOR_MODE ?? 'local'),
);
const failOnBreach = flags.has('fail-on-breach');

const report = await runContentQualityMonitor({
  mode,
  baseUrl: readString(
    flags,
    'base-url',
    process.env.FPF_CONTENT_QUALITY_BASE_URL ?? DEFAULT_CONTENT_QUALITY_BASE_URL,
  ),
  statusUrl: readString(
    flags,
    'status-url',
    process.env.FPF_CONTENT_QUALITY_STATUS_URL ?? DEFAULT_CONTENT_QUALITY_STATUS_URL,
  ),
});
const markdown = formatContentQualityMarkdown(report);

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, renderGithubOutput(report), 'utf8');
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown, 'utf8');
}

if (format === 'markdown') {
  process.stdout.write(markdown);
} else if (format === 'json') {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  throw new Error('--format must be json or markdown.');
}

if (failOnBreach && report.breached) {
  process.exitCode = 1;
}

function readMode(value: string): ContentQualityMode {
  if (value === 'local' || value === 'live') {
    return value;
  }
  throw new Error('--mode must be local or live.');
}

function renderGithubOutput(report: ContentQualityReport): string {
  return [
    ['state', report.state],
    ['ok', String(report.ok)],
    ['breached', String(report.breached)],
    ['mode', report.mode],
    ['source_hash', report.sourceHash],
    ['upstream_ref', report.upstreamRef ?? ''],
    ['route_index_link_coverage_percent', String(report.routeCatalog.routeIndexLinkCoveragePercent)],
    ['route_page_coverage_percent', String(report.routeCatalog.routePageCoveragePercent)],
    ['route_content_coverage_percent', String(report.routeCatalog.routeContentCoveragePercent)],
    ['route_pattern_link_coverage_percent', String(report.routeCatalog.routePatternLinkCoveragePercent)],
    ['stale_curated_refs', String(countStaleCuratedRefs(report))],
    ['summary', report.summary],
  ].map(([key, value]) => `${key}=${sanitizeOutputValue(value)}\n`).join('');
}

function countStaleCuratedRefs(report: ContentQualityReport): number {
  return report.curatedDocs.reduce(
    (total, doc) =>
      total
      + doc.unresolvedRouteSelectors.length
      + doc.unresolvedPatternLinks.length
      + doc.missingExpectedRouteSelectors.length
      + doc.unexpectedRouteSelectors.length,
    0,
  );
}

function sanitizeOutputValue(value: string): string {
  return value.replace(/\r?\n/gu, ' ').trim();
}
