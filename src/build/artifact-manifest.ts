import type { ContextId, LifecycleState } from '../core/governance.js';

export type ArtifactKind =
  | 'runtime_snapshot'
  | 'runtime_source'
  | 'runtime_manifest'
  | 'generated_docs'
  | 'dist_entrypoint'
  | 'hosted_stage_asset';

export interface ArtifactManifestEntry {
  kind: ArtifactKind;
  sourcePath: string;
  outputPath: string;
  consumer: 'runtime' | 'docs' | 'build' | 'hosted';
}

export interface BuildArtifactManifest {
  builtAt: string;
  lifecycleState: LifecycleState;
  ownerContext: ContextId;
  artifacts: ArtifactManifestEntry[];
}
