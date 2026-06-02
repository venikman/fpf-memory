/**
 * spec-heuristics.ts — declarative, spec-keyed heuristic data.
 *
 * Single home for every FPF-content-specific heuristic the runtime applies:
 * the literal pattern/route IDs, the route names used for lookup, the
 * hand-written route constraints, the seed-rule term groups, and the
 * keyword/intent signal lists. Lifting them out of `compiler.ts` and
 * `query-helpers.ts` keeps those modules content-agnostic interpreters:
 *   - the compiler walks `SEED_RULE_DEFS` / `ROUTE_CONSTRAINT_DEFS` to build
 *     the persisted `snapshot.heuristicSeedRules` and route constraints;
 *   - the query layer walks `ROUTE_INTENT_DEFS` to score adoption-route intent.
 *
 * Versioning / "keyed to the spec": the IDs and route names below resolve
 * against a specific upstream FPF edition (see `SPEC_HEURISTICS_PROVENANCE`).
 * They are filtered against the compiled graph at build time, so a rename
 * upstream degrades gracefully (a rule whose seeds no longer resolve is
 * dropped; a route-bound rule whose route is absent is skipped) rather than
 * throwing. Because the binding now lives in one reviewable, version-stamped
 * file instead of inside compiler control flow, such a drift surfaces as a
 * data diff and a failing spec-binding guard test (see
 * tests/compiler-contracts.test.ts) instead of silently disabling retrieval.
 * Re-verify this file whenever `published/current/**` is re-synced upstream.
 *
 * NOTE: this module is a `SNAPSHOT_COMPILER_FINGERPRINT_INPUTS` member
 * (src/build/compiler-fingerprint.ts) because `SEED_RULE_DEFS` /
 * `ROUTE_CONSTRAINT_DEFS` feed the persisted snapshot. Editing any export
 * here changes the compiler fingerprint and requires republishing
 * `published/current/**`.
 */
import type { FrontierOrigin } from './types.js';

/**
 * Upstream FPF edition the literal IDs / route names below were last verified
 * against. Documentation + machine-checkable provenance only — never a runtime
 * gate (compilation must not throw on a mismatch; see the file header).
 */
export const SPEC_HEURISTICS_PROVENANCE = {
  upstreamRepoUrl: 'https://github.com/ailev/FPF',
  upstreamRef: '16cd31387cff04ab6b0feef22717f82ac54efa8f',
  sourceHash: 'sha256:f86b7e00c39bb0e9b817917f807b5514048d763988c682b81a61b8190cba7158',
} as const;

// ---------------------------------------------------------------------------
// Route names used for lookup (RouteRecord.name, lowercased)
// ---------------------------------------------------------------------------

export const PROJECT_ALIGNMENT_ROUTE_NAME = 'project alignment';
export const BOUNDARY_UNPACKING_CLAIM_ROUTING_ROUTE_NAME =
  'boundary unpacking / claim routing';

// ---------------------------------------------------------------------------
// Keyword / intent signal lists
//
// Some lists feed BOTH the persisted seed rules (compiler) and the query-time
// route-intent scorers (query layer); they live here once so the two stay in
// lockstep.
// ---------------------------------------------------------------------------

export const BOUNDARY_REVIEW_NEGATIONS = [
  'do not treat this as an api contract review',
  'do not treat this as a contract review',
  'do not treat this as an api review',
  'not an api contract review',
  'not a contract review',
  'not an api review',
] as const;

export const BOUNDARY_BURDEN_SIGNALS = [
  'api',
  'boundary',
  'interface',
  'contract',
  'protocol',
  'ci/cd',
  'ci gate',
  'ci pipeline',
  'deploy gate',
  'deployment gate',
  'deploy promise',
  'deployment promise',
  'slo',
  'sla',
  'acceptance clause',
  'compliance text',
  'compliance requirement',
] as const;

export const BOUNDARY_BURDEN_JOB_SIGNALS = [
  'review',
  'reviewer',
  'reviewing',
  'checking',
  'check',
  'kickoff',
  'project lead',
  'route',
  'smallest',
  'work packet',
  'decision',
  'questions',
] as const;

export const BOUNDARY_REVIEW_RULE_JOB_SIGNALS = [
  'review',
  'reviewer',
  'reviewing',
  'checking',
  'check',
] as const;

export const AGENT_WORKFLOW_JOB_SIGNALS = [
  'agent',
  'mcp',
  'public tools',
] as const;

export const AGENT_WORKFLOW_BOUNDED_RETRIEVAL_SIGNALS = [
  'work packet',
  'bounded context',
  'whole spec',
  'whole fpf',
  'full spec',
  'full fpf',
  'without pasting',
  'do not paste',
  'instead of pasting',
] as const;

export const WRITING_OR_REVIEWING_PATTERN_SIGNALS = [
  'spec writer',
  'spec writing',
  'writing/reviewing route',
  'writing or reviewing route',
  'writing or reviewing patterns',
] as const;

