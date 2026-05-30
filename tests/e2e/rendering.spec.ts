import { expect, test } from '@playwright/test';

test('homepage renders the FPF Reference chapter list', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FPF Reference/);
  await expect(page.getByRole('heading', { name: 'FPF Reference', level: 1 }))
    .toBeVisible();
  // The chapter list shows Part headings as ## H2s. At least Part A and the
  // last Part J should be present in the published spec; missing chapters
  // indicate the rspress build dropped routes or the catalog regressed.
  await expect(page.getByRole('heading', { name: /^Part A\b/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /^Part J\b/ })).toBeVisible();
});

test('a generated pattern page renders body and an auto-linked ID', async ({
  page,
}) => {
  await page.goto('/generated/patterns/A.6.9');
  await expect(page).toHaveTitle(/A\.6\.9/);
  // PR #101 auto-links bare pattern IDs in body prose. F.9 is referenced in
  // A.6.9's Specialises clause; if the auto-linker regresses this assertion
  // catches it.
  const linkToF9 = page.locator('a[href*="/generated/patterns/F.9"]').first();
  await expect(linkToF9).toBeVisible();
});

test('connect-mcp page mentions the canonical MCP endpoint', async ({
  page,
}) => {
  await page.goto('/connect-mcp');
  await expect(page).toHaveTitle(/Connect MCP|FPF Reference/);
  // The canonical endpoint URL appears in multiple copy-paste blocks. If
  // the constant drifts away from mcp.fpf.sh the docs would silently lie.
  await expect(
    page.getByText('https://mcp.fpf.sh/api/mcp/fpf_reference/mcp').first(),
  ).toBeVisible();
});
