import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

import {
  ARTIFACT_FILENAMES,
  PUBLISHED_ARTIFACT_DIR,
  PUBLISHED_MANIFEST_PATH,
  PUBLISHED_SPEC_PATH,
} from '../core/constants.js';
import {
  buildDocsProjection,
  type PublicationManifestSummary,
} from '../core/documents.js';
import {
  MCP_ORIGIN_HOME_URL,
  MCP_SERVER_NAME,
} from '../core/public-copy.js';
import {
  OPTIONAL_TERM_LINKS,
  resolveOptionalTermPatternId,
  type OptionalTermLinkDefinition,
  type OptionalTermLinkKey,
  type OptionalTermPatternCandidate,
} from '../core/optional-term-links.js';
import type { Snapshot } from '../runtime/types.js';
import type { FpfWorkEvaluationFormat, FpfWorkEvaluationTarget } from './types.js';

export type FpfRubricStatus = 'pass' | 'partial' | 'missing' | 'not_applicable';
export type FpfFindingSeverity = 'blocker' | 'high' | 'medium' | 'low';
export type FpfWorkEvaluationOverallStatus =
  | 'aligned'
  | 'usable_with_followups'
  | 'needs_work';

export interface EvaluateFpfWorkOptions {
  target: FpfWorkEvaluationTarget;
  baseRef: string;
  specPath?: string;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  now?: Date;
}

export interface FpfAnchorSummary {
  id: FpfAnchorId;
  title: string;
  role: string;
  availableInSpec: boolean;
}

export interface FpfEvidence {
  id: string;
  kind: 'file' | 'git' | 'spec' | 'command';
  label: string;
  path?: string;
  detail?: string;
}

export interface FpfRubricItem {
  id: string;
  anchor: FpfAnchorSummary;
  status: FpfRubricStatus;
  severity: FpfFindingSeverity;
  finding: string;
  recommendation: string;
  evidenceIds: string[];
}

export interface FpfFinding {
  rubricId: string;
  anchorId: FpfAnchorId;
  severity: FpfFindingSeverity;
  summary: string;
  evidenceIds: string[];
}

export interface FpfRecommendation {
  rubricId: string;
  severity: FpfFindingSeverity;
  action: string;
}

export interface FpfChangedFile {
  path: string;
  status: string;
}

export interface FpfWorkFacts {
  cwd: string;
  target: FpfWorkEvaluationTarget;
  baseRef: string;
  branch: string;
  headSha: string;
  generatedAt: string;
  specPath: string;
  specAnchorPresence: Record<FpfAnchorId, boolean>;
  changedFiles: FpfChangedFile[];
  dirtyFiles: FpfChangedFile[];
  commitSubjects: string[];
  fileTexts: Record<KnownWorkFile, string | undefined>;
  fileExists: Record<KnownWorkFile, boolean>;
}

export interface FpfWorkEvaluationReport {
  target: FpfWorkEvaluationTarget;
  baseRef: string;
  branch: string;
  headSha: string;
  generatedAt: string;
  specSource: string;
  overallStatus: FpfWorkEvaluationOverallStatus;
  anchors: FpfAnchorSummary[];
  scorecard: FpfRubricItem[];
  findings: FpfFinding[];
  recommendations: FpfRecommendation[];
  evidence: FpfEvidence[];
}

export type FpfAnchorId = (typeof FPF_WORK_EVALUATION_ANCHORS)[number]['id'];

type KnownWorkFile =
  | 'readme'
  | 'agents'
  | 'docsIndex'
  | 'connectMcp'
  | 'ciWorkflow'
  | 'prePushHook'
  | 'packageJson'
  | 'productionDeployScript'
  | 'vercelWebsiteConfig'
  | 'vercelMcpConfig'
  | 'publishedSpec'
  | 'publishedSnapshot'
  | 'publishedManifest';

const KNOWN_WORK_FILES: Record<KnownWorkFile, string> = {
  readme: 'README.md',
  agents: 'AGENTS.md',
  docsIndex: 'docs/index.md',
  connectMcp: 'docs/connect-mcp.md',
  ciWorkflow: '.github/workflows/ci.yml',
  prePushHook: 'scripts/hooks/pre-push.sh',
  packageJson: 'package.json',
  productionDeployScript: 'scripts/deploy-production-surfaces.ts',
  vercelWebsiteConfig: 'vercel.json',
  vercelMcpConfig: 'vercel.mcp.json',
  publishedSpec: PUBLISHED_SPEC_PATH,
  publishedSnapshot: `${PUBLISHED_ARTIFACT_DIR}/${ARTIFACT_FILENAMES.snapshot}`,
  publishedManifest: PUBLISHED_MANIFEST_PATH,
};

