import { describe, expect, it } from '@rstest/core';

import {
  parseHeadingMetadata,
  parseLabeledRelations,
  parseSource,
} from '../src/runtime/source-parser.js';

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
