import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { compileFpfSource, type CompilerOutput } from '../src/runtime/compiler.js';
import { parseLabeledRelations, parseSource } from '../src/runtime/source-parser.js';

/**
 * Stage-local contract tests for the compiler pipeline.
 *
 * Each test targets a specific compiler stage promise so that a failure
 * pinpoints the broken stage rather than surfacing as a generic
 * "end-to-end answer is wrong."
 *
 * Canonical fixture IDs: `A.1.1` is used as a stable spec anchor for
 * metadata assertions. If the FPF spec renames or renumbers this
 * pattern, update the ID here to match.
 */

let cachedOutput: CompilerOutput | undefined;

async function getCompilerOutput(): Promise<CompilerOutput> {
  if (cachedOutput) {
    return cachedOutput;
  }
  const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  const sourceText = await readFile(sourcePath, 'utf8');
  const sourceHash = createHash('sha256').update(sourceText).digest('hex');
  cachedOutput = compileFpfSource({
    sourcePath,
    sourceHash,
    builtAt: '2025-01-01T00:00:00.000Z',
    sourceText,
  });
  return cachedOutput;
}

/** Minimum thresholds — deliberately loose so spec edits don't break tests. */
const MIN_SECTIONS = 100;
const MIN_PATTERNS = 50;
const MIN_LEXICON_ENTRIES = 5;

