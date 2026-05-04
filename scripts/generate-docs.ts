import { parseDocsConfig } from '../src/adapters/infra/config/env.js';
import { generateDocsSite } from '../src/adapters/docs/generate.js';

const docsConfig = parseDocsConfig(process.env);
const result = await generateDocsSite({
  sourcePath: docsConfig.sourcePath,
  docsRoot: docsConfig.docsRoot,
});

process.stdout.write(
  `${JSON.stringify(
    {
      sourcePath: result.sourcePath,
      sourceHash: result.sourceHash,
      builtAt: result.builtAt,
      docsRoot: result.docsRoot,
      generatedFiles: result.generatedFiles,
    },
    null,
    2,
  )}\n`,
);
