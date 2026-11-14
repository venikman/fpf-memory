import { describe, expect, it } from '@rstest/core';

import { headingSlug } from '../src/core/documents.js';

/**
 * Regression tests for `headingSlug`, which generates URL fragments for
 * sub-anchor links (`/generated/patterns/<id>#<slug>`) inside generated
 * pattern pages. The slug must match exactly what rspress / rehype-slug
 * emits as the heading `id` attribute, otherwise `formatNodeReference`
 * produces dead anchor links.
 *
 * The previous regex `/[^a-z0-9À-ɏЀ-ӿ\s-]/g` covered Latin Extended
 * and Cyrillic but had a gap for Greek (U+0370–U+03FF) — broken anchor
 * links for any pattern title with Γ (PR #72 review feedback).
 */

describe('headingSlug', () => {
  it('preserves Greek letters (Γ → γ) so anchor links to Γ-prefixed sections resolve', () => {
    // The actual heading id rspress emits for this title.
    expect(
      headingSlug('Γ_method — Order-Sensitive Method Composition & Work Enactment'),
    ).toBe('γ_method--order-sensitive-method-composition--work-enactment');
  });

  it('preserves Cyrillic letters', () => {
    expect(headingSlug('Доступ к данным')).toBe('доступ-к-данным');
  });

  it('preserves ASCII letters, digits, and existing hyphens', () => {
    expect(headingSlug('Order-Sensitive Method 7')).toBe('order-sensitive-method-7');
  });

  it('preserves underscores (rspress keeps them in heading ids)', () => {
    expect(headingSlug('Γ_time and Γ_work')).toBe('γ_time-and-γ_work');
  });

  it('strips punctuation: em-dash, ampersand, parentheses, period', () => {
    // The em-dash itself is stripped, the surrounding spaces become
    // adjacent hyphens — this is rspress's actual behavior.
    expect(headingSlug('foo — bar & baz (qux).')).toBe('foo--bar--baz-qux');
  });

  it('keeps the FPF id prefix, matching the upstream GitHub anchor', () => {
    // Section headings render with their ID ("A.19:0 - …"), so the rspress
    // heading id is the same slug GitHub gives that heading in FPF-Spec.md.
    expect(headingSlug('A.19:0 - Reading path for engineer-managers')).toBe(
      'a190---reading-path-for-engineer-managers',
    );
    expect(headingSlug('C.39.WI - Discover Worthwhile Methods')).toBe(
      'c39wi---discover-worthwhile-methods',
    );
    expect(headingSlug('A.19.SOURCE-SET-SPACE-SUBSTRATE:4.1 - Section')).toBe(
      'a19source-set-space-substrate41---section',
    );
  });

  it('returns an empty string for input with no kept characters', () => {
    expect(headingSlug('!!!')).toBe('');
  });

  it('handles empty input', () => {
    expect(headingSlug('')).toBe('');
  });
});
