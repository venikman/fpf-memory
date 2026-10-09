import { expect, test } from 'bun:test';

import type { CorpusDoc } from '../../harness/types.js';
import FusionRetriever from '../fusion/index.js';
import Bm25fRetriever from './index.js';
import { porter2, selfCheckPorter2 } from './porter2.js';
import { tokenize } from './tokenizer.js';

test('prototype property names do not become stemmer exceptions', () => {
  for (const word of Object.getOwnPropertyNames(Object.prototype)) {
    expect(typeof porter2(word)).toBe('string');
  }
  expect(porter2('constructor')).toBe('constructor');
  expect(porter2('__proto__')).toBe('__proto__');
});

test('the real exception words and frozen stemming cases remain unchanged', () => {
  expect(porter2('skies')).toBe('sky');
  expect(porter2('dying')).toBe('die');
  expect(porter2('only')).toBe('onli');
  expect(selfCheckPorter2()).toEqual([]);
});

test('tokenizing constructor keeps string terms for indexing and queries', () => {
  for (const forQuery of [false, true]) {
    const stream = tokenize('constructor', forQuery);
    expect(stream.tokens.map(({ term }) => term)).toEqual(['constructor']);
  }
});

for (const Retriever of [Bm25fRetriever, FusionRetriever]) {
  test(`${Retriever.name} retrieves a constructor document instead of silently abstaining`, async () => {
    const docs: CorpusDoc[] = [
      { id: 'fixture-constructor', kind: 'pattern', title: 'Constructor', aliases: [], text: 'A constructor creates an object.', neighbors: [] },
      { id: 'fixture-unrelated', kind: 'pattern', title: 'Unrelated', aliases: [], text: 'A separate document about observations.', neighbors: [] },
    ];
    const retriever = new Retriever();
    await retriever.build(docs);
    expect((await retriever.query('constructor', 1)).map(({ id }) => id)).toEqual(['fixture-constructor']);
  });
}
