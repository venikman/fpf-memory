export const fpfWorkEvaluationTargets = ['current-pr', 'working-tree'] as const;
export const fpfWorkEvaluationFormats = ['markdown', 'json'] as const;

export type FpfWorkEvaluationTarget = (typeof fpfWorkEvaluationTargets)[number];
export type FpfWorkEvaluationFormat = (typeof fpfWorkEvaluationFormats)[number];
