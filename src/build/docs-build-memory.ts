/**
 * Heap budget for the Rspress docs build on a memory-constrained build host.
 *
 * The Vercel git-preview build runs `rspress build` in an 8 GB container, and
 * that container was OOM-killed on 18 of 31 sync previews between 2026-10-13
 * and 2026-11-02 (the same spec, built twice, passed once and failed once).
 * A failed preview fails the "Vercel" status the sync worker requires, so each
 * kill costs a publication slot.
 *
 * Cause, measured on the build host on 2026-11-13: Node v26.13.1 reports a
 * default heap limit of 8288 MB inside an 8192 MB container. With a limit
 * above the container size V8 never comes under heap pressure before the
 * kernel does, and the build's peak memory follows the limit, not the content:
 *
 *   heap limit   outcome on upstream 1e57ccda (18.4 MB), 4 cores
 *   1536 MB      aborts: JavaScript heap out of memory
 *   1792 MB      5.4 GiB peak RSS
 *   2096 MB      5.3-5.8 GiB
 *   3072 MB      6.3 GiB
 *   4096 MB      6.7 GiB
 *
 * So the build needs about 1.7 GB of live heap and holds another ~3.5 GiB
 * outside it (rspack's native memory, Buffers). Capping the heap at the
 * container size minus that non-heap share keeps the peak under the limit
 * without starving the build, and scales by itself if the machine changes.
 * On the 8 GB machine the cap is 3072 MB: ~6.3 GiB peak, 1.8x the live heap.
 *
 * This buys margin, not capacity. Both shares grow with the spec; when the
 * live heap outgrows the cap the build aborts with a heap error instead of
 * being killed, and the answer then is a larger machine or a build that runs
 * elsewhere (ROADMAP item 7), not a smaller reserve.
 */

/** What the build holds outside the V8 heap (~3.5 GiB) plus ~1.5 GiB slack. */
export const DOCS_BUILD_NON_HEAP_RESERVE_MB = 5120;

/**
 * Below this a cap could not fit the build's live heap, and would replace an
 * occasional OOM kill with a certain heap abort. Leave such hosts uncapped.
 */
export const DOCS_BUILD_MIN_HEAP_CAP_MB = 2048;

export interface BuildHostFacts {
  node?: string;
  /** Effective V8 heap limit of a default `node` process on this host. */
  heapLimitMb?: number;
  /** `--max-old-space-size` already present in NODE_OPTIONS, if any. */
  maxOldSpaceFlagMb?: number | null;
  totalMemMb?: number;
  /** Memory limit imposed on the process (cgroup); 0 or null when unknown. */
  constrainedMemMb?: number | null;
  cpus?: number;
}

/**
 * The heap cap to apply to the docs build, or `undefined` to leave Node's
 * default alone: when an operator already set one, when the host limit is
 * unknown, when the default already leaves the non-heap reserve free, or when
 * the host is too small for any workable cap.
 */
export function resolveDocsBuildHeapCapMb(host: BuildHostFacts): number | undefined {
  if (host.maxOldSpaceFlagMb !== undefined && host.maxOldSpaceFlagMb !== null) {
    return undefined;
  }

  const constrainedMemMb = host.constrainedMemMb ?? 0;
  const heapLimitMb = host.heapLimitMb ?? 0;
  if (!(constrainedMemMb > 0) || !(heapLimitMb > 0)) {
    return undefined;
  }

  const capMb = Math.floor(constrainedMemMb - DOCS_BUILD_NON_HEAP_RESERVE_MB);
  if (capMb < DOCS_BUILD_MIN_HEAP_CAP_MB || heapLimitMb <= capMb) {
    return undefined;
  }

  return capMb;
}

/** NODE_OPTIONS with the heap cap appended; existing options are preserved. */
export function withDocsBuildHeapCap(nodeOptions: string | undefined, capMb: number): string {
  return [nodeOptions?.trim(), `--max-old-space-size=${capMb}`].filter(Boolean).join(' ');
}
