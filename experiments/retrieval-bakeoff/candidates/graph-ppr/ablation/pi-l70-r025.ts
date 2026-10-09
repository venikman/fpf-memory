// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-pi-l70-r025',rho: 0.25,tau: 6,walkGamma: 1,combine: 'convex',lambda: 0.7,walkScore: 'pi'});
  }
}