export const FPF_WORK_EVALUATION_ANCHORS = [
  {
    id: 'E.14',
    title: 'Human-Centric Working-Model',
    role: 'Checks that the human-facing working model is the primary review surface.',
  },
  {
    id: 'E.17',
    title: 'Multi-View Publication Kit',
    role: 'Checks that runtime, preparation, and publication views stay separate.',
  },
  {
    id: 'F.17',
    title: 'Unified Term Sheet',
    role: 'Checks that the wiki exposes navigable plain-language terms and routes.',
  },
  {
    id: 'C.24',
    title: 'Agentic Tool-Use and Call-Planning',
    role: 'Checks that plan, validation, staging, and deploy execution remain distinct.',
  },
  {
    id: 'B.3.5',
    title: 'CT2R-LOG',
    role: 'Checks that claims are backed by traceable evidence and publication metadata.',
  },
  {
    id: 'G.5',
    title: 'Multi-Method Dispatcher',
    role: 'Checks that publication emits an intentional selected surface.',
  },
] as const;

export async function evaluateFpfWork(
  options: EvaluateFpfWorkOptions,
): Promise<FpfWorkEvaluationReport> {
  return evaluateFpfWorkFacts(collectFpfWorkFacts(options));
}

export function collectFpfWorkFacts(options: EvaluateFpfWorkOptions): FpfWorkFacts {
  const cwd = options.cwd ?? process.cwd();
  const generatedAt = (options.now ?? new Date()).toISOString();
  const specPath = resolveSpecPath(cwd, options.specPath, options.env ?? process.env);
  if (!existsSync(specPath)) {
    throw new Error(
      `FPF evaluation spec not found at ${specPath}. Pass --spec <path> or set FPF_SPEC_SOURCE_PATH; evaluate-work does not fall back to .fpf-upstream.`,
    );
  }

  const specText = readFileSync(specPath, 'utf8');
  const baseRef =
    options.target === 'current-pr' ? resolveBaseRef(cwd, options.baseRef) : options.baseRef;
  const fileTexts = readKnownFileTexts(cwd);
  const branch = readGitValue(cwd, ['rev-parse', '--abbrev-ref', 'HEAD']) ?? 'unknown';
  const headSha = readGitValue(cwd, ['rev-parse', 'HEAD']) ?? 'unknown';

  return {
    cwd,
    target: options.target,
    baseRef,
    branch,
    headSha,
    generatedAt,
    specPath,
    specAnchorPresence: readAnchorPresence(specText),
    changedFiles:
      options.target === 'current-pr'
        ? readPrChangedFiles(cwd, baseRef)
        : readWorkingTreeChangedFiles(cwd),
    dirtyFiles: readWorkingTreeChangedFiles(cwd),
    commitSubjects:
      options.target === 'current-pr' ? readCommitSubjects(cwd, baseRef) : [],
    fileTexts,
    fileExists: mapKnownFileExistence(fileTexts),
  };
}

export function evaluateFpfWorkFacts(facts: FpfWorkFacts): FpfWorkEvaluationReport {
  const evidence = new EvidenceCollector(facts.cwd);
  const anchors = FPF_WORK_EVALUATION_ANCHORS.map((anchor) => ({
    ...anchor,
    availableInSpec: facts.specAnchorPresence[anchor.id],
  }));

  const specEvidenceId = evidence.add({
    kind: 'spec',
    label: 'FPF evaluation spec',
    path: facts.specPath,
    detail: `${anchors.filter((anchor) => anchor.availableInSpec).length}/${anchors.length} evaluation anchors found`,
  });
  const gitEvidenceId = evidence.add({
    kind: 'git',
    label: 'Local git work facts',
    detail: `${facts.changedFiles.length} changed file(s), ${facts.commitSubjects.length} commit(s), ${facts.dirtyFiles.length} dirty file(s)`,
  });

  const scorecard = [
    scoreWorkingModel(facts, anchors[0]!, evidence, [specEvidenceId, gitEvidenceId]),
    scoreSurfaceSplit(facts, anchors[1]!, evidence, [specEvidenceId, gitEvidenceId]),
    scoreUnifiedTermSheet(facts, anchors[2]!, evidence, [specEvidenceId, gitEvidenceId]),
    scorePlanRunSplit(facts, anchors[3]!, evidence, [specEvidenceId, gitEvidenceId]),
    scoreEvidenceTraceability(facts, anchors[4]!, evidence, [specEvidenceId, gitEvidenceId]),
    scoreSelectedPublication(facts, anchors[5]!, evidence, [specEvidenceId, gitEvidenceId]),
  ];

  const findings = scorecard
    .filter((item) => item.status !== 'pass' && item.status !== 'not_applicable')
    .map((item) => ({
      rubricId: item.id,
      anchorId: item.anchor.id,
      severity: item.severity,
      summary: item.finding,
      evidenceIds: item.evidenceIds,
    }));
  const recommendations = scorecard
    .filter((item) => item.status !== 'pass' && item.status !== 'not_applicable')
    .map((item) => ({
      rubricId: item.id,
      severity: item.severity,
      action: item.recommendation,
    }));

  return {
    target: facts.target,
    baseRef: facts.baseRef,
    branch: facts.branch,
    headSha: facts.headSha,
    generatedAt: facts.generatedAt,
    specSource: facts.specPath,
    overallStatus: summarizeOverallStatus(findings),
    anchors,
    scorecard,
    findings,
    recommendations,
    evidence: evidence.all(),
  };
}

