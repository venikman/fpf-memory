import type {
  AnswerMode,
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
} from '../../core/types.js';

export interface RuntimeQueryPort {
  refresh(force?: boolean): Promise<BuildAudit>;
  status(): Promise<RuntimeStatus>;
  query(
    question: string,
    mode?: AnswerMode,
    forceRefresh?: boolean,
    sessionId?: string,
  ): Promise<QueryResult>;
  trace(
    question: string,
    mode?: AnswerMode,
    forceRefresh?: boolean,
    sessionId?: string,
  ): Promise<TraceResult>;
  inspect(
    selector: string,
    kind?: 'auto' | 'id' | 'route' | 'lexeme',
    forceRefresh?: boolean,
  ): Promise<InspectResult>;
  readDoc(
    selector: string,
    kind?: 'auto' | 'id' | 'route' | 'lexeme',
    options?: {
      mode?: 'preview' | 'full';
      maxChars?: number;
      forceRefresh?: boolean;
    },
  ): Promise<ReadDocResult>;
  inspectAnchor(anchorId: string, forceRefresh?: boolean): Promise<InspectAnchorResult>;
  expandCitations(
    citationIds: string[],
    forceRefresh?: boolean,
  ): Promise<ExpandCitationsResult>;
  browse(options?: {
    part?: string;
    status?: string;
    kind?: NodeKind;
    limit?: number;
    forceRefresh?: boolean;
  }): Promise<BrowseCatalogResult>;
  search(
    query: string,
    options?: {
      kind?: NodeKind;
      limit?: number;
      forceRefresh?: boolean;
    },
  ): Promise<SearchResult>;
}