/** Query-only: project-alignment adoption-intent phrases. */
export const PROJECT_ALIGNMENT_INTENT_SIGNALS = [
  'project kickoff',
  'project lead',
  'new adopter',
  'project information system',
  'information system',
  'model my project',
  'align a project',
  'align a new project',
  'aligning a new project',
  'project alignment',
  'project review',
  'starting a team project',
  'start a team project',
  'team project',
  'first shared work surface',
  'vocabulary is overloaded',
  'overloaded across teams',
] as const;

/** Query-only: boundary-unpacking adoption-intent phrases. */
export const BOUNDARY_UNPACKING_INTENT_SIGNALS = [
  'claim register',
  'atomic claim',
  'atomic claims',
  'decompose',
  'decomposed',
  'unpack',
  'unpacking',
  'mixed sentence',
  'mixed statements',
] as const;

/** Query-only: "are we authoring/reviewing FPF patterns?" surface forms. */
export const PATTERN_AUTHORING_ACTION_BEFORE_PATTERN =
  /\b(?:add|adding|draft|drafting|write|writing|revise|revising|author|authoring|review|reviewing)\b(?:\s+(?:a|an|the|new|existing|fpf|spec))*\s+patterns?\b/;

export const PATTERN_AUTHORING_NOUN_AFTER_PATTERN =
  /\bpatterns?\s+(?:writing|authoring|review|reviewing|revision|revisions|draft|drafting)\b/;

// ---------------------------------------------------------------------------
// Persisted seed rules (compiler → snapshot.heuristicSeedRules)
// ---------------------------------------------------------------------------

export interface SeedRuleDef {
  name: string;
  /** Outer array = AND, inner array = OR alternatives for each term group. */
  allOf: readonly (readonly string[])[];
  /** Outer array = OR groups, inner array = OR alternatives within each group. */
  anyOf: readonly (readonly string[])[];
  /** Candidate-seed IDs; filtered to pattern|route nodes at build time. */
  seedNodeIds: readonly string[];
  /** Initial-ranking IDs; filtered to pattern nodes at build time. */
  initialNodeIds: readonly string[];
  seedScore: number;
  seedOrigin: FrontierOrigin;
  /**
   * When set, the rule is emitted only if a route whose lowercased name equals
   * `route.name` exists in the compiled graph; it then binds `routeId` to that
   * route and `routeScore` to `route.score`. When absent, the rule is emitted
   * only if at least one `seedNodeIds` entry resolves to a compiled node.
   */
  route?: { name: string; score: number };
}

/**
 * Ordered — the array order is the persisted `heuristicSeedRules` order, which
 * the seeder/ranker iterate. `boundary-review` is retained even though its
 * route name does not resolve in the current edition (so it is skipped at
 * build time): keeping it makes the binding explicit and lets it re-activate
 * automatically if the upstream route name returns.
 */
export const SEED_RULE_DEFS: readonly SeedRuleDef[] = [
  {
    name: 'creative-search-heuristic',
    allOf: [['creativity', 'creative']],
    anyOf: [['open-ended', 'open ended'], ['search']],
    seedNodeIds: ['C.17', 'C.18', 'C.19', 'B.5.2.1', 'A.0'],
    initialNodeIds: ['C.17', 'C.18', 'C.19'],
    seedScore: 64,
    seedOrigin: 'lexical',
  },
  {
    name: 'measurement-template-discipline',
    allOf: [
      ['measurement', 'measure', 'metric', 'metrics'],
      ['template', 'dhcmethod', 'dhc method'],
    ],
    anyOf: [
      ['characteristic'],
      ['scale'],
      ['evidence', 'evidencestub', 'evidence stub'],
      ['unit'],
      ['comparability'],
      ['score', 'scoring'],
    ],
    seedNodeIds: ['C.16'],
    initialNodeIds: ['C.16'],
    seedScore: 84,
    seedOrigin: 'lexical',
  },
  {
    name: 'agent-workflow-adoption',
    allOf: [AGENT_WORKFLOW_JOB_SIGNALS],
    anyOf: [AGENT_WORKFLOW_BOUNDED_RETRIEVAL_SIGNALS],
    seedNodeIds: ['A.1.1', 'A.15', 'B.5.1', 'F.17'],
    initialNodeIds: [],
    seedScore: 18,
    seedOrigin: 'route_expansion',
    route: { name: PROJECT_ALIGNMENT_ROUTE_NAME, score: 88 },
  },
  {
    name: 'vocabulary-alignment',
    allOf: [['vocabulary']],
    anyOf: [['overloaded'], ['across teams'], ['across contexts']],
    seedNodeIds: ['A.1.1', 'A.15', 'B.5.1', 'F.17'],
    initialNodeIds: [],
    seedScore: 20,
    seedOrigin: 'route_expansion',
    route: { name: PROJECT_ALIGNMENT_ROUTE_NAME, score: 80 },
  },
  {
    name: 'boundary-review',
    allOf: [BOUNDARY_REVIEW_RULE_JOB_SIGNALS],
    anyOf: [[...BOUNDARY_BURDEN_SIGNALS, 'continuous integration']],
    seedNodeIds: ['A.6', 'A.6.B', 'A.6.C', 'A.6.P', 'A.6.Q', 'A.6.A'],
    initialNodeIds: [],
    seedScore: 24,
    seedOrigin: 'route_expansion',
    route: { name: BOUNDARY_UNPACKING_CLAIM_ROUTING_ROUTE_NAME, score: 96 },
  },
  {
    name: 'role-assignment-connection',
    allOf: [['role assignment']],
    anyOf: [['connect'], ['relation']],
    seedNodeIds: ['A.1.1', 'A.2.1', 'A.2.5'],
    initialNodeIds: [],
    seedScore: 36,
    seedOrigin: 'lexical',
  },
  {
    name: 'same-entity-comparative-reading',
    allOf: [['same entity', 'same-entity']],
    anyOf: [['rewrite'], ['comparative']],
    seedNodeIds: ['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR'],
    initialNodeIds: ['A.6.3.CR', 'A.6.3.RT', 'E.17.ID.CR'],
    seedScore: 40,
    seedOrigin: 'lexical',
  },
];

