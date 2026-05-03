import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { describe, expect, it } from '@rstest/core';

import {
  buildE2EArtifactDirName,
  parseE2EReportArgs,
  renderE2EReportHtml,
  renderE2EReportMarkdown,
  resolveE2EReportConfig,
  resolveStaticPath,
  type CommandRunResult,
} from '../scripts/e2e-report.js';
import {
  buildUseCaseVideoArtifactDirName,
  groupUseCaseScenariosByProduct,
  parseRecordUseCaseVideoArgs,
  PRODUCT_SURFACES,
  renderUseCaseVideoReadme,
  selectUseCaseScenarios,
  USE_CASE_SCENARIOS,
  type RecordedUseCase,
} from '../scripts/record-use-case-videos.js';

describe('E2E report tooling', () => {
  it('defaults to the CLI smoke preset', () => {
    const config = resolveE2EReportConfig(parseE2EReportArgs([]));

    expect(config.name).toBe('cli-smoke');
    expect(config.command).toBe('bun run evaluate:work');
    expect(config.recordTarget).toBe('report');
  });

  it('resolves the docs preset to a docs recording target', () => {
    const config = resolveE2EReportConfig(parseE2EReportArgs(['docs']));

    expect(config.name).toBe('docs-preview');
    expect(config.command).toBe('bun run docs:build');
    expect(config.recordTarget).toBe('docs');
  });

  it('supports custom command reports', () => {
    const config = resolveE2EReportConfig(
      parseE2EReportArgs([
        '--name',
        'PR Review',
        '--command',
        'bun run evaluate:work',
        '--timeout-ms',
        '70000',
        '--video-duration-ms',
        '2000',
      ]),
    );

    expect(config.name).toBe('pr-review');
    expect(config.command).toBe('bun run evaluate:work');
    expect(config.timeoutMs).toBe(70_000);
    expect(config.videoDurationMs).toBe(2_000);
  });

  it('rejects unknown presets', () => {
    expect(() => resolveE2EReportConfig(parseE2EReportArgs(['nope']))).toThrow(
      /Unknown e2e:report preset/u,
    );
  });

  it('builds stable artifact directory names', () => {
    expect(buildE2EArtifactDirName(new Date('2026-04-30T16:00:01.123Z'), 'PR Review')).toBe(
      '2026-04-30T16-00-01-123Z-pr-review',
    );
  });

  it('resolves Rspress base-path assets for local docs recordings', async () => {
    const root = await mkdtemp(join(tmpdir(), 'fpf-static-'));
    await mkdir(join(root, 'static/css'), { recursive: true });
    await mkdir(join(root, 'generated/patterns'), { recursive: true });
    await writeFile(join(root, 'static/css/styles.css'), 'body{}');
    await writeFile(join(root, 'start-here.html'), '<html></html>');
    await writeFile(join(root, 'generated/patterns/A.1.1.html'), '<html></html>');

    expect(resolveStaticPath(root, '/fpf-memory/static/css/styles.css', '/fpf-memory')).toBe(
      join(root, 'static/css/styles.css'),
    );
    expect(resolveStaticPath(root, '/fpf-memory/start-here', '/fpf-memory')).toBe(
      join(root, 'start-here.html'),
    );
    expect(resolveStaticPath(root, '/fpf-memory/generated/patterns/A.1.1', '/fpf-memory')).toBe(
      join(root, 'generated/patterns/A.1.1.html'),
    );
  });

  it('parses use-case video recording options', () => {
    const args = parseRecordUseCaseVideoArgs([
      '--',
      '--skip-build',
      '--artifact-root',
      '.runtime/demo-videos',
      '--duration-ms',
      '2000',
    ]);

    expect(args).toEqual({
      skipBuild: true,
      artifactRoot: '.runtime/demo-videos',
      durationMs: 2_000,
      scenarioSlugs: [],
    });
    expect(buildUseCaseVideoArtifactDirName(new Date('2026-05-02T12:00:00.000Z'))).toBe(
      '2026-05-02T12-00-00-000Z-fpf-product-use-cases',
    );
  });

  it('selects individual use-case video scenarios for incremental recordings', () => {
    const args = parseRecordUseCaseVideoArgs(['--scenario', 'docs-product-role-feedback']);

    expect(args.scenarioSlugs).toEqual(['docs-product-role-feedback']);
    expect(selectUseCaseScenarios(args.scenarioSlugs).map((scenario) => scenario.slug)).toEqual([
      'docs-product-role-feedback',
    ]);
    expect(() => selectUseCaseScenarios(['missing-scenario'])).toThrow(
      /Unknown use-case video scenario/u,
    );
  });

  it('defines at least two use-case video scenarios for each product surface', () => {
    const grouped = groupUseCaseScenariosByProduct(USE_CASE_SCENARIOS);

    expect(PRODUCT_SURFACES).toEqual([
      'Docs/wiki',
      'MCP runtime',
      'CLI runtime',
      'Work evaluator',
    ]);
    for (const product of PRODUCT_SURFACES) {
      expect(grouped[product].map((scenario) => scenario.slug).length).toBeGreaterThanOrEqual(2);
    }
    expect(grouped['Docs/wiki'].map((scenario) => scenario.slug)).toContain(
      'docs-product-role-feedback',
    );
    expect(grouped['Docs/wiki'].map((scenario) => scenario.slug)).toContain(
      'docs-pr-review-without-full-spec',
    );
  });

  it('keeps each use-case scenario narration complete', () => {
    for (const scenario of USE_CASE_SCENARIOS) {
      expect(scenario.slug).toMatch(/^[a-z0-9-]+$/u);
      expect(scenario.title.length).toBeGreaterThan(0);
      expect(scenario.initialState.length).toBeGreaterThan(0);
      expect(scenario.problem.length).toBeGreaterThan(0);
      expect(scenario.tools.length).toBeGreaterThan(0);
      expect(scenario.outcome.length).toBeGreaterThan(0);
      expect(scenario.recordingSteps.length).toBeGreaterThan(0);
    }
  });

  it('renders use-case video README grouped by product', () => {
    const videos: RecordedUseCase[] = USE_CASE_SCENARIOS.map((scenario) => ({
      slug: scenario.slug,
      product: scenario.product,
      title: scenario.title,
      initialState: scenario.initialState,
      problem: scenario.problem,
      tools: scenario.tools,
      outcome: scenario.outcome,
      recordingSteps: scenario.recordingSteps,
      kind: scenario.kind,
      transcriptPath: `/tmp/${scenario.slug}.html`,
      videoPath: `/tmp/${scenario.slug}.webm`,
    }));

    const readme = renderUseCaseVideoReadme(videos);

    expect(readme).toContain('# FPF Product Use-Case Videos');
    for (const product of PRODUCT_SURFACES) {
      expect(readme).toContain(`## ${product}`);
    }
    expect(readme.match(/\.webm/g)?.length).toBe(USE_CASE_SCENARIOS.length);
  });

  it('renders markdown and html reports with escaped command output', () => {
    const config = resolveE2EReportConfig(parseE2EReportArgs([]));
    const commandResult = makeCommandResult({
      stdout: 'ok <done>',
      stderr: 'warn & continue',
    });

    const markdown = renderE2EReportMarkdown({
      config,
      commandResult,
      videoPath: '.runtime/e2e-recordings/run/e2e-report.webm',
    });
    const html = renderE2EReportHtml({
      config,
      commandResult,
      videoPath: '.runtime/e2e-recordings/run/e2e-report.webm',
    });

    expect(markdown).toContain('Status: PASS');
    expect(markdown).toContain('e2e-report.webm');
    expect(html).toContain('ok &lt;done&gt;');
    expect(html).toContain('warn &amp; continue');
  });
});

function makeCommandResult(overrides: Partial<CommandRunResult> = {}): CommandRunResult {
  return {
    command: 'bun run evaluate:work',
    cwd: '/repo',
    startedAt: '2026-04-30T16:00:00.000Z',
    finishedAt: '2026-04-30T16:00:01.000Z',
    durationMs: 1000,
    exitCode: 0,
    signal: null,
    timedOut: false,
    stdout: '',
    stderr: '',
    ...overrides,
  };
}
