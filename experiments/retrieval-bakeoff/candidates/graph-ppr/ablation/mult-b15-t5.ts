// Ablation variant — see ../README.md. Not registered in the harness registry.
import GraphPprRetriever from '../index.js';

export default class extends GraphPprRetriever {
  constructor() {
    super({name: 'ppr-mult-b15-t5',rho: 0,tau: 5,walkScore: 'pi',walkGamma: 1,combine: 'mult',beta: 1.5});
  }
}