// ---------------------------------------------------------------------------
// Persisted route constraints (compiler → routeGraph.nodes[*].constraints)
//
// Applied — overwriting any parsed constraints — to the route whose lowercased
// name matches `routeName`, when that route exists in the compiled graph.
// ---------------------------------------------------------------------------

export interface RouteConstraintDef {
  routeName: string;
  constraints: readonly string[];
}

export const ROUTE_CONSTRAINT_DEFS: readonly RouteConstraintDef[] = [
  {
    routeName: PROJECT_ALIGNMENT_ROUTE_NAME,
    constraints: [
      'Add F.11 and F.9 only when method/work vocabulary is explicitly at stake in the question.',
      'Land on F.17 early rather than escalating to F.11 unless the asker names a cross-team mismatch.',
      'Do not paste the whole FPF; use the route packet first and open exact pattern pages only when wording or boundary detail is actually needed.',
    ],
  },
  {
    routeName: BOUNDARY_UNPACKING_CLAIM_ROUTING_ROUTE_NAME,
    constraints: [
      'Start with A.6, A.6.B, and A.6.C for API, contract, protocol, CI/deploy gate, or acceptance-clause review.',
      'Add A.6.P, A.6.Q, or A.6.A only when the review text hides overloaded relation, quality, or action-invitation language.',
      'Do not open the whole FPF; read exact pattern pages only when a finding depends on wording.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Query-time route-intent scoring (query layer → adoption-route-intent score)
//
// Keyed by route ID. The query layer scores a route by walking its tiers in
// order; the first matching tier wins. A `signals` tier matches when EVERY
// group has at least one substring hit; a `regex` tier matches when ANY
// pattern hits. `negations`, when present, short-circuit the score to 0.
// ---------------------------------------------------------------------------

export interface RouteIntentSignalTier {
  kind: 'signals';
  /** Every group must contribute at least one substring match. */
  allGroups: readonly (readonly string[])[];
  score: number;
}

export interface RouteIntentRegexTier {
  kind: 'regex';
  /** At least one pattern must match. */
  anyOf: readonly RegExp[];
  score: number;
}

export type RouteIntentTier = RouteIntentSignalTier | RouteIntentRegexTier;

export interface RouteIntentDef {
  /** When present, any matching phrase short-circuits the score to 0. */
  negations?: readonly string[];
  /** Walked in order; the first matching tier's score is returned. */
  tiers: readonly RouteIntentTier[];
}

export const ROUTE_INTENT_DEFS: Readonly<Record<string, RouteIntentDef>> = {
  'route:project-alignment': {
    tiers: [
      {
        kind: 'signals',
        allGroups: [AGENT_WORKFLOW_JOB_SIGNALS, AGENT_WORKFLOW_BOUNDED_RETRIEVAL_SIGNALS],
        score: 88,
      },
      { kind: 'signals', allGroups: [PROJECT_ALIGNMENT_INTENT_SIGNALS], score: 76 },
      {
        kind: 'signals',
        allGroups: [['project'], ['kickoff', 'model', 'align', 'smallest', 'work packet']],
        score: 64,
      },
    ],
  },
  'route:boundary-unpacking-claim-routing': {
    negations: BOUNDARY_REVIEW_NEGATIONS,
    tiers: [
      {
        kind: 'signals',
        allGroups: [BOUNDARY_BURDEN_SIGNALS, BOUNDARY_BURDEN_JOB_SIGNALS],
        score: 92,
      },
    ],
  },
  'route:boundary-unpacking': {
    tiers: [{ kind: 'signals', allGroups: [BOUNDARY_UNPACKING_INTENT_SIGNALS], score: 96 }],
  },
  'route:writing-or-reviewing-patterns': {
    tiers: [
      { kind: 'signals', allGroups: [WRITING_OR_REVIEWING_PATTERN_SIGNALS], score: 88 },
      {
        kind: 'regex',
        anyOf: [PATTERN_AUTHORING_ACTION_BEFORE_PATTERN, PATTERN_AUTHORING_NOUN_AFTER_PATTERN],
        score: 72,
      },
    ],
  },
};
