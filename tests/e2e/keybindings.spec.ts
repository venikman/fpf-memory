import { expect, test } from '@playwright/test';

// Catches the PR #105 regression: rspress's head pipeline stripped the
// raw-string `<script>` wrapper and leaked the JS body as text in <head>.
// Asserting the localStorage key string isn't visible in body text is a
// lightweight proxy: if the script body was inadvertently rendered as
// content, the literal "fpf:vim-keys" would appear inside <body>.
test('vim-keys script loads as a real <script>, not as <head> text', async ({
  page,
}) => {
  await page.goto('/');
  // Visible body text must NOT contain the localStorage sentinel.
  const visibleText = await page.locator('body').innerText();
  expect(visibleText).not.toContain('fpf:vim-keys');
  // The script must have actually executed — the listener is attached to
  // document and `?` opens the help overlay.
  await page.keyboard.press('?');
  await expect(page.locator('#fpf-keyhelp')).toBeVisible();
  await expect(
    page.locator('#fpf-keyhelp [aria-label="Keyboard shortcuts"], #fpf-keyhelp[aria-label="Keyboard shortcuts"]'),
  ).toBeAttached();
});

test('Esc closes the help overlay', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('?');
  await expect(page.locator('#fpf-keyhelp')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#fpf-keyhelp')).toHaveCount(0);
});

test('toggle button persists Disabled state in localStorage', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('?');
  const toggle = page.locator('#fpf-keyhelp-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toHaveText('Enabled');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(toggle).toHaveText('Disabled');

  const stored = await page.evaluate(() => localStorage.getItem('fpf:vim-keys'));
  expect(stored).toBe('0');

  // Reload — the disabled state must persist.
  await page.reload();
  await page.keyboard.press('?');
  await expect(page.locator('#fpf-keyhelp-toggle')).toHaveText('Disabled');

  // ? still opens the overlay even when keys are off, so users can
  // re-enable from any page.
  await page.keyboard.press('Escape');
  await expect(page.locator('#fpf-keyhelp')).toHaveCount(0);
  await page.keyboard.press('?');
  await expect(page.locator('#fpf-keyhelp')).toBeVisible();

  // Cleanup: re-enable so the next spec runs against the default state.
  await page.locator('#fpf-keyhelp-toggle').click();
});