export function formatFpfWorkEvaluationReport(
  report: FpfWorkEvaluationReport,
  format: FpfWorkEvaluationFormat,
): string {
  if (format === 'json') {
    return `${JSON.stringify(report, null, 2)}\n`;
  }

  return `${renderMarkdownReport(report)}\n`;
}

function scoreWorkingModel(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('readme', facts, 'README describes the working model'),
    evidence.file('docsIndex', facts, 'Wiki landing page'),
    evidence.file('connectMcp', facts, 'Connect MCP bridge page'),
    evidence.file('publishedManifest', facts, 'Published manifest metadata'),
  ].filter(isDefined);
  const hasHumanLanding =
    contains(facts, 'docsIndex', '# FPF Reference') &&
    contains(facts, 'docsIndex', '## Choose your entry point') &&
    contains(facts, 'docsIndex', '## Published from');
  const hasMcpBridge =
    contains(facts, 'connectMcp', MCP_ORIGIN_HOME_URL) &&
    contains(facts, 'connectMcp', MCP_SERVER_NAME) &&
    contains(facts, 'connectMcp', 'compatibility bridge') &&
    contains(facts, 'connectMcp', 'not agent memory');
  const hasRuntimeDefault = contains(facts, 'readme', PUBLISHED_SPEC_PATH);
  const hasManifestMetadata =
    contains(facts, 'publishedManifest', 'sourceHash') &&
    contains(facts, 'publishedManifest', 'publishedAt');

  if (hasHumanLanding && hasMcpBridge && hasRuntimeDefault && hasManifestMetadata) {
    return rubricPass(
      'working-model',
      anchor,
      'Human-facing docs identify the latest published surface and carry manifest metadata.',
      'Keep the wiki landing page as the first review surface when publication details change.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'working-model',
    anchor,
    hasHumanLanding && hasMcpBridge ? 'partial' : 'missing',
    'medium',
    hasMcpBridge
      ? 'The human-facing working model is not complete enough to be the primary review surface.'
      : 'The Connect MCP bridge is missing the MCP-origin handoff or FPF-vs-MCP boundary.',
    hasMcpBridge
      ? 'Make the wiki/README show the published channel, source hash, upstream ref, and validation stance before relying on runtime evidence.'
      : 'Keep docs/connect-mcp.md as a short compatibility bridge to mcp.fpf.sh, not a duplicated client setup guide.',
    evidenceIds,
  );
}

