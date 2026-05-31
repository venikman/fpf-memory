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
    expect(workflow).toContain('FPF_VERCEL_SCOPE: venikmans-projects');
    expect(workflow).toContain('FPF_VERCEL_SPEND_WINDOW_MINUTES');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_FUNCTION_DURATION_GBHR');
    expect(workflow).toContain('FPF_VERCEL_SPEND_MAX_LEGACY_INVOCATIONS:');
    expect(workflow).toContain('FPF_VERCEL_SPEND_LEGACY_PATH: /api/mcp/fpf_memory');
    expect(workflow).toContain(
      'VERCEL_TOKEN: ${{ secrets.VERCEL_SPEND_MONITOR_TOKEN || secrets.VERCEL_TOKEN }}',
    );
    expect(workflow).not.toContain('write_output state monitor_error');
    expect(workflow).toContain('write_output state metrics_unavailable');
    expect(workflow).toContain('write_output metrics_queried false');
    expect(workflow).toContain('monitor_error');
    expect(workflow).toContain('- Metrics queried: $METRICS_QUERIED');
    expect(workflow).toContain('The scheduled Vercel spend monitor needs attention.');
    expect(workflow).toContain('If metrics were not queried, fix monitor credentials/config');
    expect(workflow).toContain(
      'bun run monitor:vercel:spend -- --format markdown --fail-on-breach',
    );
    expect(workflow).toContain('Open or update spend monitor issue');
    expect(workflow).toContain('Investigate Vercel spend monitor breach');
    expect(workflow).toContain('gh issue edit "$existing" --body-file "$body_file"');
    expect(workflow).toContain('Close spend monitor issue after clean run');
    expect(workflow).toContain(
      "if: github.event_name == 'schedule' && steps.spend.outcome == 'success' && steps.spend.outputs.state == 'ok'",
    );
    expect(workflow).toContain('gh issue close "$existing" --reason completed');
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
    expect(monitorScript).toContain('VERCEL_SPEND_MONITOR_TOKEN');
    expect(monitorScript).toContain(
      'process.env.VERCEL_SPEND_MONITOR_TOKEN || process.env.VERCEL_TOKEN',
    );
    expect(monitorScript).toContain('createVercelSpendConfigErrorReport');
    expect(monitorScript).toContain('createVercelSpendMetricsUnavailableReport');
  });
});
