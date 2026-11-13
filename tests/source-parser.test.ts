import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from '@rstest/core';

import { DEFAULT_SOURCE_PATH, PREFACE_MARKER } from '../src/core/constants.js';
import {
  findCatalogEnd,
  findCatalogHeadingIndex,
  parseHeadingMetadata,
  parseLabeledRelations,
  parseSource,
} from '../src/runtime/source-parser.js';

// Share of pattern bodies allowed to have no catalog row. Every body has one
// on upstream f2bc67dd (343) and 1e57ccda (390), but 26 of the 29 specs
// published from 2026-07 to 2026-09 carried eight sub-entries (I.2.1-I.2.8)
// without rows, about 2%. A catalog cut short at a part boundary loses far
// more than this; one cut within its last few rows is not detected.
const MAX_SHARE_OF_BODIES_WITHOUT_CATALOG_ROW = 0.05;

function patternBodyIds(ir: ReturnType<typeof parseSource>): string[] {
  return [
    ...new Set(
      ir.sections
        .filter((section) => section.fullId !== undefined && section.fullId === section.patternId)
        .map((section) => section.patternId as string),
    ),
  ];
}

function shareOfBodiesWithoutCatalogRow(ir: ReturnType<typeof parseSource>): number {
  const bodies = patternBodyIds(ir);
  return patternBodiesWithoutCatalogRow(ir).length / Math.max(1, bodies.length);
}

function patternBodiesWithoutCatalogRow(ir: ReturnType<typeof parseSource>): string[] {
  return patternBodyIds(ir).filter((id) => ir.metadata[id] === undefined);
}

// A spec shaped like upstream: catalog section, then front matter, then a
// pattern body that contains a lookup table whose first cell is a pattern ID.
// `frontMatterHeading` is the level-1 heading upstream places after the
// catalog; its wording must not matter.
function specWithBodyLookupTable(frontMatterHeading: string): string {
  return [
    '# Example Framework',
    '',
    '# Table of Contents',
    '',
    '**Part A - Foundations**',
    '| ID | Title | Status | Keywords | Dependencies |',
    '| --- | --- | --- | --- | --- |',
    '| A.1 | Catalog Title For A.1 | Stable | *Keywords:* alpha. | **Builds on:** A.2. |',
    '| A.2 | Catalog Title For A.2 | Draft | *Keywords:* beta. | |',
    '',
    frontMatterHeading,
    '',
    'Front matter prose.',
    '',
    '# Part A - Foundations',
    '',
    '## A.1 - Catalog Title For A.1',
    'Body paragraph',
    '',
    '## A.2 - Catalog Title For A.2',
    '',
    '| Pattern or relation used | Recovered output | Local use |',
    '| --- | --- | --- |',
    '| `A.1` | A sentence that is not a title. | Use for something local. |',
  ].join('\n');
}

