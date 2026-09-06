/**
 * baseline-search — reference candidate wrapping the PRODUCTION full-text
 * search tool (`FpfRuntime.search()`: token-overlap scoring over
 * searchableText + title, lexeme down-weighting, exact ID/title boosts) so
 * the bake-off has the second incumbent surface on the leaderboard.
 *
 * The runtime is constructed against the committed publication surface
 * (`published/current/FPF-Spec.md`) and seeded from the published artifact
 * snapshot (`published/current/fpf-index`), the same way the hosted
 * composition wires it (see `src/composition/runtime.ts`). Writable build
 * artifacts land in the gitignored `.runtime/retrieval-bakeoff/fpf-index`
 * so the published surface is never written to.
 *
 * All paths are resolved absolutely from the repo root (derived from
 * `import.meta.dir`) — the harness runs with cwd=experiments/retrieval-bakeoff
 * and no env vars are consulted.
 *
 * The module is loaded through a non-literal dynamic import with a minimal
 * structural type: the experiment tsconfig enables noUncheckedIndexedAccess,
 * which the root tsconfig (that keeps src/ clean) does not, so a static
 * import would drag the whole production tree into this stricter program.
 * Runtime behavior is the real production runtime either way.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import type { BuildInfo, CorpusDoc, Retriever, ScoredHit } from '../../harness/types.js';

const REPO_ROOT = path.resolve(import.meta.dir, '..', '..', '..', '..');
const RUNTIME_MODULE_PATH = path.join(REPO_ROOT, 'src', 'runtime', 'runtime.ts');
const SOURCE_PATH = path.join(REPO_ROOT, 'published', 'current', 'FPF-Spec.md');
const SEED_DIR = path.join(REPO_ROOT, 'published', 'current', 'fpf-index');
const MANIFEST_PATH = path.join(REPO_ROOT, 'published', 'current', 'manifest.json');
const ARTIFACT_DIR = path.join(REPO_ROOT, '.runtime', 'retrieval-bakeoff', 'fpf-index');

/** Structural view of the bits of src/runtime/runtime.ts this baseline uses. */
interface SearchResultLike {
  /** Hits sorted score-desc with a deterministic ID tie-break. */
  hits: Array<{ id: string; score: number }>;
}
interface BuildAuditLike {
  reason: string;
  sourceHash: string;
  compiler: { compiledNodes: number };
}
interface FpfRuntimeLike {
  refresh(force?: boolean, allowMemoryCache?: boolean): Promise<BuildAuditLike>;
  search(query: string, options?: { limit?: number }): Promise<SearchResultLike>;
}
type FpfRuntimeCtor = new (options: {
  sourcePath?: string;
  artifactDir?: string;
  artifactSeedDir?: string;
  compilerFingerprint?: string;
}) => FpfRuntimeLike;

/**
 * Same trick as `src/composition/runtime.ts`: hand the runtime the compiler
 * fingerprint recorded in the published manifest so it serves the published
 * snapshot as-is instead of re-deriving a fingerprint from the compiler
 * sources (which could force a needless recompile if the working tree has
 * drifted from the publish commit).
 */
function readPublishedCompilerFingerprint(): string | undefined {
  try {
    const parsed = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as {
      compilerFingerprint?: unknown;
    };
    return typeof parsed.compilerFingerprint === 'string'
      ? parsed.compilerFingerprint
      : undefined;
  } catch {
    return undefined;
  }
}

async function createRuntime(): Promise<FpfRuntimeLike> {
  const mod = (await import(RUNTIME_MODULE_PATH)) as { FpfRuntime: FpfRuntimeCtor };
  return new mod.FpfRuntime({
    sourcePath: SOURCE_PATH,
    artifactDir: ARTIFACT_DIR,
    artifactSeedDir: SEED_DIR,
    compilerFingerprint: readPublishedCompilerFingerprint(),
  });
}

export default class BaselineSearchRetriever implements Retriever {
  readonly name = 'baseline-search';
  private runtimePromise?: Promise<FpfRuntimeLike>;

  private runtime(): Promise<FpfRuntimeLike> {
    this.runtimePromise ??= createRuntime();
    return this.runtimePromise;
  }

  async build(docs: CorpusDoc[]): Promise<BuildInfo> {
    const start = performance.now();
    // Warm the runtime once so lazy engine/snapshot init (95MB JSON parse,
    // artifact seeding) is paid here, not inside the first timed query().
    const runtime = await this.runtime();
    const audit = await runtime.refresh(false, true);
    await runtime.search('warm the engine before timed queries', { limit: 1 });
    return {
      buildMs: performance.now() - start,
      docCount: audit.compiler.compiledNodes,
      notes:
        `wraps production FpfRuntime.search() over the published snapshot ` +
        `(refresh: ${audit.reason}, sourceHash ${audit.sourceHash.slice(0, 20)}…); ` +
        `the ${docs.length} harness-provided docs are IGNORED — the runtime ` +
        `compiles/serves its own snapshot of the same spec, which is the point ` +
        `of this baseline.`,
    };
  }

  async query(question: string, k: number): Promise<ScoredHit[]> {
    const limit = Math.floor(k);
    if (!Number.isFinite(limit) || limit <= 0) {
      return [];
    }
    try {
      // Production caps limit at 100 internally; hits arrive sorted
      // score-desc with a deterministic ID tie-break. No kind filter — the
      // production tool searches all node kinds by default.
      const result = await (await this.runtime()).search(question, {
        limit: Math.min(limit, 100),
      });
      const seen = new Set<string>();
      const hits: ScoredHit[] = [];
      for (const hit of result.hits) {
        if (seen.has(hit.id)) {
          continue;
        }
        seen.add(hit.id);
        hits.push({ id: hit.id, score: hit.score });
        if (hits.length >= limit) {
          break;
        }
      }
      return hits;
    } catch {
      // Contract: never throw on weird input — abstain instead.
      return [];
    }
  }
}
