import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

describe('FPF content quality workflow', () => {
  it('gates pull requests with the local content monitor', async () => {
    const workflow = await readFile(resolve(process.cwd(), '.github/workflows/ci.yml'), 'utf8');

    expect(workflow).toContain('Monitor generated and curated content quality');
    expect(workflow).toContain(
      'bun run monitor:content -- --mode local --format markdown --fail-on-breach',
    );
    expect(workflow).toContain('Run semantic production smoke against local build');
    expect(workflow).toContain(
      'bun run smoke:production -- --local --format markdown --fail-on-breach',
    );
  });

  it('monitors production route and curated page drift on a schedule', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/fpf-content-quality.yml'),
      'utf8',
    );

    expect(workflow).toContain("- cron: '37 * * * *'");
    expect(workflow).toContain(
      'bun run monitor:content -- --mode live --format markdown --fail-on-breach',
    );
    expect(workflow).toContain(
      'bun run smoke:production -- --format markdown --fail-on-breach',
    );
    expect(workflow).toContain('FPF_CONTENT_QUALITY_BASE_URL: https://fpf.sh');
    expect(workflow).toContain(
      'FPF_CONTENT_QUALITY_STATUS_URL: https://mcp.fpf.sh/api/fpf/status',
    );
  });
});