// ---------------------------------------------------------------------------
// Stage 1: Parser resilience
// ---------------------------------------------------------------------------
describe('Compiler / Parser stage', () => {
  it('parses a non-trivial number of sections, patterns, and lexicon entries', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    expect(validation.parsedSections).toBeGreaterThan(MIN_SECTIONS);
    expect(validation.parsedPatterns).toBeGreaterThan(MIN_PATTERNS);
    expect(validation.parsedRoutes).toBe(Object.keys(snapshot.routeGraph.nodes).length);
    expect(validation.parsedLexiconEntries).toBeGreaterThan(MIN_LEXICON_ENTRIES);
  });

  it('assigns IDs to all compiled nodes and none are empty strings', async () => {
    const { snapshot } = await getCompilerOutput();
    const nodeIds = Object.keys(snapshot.compiledNodes);

    expect(nodeIds.length).toBeGreaterThan(50);
    for (const nodeId of nodeIds) {
      expect(nodeId.length).toBeGreaterThan(0);
    }
  });

  it('preserves pattern metadata fields (title, status, part)', async () => {
    const { snapshot } = await getCompilerOutput();
    const pattern = snapshot.patternGraph.nodes['A.1.1'];

    expect(pattern).toBeDefined();
    expect(pattern!.title.length).toBeGreaterThan(0);
    expect(pattern!.status.length).toBeGreaterThan(0);
    expect(pattern!.sectionIds.length).toBeGreaterThan(0);
  });

  it('produces anchors with valid line ranges', async () => {
    const { snapshot } = await getCompilerOutput();
    const anchors = Object.values(snapshot.anchorMap);

    expect(anchors.length).toBeGreaterThan(50);
    for (const anchor of anchors.slice(0, 20)) {
      expect(anchor.lineStart).toBeGreaterThanOrEqual(0);
      expect(anchor.lineEnd).toBeGreaterThan(anchor.lineStart);
    }

    const nonEmpty = anchors.filter((a) => a.text.length > 0);
    expect(nonEmpty.length).toBeGreaterThan(anchors.length / 2);
  });

  it('parses typed relations from plain-text catalog dependency cells', async () => {
    const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
    const sourceText = await readFile(sourcePath, 'utf8');
    const ir = parseSource(sourceText);
    const relations = ir.metadata['A.1.1']?.relations ?? [];

    expect(relations).toContainEqual({
      from: 'A.1.1',
      relation: 'builds_on',
      to: 'A.1',
      source: 'A.1.1:catalog',
    });
    expect(relations).toContainEqual({
      from: 'A.1.1',
      relation: 'prerequisite_for',
      to: 'A.2.1',
      source: 'A.1.1:catalog',
    });
  });

  it('parses mixed bold and plain relation labels in one block', () => {
    const relations = parseLabeledRelations(
      'X.1',
      '**Builds on:** A.1. Constrained by: B.2. **Coordinates with:** C.3. Constrains: D.4.',
      'X.1:test',
    );

    expect(relations).toEqual(
      expect.arrayContaining([
        {
          from: 'X.1',
          relation: 'builds_on',
          to: 'A.1',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'constrained_by',
          to: 'B.2',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'coordinates_with',
          to: 'C.3',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'constrains',
          to: 'D.4',
          source: 'X.1:test',
        },
      ]),
    );
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Graph closure
// ---------------------------------------------------------------------------
describe('Compiler / Graph closure stage', () => {
  it('keeps unresolved references bounded and stable', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    // The FPF spec has a small number of forward/external references that
    // don't resolve to compiled nodes. Plain-text catalog relation recovery
    // surfaces a few additional intentional unresolved targets, so keep this
    // bounded rather than pinning it too tightly.
    expect(validation.unresolvedReferences.length).toBeLessThan(40);
  });

  it('tracks duplicate IDs produced by catalog + heading overlap', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    // "duplicateIds" lists pattern IDs that appear in both the catalog table
    // and heading sections — this is expected for the FPF spec.  The contract
    // is that the count stays proportional to the number of patterns.
    expect(validation.duplicateIds.length).toBeGreaterThan(0);
    expect(validation.duplicateIds.length).toBeLessThan(
      Object.keys(snapshot.patternGraph.nodes).length + 10,
    );
  });

  it('has no broken routes', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    expect(validation.brokenRoutes).toEqual([]);
  });

  it('contains outline relations linking parents to children', async () => {
    const { snapshot } = await getCompilerOutput();
    const outlineChildren = snapshot.relationGraph.filter(
      (edge) => edge.relation === 'outline_child',
    );

    expect(outlineChildren.length).toBeGreaterThan(10);

    const a15Children = outlineChildren.filter((edge) => edge.from === 'A.15');
    expect(a15Children.length).toBeGreaterThan(0);
  });

  it('contains explicit_reference relations extracted from source text', async () => {
    const { snapshot } = await getCompilerOutput();
    const explicitRefs = snapshot.relationGraph.filter(
      (edge) => edge.relation === 'explicit_reference',
    );

    expect(explicitRefs.length).toBeGreaterThan(0);
  });

  it('routes reference mostly existing compiled nodes', async () => {
    const { snapshot } = await getCompilerOutput();
    const allNodeIds = new Set(Object.keys(snapshot.compiledNodes));

    let total = 0;
    let resolved = 0;
    for (const route of Object.values(snapshot.routeGraph.nodes)) {
      for (const id of [...route.orderedIds, ...route.optionalIds, ...route.landingIds]) {
        total += 1;
        if (allNodeIds.has(id)) {
          resolved += 1;
        }
      }
    }

    // Route sections are optional in a synced spec. When present, at least
    // 90% of route step IDs should resolve to compiled nodes.
    if (total > 0) {
      expect(resolved / total).toBeGreaterThan(0.9);
    } else {
      expect(Object.keys(snapshot.routeGraph.nodes).length).toBe(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Index round-trip
// ---------------------------------------------------------------------------
describe('Compiler / Index round-trip stage', () => {
  it('indexes resolve back to their source patterns', async () => {
    const { snapshot } = await getCompilerOutput();
    const indexNodes = Object.values(snapshot.indexMap);
    const patternIds = new Set(Object.keys(snapshot.patternGraph.nodes));

    const linkedToPattern = indexNodes.filter(
      (node) => node.metadata.patternId && patternIds.has(node.metadata.patternId),
    );
    expect(linkedToPattern.length).toBeGreaterThan(20);
  });

  it('alias index entries resolve to existing compiled nodes', async () => {
    const { snapshot } = await getCompilerOutput();
    const allNodeIds = new Set(Object.keys(snapshot.compiledNodes));

    for (const [_alias, nodeIds] of Object.entries(snapshot.indexes.aliasIndex)) {
      for (const nodeId of nodeIds) {
        expect(allNodeIds.has(nodeId)).toBe(true);
      }
    }
  });

  it('lexicon entries have at least one linked node', async () => {
    const { snapshot } = await getCompilerOutput();

    for (const entry of Object.values(snapshot.lexicon)) {
      expect(entry.linkedNodeIds.length).toBeGreaterThan(0);
    }
  });

  it('status index entries resolve to existing compiled nodes', async () => {
    const { snapshot } = await getCompilerOutput();
    const statusIndex = snapshot.indexes.statusIndex;

    expect(Object.keys(statusIndex).length).toBeGreaterThan(0);

    for (const [_status, nodeIds] of Object.entries(statusIndex)) {
      for (const nodeId of nodeIds) {
        expect(snapshot.compiledNodes[nodeId]).toBeDefined();
      }
    }
  });

  it('route name index resolves to existing route nodes', async () => {
    const { snapshot } = await getCompilerOutput();

    for (const [_name, nodeIds] of Object.entries(snapshot.indexes.routeNameIndex)) {
      for (const nodeId of nodeIds) {
        expect(snapshot.routeGraph.nodes[nodeId]).toBeDefined();
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Validation coverage
// ---------------------------------------------------------------------------
describe('Compiler / Validation stage', () => {
  it('keeps missing required fields bounded', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    // The FPF spec has a small number of patterns with incomplete metadata.
    // The contract is that this stays bounded — a regression would spike it.
    expect(validation.missingRequiredFields).toBeLessThan(25);
  });

  it('counts a plausible number of index map nodes', async () => {
    const { snapshot } = await getCompilerOutput();
    const { validation } = snapshot;

    expect(validation.indexMapNodes).toBeGreaterThan(50);
    expect(validation.indexMapNodes).toBe(Object.keys(snapshot.indexMap).length);
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Snapshot determinism
// ---------------------------------------------------------------------------
describe('Compiler / Snapshot determinism stage', () => {
  it('produces byte-identical snapshot when compiled twice with the same input', async () => {
    const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
    const sourceText = await readFile(sourcePath, 'utf8');
    const sourceHash = createHash('sha256').update(sourceText).digest('hex');
    const builtAt = '2025-01-01T00:00:00.000Z';

    const first = compileFpfSource({ sourcePath, sourceHash, builtAt, sourceText });
    const second = compileFpfSource({ sourcePath, sourceHash, builtAt, sourceText });

    const firstJson = JSON.stringify(first.snapshot);
    const secondJson = JSON.stringify(second.snapshot);

    expect(firstJson).toBe(secondJson);
  });

  it('produces structurally different output when source text changes', async () => {
    const sourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
    const sourceText = await readFile(sourcePath, 'utf8');
    const builtAt = '2025-01-01T00:00:00.000Z';

    const hash1 = createHash('sha256').update(sourceText).digest('hex');
    // Append a new heading + body — the compiler must parse it as an
    // additional section, which changes the structural output (not just
    // the caller-provided hash).
    const modifiedText = `${sourceText}\n\n## Z.99 Synthetic Test Section\n\nA synthetic section added to verify the compiler processes changed source text.\n`;
    const hash2 = createHash('sha256').update(modifiedText).digest('hex');

    const first = compileFpfSource({ sourcePath, sourceHash: hash1, builtAt, sourceText });
    const second = compileFpfSource({
      sourcePath,
      sourceHash: hash2,
      builtAt,
      sourceText: modifiedText,
    });

    // Verify a structural difference — the added heading should produce at
    // least one more parsed section or index-map node than the original.
    const firstSections = first.snapshot.validation.parsedSections;
    const secondSections = second.snapshot.validation.parsedSections;

    // The synthetic Z.99 heading is parsed as a section (not a pattern —
    // the compiler only promotes headings that match spec-catalog entries).
    // Verify the section count grew, proving the parser handled the new heading.
    expect(secondSections).toBeGreaterThan(firstSections);
  });
});
