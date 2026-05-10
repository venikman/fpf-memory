/**
 * Tracks the upstream FPF specification authored by Anatoly Levenchuk
 * at github.com/ailev/FPF. Automation resolves this moving ref to an
 * immutable SHA before publishing so committed manifests still record
 * the exact upstream source.
 */
export const DEFAULT_UPSTREAM_REF = 'main';
export const DEFAULT_UPSTREAM_OWNER = 'ailev';
export const DEFAULT_UPSTREAM_REPO = 'FPF';
export const DEFAULT_UPSTREAM_REPO_URL = `https://github.com/${DEFAULT_UPSTREAM_OWNER}/${DEFAULT_UPSTREAM_REPO}`;
export const DEFAULT_UPSTREAM_URL = `https://raw.githubusercontent.com/${DEFAULT_UPSTREAM_OWNER}/${DEFAULT_UPSTREAM_REPO}/${DEFAULT_UPSTREAM_REF}/FPF-Spec.md`;
