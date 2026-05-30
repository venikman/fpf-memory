/**
 * Tracks the original upstream FPF publication source at
 * github.com/ailev/FPF. Automation resolves this moving ref to an
 * immutable SHA before publishing so committed manifests still record
 * the exact upstream source.
 */
export {
  buildUpstreamSpecUrl,
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REF,
  DEFAULT_UPSTREAM_REPO,
  DEFAULT_UPSTREAM_REPO_URL,
  DEFAULT_UPSTREAM_SPEC_PATH,
  DEFAULT_UPSTREAM_URL,
  normalizeUpstreamRef,
  parseUpstreamSpecSourceEnv,
  resolveUpstreamSpecUrl,
} from '../src/build/upstream-source.js';
