import { readFile } from 'node:fs/promises';

import { publishCurrent } from '../src/build/publish-current.js';
import {
  publishCurrentManifestSchema,
  validatePublishedSurface,
} from '../src/build/published-surface.js';
import { PUBLISHED_MANIFEST_PATH, PUBLISHED_SPEC_PATH } from '../src/core/constants.js';

const manifest = publishCurrentManifestSchema.parse(
  JSON.parse(await readFile(PUBLISHED_MANIFEST_PATH, 'utf8')),
);
const repoMatch = /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/u.exec(manifest.upstreamRepoUrl);

try {
  await validatePublishedSurface();
  process.stdout.write('ensure:snapshot: published surface already valid; nothing to do.\n');
  process.exit(0);
} catch (error) {
  process.stdout.write(`ensure:snapshot: regenerating (${(error as Error).message})\n`);
}

await publishCurrent(
  {
    // Recompile the COMMITTED spec. Not `.fpf-upstream/` (gitignored, absent
    // in CI) and not upstream `main` — that would resolve a newer ref and
    // rewrite manifest.json to a spec we never downloaded.
    publishSourcePath: PUBLISHED_SPEC_PATH,
    upstreamRef: manifest.upstreamRef,
    channel: manifest.channel,
    upstreamOwner: repoMatch?.[1],
    upstreamRepo: repoMatch?.[2],
    // Hermetic: the default resolver calls api.github.com unauthenticated
    // (60 req/hr per runner IP). Both values it would fetch are committed.
    resolveUpstreamCommit: async () => ({
      sha: manifest.upstreamRef,
      committedAt: manifest.upstreamCommittedAt,
    }),
    // No per-line blame: that needs a full clone of ailev/FPF (~176MB .git).
    // Blame stamps are produced once, by `publish:current` on the sync runner
    // and in the local pre-push hook, and travel inside the snapshot that
    // publish writes and deploys. Nothing in CI/test/build reads them.
    loadLineBlame: async () => undefined,
  },
  process.env,
);

process.stdout.write('ensure:snapshot: regenerated and validated.\n');