function scoreSurfaceSplit(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('publishedSpec', facts, 'Committed published spec'),
    evidence.file('publishedSnapshot', facts, 'Committed published snapshot'),
    evidence.file('publishedManifest', facts, 'Committed published manifest'),
    evidence.file('ciWorkflow', facts, 'CI workflow'),
    evidence.file('packageJson', facts, 'Hosted deploy scripts'),
    evidence.file('vercelWebsiteConfig', facts, 'Website Vercel config'),
    evidence.file('vercelMcpConfig', facts, 'MCP Vercel config'),
  ].filter(isDefined);
  const publishedComplete =
    facts.fileExists.publishedSpec &&
    facts.fileExists.publishedSnapshot &&
    facts.fileExists.publishedManifest;
  const ciConsumesPublished =
    contains(facts, 'ciWorkflow', 'bun run validate:published') &&
    !contains(facts, 'ciWorkflow', 'bun run spec:download');
  const vercelGitBuildSelectsSurface =
    contains(facts, 'vercelWebsiteConfig', 'bun run vercel:git:build') &&
    contains(facts, 'packageJson', '"vercel:git:build"') &&
    contains(facts, 'packageJson', 'build-vercel-git-preview');
  const vercelWebsiteStagesPublished =
    contains(facts, 'ciWorkflow', 'bun run vercel:website:build') &&
    contains(facts, 'ciWorkflow', '.vercel/output/static/index.html') &&
    contains(facts, 'packageJson', '"vercel:website:build"') &&
    contains(facts, 'packageJson', 'bun run docs:build') &&
    (
      contains(facts, 'vercelWebsiteConfig', 'bun run vercel:website:build') ||
      vercelGitBuildSelectsSurface
    );
  const vercelMcpStagesPublished =
    contains(facts, 'ciWorkflow', 'bun run vercel:mcp:build') &&
    contains(facts, 'ciWorkflow', '.vercel/output/functions/_mcp.func') &&
    contains(facts, 'packageJson', '"vercel:mcp:build"') &&
    contains(facts, 'packageJson', 'bun run predeploy') &&
    contains(facts, 'vercelMcpConfig', 'bun run vercel:mcp:build');

  if (
    publishedComplete &&
    ciConsumesPublished &&
    vercelWebsiteStagesPublished &&
    vercelMcpStagesPublished
  ) {
    return rubricPass(
      'surface-split',
      anchor,
      'Hosted runtime packaging, website publication, and local preparation consume separate surfaces.',
      'Keep CI and Vercel deploy packaging consuming committed `published/current/**`; do not reintroduce spec download in CI.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'surface-split',
    anchor,
    publishedComplete ? 'partial' : 'missing',
    'high',
    'The three-surface split is incomplete or not consistently enforced by workflows.',
    'Complete the committed publication surface and make CI/docs/deploy consume it without regenerating upstream inputs.',
    evidenceIds,
  );
}

function scoreUnifiedTermSheet(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('docsIndex', facts, 'Wiki navigation surface'),
  ].filter(isDefined);
  const hasSlimNavigation =
    contains(facts, 'docsIndex', '[Pattern Catalog](/patterns)') &&
    contains(facts, 'docsIndex', '[Routes](/routes)');
  const hasTermRoutes = OPTIONAL_TERM_LINKS.every((link) =>
    containsOptionalTermLink(facts, link),
  );

  if (hasSlimNavigation && hasTermRoutes) {
    return rubricPass(
      'term-sheet',
      anchor,
      'The slim wiki landing page exposes routes, patterns, and available glossary/change-log entry points.',
      'Keep terminology links short and plain-language oriented as generated docs grow.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'term-sheet',
    anchor,
    hasSlimNavigation ? 'partial' : 'missing',
    'medium',
    'The wiki does not yet provide enough term/navigation structure for human review.',
    'Expose glossary and change-log routes alongside patterns/routes so reviewers can translate technical names into plain working terms.',
    evidenceIds,
  );
}

function scorePlanRunSplit(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('ciWorkflow', facts, 'CI validation workflow'),
    evidence.file('prePushHook', facts, 'Local pre-push publication hook'),
    evidence.file('packageJson', facts, 'Package scripts'),
    evidence.file('productionDeployScript', facts, 'Production deploy orchestrator'),
    evidence.file('vercelWebsiteConfig', facts, 'Website Vercel config'),
    evidence.file('vercelMcpConfig', facts, 'MCP Vercel config'),
  ].filter(isDefined);
  const hostedDeployIsVercelOnly =
    contains(facts, 'packageJson', '"deploy": "bun run deploy:prod"') &&
    contains(facts, 'packageJson', '"deploy:prod": "bun scripts/deploy-production-surfaces.ts"') &&
    contains(facts, 'packageJson', '"vercel:website:deploy:prod"') &&
    contains(facts, 'packageJson', '"vercel:mcp:deploy:prod"') &&
    contains(facts, 'productionDeployScript', "'--skip-domain'") &&
    contains(facts, 'productionDeployScript', "'promote'") &&
    contains(facts, 'productionDeployScript', 'rollbackPromotions') &&
    !contains(facts, 'packageJson', ['vercel', 'pro' + 'xy'].join(':'));
  const ciDoesDryRun =
    contains(facts, 'ciWorkflow', 'bun run vercel:website:build') &&
    contains(facts, 'ciWorkflow', '.vercel/output/static/index.html') &&
    contains(facts, 'ciWorkflow', 'bun run vercel:mcp:build') &&
    contains(facts, 'ciWorkflow', '.vercel/output/functions/_mcp.func');
  const localPublishOwner =
    contains(facts, 'prePushHook', 'bun run publish:current') ||
    contains(facts, 'prePushHook', 'publishing ./published/current/');
  const packageStagesOnly = contains(
    facts,
    'packageJson',
    '"predeploy": "bun run stage:from-published"',
  );

  if (
    hostedDeployIsVercelOnly &&
    ciDoesDryRun &&
    localPublishOwner &&
    packageStagesOnly
  ) {
    return rubricPass(
      'plan-run-split',
      anchor,
      'Plan, local publication, CI validation, website deploy, and MCP deploy execution are visibly separated.',
      'Keep deployment as a post-validation execution path, not a validation substitute.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'plan-run-split',
    anchor,
    hostedDeployIsVercelOnly ? 'partial' : 'missing',
    'high',
    'Plan/run boundaries are not explicit enough for a safe PR-to-deploy path.',
    'Keep CI as validation, keep local publication in pre-push, and keep hosted deploy execution on the Vercel-only path.',
    evidenceIds,
  );
}

