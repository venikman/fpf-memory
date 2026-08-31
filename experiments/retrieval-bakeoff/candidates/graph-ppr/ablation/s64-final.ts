// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-s64-final',rho: 0,tau: 5,walkScore: 'pi',walkGamma: 1,combine: 'convex',lambda: 0.75,seedN: 64});
  }
}
