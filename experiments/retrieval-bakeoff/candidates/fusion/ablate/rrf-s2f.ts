// Ablation variant — see ../README.md. Not registered in the harness registry.
import FusionRetriever from '../index.js';

export default class extends FusionRetriever {
  constructor() {
    super({ name: 'fusion-rrf-s2f', norm: 'rrf', sources: [{ id: 'bm25f', weight: 1 }, { id: 'graph-ppr', weight: 0.5 }, { id: 'flow', weight: 0.5 }] });
  }
}
