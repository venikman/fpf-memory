/**
 * compiler.ts — SnapshotAssembler orchestrator.
 *
 * Delegates to four focused stage modules:
 *   1. source-parser.ts   (SourceParser)
 *   2. graph-compiler.ts  (GraphCompiler)
 *   3. index-projector.ts (IndexProjector)
 *   4. validation-runner.ts (ValidationRunner)
 *
 * This file wires the stages together and assembles the final Snapshot.
 * The public `compileFpfSource()` API is unchanged.
 */

import {
  buildExplicitReferenceRelations,
  buildLexiconRelations,
  buildOutlineRelations,
  buildPatternGraph,
  buildRouteGraph,
  uniqueRelations,
} from './graph-compiler.js';
import {
  buildCompiledNodes,
  buildIndexes,
  buildIndexMap,
  buildLexicon,
} from './index-projector.js';
import { parseSource } from './source-parser.js';
import {
  ROUTE_CONSTRAINT_DEFS,
  SEED_RULE_DEFS,
} from './spec-heuristics.js';
import { buildValidation } from './validation-runner.js';
import type {
  AnchorRef,
  HeuristicSeedRule,
  IndexMapNode,
  LexiconEntry,
  PatternRecord,
  RouteRecord,
  Snapshot,
} from './types.js';

export interface CompilerOutput {
  snapshot: Snapshot;
  projections: {
    indexMap: {
      roots: string[];
      nodes: Record<string, IndexMapNode>;
    };
    patternGraph: Snapshot['patternGraph'];
    routeGraph: Snapshot['routeGraph'];
    lexicon: Record<string, LexiconEntry>;
    anchorMap: Record<string, AnchorRef>;
  };
}

export function compileFpfSource(params: {
  sourcePath: string;
  sourceHash: string;
  builtAt: string;
  compilerFingerprint?: string;
  sourceText: string;
  /**
   * Optional per-line upstream blame map (1-based line numbers →
   * commit info). Populated at publish time by cloning the upstream
   * repo and running `git blame --line-porcelain`. When provided,
   * `buildIndexMap` stamps each section node with the most recent
   * commit that touched its line range. Absent for runtime rebuilds
   * that don't have an upstream checkout.
   */
  lineBlame?: Map<number, { sha: string; committedAt: string }>;
}): CompilerOutput {
  // Stage 1: SourceParser — markdown text → SourceIR
  const ir = parseSource(params.sourceText);

  // Stage 2: GraphCompiler — SourceIR → pattern/route/relation graphs
  const patternGraph = buildPatternGraph(ir);
  const routeGraph = buildRouteGraph(ir);
  const outlineRelations = buildOutlineRelations(patternGraph.nodes);
  const explicitReferenceRelations = buildExplicitReferenceRelations(
    ir.sections,
    patternGraph.nodes,
    routeGraph.nodes,
  );
  const relationGraph = uniqueRelations([
    ...patternGraph.relations,
    ...routeGraph.relations,
    ...outlineRelations,
    ...explicitReferenceRelations,
  ]);

  // Stage 3: IndexProjector — SourceIR + graphs → lexicon, index map, compiled nodes, indexes
  const lexicon = buildLexicon(patternGraph.nodes, routeGraph.nodes, ir.anchorMap);
  const lexiconRelations = buildLexiconRelations(lexicon);
  const allRelations = uniqueRelations([...relationGraph, ...lexiconRelations]);
  const indexMap = buildIndexMap(
    ir,
    patternGraph.nodes,
    routeGraph.nodes,
    params.lineBlame,
  );
  const compiledNodes = buildCompiledNodes(
    patternGraph.nodes,
    routeGraph.nodes,
    lexicon,
    allRelations,
    {
      indexMap: indexMap.nodes,
      anchorMap: ir.anchorMap,
    },
  );
  const indexes = buildIndexes(compiledNodes, patternGraph.nodes, routeGraph.nodes, lexicon);

  const heuristicSeedRules = buildHeuristicSeedRules(patternGraph.nodes, routeGraph.nodes);

  // Stage 4: ValidationRunner — snapshot candidate → validation findings
  const validation = buildValidation(
    compiledNodes,
    patternGraph.nodes,
    routeGraph.nodes,
    lexicon,
    indexMap,
    allRelations,
  );

  // Stage 5: SnapshotAssembler — typed intermediate artifacts → versioned snapshot
  const snapshot: Snapshot = {
    sourcePath: params.sourcePath,
    sourceHash: params.sourceHash,
    builtAt: params.builtAt,
    compilerFingerprint: params.compilerFingerprint,
    compilerMode: 'local_vectorless',
    indexRoots: indexMap.roots,
    indexMap: indexMap.nodes,
    anchorMap: ir.anchorMap,
    patternGraph: {
      nodes: patternGraph.nodes,
      relations: patternGraph.relations,
    },
    routeGraph: {
      nodes: routeGraph.nodes,
      relations: routeGraph.relations,
    },
    lexicon,
    compiledNodes,
    relationGraph: allRelations,
    indexes,
    heuristicSeedRules,
    validation,
  };

  return {
    snapshot,
    projections: {
      indexMap,
      patternGraph: snapshot.patternGraph,
      routeGraph: snapshot.routeGraph,
      lexicon,
      anchorMap: ir.anchorMap,
    },
  };
}

