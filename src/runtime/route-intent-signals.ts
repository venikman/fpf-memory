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

export const PRODUCT_ROLE_FEEDBACK_ROLE_SIGNALS = [
  'product maintainer',
  'product feedback',
  'product-role feedback',
  'product role feedback',
  'role feedback',
  'role-feedback',
  'dogfood',
] as const;

export const PRODUCT_ROLE_FEEDBACK_OUTPUT_SIGNALS = [
  'adoption improvement',
  'live product smoke',
  'discussion-ready',
  'discussion ready',
  'severity',
  'validation path',
] as const;

export const WRITING_OR_REVIEWING_PATTERN_SIGNALS = [
  'spec writer',
  'spec writing',
  'writing/reviewing route',
  'writing or reviewing route',
  'writing or reviewing patterns',
] as const;

export function hasBoundaryReviewNegation(normalizedQuestion: string): boolean {
  return BOUNDARY_REVIEW_NEGATIONS.some((phrase) => normalizedQuestion.includes(phrase));
}

export function hasProductRoleFeedbackIntent(question: string): boolean {
  const normalizedQuestion = question.toLowerCase();
  const hasRoleSignal = PRODUCT_ROLE_FEEDBACK_ROLE_SIGNALS.some((phrase) =>
    normalizedQuestion.includes(phrase),
  );
  const hasQualifyingSignal =
    PRODUCT_ROLE_FEEDBACK_OUTPUT_SIGNALS.some((phrase) =>
      normalizedQuestion.includes(phrase),
    ) ||
    AGENT_WORKFLOW_BOUNDED_RETRIEVAL_SIGNALS.some((phrase) =>
      normalizedQuestion.includes(phrase),
    );
  return hasRoleSignal && hasQualifyingSignal;
}
