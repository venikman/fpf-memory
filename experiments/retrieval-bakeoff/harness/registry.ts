import type { Retriever } from './types.js';

/**
 * Candidate registry. Builder agents: add exactly one import + one entry for
 * your candidate, keep the list alphabetical, and touch nothing else here.
 * Each factory must return a FRESH instance (the harness may build twice to
 * check determinism).
 */
export const CANDIDATE_FACTORIES: Record<string, () => Promise<Retriever>> = {
  'baseline-search': async () => new (await import('../candidates/baseline-search/index.js')).default(),
  'baseline-trace': async () => new (await import('../candidates/baseline-trace/index.js')).default(),
  'gramset': async () => new (await import('../candidates/gramset/index.js')).default(),
};

export async function createCandidates(filter?: string[]): Promise<Retriever[]> {
  const names = Object.keys(CANDIDATE_FACTORIES)
    .filter((name) => !filter || filter.includes(name))
    .sort();
  const missing = (filter ?? []).filter((name) => !(name in CANDIDATE_FACTORIES));
  if (missing.length > 0) {
    throw new Error(`unknown candidate(s): ${missing.join(', ')}. Known: ${Object.keys(CANDIDATE_FACTORIES).sort().join(', ')}`);
  }
  return Promise.all(names.map((name) => CANDIDATE_FACTORIES[name]!()));
}
