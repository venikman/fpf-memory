import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, it } from '@rstest/core';

/**
 * Regression test for the inline accessibility shim in `rspress.config.ts`.
 *
 * The shim covers five rspress DOM gaps that the framework doesn't expose
 * hooks for (mobile search, mobile sidebar inert, sidebar group keyboard
 * semantics, table scroll containers, home feature cards). Without these
 * patches the site fails axe-core color-contrast / scrollable-region /
 * aria-hidden-focus rules and keyboard nav.
 *
 * Per FU-validation P3-002: the shim is fragile because it depends on
 * rspress-internal class names. This test fails the build if any patch
 * loses its target call so the gap is caught before re-validation does.
 */

describe('a11y shim regression checks', () => {
  let configSource: string;

  beforeAll(async () => {
    configSource = await readFile(resolve(process.cwd(), 'rspress.config.ts'), 'utf8');
  });

  // Each assertion encodes ONE shim guarantee. Failure surface tells the
  // fixer which DOM patch was removed/regressed.

  it('patches `.rp-table-scroll-container` with tabindex=0', () => {
    expect(configSource).toContain(".rp-table-scroll-container");
    expect(configSource).toMatch(/setAttribute\(\s*['"]tabindex['"]\s*,\s*['"]0['"]\s*\)/);
  });

  it('patches `.rp-search-button--mobile` to a real button with label + Enter/Space activation', () => {
    expect(configSource).toContain(".rp-search-button--mobile");
    expect(configSource).toMatch(/aria-label['"]\s*,\s*['"]Search['"]/);
    expect(configSource).toMatch(/role['"]\s*,\s*['"]button['"]/);
    expect(configSource).toContain("'Enter'");
    expect(configSource).toContain("' '");
  });

  it('patches sidebar groups (`.rp-sidebar-group`) with role + aria-expanded + keyboard activation', () => {
    expect(configSource).toContain(".rp-sidebar-group");
    expect(configSource).toContain("aria-expanded");
    // The expanded state reads inline gridTemplateRows on the panel
    // (rspress collapses via that, not a CSS class) — DS-P2-013 confirmed.
    expect(configSource).toContain("gridTemplateRows");
  });

  it('marks the closed mobile sidebar drawer as `inert`', () => {
    expect(configSource).toContain(".rp-doc-layout__sidebar");
    expect(configSource).toContain("inert");
    // The detection compares getBoundingClientRect against the viewport
    // so the drawer becomes inert exactly when it's offscreen.
    expect(configSource).toContain("getBoundingClientRect");
  });

  it('patches `.rp-home-feature__card--clickable` to a real link with label + keyboard activation', () => {
    expect(configSource).toContain(".rp-home-feature__card--clickable");
    expect(configSource).toMatch(/role['"]\s*,\s*['"]link['"]/);
  });

  it('uses a MutationObserver (not a polling setInterval) to keep patches in sync after route changes', () => {
    expect(configSource).toContain("MutationObserver");
    // No setInterval polling — the previous polling shim was replaced
    // per DS-P3-012; if someone reintroduces setInterval the test fires.
    expect(configSource).not.toMatch(/setInterval\s*\(/);
  });
});
