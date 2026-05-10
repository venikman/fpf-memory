import { defineConfig, devices } from '@playwright/test';

// E2E target. Defaults to the public production URL (https://fpf.sh) for
// local runs, but is normally overridden in CI to point at the Vercel
// preview URL of the current PR.
//
//   FPF_E2E_BASE_URL=https://fpf-sh-<sha>.vercel.app \
//     bun run test:e2e
//
// Defaults to the production URL when set unset, so a developer running
// `bun run test:e2e` locally without arguments smokes the live site
// instead of failing for lack of a server.
const baseURL = process.env.FPF_E2E_BASE_URL ?? 'https://fpf.sh';

// Vercel preview deployments are protected by Deployment Protection. The
// workflow plumbs the project-level Protection Bypass for Automation token
// through this env var so Playwright requests can pass it as a header. Locally
// the variable is unset and Playwright hits the public production URL.
const bypassToken = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL,
    extraHTTPHeaders: bypassToken
      ? { 'x-vercel-protection-bypass': bypassToken }
      : undefined,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
