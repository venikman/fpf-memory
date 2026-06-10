import { describe, expect, it } from '@rstest/core';

import {
  askFpfInputSchema,
  browseFpfCatalogInputSchema,
  expandFpfCitationsInputSchema,
  getFpfIndexStatusInputSchema,
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

  it('browseFpfCatalog accepts offset paging within bounds', () => {
    expect(browseFpfCatalogInputSchema.safeParse({ offset: 0 }).success).toBe(true);
    expect(browseFpfCatalogInputSchema.safeParse({ offset: 9_999 }).success).toBe(true);
    expect(browseFpfCatalogInputSchema.safeParse({ offset: -1 }).success).toBe(false);
    expect(browseFpfCatalogInputSchema.safeParse({ offset: 1.5 }).success).toBe(false);
    expect(browseFpfCatalogInputSchema.safeParse({ offset: 100_001 }).success).toBe(false);
  });

  it('getFpfIndexStatus tolerates only the bounded legacy placeholder arg', () => {
    expect(getFpfIndexStatusInputSchema.safeParse({}).success).toBe(true);
    // Legacy clients that cannot send an empty arguments object invent a
    // placeholder argument (e.g. `random_string`); the known placeholder
    // is accepted within the selector cap and discarded.
    expect(
      getFpfIndexStatusInputSchema.safeParse({ random_string: 'notion-placeholder' }).success,
    ).toBe(true);
    expect(getFpfIndexStatusInputSchema.parse({ random_string: 'notion-placeholder' })).toEqual(
      {},
    );
    // The input-cap policy still holds at the public schema boundary:
    // oversized placeholders, non-string placeholders, and unknown keys
    // are rejected rather than silently stripped.
    expect(
      getFpfIndexStatusInputSchema.safeParse({ random_string: 'x'.repeat(257) }).success,
    ).toBe(false);
    expect(getFpfIndexStatusInputSchema.safeParse({ random_string: 42 }).success).toBe(false);
    expect(getFpfIndexStatusInputSchema.safeParse({ _probe: true }).success).toBe(false);
  });
});
