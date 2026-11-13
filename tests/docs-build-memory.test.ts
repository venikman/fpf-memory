import { describe, expect, it } from '@rstest/core';

import {
  DOCS_BUILD_MIN_HEAP_CAP_MB,
  DOCS_BUILD_NON_HEAP_RESERVE_MB,
  resolveDocsBuildHeapCapMb,
  withDocsBuildHeapCap,
} from '../src/build/docs-build-memory.js';

/**
 * The docs build was OOM-killed on the 8 GB Vercel build machine because
 * Node's default heap limit there (8288 MB) exceeds the container. These
 * cases pin the cap decision; the host facts are the ones the preview build
 * log printed on 2026-11-13.
 */
describe('docs build heap cap', () => {
  const vercelStandardMachine = {
    node: 'v26.13.1',
    heapLimitMb: 8288,
    maxOldSpaceFlagMb: null,
    totalMemMb: 8404,
    constrainedMemMb: 8192,
    cpus: 4,
  };

  it('caps the heap below the container on the 8 GB Vercel build machine', () => {
    const capMb = resolveDocsBuildHeapCapMb(vercelStandardMachine);

    expect(capMb).toBe(8192 - DOCS_BUILD_NON_HEAP_RESERVE_MB);
    // Above the ~1.7 GB of live heap the build needs (a 1536 MB limit aborts
    // it), and low enough to leave the measured non-heap share free.
    expect(capMb).toBeGreaterThanOrEqual(DOCS_BUILD_MIN_HEAP_CAP_MB);
    expect(capMb).toBeLessThan(vercelStandardMachine.constrainedMemMb);
  });

  it('leaves an operator-chosen --max-old-space-size alone', () => {
    expect(
      resolveDocsBuildHeapCapMb({ ...vercelStandardMachine, heapLimitMb: 6144, maxOldSpaceFlagMb: 6144 }),
    ).toBeUndefined();
  });

  it('does nothing when the default limit already leaves the reserve free', () => {
    // A 16 GB machine whose Node defaults to a 4 GB heap, and a contributor
    // laptop/sandbox with a 2 GB default.
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 4144, maxOldSpaceFlagMb: null, constrainedMemMb: 16384 }),
    ).toBeUndefined();
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 2096, maxOldSpaceFlagMb: null, constrainedMemMb: 13673 }),
    ).toBeUndefined();
  });

  it('scales with the machine instead of hardcoding one size', () => {
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 16500, maxOldSpaceFlagMb: null, constrainedMemMb: 16384 }),
    ).toBe(16384 - DOCS_BUILD_NON_HEAP_RESERVE_MB);
  });

  it('refuses a cap that could not fit the build rather than guarantee a heap abort', () => {
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 4200, maxOldSpaceFlagMb: null, constrainedMemMb: 4096 }),
    ).toBeUndefined();
    expect(
      resolveDocsBuildHeapCapMb({
        heapLimitMb: 8000,
        maxOldSpaceFlagMb: null,
        constrainedMemMb: DOCS_BUILD_NON_HEAP_RESERVE_MB + DOCS_BUILD_MIN_HEAP_CAP_MB - 1,
      }),
    ).toBeUndefined();
  });

  it('does nothing when the host limit is unknown', () => {
    expect(resolveDocsBuildHeapCapMb({ heapLimitMb: 8288, maxOldSpaceFlagMb: null })).toBeUndefined();
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 8288, maxOldSpaceFlagMb: null, constrainedMemMb: 0 }),
    ).toBeUndefined();
    expect(
      resolveDocsBuildHeapCapMb({ heapLimitMb: 8288, maxOldSpaceFlagMb: null, constrainedMemMb: null }),
    ).toBeUndefined();
    expect(resolveDocsBuildHeapCapMb({ maxOldSpaceFlagMb: null, constrainedMemMb: 8192 })).toBeUndefined();
  });

  it('appends the flag and keeps existing NODE_OPTIONS', () => {
    expect(withDocsBuildHeapCap(undefined, 3584)).toBe('--max-old-space-size=3584');
    expect(withDocsBuildHeapCap('', 3584)).toBe('--max-old-space-size=3584');
    expect(withDocsBuildHeapCap(' --use-openssl-ca ', 3584)).toBe(
      '--use-openssl-ca --max-old-space-size=3584',
    );
  });
});
