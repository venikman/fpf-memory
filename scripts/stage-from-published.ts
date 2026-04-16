import {
  parseBuildConfigFromEnv,
  stageFromPublished,
} from '../src/build/stage-from-published.js';

const manifest = await stageFromPublished(parseBuildConfigFromEnv(process.env));

process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
