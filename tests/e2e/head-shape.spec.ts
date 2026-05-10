import { expect, test } from '@playwright/test';

// Catch regressions like PR #105 (vim keys), where a malformed `head:` array
// entry leaked raw JS into <head> as text. The standard list of children
// allowed in <head> is small; anything outside the whitelist is a bug.
const ALLOWED_HEAD_TAG_NAMES = new Set([
  'BASE',
  'LINK',
  'META',
  'NOSCRIPT',
  'SCRIPT',
  'STYLE',
  'TITLE',
  'TEMPLATE', // rspress sometimes emits <template> for hydration
]);

const PAGES_TO_CHECK = ['/', '/start-here', '/generated/patterns/A.6.9'];

for (const path of PAGES_TO_CHECK) {
  test(`<head> on ${path} contains only whitelisted element types`, async ({
    page,
  }) => {
    await page.goto(path);
    const offenders = await page.evaluate((allowed) => {
      const head = document.head;
      if (!head) return ['(no head element)'];
      const bad: string[] = [];
      for (const child of Array.from(head.children)) {
        if (!allowed.includes(child.tagName)) {
          bad.push(`${child.tagName} (${child.outerHTML.slice(0, 80)})`);
        }
      }
      // Reject text nodes too — the vim-keys regression leaked JS as
      // direct text content of <head>, not as a child element.
      for (const node of Array.from(head.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
          const value = node.nodeValue?.trim() ?? '';
          if (value.length > 0) {
            bad.push(`#text: ${value.slice(0, 80)}`);
          }
        }
      }
      return bad;
    }, [...ALLOWED_HEAD_TAG_NAMES]);

    expect(
      offenders,
      `unexpected children inside <head> on ${path}`,
    ).toEqual([]);
  });
}
