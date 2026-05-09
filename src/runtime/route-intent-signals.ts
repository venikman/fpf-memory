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