function scoreEvidenceTraceability(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('publishedManifest', facts, 'Publication provenance manifest'),
    evidence.file('packageJson', facts, 'Validation scripts'),
    evidence.file('ciWorkflow', facts, 'CI evidence gate'),
  ].filter(isDefined);
  const manifestPinsSource =
    contains(facts, 'publishedManifest', 'sourceHash') &&
    contains(facts, 'publishedManifest', 'upstreamRef') &&
    contains(facts, 'publishedManifest', 'publishedAt') &&
    contains(facts, 'publishedManifest', 'compilerFingerprint');
  const validatePublished =
    contains(facts, 'packageJson', '"validate:published"') &&
    contains(facts, 'ciWorkflow', 'bun run validate:published');

  if (manifestPinsSource && validatePublished) {
    return rubricPass(
      'evidence-traceability',
      anchor,
      'Publication claims are tied to manifest metadata and a CI validation gate.',
      'Keep source hash, upstream ref, published time, and compiler fingerprint together in review evidence.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'evidence-traceability',
    anchor,
    manifestPinsSource ? 'partial' : 'missing',
    'medium',
    'Review claims are not fully traceable to published artifacts and validation evidence.',
    'Pin each publication claim to manifest metadata and make `validate:published` part of the required PR evidence.',
    evidenceIds,
  );
}

function scoreSelectedPublication(
  facts: FpfWorkFacts,
  anchor: FpfAnchorSummary,
  evidence: EvidenceCollector,
  baseEvidenceIds: string[],
): FpfRubricItem {
  const evidenceIds = [
    ...baseEvidenceIds,
    evidence.file('docsIndex', facts, 'Selected wiki entry points'),
    evidence.file('ciWorkflow', facts, 'Deploy dry-run output checks'),
    evidence.file('packageJson', facts, 'Publication scripts'),
  ].filter(isDefined);
  const wikiSelectsEntryPoints =
    contains(facts, 'docsIndex', '## Choose your entry point') &&
    contains(facts, 'docsIndex', 'New to FPF') &&
    contains(facts, 'docsIndex', 'Connecting an agent or editor') &&
    contains(facts, 'docsIndex', 'Reviewing a project, PR, or design change') &&
    contains(facts, 'docsIndex', '[Pattern Catalog]') &&
    contains(facts, 'docsIndex', '[Routes]');
  const deploySelectsHostedAssets =
    contains(facts, 'ciWorkflow', 'bun run vercel:website:build') &&
    contains(facts, 'ciWorkflow', 'bun run vercel:mcp:build');
  const packageHasPublicationCommands =
    contains(facts, 'packageJson', '"publish:current"') &&
    contains(facts, 'packageJson', '"stage:from-published"');

  if (wikiSelectsEntryPoints && deploySelectsHostedAssets && packageHasPublicationCommands) {
    return rubricPass(
      'selected-publication',
      anchor,
      'The repo publishes selected wiki and hosted runtime surfaces instead of one opaque generated dump.',
      'Keep entry points intentional and small; generated detail should stay behind navigation routes.',
      evidenceIds,
    );
  }

  return rubricIssue(
    'selected-publication',
    anchor,
    wikiSelectsEntryPoints ? 'partial' : 'missing',
    'low',
    'The publication output is not clearly a selected human/runtime surface.',
    'Keep the landing page and hosted staging paths as selected projections over the committed publication surface.',
    evidenceIds,
  );
}

