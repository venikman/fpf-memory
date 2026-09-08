// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-l8-f025-p10', norm: 'minmax', rrfK: 10, sources: [{ id: 'bm25f', weight: 0.8 }, { id: 'graph-ppr', weight: 0.2 }, { id: 'flow', weight: 0.25, norm: 'rrf', pool: 10 }] });
  }
}
