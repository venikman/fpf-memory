import { runMastraServerDeploy } from '../src/build/mastra-build.js';

await runMastraServerDeploy({
  args: process.argv.slice(2),
});
