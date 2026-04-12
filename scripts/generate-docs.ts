import { generateDocsSite } from '../src/docs/generate.js';

const result = await generateDocsSite();

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
