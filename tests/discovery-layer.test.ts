import { copyFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH } from '../src/core/constants.js';
import { FpfRuntime } from '../src/runtime/runtime.js';

/**
 * Tests for the browse / search discovery layer.
 *
 * Verifies filtering, ordering, limits, search scoring, snippet output,
 * and snapshot metadata for the two new public tools.
 */

describe('Discovery layer', () => {
  const canonicalSourcePath = resolve(process.cwd(), DEFAULT_SOURCE_PATH);
  let tempRoot: string;
  let sourcePath: string;
  let artifactDir: string;
  let runtime: FpfRuntime;

  beforeEach(async () => {
    tempRoot = await mkdtemp(resolve(tmpdir(), 'fpf-discovery-'));
    artifactDir = resolve(tempRoot, 'artifacts');
    sourcePath = resolve(tempRoot, 'FPF-spec.md');
    await copyFile(canonicalSourcePath, sourcePath);
    runtime = new FpfRuntime({ sourcePath, artifactDir });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  // -----------------------------------------------------------------------
  // browse()
  // -----------------------------------------------------------------------

  describe('browse()', () => {
    it('returns entries when no filters are applied', async () => {
      const result = await runtime.browse();
      expect(result.entries.length).toBeGreaterThan(0);
      // total reflects all matching entries; entries may be capped by default limit
      expect(result.total).toBeGreaterThanOrEqual(result.entries.length);
      expect(result.snapshot.sourceHash).toBeTruthy();
      expect(result.snapshot.builtAt).toBeTruthy();
    });

    it('returns entries sorted by id', async () => {
      const result = await runtime.browse();
      const ids = result.entries.map((e) => e.id);
      const sorted = [...ids].sort((a, b) => a.localeCompare(b));
      expect(ids).toEqual(sorted);
    });

    it('filters by kind', async () => {
      const patterns = await runtime.browse({ kind: 'pattern' });
      const routes = await runtime.browse({ kind: 'route' });

      expect(patterns.entries.length).toBeGreaterThan(0);
      expect(routes.entries.length).toBeGreaterThanOrEqual(0);
      expect(patterns.entries.every((e) => e.kind === 'pattern')).toBe(true);
      expect(routes.entries.every((e) => e.kind === 'route')).toBe(true);
      expect(patterns.filters.kind).toBe('pattern');
      expect(routes.filters.kind).toBe('route');
    });

    it('filters by part (case-insensitive)', async () => {
      // First discover an actual part value from the data.
      const all = await runtime.browse({ limit: 500 });
      const withPart = all.entries.find((e) => e.part);
      expect(withPart).toBeDefined();

      const partValue = withPart!.part!;
      const filtered = await runtime.browse({ part: partValue, limit: 500 });
      const filteredLower = await runtime.browse({ part: partValue.toLowerCase(), limit: 500 });

      expect(filtered.entries.length).toBeGreaterThan(0);
      expect(filtered.total).toBeLessThan(all.total);
      expect(filtered.entries.every((e) => e.part?.toLowerCase() === partValue.toLowerCase())).toBe(true);
      expect(filtered.entries.length).toBe(filteredLower.entries.length);
    });

    it('canonicalizes part aliases before filtering', async () => {
      const filtered = await runtime.browse({ part: 'C', limit: 500 });

      expect(filtered.entries.length).toBeGreaterThan(0);
      expect(filtered.filters.part).toMatch(/^Part C\b/);
      expect(filtered.entries.every((entry) => entry.part?.startsWith('Part C'))).toBe(true);
    });

    it('returns a part suggestion for near-miss filters', async () => {
      const filtered = await runtime.browse({ part: 'prt c', limit: 500 });

      expect(filtered.entries).toEqual([]);
      expect(filtered.total).toBe(0);
      expect(filtered.didYouMean?.part).toMatch(/^Part C\b/);
    });

    it('respects the limit parameter', async () => {
      const limited = await runtime.browse({ limit: 3 });
      expect(limited.entries.length).toBe(3);
      expect(limited.total).toBeGreaterThan(3);
    });

    it('includes all kinds in default unfiltered page', async () => {
      const result = await runtime.browse();
      const kinds = new Set(result.entries.map((e) => e.kind));
      // Default browse page must include every kind present in the current spec.
      expect(kinds.has('pattern')).toBe(true);
      expect(kinds.has('lexeme')).toBe(true);
      const routes = await runtime.browse({ kind: 'route' });
      if (routes.total > 0) {
        expect(kinds.has('route')).toBe(true);
      }
    });

    it('includes description for each entry', async () => {
      const result = await runtime.browse({ limit: 10 });
      for (const entry of result.entries) {
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
      }
    });
  });

  // -----------------------------------------------------------------------
  // search()
  // -----------------------------------------------------------------------

  describe('search()', () => {
    it('returns ranked hits for a known term', async () => {
      const result = await runtime.search('bounded context');
      expect(result.hits.length).toBeGreaterThan(0);
      expect(result.query).toBe('bounded context');
      expect(result.snapshot.sourceHash).toBeTruthy();
    });

    it('returns hits sorted by descending score', async () => {
      const result = await runtime.search('pattern');
      const scores = result.hits.map((h) => h.score);
      for (let i = 1; i < scores.length; i++) {
        expect(scores[i]).toBeLessThanOrEqual(scores[i - 1]);
      }
    });

    it('includes non-empty snippets in hits', async () => {
      const result = await runtime.search('holon');
      expect(result.hits.length).toBeGreaterThan(0);
      for (const hit of result.hits) {
        expect(typeof hit.snippet).toBe('string');
        expect(hit.snippet.length).toBeGreaterThan(0);
      }
    });

    it('filters search results by kind', async () => {
      const all = await runtime.search('pattern');
      const routesOnly = await runtime.search('pattern', { kind: 'route' });

      expect(routesOnly.hits.every((h) => h.kind === 'route')).toBe(true);
      expect(all.total).toBeGreaterThanOrEqual(routesOnly.total);
    });

    it('respects the limit parameter', async () => {
      const result = await runtime.search('pattern', { limit: 2 });
      expect(result.hits.length).toBeLessThanOrEqual(2);
    });

    it('penalizes lexeme hits in default search so patterns/routes win on natural-language queries', async () => {
      // Lexeme `searchableText` concatenates many usage examples, so
      // without a penalty a single huge lexeme like
      // `lex:text-use-this-pattern-when-boundary-facing-language…`
      // outranks `route:boundary-unpacking` for the natural-language
      // query "boundary burden". The default search should keep the
      // first non-lexeme hit ahead of every lexeme hit.
      const result = await runtime.search('boundary burden', { limit: 15 });
      const firstNonLexemeIdx = result.hits.findIndex(
        (h) => h.kind !== 'lexeme',
      );
      const firstLexemeIdx = result.hits.findIndex((h) => h.kind === 'lexeme');
      expect(firstNonLexemeIdx).toBeGreaterThanOrEqual(0);
      // If any lexeme hit appears at all, it must come AFTER every
      // pattern/route hit of comparable strength.
      if (firstLexemeIdx >= 0) {
        expect(firstLexemeIdx).toBeGreaterThan(firstNonLexemeIdx);
      }
    });

    it('exposes linkedNodeIds on lexeme hits so readers have a path to the pattern page', async () => {
      // A lexeme on its own is a vocabulary entry, not an actionable
      // page. Including the linked pattern/route IDs alongside the
      // hit lets the caller jump straight to the actionable surface.
      const result = await runtime.search('boundary', {
        kind: 'lexeme',
        limit: 5,
      });
      const lexemeHit = result.hits.find((h) => h.kind === 'lexeme');
      expect(lexemeHit).toBeDefined();
      if (!lexemeHit) return;
      expect(Array.isArray(lexemeHit.linkedNodeIds)).toBe(true);
      expect(lexemeHit.linkedNodeIds!.length).toBeGreaterThan(0);
    });

    it('surfaces preface section headings in default search', async () => {
      // Audit follow-up A: top-level preface sections (the
      // `heading:…` rows like "Thinking Through Writing") are now
      // first-class compiled nodes, so they appear in `search_fpf`
      // results alongside patterns/routes/lexemes. Before this PR,
      // a query like "thinking through writing" returned only
      // pattern/lexeme matches and the preface page was unreachable
      // through search.
      const result = await runtime.search(
        'thinking through writing conceptual work',
        { limit: 8 },
      );
      const top = result.hits[0];
      expect(top).toBeDefined();
      if (!top) return;
      expect(top.kind).toBe('preface');
      expect(top.title.toLowerCase()).toContain('thinking through writing');
    });

    it('does not apply the lexeme penalty when the caller explicitly asks for kind:"lexeme"', async () => {
      // When the search filter is `kind: "lexeme"`, the caller wants
      // raw lexeme ranking (e.g. an MCP tool exploring vocabulary).
      const penalized = await runtime.search('boundary burden', { limit: 5 });
      const raw = await runtime.search('boundary burden', {
        kind: 'lexeme',
        limit: 5,
      });
      const penalizedTopLexeme = penalized.hits.find((h) => h.kind === 'lexeme');
      const rawTopLexeme = raw.hits[0];
      if (penalizedTopLexeme && rawTopLexeme && penalizedTopLexeme.id === rawTopLexeme.id) {
        // Same lexeme in both result sets — the raw score must be
        // higher than the penalized score for the same hit.
        expect(rawTopLexeme.score).toBeGreaterThan(penalizedTopLexeme.score);
      }
    });

    it('returns zero hits for nonsense query', async () => {
      const result = await runtime.search('zqqxvwjkf');
      expect(result.hits.length).toBe(0);
      expect(result.total).toBe(0);
    });

    it('centers snippet on matched term for dotted IDs', async () => {
      const result = await runtime.search('A.1.1');
      const hit = result.hits.find((h) => h.id === 'A.1.1');
      if (hit) {
        // The snippet should contain the ID or related text, not default
        // to the beginning of the node.
        expect(hit.snippet.toLowerCase()).toMatch(/a\.1\.1|boundedcontext|semantic/i);
      }
    });

    it('ranks exact ID match first when searching by node ID', async () => {
      const result = await runtime.search('A.1.1');
      expect(result.hits.length).toBeGreaterThan(0);
      expect(result.hits[0]!.id).toBe('A.1.1');
    });

    it('weights title tokens above body token density', async () => {
      const result = await runtime.search('evidence graph', { kind: 'pattern', limit: 5 });

      expect(result.hits.length).toBeGreaterThan(0);
      expect(result.hits[0]!.id).toBe('A.10');
    });
  });
});