describe('source-parser', () => {
  it('parses part headings and structured heading IDs with line-oriented scanners', () => {
    const sourceText = [
      '**Part A - Foundations**',
      '| ID | Title | Status | Keywords | Dependencies |',
      '| --- | --- | --- | --- | --- |',
      '| A.1 | Example Pattern | Draft | short description | |',
      '',
      '# A.1 - Example Pattern',
      '> Type: Pattern',
      '> Status: Draft',
      '',
      'Body paragraph',
      '',
      '## A.1:Definition - Definition',
      'Definition body',
    ].join('\n');

    const ir = parseSource(sourceText);

    expect(ir.metadata['A.1']).toMatchObject({
      id: 'A.1',
      title: 'Example Pattern',
      status: 'Draft',
      part: 'Part A - Foundations',
      description: 'short description',
    });
    expect(ir.sections[0]).toMatchObject({
      id: 'A.1',
      fullId: 'A.1',
      patternId: 'A.1',
      heading: 'A.1 - Example Pattern',
    });
    expect(ir.sections[1]).toMatchObject({
      id: 'A.1:Definition',
      fullId: 'A.1:Definition',
      patternId: 'A.1',
      heading: 'A.1:Definition - Definition',
    });
  });

  it('accepts copy-pasted whitespace around structured headings and part labels', () => {
    const sourceText = [
      '**Part  A — Foundations**',
      '| ID | Title | Status | Keywords | Dependencies |',
      '| --- | --- | --- | --- | --- |',
      '| A.1 | Example Pattern | Draft | short description | |',
      '',
      '#\u00a0A.1\u00a0-\u2003Example Pattern',
      'Body paragraph',
    ].join('\n');

    const ir = parseSource(sourceText);

    expect(ir.metadata['A.1']?.part).toBe('Part A - Foundations');
    expect(ir.sections[0]).toMatchObject({
      id: 'A.1',
      fullId: 'A.1',
      patternId: 'A.1',
    });
  });

  it('reads catalog metadata only from the Table of Contents section', () => {
    // Regression: upstream renamed the section after the catalog, the exact
    // `# **Preface** (non-normative)` match failed, and this body table
    // replaced A.1's catalog title, status and relations.
    for (const frontMatterHeading of [
      '# Example Framework Architectural Reference (non-normative)',
      PREFACE_MARKER,
      '# Some Section Upstream Has Not Invented Yet',
    ]) {
      const ir = parseSource(specWithBodyLookupTable(frontMatterHeading));

      expect(ir.metadata['A.1']).toMatchObject({
        title: 'Catalog Title For A.1',
        status: 'Stable',
        part: 'Part A - Foundations',
      });
      expect(ir.metadata['A.1']?.relations).toContainEqual({
        from: 'A.1',
        relation: 'builds_on',
        to: 'A.2',
        source: 'A.1:catalog',
      });
      expect(Object.keys(ir.metadata).sort()).toEqual(['A.1', 'A.2']);
      expect(ir.catalogLines.at(-1)).not.toBe(frontMatterHeading);
      expect(ir.catalogLines).not.toContain(frontMatterHeading);
    }
  });

  it('ends the catalog at the next level-1 heading, or at EOF when there is none', () => {
    const lines = specWithBodyLookupTable('# Front Matter').split('\n');
    expect(lines[findCatalogEnd(lines)]).toBe('# Front Matter');

    const catalogOnly = ['# **Table of Contents**', '| A.1 | Title | Stable | | |'];
    expect(findCatalogEnd(catalogOnly)).toBe(catalogOnly.length);

    // Deeper headings inside the catalog do not end it.
    const nested = ['# Table of Contents', '## Part A', '| A.1 | Title | Stable | | |', '# Body'];
    expect(findCatalogEnd(nested)).toBe(3);
  });

  it('falls back to the legacy marker, then to the first pattern body', () => {
    const withMarker = ['| A.1 | Title | Stable | | |', PREFACE_MARKER, '| A.1 | Body row | x | | |'];
    expect(findCatalogEnd(withMarker)).toBe(1);
    expect(parseSource(withMarker.join('\n')).metadata['A.1']?.title).toBe('Title');

    // No catalog heading and no marker: the catalog stops where the bodies
    // start, so a table under a pattern heading is never a catalog row.
    const bare = [
      '| A.1 | Title | Stable | | |',
      '',
      '# A.1 - Title',
      '| A.1 | Body row | x | | |',
    ];
    expect(findCatalogEnd(bare)).toBe(2);
    expect(parseSource(bare.join('\n')).metadata['A.1']).toMatchObject({
      title: 'Title',
      status: 'Stable',
    });

    // Nothing ID-bearing at all: the whole text is catalog.
    const rowsOnly = ['| A.1 | Title | Stable | | |', '# Notes', '| A.2 | Other | Draft | | |'];
    expect(findCatalogEnd(rowsOnly)).toBe(rowsOnly.length);
  });

  it('still reads front matter only when the catalog heading itself is renamed', () => {
    const renamed = specWithBodyLookupTable('# Front Matter').replace(
      '# Table of Contents',
      '# Contents',
    );
    const ir = parseSource(renamed);

    expect(ir.metadata['A.1']).toMatchObject({ title: 'Catalog Title For A.1', status: 'Stable' });
    expect(Object.keys(ir.metadata).sort()).toEqual(['A.1', 'A.2']);
  });

  it('finds a catalog boundary in the published spec that excludes every pattern body', async () => {
    // Structural guard on the real artifact, whichever boundary rule applied:
    // the catalog region must stop before the pattern bodies, so a body table
    // can never be read as a catalog row. (If upstream renames the Table of
    // Contents the parser falls back to the front matter and this still
    // holds; the two tests below then have nothing to exercise.)
    const sourceText = await readFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), 'utf8');
    const ir = parseSource(sourceText);

    const firstBodySection = ir.sections.find((section) => section.fullId !== undefined);
    expect(firstBodySection).toBeDefined();
    expect(ir.catalogLines.length).toBeGreaterThan(0);
    expect(ir.catalogLines.length).toBeLessThan(firstBodySection!.lineStart);

    // Every catalog row must describe a pattern, and the catalog must be the
    // only source of pattern metadata: a row count far above the number of
    // pattern bodies means body tables leaked in.
    const patternBodyIds = new Set(
      ir.sections
        .filter((section) => section.fullId !== undefined && section.fullId === section.patternId)
        .map((section) => section.patternId),
    );
    const catalogIds = Object.keys(ir.metadata);
    expect(catalogIds.length).toBeGreaterThan(100);
    const withBody = catalogIds.filter((id) => patternBodyIds.has(id));
    expect(withBody.length / catalogIds.length).toBeGreaterThan(0.9);

    // And the other direction: a catalog cut short (a level-1 heading inside
    // the Table of Contents ends it early) leaves pattern bodies without a
    // row.
    expect(shareOfBodiesWithoutCatalogRow(ir)).toBeLessThanOrEqual(
      MAX_SHARE_OF_BODIES_WITHOUT_CATALOG_ROW,
    );
  });

  it('would notice a published catalog that is cut short', async () => {
    const lines = (await readFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), 'utf8')).split(
      /\r?\n/,
    );
    const catalogStart = findCatalogHeadingIndex(lines);
    if (catalogStart < 0) {
      // The published spec no longer has the catalog heading, so the parser
      // is on its fallback, where a level-1 heading does not end the catalog.
      expect(shareOfBodiesWithoutCatalogRow(parseSource(lines.join('\n')))).toBeLessThanOrEqual(
        MAX_SHARE_OF_BODIES_WITHOUT_CATALOG_ROW,
      );
      return;
    }

    const catalogEnd = findCatalogEnd(lines);
    const truncated = [...lines];
    truncated.splice(
      catalogStart + Math.floor((catalogEnd - catalogStart) / 2),
      0,
      '# Heading Promoted Inside The Catalog',
    );

    expect(shareOfBodiesWithoutCatalogRow(parseSource(truncated.join('\n')))).toBeGreaterThan(
      MAX_SHARE_OF_BODIES_WITHOUT_CATALOG_ROW,
    );
  });

  it('keeps published catalog metadata when the catalog heading is renamed', async () => {
    // The fallback path on the real artifact: front matter only, so pattern
    // metadata matches the normal parse instead of body tables leaking in.
    const lines = (await readFile(resolve(process.cwd(), DEFAULT_SOURCE_PATH), 'utf8')).split(
      /\r?\n/,
    );
    const catalogStart = findCatalogHeadingIndex(lines);
    if (catalogStart < 0) {
      // Already the case upstream; the structural test above covers it.
      return;
    }

    const renamedLines = [...lines];
    renamedLines[catalogStart] = '# Contents';
    const normal = parseSource(lines.join('\n'));
    const renamed = parseSource(renamedLines.join('\n'));

    expect(findCatalogHeadingIndex(renamedLines)).toBe(-1);
    expect(renamed.catalogLines.length).toBeGreaterThan(normal.catalogLines.length);
    expect(renamed.metadata).toEqual(normal.metadata);
  });

  it('parses heading metadata from labeled blockquote lines', () => {
    const lines = [
      '# A.1 - Example Pattern',
      '> Type: Pattern',
      '> Status: Draft',
      '> Normativity: Informative',
      '',
      'Body paragraph',
    ];

    expect(parseHeadingMetadata(lines, 2, 5)).toEqual({
      type: 'Pattern',
      status: 'Draft',
      normativity: 'Informative',
    });
  });

  it('parses multiline relation labels without relying on a giant regex', () => {
    const relations = parseLabeledRelations(
      'X.1',
      [
        '- **Builds on:** A.1, A.2',
        '  Prerequisite for: B.1',
        '* Coordinates with: C.3',
      ].join('\n'),
      'X.1:test',
    );

    expect(relations).toEqual(
      expect.arrayContaining([
        {
          from: 'X.1',
          relation: 'builds_on',
          to: 'A.1',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'builds_on',
          to: 'A.2',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'prerequisite_for',
          to: 'B.1',
          source: 'X.1:test',
        },
        {
          from: 'X.1',
          relation: 'coordinates_with',
          to: 'C.3',
          source: 'X.1:test',
        },
      ]),
    );
  });

  it('does not match relation labels inside larger words', () => {
    const relations = parseLabeledRelations(
      'X.1',
      'precoordinates with: A.1\nCoordinates with: B.1',
      'X.1:test',
    );

    expect(relations).toEqual([
      {
        from: 'X.1',
        relation: 'coordinates_with',
        to: 'B.1',
        source: 'X.1:test',
      },
    ]);
  });
});