function rubricPass(
  id: string,
  anchor: FpfAnchorSummary,
  finding: string,
  recommendation: string,
  evidenceIds: string[],
): FpfRubricItem {
  return {
    id,
    anchor,
    status: 'pass',
    severity: 'low',
    finding,
    recommendation,
    evidenceIds,
  };
}

function rubricIssue(
  id: string,
  anchor: FpfAnchorSummary,
  status: Exclude<FpfRubricStatus, 'pass' | 'not_applicable'>,
  severity: FpfFindingSeverity,
  finding: string,
  recommendation: string,
  evidenceIds: string[],
): FpfRubricItem {
  return {
    id,
    anchor,
    status,
    severity,
    finding,
    recommendation,
    evidenceIds,
  };
}

function renderMarkdownReport(report: FpfWorkEvaluationReport): string {
  const lines = [
    '# FPF Work Evaluation',
    '',
    `- Target: \`${report.target}\``,
    `- Base: \`${report.baseRef}\``,
    `- Branch: \`${report.branch}\``,
    `- Head: \`${report.headSha}\``,
    `- Spec: \`${report.specSource}\``,
    `- Generated at: ${report.generatedAt}`,
    `- Overall: \`${report.overallStatus}\``,
    '',
    '## Summary',
    '',
    summarizeReport(report),
    '',
    '## FPF Scorecard',
    '',
    '| FPF anchor | Status | Finding | Evidence |',
    '| --- | --- | --- | --- |',
    ...report.scorecard.map((item) => {
      const evidence = item.evidenceIds.map((id) => `\`${id}\``).join(', ');
      const anchorStatus = item.anchor.availableInSpec ? '' : ' (anchor not found in spec)';
      return `| ${item.anchor.id} ${item.anchor.title}${anchorStatus} | ${item.status} | ${escapeTableCell(item.finding)} | ${evidence} |`;
    }),
    '',
    '## Useful Next Work',
    '',
    ...renderRecommendations(report),
    '',
    '## Evidence',
    '',
    ...report.evidence.map(renderEvidence),
  ];

  return lines.join('\n');
}

function summarizeReport(report: FpfWorkEvaluationReport): string {
  if (report.findings.length === 0) {
    return 'The current work is aligned with the selected FPF review anchors. Treat this as a local work-surface evaluation; CI evidence is still required before merge.';
  }

  const highRiskCount = report.findings.filter(
    (finding) => finding.severity === 'blocker' || finding.severity === 'high',
  ).length;
  return `${report.findings.length} FPF gap(s) were found; ${highRiskCount} are blocker/high severity and should be handled before treating the branch as merge-ready.`;
}

function renderRecommendations(report: FpfWorkEvaluationReport): string[] {
  if (report.recommendations.length === 0) {
    return ['- No blocker/high FPF gaps found. Re-run CI and keep this report as review support, not a deploy gate.'];
  }

  return report.recommendations.map(
    (recommendation) =>
      `- [${recommendation.severity}] ${recommendation.rubricId}: ${recommendation.action}`,
  );
}

function renderEvidence(evidence: FpfEvidence): string {
  const path = evidence.path ? ` (${evidence.path})` : '';
  const detail = evidence.detail ? `: ${evidence.detail}` : '';
  return `- \`${evidence.id}\` ${evidence.label}${path}${detail}`;
}

function summarizeOverallStatus(findings: FpfFinding[]): FpfWorkEvaluationOverallStatus {
  if (
    findings.some((finding) => finding.severity === 'blocker' || finding.severity === 'high')
  ) {
    return 'needs_work';
  }
  if (findings.length > 0) {
    return 'usable_with_followups';
  }
  return 'aligned';
}

function resolveSpecPath(
  cwd: string,
  explicitSpecPath: string | undefined,
  env: NodeJS.ProcessEnv,
): string {
  const configured = explicitSpecPath?.trim() || env.FPF_SPEC_SOURCE_PATH?.trim() || PUBLISHED_SPEC_PATH;
  return resolve(cwd, configured);
}

function resolveBaseRef(cwd: string, requestedBaseRef: string): string {
  if (gitRefExists(cwd, requestedBaseRef)) {
    return requestedBaseRef;
  }
  if (requestedBaseRef === 'origin/main' && gitRefExists(cwd, 'main')) {
    return 'main';
  }
  throw new Error(`Git base ref not found: ${requestedBaseRef}`);
}

