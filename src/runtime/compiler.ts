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
  BOUNDARY_BURDEN_ROUTE_NAME,
  PROJECT_ALIGNMENT_ROUTE_NAME,
} from './constants.js';
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
  const indexMap = buildIndexMap(ir, patternGraph.nodes, routeGraph.nodes);
  const compiledNodes = buildCompiledNodes(
    patternGraph.nodes,
    routeGraph.nodes,
    lexicon,
    allRelations,
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

function buildHeuristicSeedRules(
  patternNodes: Record<string, PatternRecord>,
  routeNodes: Record<string, RouteRecord>,
): HeuristicSeedRule[] {
  const rules: HeuristicSeedRule[] = [];

  const creativityNodeIds = ['C.17', 'C.18', 'C.19', 'B.5.2.1', 'A.0'].filter(
    (id) => id in patternNodes || id in routeNodes,
  );
  if (creativityNodeIds.length > 0) {
    rules.push({
      name: 'creative-search-heuristic',
      allOf: [['creativity', 'creative']],
      anyOf: [['open-ended', 'open ended'], ['search']],
      seedNodeIds: creativityNodeIds,
      seedScore: 64,
      seedOrigin: 'lexical',
      initialNodeIds: ['C.17', 'C.18', 'C.19'].filter((id) => id in patternNodes),
    });
  }

  const alignmentRoute = Object.values(routeNodes).find(
    (r) => r.name.toLowerCase() === PROJECT_ALIGNMENT_ROUTE_NAME,
  );
  const alignmentNodeIds = ['A.1.1', 'A.15', 'B.5.1', 'F.17'].filter(
    (id) => id in patternNodes || id in routeNodes,
  );
  if (alignmentRoute) {
    // Populate project-alignment constraints that were previously hard-coded in query-engine.ts
    alignmentRoute.constraints = [
      'Add F.11 and F.9 only when method/work vocabulary is explicitly at stake in the question.',
      'Land on F.17 early rather than escalating to F.11 unless the asker names a cross-team mismatch.',
    ];
    rules.push({
      name: 'vocabulary-alignment',
      allOf: [['vocabulary']],
      anyOf: [['overloaded'], ['across teams'], ['across contexts']],
      seedNodeIds: alignmentNodeIds,
      seedScore: 20,
      seedOrigin: 'route_expansion',
      initialNodeIds: [],
      routeId: alignmentRoute.id,
      routeScore: 80,
    });
  }

  const boundaryRoute = Object.values(routeNodes).find(
    (r) => r.name.toLowerCase() === BOUNDARY_BURDEN_ROUTE_NAME,
  );
  const boundaryNodeIds = ['A.6', 'A.6.B', 'A.6.C', 'A.6.P', 'A.6.Q', 'A.6.A'].filter(
    (id) => id in patternNodes || id in routeNodes,
  );
  if (boundaryRoute) {
    boundaryRoute.constraints = [
      'Start with A.6, A.6.B, and A.6.C for API, contract, protocol, CI/deploy gate, or acceptance-clause review.',
      'Add A.6.P, A.6.Q, or A.6.A only when the review text hides overloaded relation, quality, or action-invitation language.',
      'Do not open the whole FPF; read exact pattern pages only when a finding depends on wording.',
    ];
    rules.push({
      name: 'boundary-review',
      allOf: [['review', 'reviewer', 'reviewing', 'checking', 'check']],
      anyOf: [
        [
          'api',
          'contract',
          'protocol',
          'ci/cd',
          'ci gate',
          'ci pipeline',
          'continuous integration',
          'deploy',
          'deploy gate',
          'acceptance',
          'acceptance clause',
          'slo',
          'sla',
          'compliance',
          'interface',
        ],
      ],
      seedNodeIds: boundaryNodeIds,
      seedScore: 24,
      seedOrigin: 'route_expansion',
      initialNodeIds: [],
      routeId: boundaryRoute.id,
      routeScore: 96,
    });
  }

  const roleNodeIds = ['A.1.1', 'A.2.1', 'A.2.5'].filter(
    (id) => id in patternNodes || id in routeNodes,
  );
  if (roleNodeIds.length > 0) {
    rules.push({
      name: 'role-assignment-connection',
      allOf: [['role assignment']],
      anyOf: [['connect'], ['relation']],
      seedNodeIds: roleNodeIds,
      seedScore: 36,
      seedOrigin: 'lexical',
      initialNodeIds: [],
    });
  }

  const entityNodeIds = ['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR'].filter(
    (id) => id in patternNodes || id in routeNodes,
  );
  if (entityNodeIds.length > 0) {
    rules.push({
      name: 'same-entity-comparative-reading',
      allOf: [['same entity', 'same-entity']],
      anyOf: [['rewrite'], ['comparative']],
      seedNodeIds: entityNodeIds,
      seedScore: 40,
      seedOrigin: 'lexical',
      initialNodeIds: entityNodeIds.filter((id) => id in patternNodes),
    });
  }

  return rules;
}
