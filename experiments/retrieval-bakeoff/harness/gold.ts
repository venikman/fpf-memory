import path from 'node:path';

import type { GoldCase } from './types.js';

const EXPERIMENT_ROOT = path.resolve(import.meta.dir, '..');

export async function loadGold(name: string): Promise<GoldCase[]> {
  const files =
    name === 'all' ? ['dev.json', 'test.json'] : [`${name}.json`];
  const cases: GoldCase[] = [];
  for (const file of files) {
    const filePath = path.join(EXPERIMENT_ROOT, 'gold', file);
    const blob = Bun.file(filePath);
    if (!(await blob.exists())) {
      throw new Error(`gold set not found: ${filePath}`);
    }
    const parsed = (await blob.json()) as GoldCase[];
    // Generated IDs are only unique within a split; preserve both cases in an all run.
    cases.push(...parsed.map((entry) => name === 'all'
      ? { ...entry, id: `${path.basename(file, '.json')}:${entry.id}` }
      : entry));
  }
  const ids = new Set<string>();
  for (const goldCase of cases) {
    if (ids.has(goldCase.id)) throw new Error(`duplicate gold case id: ${goldCase.id}`);
    ids.add(goldCase.id);
  }
  return cases;
}
