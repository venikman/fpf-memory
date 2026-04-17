import { validatePublishedSurface } from '../src/build/published-surface.js';

const result = await validatePublishedSurface();

process.stdout.write(
  `${JSON.stringify(
    {
      sourceHash: result.sourceHash,
      upstreamRef: result.manifest.upstreamRef,
      publishedAt: result.manifest.publishedAt,
      specBytes: result.specBytes,
    },
    null,
    2,
  )}\n`,
);
