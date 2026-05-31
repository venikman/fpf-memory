import { describe, expect, it } from '@rstest/core';

import {
  extractInspectedDeployment,
  extractInspectedDeploymentUrl,
  extractLatestProductionDeploymentUrl,
  extractStagedDeploymentUrl,
} from '../src/build/vercel-deploy-output.js';

describe('Vercel deploy output parsing', () => {
  it('prefers the immutable deployment URL from structured deploy output', () => {
    const output = [
      '{',
      '  "status": "ok",',
      '  "deployment": {',
      '    "url": "https://fpf-c1dxzt13t-venikmans-projects.vercel.app"',
      '  }',
      '}',
      '▲ Production  https://fpf-c1dxzt13t-venikmans-projects.vercel.app',
      '▲ Aliased     https://fpf-sh-venikmans-projects.vercel.app',
    ].join('\n');

    expect(extractStagedDeploymentUrl(output, 'website staged deployment')).toBe(
      'https://fpf-c1dxzt13t-venikmans-projects.vercel.app',
    );
  });

  it('falls back to the production line before generic URL matching', () => {
    const output = [
      'Inspect https://vercel.com/venikmans-projects/fpf-sh/deploy',
      '▲ Production  https://fpf-c1dxzt13t-venikmans-projects.vercel.app',
      '▲ Aliased     https://fpf-sh-venikmans-projects.vercel.app',
    ].join('\n');

    expect(extractStagedDeploymentUrl(output, 'website staged deployment')).toBe(
      'https://fpf-c1dxzt13t-venikmans-projects.vercel.app',
    );
  });

  it('keeps last-match semantics for unstructured deploy output', () => {
    const output = [
      'https://old-or-log-url.vercel.app',
      'deployment complete at https://new-deployment.vercel.app',
    ].join('\n');

    expect(extractStagedDeploymentUrl(output, 'staged deployment')).toBe(
      'https://new-deployment.vercel.app',
    );
  });

  it('uses the first production deployment from Vercel ls output for rollback', () => {
    const output = [
      'Production deployments for venikmans-projects/fpf-sh',
      '3h  https://current-production.vercel.app  Ready',
      '4h  https://older-production.vercel.app    Ready',
      'https://current-production.vercel.app',
      'https://older-production.vercel.app',
    ].join('\n');

    expect(extractLatestProductionDeploymentUrl(output, 'previous website production')).toBe(
      'https://current-production.vercel.app',
    );
  });

  it('uses the inspected deployment URL instead of custom aliases', () => {
    const output = [
      'Fetching deployment "mcp.fpf.sh" in venikmans-projects',
      '  General',
      '    id\t\tdpl_123',
      '    name\tfpf-reference-mcp',
      '    target\tproduction',
      '    status\t● Ready',
      '    url\t\thttps://fpf-reference-lurp5nppz-venikmans-projects.vercel.app',
      '  Aliases',
      '    ╶ https://mcp.fpf.sh',
      '    ╶ https://fpf-reference-mcp-venikmans-projects.vercel.app',
    ].join('\n');

    expect(extractInspectedDeploymentUrl(output, 'inspected deployment')).toBe(
      'https://fpf-reference-lurp5nppz-venikmans-projects.vercel.app',
    );
    expect(extractInspectedDeployment(output, 'inspected deployment')).toEqual({
      name: 'fpf-reference-mcp',
      status: '● Ready',
      target: 'production',
      url: 'https://fpf-reference-lurp5nppz-venikmans-projects.vercel.app',
    });
  });

  it('rejects ambiguous inspected output without a deployment URL field', () => {
    const output = [
      'Aliases',
      '  ╶ https://fpf-reference-mcp-venikmans-projects.vercel.app',
      '  ╶ https://another-project-alias.vercel.app',
    ].join('\n');

    expect(() => extractInspectedDeploymentUrl(output, 'inspected deployment')).toThrow(
      'Could not parse unique inspected deployment URL',
    );
  });
});
