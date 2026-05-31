import { readFile } from 'node:fs/promises';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

import { describe, expect, it } from '@rstest/core';

describe('Vercel spend monitor workflow', () => {
  it('runs a scheduled spend guardrail against Vercel metrics', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/vercel-spend-monitor.yml'),
      'utf8',
    );

    expect(workflow).toContain("- cron: '*/15 * * * *'");
    expect(workflow).toContain('issues: write');
    expect(workflow).toContain('FPF_VERCEL_PROJECT: fpf-sh');
    expect(workflow).toContain('FPF_VERCEL_SPEND_WINDOW_MINUTES');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS:');
    expect(workflow).toContain('FPF_VERCEL_SPEND_LEGACY_PATH: /api/mcp/fpf_memory');
    expect(workflow).toContain('VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}');
    expect(workflow).toContain(
      'bun run monitor:vercel:spend -- --format markdown --fail-on-breach',
    );
    expect(workflow).not.toContain(
      'VERCEL_TOKEN is required for scheduled Vercel metrics monitoring.',
    );
    expect(workflow).toContain('Open or update spend breach issue');
    expect(workflow).toContain('Investigate Vercel spend monitor breach');
    expect(workflow).toContain('failed or reported a breach');
    expect(workflow).toContain('failed before querying metrics');
    expect(workflow).toContain('Fix the monitor configuration or repository secrets');
    expect(workflow).toContain('Fail workflow on spend breach');
  });

  it('exposes the monitor as a package script', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts['monitor:vercel:spend']).toBe(
      'bun scripts/monitor-vercel-spend.ts',
    );
  });

  it('emits structured config_error outputs before spawning Vercel metrics without a token', () => {
    const tempDir = mkdtempSync(resolve(tmpdir(), 'fpf-vercel-spend-'));
    const outputPath = resolve(tempDir, 'github-output.txt');
    const summaryPath = resolve(tempDir, 'github-summary.md');
    const bun = resolveBunBinary();
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      GITHUB_OUTPUT: outputPath,
      GITHUB_STEP_SUMMARY: summaryPath,
      PATH: dirname(bun),
    };
    delete env.VERCEL_TOKEN;

    try {
      const result = spawnSync(
        bun,
        ['run', 'monitor:vercel:spend', '--', '--format', 'json'],
        {
          cwd: process.cwd(),
          env,
          encoding: 'utf8',
        },
      );

      expect(result.status).toBe(1);
      const report = JSON.parse(
        result.stdout.slice(result.stdout.indexOf('{'), result.stdout.lastIndexOf('}') + 1),
      ) as { state: string; breached: boolean; summary: string };
      expect(report.state).toBe('config_error');
      expect(report.breached).toBe(false);
      expect(report.summary).toContain('before metrics were queried');

      const outputs = readFileSync(outputPath, 'utf8');
      expect(outputs).toContain('state=config_error');
      expect(outputs).toContain('breached=false');
      expect(outputs).toContain('function_duration_gbhr=not_queried');
      expect(readFileSync(summaryPath, 'utf8')).toContain('Metrics were not queried');
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

function resolveBunBinary(): string {
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath?.endsWith('/bun') || npmExecPath?.endsWith('/bun.exe')) {
    return npmExecPath;
  }

  const lookup = spawnSync('which', ['bun'], { encoding: 'utf8' });
  if (lookup.status !== 0) {
    throw new Error('Could not locate bun binary for monitor CLI regression.');
  }
  return lookup.stdout.trim();
}
