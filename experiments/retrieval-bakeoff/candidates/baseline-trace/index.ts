/**
 * baseline-trace — reference candidate wrapping the PRODUCTION ask/query
 * pipeline (`FpfRuntime.trace()`: candidate seeding + heuristic ranking +
 * frontier expansion) so the bake-off has the incumbent on the leaderboard.
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
interface TraceResultLike {
  /** Ranked candidates, sorted score-desc by the engine, capped at 16. */
  candidateScores: Array<{ nodeId: string; kind: string; score: number }>;
}
interface BuildAuditLike {
  reason: string;
  sourceHash: string;
  compiler: { compiledNodes: number };
}
interface FpfRuntimeLike {
  refresh(force?: boolean, allowMemoryCache?: boolean): Promise<BuildAuditLike>;
  trace(question: string, mode?: 'compact' | 'verbose' | 'proof'): Promise<TraceResultLike>;
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

export default class BaselineTraceRetriever implements Retriever {
  readonly name = 'baseline-trace';
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
    await runtime.trace('warm the engine before timed queries', 'compact');
    return {
      buildMs: performance.now() - start,
      docCount: audit.compiler.compiledNodes,
      notes:
        `wraps production FpfRuntime.trace() over the published snapshot ` +
        `(refresh: ${audit.reason}, sourceHash ${audit.sourceHash.slice(0, 20)}…); ` +
        `the ${docs.length} harness-provided docs are IGNORED — the runtime ` +
        `compiles/serves its own snapshot of the same spec, which is the point ` +
        `of this baseline. No sessionId is passed (session boosts off).`,
    };
  }

  async query(question: string, k: number): Promise<ScoredHit[]> {
    const limit = Math.floor(k);
    if (!Number.isFinite(limit) || limit <= 0) {
      return [];
    }
    try {
      // Default 'compact' mode = exactly what the production ask tool runs.
      // No sessionId: session-context boosts would break determinism.
      const trace = await (await this.runtime()).trace(question, 'compact');
      // candidateScores is the engine's ranked candidate list ({nodeId, kind,
      // score}), already sorted score-desc with deterministic tie-breaks —
      // preserve that order, dedupe by nodeId, take top-k.
      const seen = new Set<string>();
      const hits: ScoredHit[] = [];
      for (const candidate of trace.candidateScores) {
        if (seen.has(candidate.nodeId)) {
          continue;
        }
        seen.add(candidate.nodeId);
        hits.push({ id: candidate.nodeId, score: candidate.score });
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
