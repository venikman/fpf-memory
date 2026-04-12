import { randomUUID } from 'node:crypto';
import { appendFile } from 'node:fs/promises';

import { resolveLogPath } from '../logging/file-paths.js';
import type { AnswerMode, TraceResult } from './types.js';
import type { LmStudioApiStyle } from './lm-studio-synthesizer.js';

export interface AiTraceRequestLog {
  traceId: string;
  timestamp: string;
  phase: 'request';
  provider: 'lm_studio';
  endpoint: string;
  apiStyle?: LmStudioApiStyle;
  model: string;
  question: string;
  mode: AnswerMode;
  selectedNodeIds: string[];
  selectedAnchorIds: string[];
  sessionApplied: boolean;
  sessionReusedNodeIds: string[];
  frontierCandidates: TraceResult['frontierCandidates'];
  retrievalHops: TraceResult['retrievalHops'];
  followedReferences: TraceResult['followedReferences'];
  request: {
    systemPrompt: string;
    userPrompt: string;
  };
}

export interface AiTraceResponseLog {
  traceId: string;
  timestamp: string;
  phase: 'response';
  provider: 'lm_studio';
  endpoint: string;
  apiStyle?: LmStudioApiStyle;
  model: string;
  durationMs: number;
  httpStatus: number;
  ok: boolean;
  responseText: string;
}

export interface AiTraceErrorLog {
  traceId: string;
  timestamp: string;
  phase: 'error';
  provider: 'lm_studio';
  endpoint: string;
  apiStyle?: LmStudioApiStyle;
  model: string;
  durationMs: number;
  error: {
    message: string;
  };
}

type AiTraceLogInput =
  | Omit<AiTraceRequestLog, 'traceId' | 'timestamp'>
  | Omit<AiTraceResponseLog, 'traceId' | 'timestamp'>
  | Omit<AiTraceErrorLog, 'traceId' | 'timestamp'>;

export function createAiTraceRecorder(env: NodeJS.ProcessEnv = process.env): {
  traceId: string;
  append: (record: AiTraceLogInput) => Promise<void>;
} {
  const traceId = randomUUID();
  const filePath = resolveLogPath(env.FPF_AI_TRACE_LOG_PATH, 'ai-traces.jsonl');

  return {
    traceId,
    append: async (record) => {
      try {
        await appendFile(
          filePath,
          `${JSON.stringify({ ...record, traceId, timestamp: new Date().toISOString() })}\n`,
          'utf8',
        );
      } catch {
        // Trace logging must never break answering.
      }
    },
  };
}
