import type {
  AnswerMode,
  AskFpfResult,
  BrowseCatalogResult,
  BuildAudit,
  ExpandCitationsResult,
  InspectAnchorResult,
  InspectResult,
  NodeKind,
  QueryResult,
  ReadDocResult,
  RuntimeStatus,
  SearchResult,
  TraceResult,
  SessionId,
} from '../../core/types.js';

export interface QueryFpfCommand {
  question: string;
  mode?: AnswerMode;
  forceRefresh?: boolean;
  sessionId?: SessionId;
}

export interface TraceFpfCommand {
  question: string;
  mode?: AnswerMode;
  forceRefresh?: boolean;
  sessionId?: SessionId;
}

export interface InspectFpfNodeCommand {
  selector: string;
  kind?: 'auto' | 'id' | 'route' | 'lexeme';
  forceRefresh?: boolean;
}

export interface ReadFpfDocCommand {
  selector: string;
  kind?: 'auto' | 'id' | 'route' | 'lexeme';
  /** Default 'full'; 'preview' omits markdown, returns headings + preview snippet. */
  mode?: 'preview' | 'full';
  /** Cap returned markdown length (UTF-16 code units). */
  maxChars?: number;
  forceRefresh?: boolean;
}

export interface InspectFpfAnchorCommand {
  anchorId: string;
  forceRefresh?: boolean;
}

export interface ExpandFpfCitationsCommand {
  citationIds: string[];
  forceRefresh?: boolean;
}

export interface RefreshFpfIndexCommand {
  force?: boolean;
}

/** Status has no inputs; kept for `RuntimeAppCommand` union completeness. */
export type GetFpfIndexStatusCommand = Record<string, never>;

export interface BrowseFpfCatalogCommand {
  part?: string;
  status?: string;
  kind?: NodeKind;
  limit?: number;
  forceRefresh?: boolean;
}

export interface SearchFpfCommand {
  query: string;
  kind?: NodeKind;
  limit?: number;
  forceRefresh?: boolean;
}

export type RuntimeAppCommand =
  | QueryFpfCommand
  | TraceFpfCommand
  | InspectFpfNodeCommand
  | ReadFpfDocCommand
  | InspectFpfAnchorCommand
  | ExpandFpfCitationsCommand
  | RefreshFpfIndexCommand
  | GetFpfIndexStatusCommand
  | BrowseFpfCatalogCommand
  | SearchFpfCommand;

export type RuntimeAppResult =
  | QueryResult
  | AskFpfResult
  | TraceResult
  | InspectResult
  | ReadDocResult
  | InspectAnchorResult
  | ExpandCitationsResult
  | BuildAudit
  | RuntimeStatus
  | BrowseCatalogResult
  | SearchResult;

export type AppServiceOutcome<TValue> =
  | {
      kind: 'success';
      value: TValue;
    }
  | {
      kind: 'validation_error';
      message: string;
      issues: string[];
    }
  | {
      kind: 'not_ready';
      reason: string;
    }
  | {
      kind: 'runtime_error';
      error: string;
    };

export function success<TValue>(value: TValue): AppServiceOutcome<TValue> {
  return { kind: 'success', value };
}

export function validationError(
  message: string,
  issues: string[],
): AppServiceOutcome<never> {
  return {
    kind: 'validation_error',
    message,
    issues,
  };
}

export function runtimeError(error: unknown): AppServiceOutcome<never> {
  return {
    kind: 'runtime_error',
    error: error instanceof Error ? error.message : String(error),
  };
}

export function unwrapOutcome<TValue>(outcome: AppServiceOutcome<TValue>): TValue {
  switch (outcome.kind) {
    case 'success':
      return outcome.value;
    case 'validation_error':
      throw new Error(
        `[validation_error] ${outcome.message}${outcome.issues.length > 0 ? `: ${outcome.issues.join('; ')}` : ''}`,
      );
    case 'not_ready':
      throw new Error(`[not_ready] ${outcome.reason}`);
    case 'runtime_error':
      throw new Error(`[runtime_error] ${outcome.error}`);
  }
}
