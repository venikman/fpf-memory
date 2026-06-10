import { expect, test } from '@playwright/test';

test('homepage renders the FPF Reference entry surface', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FPF Reference/);
  await expect(page.getByRole('heading', { name: 'FPF Reference', level: 1 }))
    .toBeVisible();
  await expect(page.getByRole('heading', { name: 'Choose your entry point' }))
    .toBeVisible();
  await expect(page.getByText('Connecting an agent or editor')).toBeVisible();
  await expect(page.getByText('Reviewing a project, PR, or design change'))
    .toBeVisible();
  await expect(page.getByRole('heading', { name: 'Reference shortcuts' }))
    .toBeVisible();
});

test('homepage hydrates without React warnings and installs shims', async ({
  page,
}) => {
  const hydrationMessages: string[] = [];
  page.on('console', (message) => {
    const text = message.text();
    if (
      /hydrateRoot recoverable error|Minified React error #418|Hydration failed|hydrating|did not match/i
        .test(text)
    ) {
      hydrationMessages.push(text);
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#fpf-skip-link')).toHaveText('Skip to main content');
  await expect(page.locator('#fpf-keyhelp-float')).toBeVisible();
  await expect(page.locator('.rp-search-button--mobile')).toHaveAttribute('role', 'button');
  const firstFocusableId = await page.evaluate(() => {
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = candidates.find((element) => {
      if (element.hasAttribute('disabled') || element.getAttribute('aria-hidden') === 'true') {
        return false;
      }
      return true;
    });
    return first?.id ?? '';
  });

  expect(firstFocusableId).toBe('fpf-skip-link');
  expect(hydrationMessages).toEqual([]);
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

test('connect-mcp page bridges to the MCP setup origin', async ({
  page,
}) => {
  await page.goto('/connect-mcp');
  await expect(page).toHaveTitle(/Connect MCP|FPF Reference/);
  await expect(page.getByRole('link', { name: 'https://mcp.fpf.sh/' }).first())
    .toBeVisible();
  await expect(page.getByText('compatibility bridge')).toBeVisible();
  await expect(page.getByText('not agent memory')).toBeVisible();
});
