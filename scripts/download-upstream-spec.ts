import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { DEFAULT_UPSTREAM_URL } from './upstream-ref.js';

const DEFAULT_URL = DEFAULT_UPSTREAM_URL;
const DEFAULT_OUTPUT = '.fpf-upstream/FPF-Spec.md';

const url = (process.env.FPF_UPSTREAM_SPEC_URL ?? DEFAULT_URL).trim();
const outputPath = resolve(
  process.cwd(),
  (process.env.FPF_DOWNLOAD_SPEC_OUTPUT ?? DEFAULT_OUTPUT).trim(),
);

const response = await fetch(url);
if (!response.ok) {
  process.stderr.write(
    `download-upstream-spec: HTTP ${response.status} for ${url}\n`,
  );
  process.exit(1);
}

const text = await response.text();
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, text, 'utf8');

process.stdout.write(
  `${JSON.stringify(
    {
      url,
      outputPath,
      bytes: Buffer.byteLength(text, 'utf8'),
    },
    null,
    2,
  )}\n`,
);
