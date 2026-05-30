import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

describe('sync FPF publication workflow', () => {
  it('keeps fpf.sh current from Anatoly Levenchuk FPF plus six-hour polling', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/sync-fpf.yml'),
      'utf8',
    );

    expect(workflow).toContain('repository_dispatch:');
    expect(workflow).toContain('types: [fpf-origin-updated, fpf-sync-updated]');
    expect(workflow).toContain("- cron: '0 */6 * * *'");
    expect(workflow).toContain('ailev/FPF');
    expect(workflow).not.toContain('venikman');
  });

  it('passes one resolved upstream ref to download and publish', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/sync-fpf.yml'),
      'utf8',
    );

    expect(workflow).toContain('id: upstream');
    expect(workflow).toContain(
      'FPF_UPSTREAM_REF: ${{ steps.upstream.outputs.ref }}',
    );
    expect(workflow).toContain(
      'FPF_UPSTREAM_SPEC_URL: ${{ steps.upstream.outputs.spec_url }}',
    );
    expect(workflow).toContain('spec_url requires client_payload.sha/after/ref/branch');
  });

  it('checks the manually triggered CI run by head SHA before auto-merge', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/sync-fpf.yml'),
      'utf8',
    );

    expect(workflow).toContain('gh workflow run ci.yml --ref "$SYNC_BRANCH"');
    expect(workflow).toContain('PR_HEAD_SHA=$(gh pr view "$PR_NUMBER" --json headRefOid');
    expect(workflow).toContain('--workflow ci.yml');
    expect(workflow).toContain('--branch "chore/sync-fpf-${{ steps.detect.outputs.short_ref }}"');
    expect(workflow).toContain('select(.headSha == \\"$PR_HEAD_SHA\\")');
    expect(workflow).toContain('CI_CONCLUSION');
    expect(workflow).toContain('REQUIRED_CHECK_NAMES=\'["Vercel","Playwright on Vercel preview"]\'');
  });

  it('monitors production drift and triggers sync without user intervention', async () => {
    const workflow = await readFile(
      resolve(process.cwd(), '.github/workflows/fpf-sync-monitor.yml'),
      'utf8',
    );

    expect(workflow).toContain("- cron: '17 * * * *'");
    expect(workflow).toContain('bun run monitor:sync -- --format markdown');
    expect(workflow).toContain('gh workflow run sync-fpf.yml --ref main');
    expect(workflow).toContain('steps.monitor.outputs.needs_sync');
    expect(workflow).toContain('steps.monitor.outputs.breached');
  });
});