// Re-export query helpers for backwards compatibility with query-engine.ts
export {
  findLexemeMatches,
  formatAnchorSentences,
  getPartCDraftsByCluster,
  isPartCDraftQuery,
  scorePatternQuery,
  scoreRouteQuery,
  selectBestAnchors,
  selectFastRouteMatch,
} from './query-helpers.js';

/**
 * Generic interpreter over the declarative `spec-heuristics.ts` data: it
 * carries no literal FPF IDs or English of its own. It applies the
 * hand-authored route constraints and emits `snapshot.heuristicSeedRules` in
 * `SEED_RULE_DEFS` order, filtering each rule's IDs against the compiled graph
 * (so a rule whose route or seeds are absent from this spec edition is skipped
 * rather than emitting a dangling reference).
 */
function buildHeuristicSeedRules(
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
): HeuristicSeedRule[] {
  const resolvesAsNode = (id: string): boolean => id in patternNodes || id in routeNodes;
  const resolvesAsPattern = (id: string): boolean => id in patternNodes;
  const findRouteByName = (name: string): RouteRecord | undefined =>
    Object.values(routeNodes).find((route) => route.name.toLowerCase() === name);

  // Apply hand-authored route constraints to the matching compiled route,
  // overwriting any parsed constraints. A route absent from this edition of
  // the spec (e.g. renamed upstream) is simply skipped.
  for (const def of ROUTE_CONSTRAINT_DEFS) {
    const route = findRouteByName(def.routeName);
    if (route) {
      route.constraints = [...def.constraints];
    }
  }

  const rules: HeuristicSeedRule[] = [];
  for (const def of SEED_RULE_DEFS) {
    const seedNodeIds = def.seedNodeIds.filter(resolvesAsNode);
    const initialNodeIds = def.initialNodeIds.filter(resolvesAsPattern);
    const allOf = def.allOf.map((group) => [...group]);
    const anyOf = def.anyOf.map((group) => [...group]);

    if (def.route) {
      // Route-bound rule: emitted only when its route exists in this edition.
      const route = findRouteByName(def.route.name);
      if (!route) {
        continue;
      }
      rules.push({
        name: def.name,
        allOf,
        anyOf,
        seedNodeIds,
        seedScore: def.seedScore,
        seedOrigin: def.seedOrigin,
        initialNodeIds,
        routeId: route.id,
        routeScore: def.route.score,
      });
      continue;
    }

    // Lexical rule: emitted only when at least one seed ID resolves.
    if (seedNodeIds.length === 0) {
      continue;
    }
    rules.push({
      name: def.name,
      allOf,
      anyOf,
      seedNodeIds,
      seedScore: def.seedScore,
      seedOrigin: def.seedOrigin,
      initialNodeIds,
    });
  }

  return rules;
}