function gitRefExists(cwd: string, ref: string): boolean {
  return readGitValue(cwd, ['rev-parse', '--verify', `${ref}^{commit}`]) !== undefined;
}

function readGitValue(cwd: string, args: string[]): string | undefined {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return undefined;
  }
}

function readPrChangedFiles(cwd: string, baseRef: string): FpfChangedFile[] {
  const output = readGitValue(cwd, ['diff', '--name-status', `${baseRef}...HEAD`]);
  if (!output) {
    return [];
  }
  return output.split('\n').filter(Boolean).map(parseNameStatusLine);
}

function readWorkingTreeChangedFiles(cwd: string): FpfChangedFile[] {
  const output = readGitValue(cwd, ['status', '--short']);
  if (!output) {
    return [];
  }
  return output.split('\n').filter(Boolean).map((line) => {
    const rawPath = (line[2] === ' ' ? line.slice(3) : line.slice(2)).trim();
    return {
      status: line.slice(0, 2).trim() || 'changed',
      path: rawPath.includes(' -> ') ? rawPath.split(' -> ').at(-1)! : rawPath,
    };
  });
}

function readCommitSubjects(cwd: string, baseRef: string): string[] {
  const output = readGitValue(cwd, ['log', '--format=%h %s', `${baseRef}..HEAD`]);
  return output ? output.split('\n').filter(Boolean) : [];
}

function parseNameStatusLine(line: string): FpfChangedFile {
  const parts = line.split('\t').filter(Boolean);
  return {
    status: parts[0] ?? 'changed',
    path: parts.at(-1) ?? line,
  };
}

function readKnownFileTexts(cwd: string): Record<KnownWorkFile, string | undefined> {
  const entries = Object.entries(KNOWN_WORK_FILES).map(([key, path]) => {
    const absolutePath = resolve(cwd, path);
    return [
      key,
      existsSync(absolutePath) ? readFileSync(absolutePath, 'utf8') : undefined,
    ] as const;
  });
  const fileTexts = Object.fromEntries(entries) as Record<KnownWorkFile, string | undefined>;
  const projectedDocsIndex = projectDocsIndexFromPublishedSurface(fileTexts);
  return {
    ...fileTexts,
    docsIndex: projectedDocsIndex ?? fileTexts.docsIndex,
  };
}

function projectDocsIndexFromPublishedSurface(
  fileTexts: Record<KnownWorkFile, string | undefined>,
): string | undefined {
  const snapshotText = fileTexts.publishedSnapshot;
  if (!snapshotText) return undefined;

  try {
    const snapshot = JSON.parse(snapshotText) as Snapshot;
    const manifest = parsePublicationManifestSummary(fileTexts.publishedManifest);
    return buildDocsProjection(snapshot, manifest).pagesByMarkdownPath['docs/index.md']?.markdown;
  } catch {
    return undefined;
  }
}

function parsePublicationManifestSummary(
  manifestText: string | undefined,
): PublicationManifestSummary | undefined {
  if (!manifestText) return undefined;

  try {
    const parsed: unknown = JSON.parse(manifestText);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return undefined;
    }
    const manifest = parsed as Record<string, unknown>;
    if (
      typeof manifest.channel !== 'string' ||
      typeof manifest.sourceHash !== 'string' ||
      typeof manifest.upstreamRef !== 'string' ||
      typeof manifest.publishedAt !== 'string'
    ) {
      return undefined;
    }
    return {
      channel: manifest.channel,
      sourceHash: manifest.sourceHash,
      upstreamRef: manifest.upstreamRef,
      publishedAt: manifest.publishedAt,
      upstreamRepoUrl:
        typeof manifest.upstreamRepoUrl === 'string' ? manifest.upstreamRepoUrl : undefined,
      upstreamCommittedAt:
        typeof manifest.upstreamCommittedAt === 'string'
          ? manifest.upstreamCommittedAt
          : undefined,
    };
  } catch {
    return undefined;
  }
}

function mapKnownFileExistence(
  fileTexts: Record<KnownWorkFile, string | undefined>,
): Record<KnownWorkFile, boolean> {
  const entries = Object.keys(KNOWN_WORK_FILES).map((key) => [
    key,
    fileTexts[key as KnownWorkFile] !== undefined,
  ]);
  return Object.fromEntries(entries) as Record<KnownWorkFile, boolean>;
}

function readAnchorPresence(specText: string): Record<FpfAnchorId, boolean> {
  const entries = FPF_WORK_EVALUATION_ANCHORS.map((anchor) => [
    anchor.id,
    specText.includes(anchor.id),
  ]);
  return Object.fromEntries(entries) as Record<FpfAnchorId, boolean>;
}

