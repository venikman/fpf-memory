import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

describe('Vercel spend monitor workflow', () => {
  it('runs a scheduled spend guardrail against Vercel metrics', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/vercel-spend-monitor.yml'),
      'utf8',
    );

    expect(workflow).toContain("- cron: '*/15 * * * *'");
    expect(workflow).toContain('issues: write');
    expect(workflow).toContain('FPF_VERCEL_PROJECT: fpf-reference-mcp');
    expect(workflow).toContain('FPF_VERCEL_SCOPE: team_CnO1I5xd2OS0lzbbc4RkW7Ym');
    expect(workflow).toContain('FPF_VERCEL_SPEND_WINDOW_MINUTES');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS:');
    expect(workflow).toContain('FPF_VERCEL_SPEND_LEGACY_PATH: /api/mcp/fpf_memory');
    expect(workflow).toContain('VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}');
    expect(workflow).toContain(
      'bun run monitor:vercel:spend -- --format markdown --fail-on-breach',
    );
    expect(workflow).toContain('Open or update spend breach issue');
    expect(workflow).toContain('Investigate Vercel spend monitor breach');
    expect(workflow).toContain('Fail workflow on spend breach');
  });

  it('exposes the monitor as a package script', async () => {
    const packageJson = JSON.parse(
      await readFile(resolve(process.cwd(), 'package.json'), 'utf8'),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts['monitor:vercel:spend']).toBe(
      'bun scripts/monitor-vercel-spend.ts',
    );
    const monitorScript = await readFile(
      resolve(process.cwd(), 'scripts/monitor-vercel-spend.ts'),
      'utf8',
    );
    expect(monitorScript).toContain('DEFAULT_VERCEL_SPEND_PROJECT');
  });
});
