/**
 * Heap budget for the Rspress docs build on a memory-constrained build host.
 *
 * The Vercel git-preview build runs `rspress build` in an 8 GB container.
 * That container was OOM-killed on 18 of 31 sync previews between 2026-10-13
 * and 2026-11-02 (the same spec, built twice, passed once and failed once),
 * and once before in 2026-08. A failed preview fails the "Vercel" status the
 * sync worker requires, so each kill costs a publication slot.
 *
 * What is measured (2026-11-13):
 *
 * - On the build host, Node v26.13.1 reports a default heap limit of 8288 MB
 *   inside an 8192 MB container, so V8 is never the first to feel pressure.
 * - The build's peak memory follows the heap limit, not the content
 *   (`rspress build`, upstream 1e57ccda at 18.4 MB, 4 cores, Node 22):
 *
 *     heap limit   outcome
 *     1536 MB      aborts: JavaScript heap out of memory
 *     1792 MB      5.4 GiB peak RSS
 *     2096 MB      5.3-5.8 GiB (same at 16.2 MB of spec)
 *     3072 MB      6.3 GiB
 *     4096 MB      6.7 GiB
 *
 * - On the build host, same tree built twice: container peak 5938 MB with
 *   the default limit, 5432 MB with the heap capped at 3072 MB.
 *
 * What is not established: that the heap limit caused the 2026-10 kills.
 * They stopped about when Vercel moved this project's builds to Node 26, and
 * the earlier runtime can no longer be measured. The cap is therefore a
 * bound on the part of memory this repo controls, worth about 0.5 GB of
 * margin today and independent of which Node major the build floats to.
 *
 * It buys margin, not capacity. The build needs about 1.7 GB of live heap
 * and holds about 3.5 GiB outside it (rspack's native memory, Buffers), and
 * both grow with the spec. When the container peak nears its limit the
 * answer is a larger machine or a build that runs elsewhere (ROADMAP item
 * 7), not a smaller reserve.
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

/**
 * The `--max-old-space-size` an operator already put in NODE_OPTIONS, in MB.
 * V8 accepts dashes or underscores in the flag name, and the last occurrence
 * wins, so both are matched and the last one is returned.
 */
export function parseMaxOldSpaceFlagMb(nodeOptions: string | undefined): number | null {
  const matches = [...(nodeOptions ?? '').matchAll(/--max[-_]old[-_]space[-_]size=(\d+)/g)];
  const last = matches.at(-1);
  return last ? Number(last[1]) : null;
}

/** NODE_OPTIONS with the heap cap appended; existing options are preserved. */
export function withDocsBuildHeapCap(nodeOptions: string | undefined, capMb: number): string {
  return [nodeOptions?.trim(), `--max-old-space-size=${capMb}`].filter(Boolean).join(' ');
}
