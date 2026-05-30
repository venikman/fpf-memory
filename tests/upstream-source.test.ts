import { describe, expect, it } from '@rstest/core';

import {
  buildUpstreamSpecUrl,
  normalizeUpstreamRef,
  parseUpstreamSpecSourceEnv,
  resolveUpstreamSpecUrl,
} from '../src/build/upstream-source.js';

describe('upstream FPF source resolution', () => {
  it('defaults to Anatoly Levenchuk FPF main spec path', () => {
    expect(buildUpstreamSpecUrl()).toBe(
      'https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md',
    );
  });

  it('uses FPF_UPSTREAM_REF when constructing the download URL', () => {
    const source = parseUpstreamSpecSourceEnv({
      FPF_UPSTREAM_REF: '1234567890abcdef1234567890abcdef12345678',
    } as NodeJS.ProcessEnv);

    expect(source).toMatchObject({
      owner: 'ailev',
      repo: 'FPF',
      ref: '1234567890abcdef1234567890abcdef12345678',
      specPath: 'FPF-Spec.md',
      url: 'https://raw.githubusercontent.com/ailev/FPF/1234567890abcdef1234567890abcdef12345678/FPF-Spec.md',
    });
  });

  it('normalizes full git refs before constructing the download URL', () => {
    const source = parseUpstreamSpecSourceEnv({
      FPF_UPSTREAM_REF: 'refs/heads/main',
    } as NodeJS.ProcessEnv);

    expect(source.ref).toBe('main');
    expect(source.url).toBe('https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md');
    expect(normalizeUpstreamRef('refs/tags/v1')).toBe('v1');
  });

  it('lets matching canonical FPF_UPSTREAM_SPEC_URL override the constructed raw URL', () => {
    expect(
      resolveUpstreamSpecUrl({
        ref: '1234567890abcdef1234567890abcdef12345678',
        explicitUrl:
          'https://raw.githubusercontent.com/ailev/FPF/1234567890abcdef1234567890abcdef12345678/FPF-Spec.md',
      }),
    ).toBe(
      'https://raw.githubusercontent.com/ailev/FPF/1234567890abcdef1234567890abcdef12345678/FPF-Spec.md',
    );
  });

  it('handles an empty normalized spec path without treating -0 as an array end index', () => {
    expect(
      resolveUpstreamSpecUrl({
        specPath: '/',
        explicitUrl: 'https://raw.githubusercontent.com/ailev/FPF/main',
      }),
    ).toBe('https://raw.githubusercontent.com/ailev/FPF/main');
  });

  it('rejects raw spec URLs that do not match the declared provenance ref', () => {
    expect(() =>
      resolveUpstreamSpecUrl({
        ref: '1234567890abcdef1234567890abcdef12345678',
        explicitUrl: 'https://example.test/custom/FPF-Spec.md',
      }),
    ).toThrow(/canonical raw\.githubusercontent\.com/u);

    expect(() =>
      resolveUpstreamSpecUrl({
        ref: '1234567890abcdef1234567890abcdef12345678',
        explicitUrl: 'https://raw.githubusercontent.com/ailev/FPF/main/FPF-Spec.md',
      }),
    ).toThrow(/must match ailev\/FPF@1234567890abcdef1234567890abcdef12345678/u);
  });
});
