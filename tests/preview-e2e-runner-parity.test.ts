import { readFileSync } from 'node:fs';

import { describe, expect, it } from '@rstest/core';

/**
 * "Playwright on Vercel preview" is a required check for the sync worker's
 * auto-merge, and `playwright install --with-deps` hard-fails on any Ubuntu
 * release the pinned Playwright version does not know. With a floating
 * `ubuntu-latest` label that failure arrives with a runner-image rollout —
 * no commit in this repo, nothing to bisect — and blocks every publication
 * (2026-10-26 → 2026-11-13: ubuntu-latest moved to 26.04, Playwright 1.59.1
 * supports up to 24.04). The runner image must therefore be an explicit,
 * reviewed input that only changes together with the Playwright version.
 */
describe('preview E2E runner image is pinned to what Playwright supports', () => {
  const workflow = readFileSync('.github/workflows/preview-e2e.yml', 'utf8');
  const runsOn = [...workflow.matchAll(/^\s*runs-on:\s*(\S+)\s*$/gmu)].map((m) => m[1] ?? '');

  it('runs every job on an explicit Ubuntu release, never a floating label', () => {
    expect(runsOn.length).toBeGreaterThan(0);
    for (const label of runsOn) {
      expect(label).toMatch(/^ubuntu-\d{2}\.\d{2}$/u);
    }
  });

  it('pins a release the installed Playwright can provision browsers for', () => {
    // Playwright names its dependency sets `ubuntu<release>-<arch>`; the
    // release list lives in the installed package, so a Playwright bump that
    // drops or adds a release is checked against the pin automatically.
    const supported = readPlaywrightUbuntuReleases();
    expect(supported.length).toBeGreaterThan(0);
    for (const label of runsOn) {
      expect(supported).toContain(label.replace(/^ubuntu-/u, ''));
    }
  });
});

function readPlaywrightUbuntuReleases(): string[] {
  // 1.59 ships the table as lib/server/registry/nativeDeps.js; later
  // releases fold it into lib/coreBundle.js. Scan whichever exists rather
  // than importing an internal module whose path is not a public contract.
  const candidates = [
    'node_modules/playwright-core/lib/server/registry/nativeDeps.js',
    'node_modules/playwright-core/lib/coreBundle.js',
  ];
  const releases = new Set<string>();
  for (const path of candidates) {
    let source: string;
    try {
      source = readFileSync(path, 'utf8');
    } catch {
      continue;
    }
    for (const match of source.matchAll(/["']ubuntu(\d{2}\.\d{2})-x64["']/gu)) {
      releases.add(match[1] ?? '');
    }
  }
  return [...releases].sort();
}
