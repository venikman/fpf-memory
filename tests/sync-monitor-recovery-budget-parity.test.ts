import { readFileSync } from 'node:fs';

import { describe, expect, it } from '@rstest/core';

/**
 * The recovery-dispatch budget in fpf-sync-monitor.yml decides when automated
 * re-dispatch of the sync worker stops, and when the "recovery is stuck"
 * escalation issue opens and closes. It originally measured both from ONE
 * unpaginated page of 100 runs; at 2+ runs/day the last-success anchor and
 * then the counted failed dispatches scrolled out of that window after ~3-4
 * weeks of sustained failure, so FAILED_STREAK spuriously dropped, the
 * escalation issue auto-closed with a false "retries resumed" comment, and
 * the budget re-armed for 3 more doomed dispatches. These assertions pin the
 * shape of the fix so a refactor cannot quietly reintroduce the window.
 */
describe('sync monitor recovery budget measures the true history', () => {
  const yaml = readFileSync('.github/workflows/fpf-sync-monitor.yml', 'utf8');

  it('anchors on a server-filtered success query, not a mixed page', () => {
    expect(yaml).toContain('sync-fpf.yml/runs?status=success&per_page=100');
  });

  it('counts failed dispatches with server-side filters and full pagination', () => {
    expect(yaml).toContain('QUERY="event=workflow_dispatch&status=failure&per_page=100"');
    expect(yaml).toContain(
      'gh api --paginate "repos/${{ github.repository }}/actions/workflows/sync-fpf.yml/runs?$QUERY"',
    );
  });

  it('bounds the failure walk by the anchor day and re-checks the exact timestamp in jq', () => {
    // Server-side `created` is only reliable at date granularity, so the
    // strictly-after cut must survive as the client-side jq compare.
    expect(yaml).toContain('created=%3E%3D${LAST_SUCCESS%%T*}');
    expect(yaml).toContain('.created_at > $since');
  });

  it('does not regress to a bare unfiltered 100-run page', () => {
    expect(yaml).not.toContain('sync-fpf.yml/runs?per_page=100"');
  });

  it('fails open on unreadable or unparseable history', () => {
    // Every arm of the budget measurement must degrade to "allow a
    // dispatch", never to a silent green or a hard step failure that would
    // suppress recovery.
    expect([...yaml.matchAll(/fail_open "/gu)].length).toBeGreaterThanOrEqual(3);
    expect(yaml).toContain('failing open and allowing a dispatch');
  });
});
