// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-pi-l80-t5',rho: 0,tau: 5,combine: 'convex',lambda: 0.8,walkScore: 'pi',walkGamma: 1});
  }
}
