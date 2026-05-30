export const DEFAULT_UPSTREAM_REF = 'main';
export const DEFAULT_UPSTREAM_OWNER = 'ailev';
export const DEFAULT_UPSTREAM_REPO = 'FPF';
export const DEFAULT_UPSTREAM_SPEC_PATH = 'FPF-Spec.md';
export const DEFAULT_UPSTREAM_REPO_URL = `https://github.com/${DEFAULT_UPSTREAM_OWNER}/${DEFAULT_UPSTREAM_REPO}`;

export interface UpstreamSpecSourceConfig {
  owner?: string;
  repo?: string;
  ref?: string;
  specPath?: string;
  explicitUrl?: string;
}

export interface UpstreamSpecSource {
  owner: string;
  repo: string;
  ref: string;
  specPath: string;
  url: string;
}

export const DEFAULT_UPSTREAM_URL = buildUpstreamSpecUrl();

export function buildUpstreamSpecUrl(
  config: UpstreamSpecSourceConfig = {},
): string {
  const owner = normalizedValue(config.owner, DEFAULT_UPSTREAM_OWNER);
  const repo = normalizedValue(config.repo, DEFAULT_UPSTREAM_REPO);
  const ref = normalizeUpstreamRef(normalizedValue(config.ref, DEFAULT_UPSTREAM_REF));
  const specPath = normalizedSpecPath(
    normalizedValue(config.specPath, DEFAULT_UPSTREAM_SPEC_PATH),
  );

  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${specPath}`;
}

export function resolveUpstreamSpecUrl(
  config: UpstreamSpecSourceConfig = {},
): string {
  const explicitUrl = normalizedOptionalValue(config.explicitUrl);
  if (!explicitUrl) {
    return buildUpstreamSpecUrl(config);
  }
  assertCanonicalRawSpecUrl(explicitUrl, config);
  return explicitUrl;
}

export function parseUpstreamSpecSourceEnv(
  env: NodeJS.ProcessEnv,
): UpstreamSpecSource {
  const owner = normalizedValue(env.FPF_UPSTREAM_OWNER, DEFAULT_UPSTREAM_OWNER);
  const repo = normalizedValue(env.FPF_UPSTREAM_REPO, DEFAULT_UPSTREAM_REPO);
  const ref = normalizeUpstreamRef(
    normalizedValue(env.FPF_UPSTREAM_REF, DEFAULT_UPSTREAM_REF),
  );
  const specPath = normalizedSpecPath(
    normalizedValue(env.FPF_UPSTREAM_SPEC_PATH, DEFAULT_UPSTREAM_SPEC_PATH),
  );
  const url = resolveUpstreamSpecUrl({
    owner,
    repo,
    ref,
    specPath,
    explicitUrl: env.FPF_UPSTREAM_SPEC_URL,
  });

  return { owner, repo, ref, specPath, url };
}

export function normalizeUpstreamRef(ref: string): string {
  return ref
    .trim()
    .replace(/^refs\/heads\//u, '')
    .replace(/^refs\/tags\//u, '');
}

function normalizedValue(value: string | undefined, fallback: string): string {
  return normalizedOptionalValue(value) ?? fallback;
}

function normalizedOptionalValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizedSpecPath(specPath: string): string {
  return specPath.replace(/^\/+|\/+$/gu, '');
}

function assertCanonicalRawSpecUrl(
  explicitUrl: string,
  config: UpstreamSpecSourceConfig,
): void {
  const owner = normalizedValue(config.owner, DEFAULT_UPSTREAM_OWNER);
  const repo = normalizedValue(config.repo, DEFAULT_UPSTREAM_REPO);
  const ref = normalizeUpstreamRef(normalizedValue(config.ref, DEFAULT_UPSTREAM_REF));
  const specPath = normalizedSpecPath(
    normalizedValue(config.specPath, DEFAULT_UPSTREAM_SPEC_PATH),
  );
  let parsed: URL;
  try {
    parsed = new URL(explicitUrl);
  } catch {
    throw new Error(`FPF_UPSTREAM_SPEC_URL must be a valid URL: ${explicitUrl}`);
  }

  if (parsed.protocol !== 'https:' || parsed.hostname !== 'raw.githubusercontent.com') {
    throw new Error(
      `FPF_UPSTREAM_SPEC_URL must use canonical raw.githubusercontent.com, got ${explicitUrl}`,
    );
  }

  const pathSegments = parsed.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  const expectedSpecSegments = specPath.split('/').filter(Boolean);
  const actualOwner = pathSegments[0];
  const actualRepo = pathSegments[1];
  const specStart = pathSegments.length - expectedSpecSegments.length;
  const actualSpecSegments = expectedSpecSegments.length > 0
    ? pathSegments.slice(specStart)
    : [];
  const actualRef = pathSegments.slice(2, specStart).join('/');

  if (
    actualOwner !== owner
    || actualRepo !== repo
    || actualRef !== ref
    || actualSpecSegments.join('/') !== expectedSpecSegments.join('/')
  ) {
    throw new Error(
      `FPF_UPSTREAM_SPEC_URL must match ${owner}/${repo}@${ref}:${specPath}, got ${explicitUrl}`,
    );
  }
}
