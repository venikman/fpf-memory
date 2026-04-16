import { publishCurrent } from '../src/build/publish-current.js';
import { DEFAULT_PUBLISH_SOURCE_PATH } from '../src/core/constants.js';
import { DEFAULT_UPSTREAM_REF } from './upstream-ref.js';

const publishSourcePath = (
  process.env.FPF_PUBLISH_SOURCE_PATH ?? DEFAULT_PUBLISH_SOURCE_PATH
).trim();
const upstreamRef = (process.env.FPF_UPSTREAM_REF ?? DEFAULT_UPSTREAM_REF).trim();
const channel = (process.env.FPF_PUBLISH_CHANNEL ?? 'latest-published').trim();

const manifest = await publishCurrent(
  { publishSourcePath, upstreamRef, channel },
  process.env,
);

process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
