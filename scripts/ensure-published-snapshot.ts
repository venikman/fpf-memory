import { ensurePublishedSnapshot } from '../src/build/ensure-published-snapshot.js';

const result = await ensurePublishedSnapshot();

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
