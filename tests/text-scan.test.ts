import { describe, expect, it } from '@rstest/core';

import {
  collapseWhitespace,
  findCollapsedTokenPosition,
  findTokenPosition,
} from '../src/runtime/text-scan.js';

describe('text-scan', () => {
  it('matches dotted IDs through collapsed query tokens', () => {
    expect(findCollapsedTokenPosition('see a.2.3 for details', 'a23')).toEqual({
      pos: 4,
      len: 5,
    });
    expect(findTokenPosition('see a.2.3 for details', 'a23')).toEqual({
      pos: 4,
      len: 5,
    });
  });

  it('keeps positions aligned when earlier Unicode lowercasing would expand', () => {
    expect(findTokenPosition('İ prefix A.2.3 for details', 'a23')).toEqual({
      pos: 9,
      len: 5,
    });
  });

  it('collapses Unicode whitespace in snippets', () => {
    expect(collapseWhitespace(' Alpha\u00a0\u2003Beta\nGamma\u2028Delta ')).toBe(
      'Alpha Beta Gamma Delta',
    );
  });
});
