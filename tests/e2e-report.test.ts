import { describe, expect, it } from '@rstest/core';

import {
  buildE2EArtifactDirName,
  parseE2EReportArgs,
  renderE2EReportHtml,
  renderE2EReportMarkdown,
  resolveE2EReportConfig,
  type CommandRunResult,
} from '../scripts/e2e-report.js';

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