function contains(facts: FpfWorkFacts, file: KnownWorkFile, needle: string): boolean {
  return facts.fileTexts[file]?.includes(needle) ?? false;
}

interface EvaluationSnapshotPattern {
  id?: unknown;
  title?: unknown;
  aliases?: unknown;
  part?: unknown;
}

interface EvaluationSnapshot {
  patternGraph?: {
    nodes?: Record<string, EvaluationSnapshotPattern>;
  };
}

function containsOptionalTermLink(
  facts: FpfWorkFacts,
  link: OptionalTermLinkDefinition,
): boolean {
  if (link.key === 'glossary') {
    // The home page links the authored newcomer glossary at /glossary
    // (which itself links the spec's own Alphabetic Glossary pattern);
    // the spec-derived /generated/patterns/<id> shortcut was deliberately
    // dropped from the index — see renderHomeNavigateLine in
    // src/core/documents.ts.
    return contains(facts, 'docsIndex', `[${link.label}](/glossary)`);
  }
  const targetPath = resolveOptionalTermPatternPath(facts, link.key);
  if (targetPath === undefined) return false;
  if (targetPath === null) {
    return !containsGeneratedPatternLinkLabel(facts, 'docsIndex', link.label);
  }
  return contains(facts, 'docsIndex', `[${link.label}](${targetPath})`);
}

function containsGeneratedPatternLinkLabel(
  facts: FpfWorkFacts,
  file: KnownWorkFile,
  label: string,
): boolean {
  const text = facts.fileTexts[file];
  if (!text) return false;
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  return new RegExp(`\\[${escapedLabel}\\]\\(/generated/patterns/[^)]+\\)`, 'u').test(text);
}

function resolveOptionalTermPatternPath(
  facts: FpfWorkFacts,
  key: OptionalTermLinkKey,
): string | null | undefined {
  const snapshot = parseEvaluationSnapshot(facts);
  const nodes = snapshot?.patternGraph?.nodes;
  if (!nodes) return undefined;

  const patterns: OptionalTermPatternCandidate[] = Object.entries(nodes).map(([nodeId, pattern]) => {
    const id = typeof pattern.id === 'string' ? pattern.id : nodeId;
    return {
      id,
      title: typeof pattern.title === 'string' ? pattern.title : undefined,
      aliases: Array.isArray(pattern.aliases)
        ? pattern.aliases.filter((alias): alias is string => typeof alias === 'string')
        : undefined,
      part: typeof pattern.part === 'string' ? pattern.part : undefined,
    };
  });
  const patternId = resolveOptionalTermPatternId(patterns, key);

  return patternId ? `/generated/patterns/${patternId}` : null;
}

function parseEvaluationSnapshot(facts: FpfWorkFacts): EvaluationSnapshot | undefined {
  const snapshotText = facts.fileTexts.publishedSnapshot;
  if (!snapshotText) return undefined;
  try {
    return JSON.parse(snapshotText) as EvaluationSnapshot;
  } catch {
    return undefined;
  }
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/gu, '\\|').replace(/\n/gu, ' ');
}

class EvidenceCollector {
  private readonly evidence = new Map<string, FpfEvidence>();

  constructor(private readonly cwd: string) {}

  add(input: Omit<FpfEvidence, 'id'>): string {
    const id = this.makeId(input);
    if (!this.evidence.has(id)) {
      this.evidence.set(id, { id, ...input });
    }
    return id;
  }

  file(
    key: KnownWorkFile,
    facts: FpfWorkFacts,
    label: string,
  ): string | undefined {
    if (!facts.fileExists[key]) {
      return undefined;
    }
    const path = KNOWN_WORK_FILES[key];
    const changed = facts.changedFiles.find((file) => file.path === path);
    const detail = key === 'docsIndex'
      ? `projected from ${KNOWN_WORK_FILES.publishedSnapshot}`
      : changed ? `changed as ${changed.status}` : 'present';
    return this.add({
      kind: 'file',
      label,
      path,
      detail,
    });
  }

  all(): FpfEvidence[] {
    return [...this.evidence.values()];
  }

  private makeId(input: Omit<FpfEvidence, 'id'>): string {
    if (input.kind === 'file' && input.path) {
      return `file:${input.path}`;
    }
    if (input.kind === 'spec' && input.path) {
      return `spec:${relative(this.cwd, input.path) || input.path}`;
    }
    return `${input.kind}:${slugify(input.label)}`;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '');
}
