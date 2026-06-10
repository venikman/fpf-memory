/**
 * Markup escaping shared by the generated wiki HTML and the sitemap XML.
 *
 * Kept out of `text.ts` deliberately: that module is a snapshot
 * compiler-fingerprint input (see SNAPSHOT_COMPILER_FINGERPRINT_INPUTS),
 * and escaping markup has no bearing on compiled snapshot semantics.
 */

/**
 * Escape the five markup-significant characters. Uses `&#39;` for the
 * apostrophe — valid in both HTML and XML — so one escaper serves both
 * output formats.
 */
export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
