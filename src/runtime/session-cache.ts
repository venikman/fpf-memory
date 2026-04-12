export interface RetrievalSessionState {
  lastNormalizedQuestion: string;
  lastSelectedNodeIds: string[];
  lastSelectedRouteId?: string;
  recentUnresolvedNodeIds: string[];
  updatedAt: string;
}

export class SessionCache {
  private readonly entries = new Map<string, RetrievalSessionState>();

  constructor(private readonly maxSessions = 50) {}

  get(sessionId: string): RetrievalSessionState | undefined {
    const value = this.entries.get(sessionId);
    if (!value) {
      return undefined;
    }
    this.entries.delete(sessionId);
    this.entries.set(sessionId, value);
    return value;
  }

  set(sessionId: string, state: RetrievalSessionState): void {
    if (this.entries.has(sessionId)) {
      this.entries.delete(sessionId);
    }
    this.entries.set(sessionId, state);
    while (this.entries.size > this.maxSessions) {
      const oldest = this.entries.keys().next().value;
      if (!oldest) {
        break;
      }
      this.entries.delete(oldest);
    }
  }

  summary(): { enabled: boolean; maxSessions: number; activeSessions: number } {
    return {
      enabled: true,
      maxSessions: this.maxSessions,
      activeSessions: this.entries.size,
    };
  }
}
