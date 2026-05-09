import { describe, expect, it } from '@rstest/core';

import {
  askFpfInputSchema,
  browseFpfCatalogInputSchema,
  expandFpfCitationsInputSchema,
  inspectFpfAnchorInputSchema,
  inspectFpfNodeInputSchema,
  queryFpfSpecInputSchema,
  readFpfDocInputSchema,
  searchFpfInputSchema,
  traceFpfPathInputSchema,
} from '../src/mcp/tool-contracts.js';

const big = (size: number) => 'a'.repeat(size);

describe('public MCP tool input caps', () => {
  it('queryFpfSpec rejects question over 2000 chars', () => {
    expect(queryFpfSpecInputSchema.safeParse({ question: big(2001) }).success).toBe(false);
    expect(queryFpfSpecInputSchema.safeParse({ question: big(2000) }).success).toBe(true);
  });

  it('askFpf rejects question over 2000 chars and sessionId over 256', () => {
    expect(askFpfInputSchema.safeParse({ question: big(2001) }).success).toBe(false);
    expect(
      askFpfInputSchema.safeParse({ question: 'ok', sessionId: big(257) }).success,
    ).toBe(false);
    expect(
      askFpfInputSchema.safeParse({ question: 'ok', sessionId: big(256) }).success,
    ).toBe(true);
  });

  it('traceFpfPath rejects question over 2000 chars', () => {
    expect(traceFpfPathInputSchema.safeParse({ question: big(2001) }).success).toBe(false);
  });

  it('searchFpf rejects query over 1000 chars', () => {
    expect(searchFpfInputSchema.safeParse({ query: big(1001) }).success).toBe(false);
    expect(searchFpfInputSchema.safeParse({ query: big(1000) }).success).toBe(true);
  });

  it('browseFpfCatalog rejects part/status over 64 chars', () => {
    expect(browseFpfCatalogInputSchema.safeParse({ part: big(65) }).success).toBe(false);
    expect(browseFpfCatalogInputSchema.safeParse({ status: big(65) }).success).toBe(false);
    expect(browseFpfCatalogInputSchema.safeParse({ part: big(64), status: big(64) }).success).toBe(
      true,
    );
  });

  it('readFpfDoc and inspectFpfNode reject selectors over 256 chars', () => {
    expect(readFpfDocInputSchema.safeParse({ selector: big(257) }).success).toBe(false);
    expect(inspectFpfNodeInputSchema.safeParse({ selector: big(257) }).success).toBe(false);
  });

  it('inspectFpfAnchor rejects anchorId over 256 chars', () => {
    expect(inspectFpfAnchorInputSchema.safeParse({ anchorId: big(257) }).success).toBe(false);
  });

  it('expandFpfCitations rejects more than 50 citations', () => {
    const citations51 = Array.from({ length: 51 }, () => 'A.1');
    const citations50 = Array.from({ length: 50 }, () => 'A.1');
    expect(expandFpfCitationsInputSchema.safeParse({ citationIds: citations51 }).success).toBe(
      false,
    );
    expect(expandFpfCitationsInputSchema.safeParse({ citationIds: citations50 }).success).toBe(
      true,
    );
  });

  it('expandFpfCitations rejects an individual citation id over 256 chars', () => {
    expect(
      expandFpfCitationsInputSchema.safeParse({ citationIds: [big(257)] }).success,
    ).toBe(false);
  });
});
