import { publishCurrent } from '../src/build/publish-current.js';
import { DEFAULT_PUBLISH_SOURCE_PATH } from '../src/core/constants.js';
import {
  DEFAULT_UPSTREAM_OWNER,
  DEFAULT_UPSTREAM_REF,
  DEFAULT_UPSTREAM_REPO,
} from './upstream-ref.js';

const publishSourcePath = (
  process.env.FPF_PUBLISH_SOURCE_PATH ?? DEFAULT_PUBLISH_SOURCE_PATH
).trim();
const upstreamRef = (process.env.FPF_UPSTREAM_REF ?? DEFAULT_UPSTREAM_REF).trim();
const upstreamOwner = (
  process.env.FPF_UPSTREAM_OWNER ?? DEFAULT_UPSTREAM_OWNER
).trim();
const upstreamRepo = (
  process.env.FPF_UPSTREAM_REPO ?? DEFAULT_UPSTREAM_REPO
).trim();
const channel = (process.env.FPF_PUBLISH_CHANNEL ?? 'latest-published').trim();

const manifest = await publishCurrent(
  { publishSourcePath, upstreamRef, upstreamOwner, upstreamRepo, channel },
  process.env,
);

process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
