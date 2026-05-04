import { unique } from './text.js';
import type {
  AnswerMode,
  AnswerSlice,
  CompiledNode,
  LocalAnswerSynthesizer,
  QueryResult,
  TraceResult,
} from './types.js';

export async function synthesizeAnswer(
  question: string,
  mode: AnswerMode,
  trace: TraceResult,
  nodes: CompiledNode[],
  slices: AnswerSlice[],
  deterministicResult: QueryResult,
  synthesizer: LocalAnswerSynthesizer,
): Promise<QueryResult> {
  try {
    const available = await synthesizer.isAvailable();
    if (!available) {
      return degradedSynthesisResult(
        deterministicResult,
        'configured local synthesizer reported unavailable',
      );
    }

    const synthesized = await synthesizer.synthesize({
      question,
      mode,
      trace,
      nodes,
      slices,
      deterministicResult,
    });

    return {
      ...deterministicResult,
      answer: synthesized.answer ?? deterministicResult.answer,
      constraints: synthesized.constraints ?? deterministicResult.constraints,
      confidence: synthesized.confidence ?? deterministicResult.confidence,
      gaps: synthesized.gaps ?? deterministicResult.gaps,
      groundingChain: synthesized.groundingChain ?? deterministicResult.groundingChain,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Local synthesizer failed with an unknown error.';
    return degradedSynthesisResult(deterministicResult, message);
  }
}

function degradedSynthesisResult(
  deterministicResult: QueryResult,
  reason: string,
): QueryResult {
  const candidateIds = unique([
    ...(deterministicResult.candidateIds ?? []),
    ...deterministicResult.ids,
  ]);
  return {
    ...deterministicResult,
    answer:
      candidateIds.length > 0
        ? `Local synthesis is unavailable, so no synthesized answer was committed. Inspect candidate IDs: ${candidateIds.join(', ')}.`
        : 'Local synthesis is unavailable, so no synthesized answer was committed.',
    ids: [],
    candidateIds,
    confidence: Math.min(deterministicResult.confidence, 0.45),
    gaps: unique([
      ...deterministicResult.gaps,
      `Local synthesis skipped: ${reason}`,
      'Candidate IDs are retrieval candidates, not committed synthesized answer IDs.',
    ]),
    status: 'degraded',
    groundingChain: deterministicResult.groundingChain
      ? unique([
          'Degraded: local synthesis unavailable; committed IDs withheld.',
          ...deterministicResult.groundingChain,
        ])
      : undefined,
  };
}
