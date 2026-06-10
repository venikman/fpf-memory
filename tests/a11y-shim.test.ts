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

  it('patches top-nav dropdown triggers for keyboard activation', () => {
    // R5-P1-003: rspress ships dropdown triggers as `<div>` elements
    // that only respond to mouse hover. Without this shim, keyboard
    // users skip menu items such as Reference entirely.
    expect(configSource).toContain('rp-nav-menu__item__container');
    expect(configSource).toContain("aria-haspopup");
    expect(configSource).toContain('rp-hover-group--hidden');
    // The menu must close on Escape so a trapped user can get out.
    expect(configSource).toContain("'Escape'");
  });

  it('injects a skip-to-content link as the first focusable element', () => {
    // R5-P1-003: keyboard users on long reference pages should be able
    // to bypass the sidebar and land on the article body in one Tab.
    expect(configSource).toContain('fpf-skip-link');
    expect(configSource).toContain('fpf-main-content');
    expect(configSource).toContain('Skip to main content');
  });

  it('uses the upstream commit date for the header provenance stamp', () => {
    // The header reads "as of <sha> · <date>". That date must describe
    // the same upstream commit as the SHA; the later local publish date
    // remains available only as tooltip context.
    expect(configSource).toContain('fpf-upstream-committed-at');
    expect(configSource).toContain('rawCommittedAt||rawPublishedAt');
    expect(configSource).toContain("' · committed '+rawCommittedAt");
    expect(configSource).toContain("' · published '+rawPublishedAt");
  });

  it('installs the skip link before hydration and defers React-owned patches until load', () => {
    expect(configSource).toContain('installEarlySkipLink');
    expect(configSource).toContain('afterHydration');
    expect(configSource).toContain("window.addEventListener('load'");
  });

  it('marks collapsed sidebar panels as `inert` so their descendants leave the tab order', () => {
    // R5-P1-003: rspress collapses sidebar groups by setting
    // `gridTemplateRows: 0fr` on the panel; descendants stay tabbable
    // unless we mark the panel inert.
    expect(configSource).toContain('isCollapsedPanel');
    expect(configSource).toMatch(/setAttribute\(\s*['"]inert['"]/);
  });
});
