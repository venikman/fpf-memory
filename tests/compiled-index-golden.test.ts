import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { ARTIFACT_FILENAMES } from '../src/runtime/constants.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

/**
 * Golden-snapshot test for the compiler's compiled index outputs.
 *
 * We do not pin exact counts (the upstream spec drifts between releases),
 * but we pin structural invariants that regressions would silently break:
 *   - pattern and lexeme node kinds are produced; route nodes are valid when
 *     present but optional in synced specs
 *   - every pattern projection preserves its compiled title and part
 *   - every non-route relation kind the retrieval layer depends on is emitted
 *   - artefact projections stay consistent with the snapshot
 *
 * A "soft golden" like this catches real compiler regressions (dropped
 * relation kinds, renamed canonical nodes, missing projections) without
 * paging on every editorial change to the upstream spec.
 */
describe('compiled index golden snapshot', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let artifactDir: string;
  let runtime: FpfRuntime;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-golden-'));
    artifactDir = resolve(tempRoot, 'artifacts');
    const sourcePath = resolve(tempRoot, 'FPF-spec.md');
    await copyFile(canonicalSourcePath, sourcePath);
    runtime = new FpfRuntime({ artifactDir, sourcePath });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function readArtifact<T>(filename: string): Promise<T> {
    return JSON.parse(await readFile(resolve(artifactDir, filename), 'utf8')) as T;
  }

  it('produces a compiled snapshot that satisfies structural invariants', async () => {
    const audit = await runtime.refresh();
    expect(audit.rebuilt).toBe(true);

    type CompiledNode = {
      id: string;
      kind: 'pattern' | 'route' | 'lexeme';
      title: string;
      part?: string;
    };
    type Snapshot = {
      compiledNodes: Record<string, CompiledNode>;
      patternGraph: {
        nodes: Record<string, { id: string; title: string; part?: string }>;
      };
      routeGraph: { nodes: Record<string, unknown> };
      lexicon: Record<string, { canonical: string; aliases: string[] }>;
      indexMap: Record<string, unknown>;
      indexRoots: string[];
      anchorMap: Record<string, unknown>;
      relationGraph: Array<{ relation: string; from: string; to: string }>;
    };

    const snapshot = await readArtifact<Snapshot>(ARTIFACT_FILENAMES.snapshot);

    // Kinds — route nodes are optional in the synced spec, but pattern and
    // lexeme nodes are required by every retrieval code path.
    const byKind = Object.values(snapshot.compiledNodes).reduce<Record<string, number>>(
      (acc, node) => {
        acc[node.kind] = (acc[node.kind] ?? 0) + 1;
        return acc;
      },
      {},
    );
    expect(byKind.pattern).toBeGreaterThanOrEqual(200);
    const routeCount = byKind.route ?? 0;
    expect(byKind.lexeme).toBeGreaterThanOrEqual(1000);

    // Projection parity — the split artefacts must agree with the snapshot.
    expect(Object.keys(snapshot.patternGraph.nodes).length).toBe(byKind.pattern);
    expect(Object.keys(snapshot.routeGraph.nodes).length).toBe(routeCount);
    expect(Object.keys(snapshot.lexicon).length).toBe(byKind.lexeme);

    // Anchors and index map must cover every pattern-bearing heading.
    expect(Object.keys(snapshot.indexMap).length).toBeGreaterThanOrEqual(byKind.pattern);
    expect(Object.keys(snapshot.anchorMap).length).toBeGreaterThanOrEqual(
      Object.keys(snapshot.indexMap).length,
    );
    expect(snapshot.indexRoots.length).toBeGreaterThanOrEqual(5);

    // Every pattern projection must preserve the source graph's identity and
    // metadata. This checks the complete compiler boundary without treating
    // legitimate upstream title edits as runtime regressions.
    for (const [id, pattern] of Object.entries(snapshot.patternGraph.nodes)) {
      const node = snapshot.compiledNodes[id];
      expect(node, `compiled node ${id} missing`).toBeDefined();
      expect(node.kind).toBe('pattern');
      expect(node.title).toBe(pattern.title);
      expect(node.part).toBe(pattern.part);
    }

    // Relation kinds — retrieval (candidate seeding + frontier expansion)
    // fans out over these edges. Route-specific edges are checked only when
    // the current synced spec publishes route nodes.
    const relationKinds = new Set(snapshot.relationGraph.map((edge) => edge.relation));
    for (const expected of [
      'builds_on',
      'prerequisite_for',
      'coordinates_with',
      'constrains',
      'refines',
      'used_by',
      'outline_child',
      'outline_parent',
      'outline_next_sibling',
      'outline_prev_sibling',
      'lexical_match',
      'explicit_reference',
    ]) {
      expect(relationKinds.has(expected), `missing relation kind: ${expected}`).toBe(true);
    }
    if (routeCount > 0) {
      for (const expected of [
        'route_step',
        'route_hint',
        'current_route_surface',
        'typical_next_owner',
      ]) {
        expect(relationKinds.has(expected), `missing relation kind: ${expected}`).toBe(true);
      }
    }

    // Validation summary — the compiler must report sane counts.
    expect(audit.validation.parsedPatterns).toBeGreaterThanOrEqual(200);
    expect(audit.validation.parsedRoutes).toBe(routeCount);
    expect(audit.validation.parsedLexiconEntries).toBeGreaterThanOrEqual(1000);
    expect(audit.validation.brokenRoutes).toEqual([]);
  });
});
