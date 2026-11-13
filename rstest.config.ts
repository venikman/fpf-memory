import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['tests/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  // A hang detector, not a performance budget. Most files compile the full
  // published spec inside each test, so durations track upstream size (the
  // spec grew 10.2 MB -> 18.4 MB between 2026-07 and 2026-11) and runner
  // speed. By 2026-11 ordinary passing times on GitHub runners sat at
  // 80-100% of the old limits (15-21 s against the 20 s default, 31-39 s
  // against a 40 s override), so host variance alone failed sync PRs and
  // blocked publication (PR #401). 120 s is what the heaviest files had
  // already converged on one override at a time; the per-job
  // `timeout-minutes` in ci.yml still bounds a real hang.
  testTimeout: 120_000,
  pool: {
    type: 'forks',
    // The suite compiles and serves the full FPF surface in multiple files.
    // Keep CI below the GitHub runner memory cliff while preserving local speed.
    maxWorkers: process.env.CI ? 1 : '50%',
  },
});
