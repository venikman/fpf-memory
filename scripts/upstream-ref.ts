/**
 * Tracks the canonical fpf-sync branch by default. Automation resolves this
 * moving ref to an immutable SHA before publishing so committed manifests
 * still record the exact upstream source.
 */
export const DEFAULT_UPSTREAM_REF = 'main';
export const DEFAULT_UPSTREAM_URL = `https://raw.githubusercontent.com/venikman/fpf-sync/${DEFAULT_UPSTREAM_REF}/FPF/FPF-Spec.md`;
