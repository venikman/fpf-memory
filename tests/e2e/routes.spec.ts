import { expect, test } from '@playwright/test';

// Smoke: every navigable URL must return 200. Catches missing pages,
// bad rewrites, and any rspress build that drops a route.
const STATIC_PATHS = [
  '/',
  '/start-here',
  '/connect-mcp',
  '/patterns',
  '/automation-playbook',
  '/mcp-recipes',
  '/work-packets',
  '/generated/routes/index',
  '/generated/patterns/A.6.9',
  '/generated/patterns/F.9',
  '/generated/patterns/E.10',
];

for (const path of STATIC_PATHS) {
  test(`GET ${path} returns 200`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status(), `unexpected status for ${path}`).toBe(200);
  });
}

test('GET /api/fpf/status returns ok JSON', async ({ request }) => {
  const response = await request.get('/api/fpf/status');
  expect(response.status()).toBe(200);
  const body = (await response.json()) as { status: string };
  expect(body.status).toBe('ok');
});
