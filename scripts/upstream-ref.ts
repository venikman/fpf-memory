/**
 * Pinned to an immutable commit SHA so publish + deploy stay reproducible.
 * Override `FPF_UPSTREAM_SPEC_URL`/`FPF_UPSTREAM_REF` at call time to test
 * against a newer upstream; bump this constant when rolling the pin forward.
 */
export const DEFAULT_UPSTREAM_REF = '75536eb67fe58e6ffe5c87d21631403fd71c3e10';
export const DEFAULT_UPSTREAM_URL = `https://raw.githubusercontent.com/venikman/fpf-sync/${DEFAULT_UPSTREAM_REF}/FPF/FPF-Spec.md`;
