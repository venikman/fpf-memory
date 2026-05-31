export interface InspectedDeployment {
  name?: string;
  status?: string;
  target?: string;
  url: string;
}

export function extractStagedDeploymentUrl(output: string, label: string): string {
  const jsonUrl = extractJsonDeploymentUrl(output);
  if (jsonUrl) {
    return jsonUrl;
  }

  const productionUrl = extractProductionLineDeploymentUrl(output);
  if (productionUrl) {
    return productionUrl;
  }

  return extractLastDeploymentUrl(output, label);
}

export function extractLatestProductionDeploymentUrl(output: string, label: string): string {
  const matches = deploymentUrlMatches(output);
  const url = matches[0];
  if (!url) {
    throw new Error(`Could not parse ${label} URL from Vercel output.`);
  }
  return url;
}

export function extractInspectedDeploymentUrl(output: string, label: string): string {
  return extractInspectedDeployment(output, label).url;
}

export function extractInspectedDeployment(
  output: string,
  label: string,
): InspectedDeployment {
  const details: Partial<InspectedDeployment> = {};
  for (const line of stripAnsi(output).split(/\r?\n/u)) {
    const fields = line.trim().split(/\s+/u);
    const key = fields[0]?.toLowerCase();
    if (key === 'name' || key === 'status' || key === 'target') {
      details[key] = fields.slice(1).join(' ');
      continue;
    }
    if (key === 'url') {
      const url = fields.find(isVercelDeploymentUrl);
      if (url) {
        details.url = url;
      }
    }
  }

  if (!details.url) {
    const matches = deploymentUrlMatches(output);
    details.url = matches.length === 1 ? matches[0] : undefined;
  }

  if (!details.url) {
    throw new Error(`Could not parse unique ${label} URL from Vercel inspect output.`);
  }
  return details as InspectedDeployment;
}

function extractLastDeploymentUrl(output: string, label: string): string {
  const matches = deploymentUrlMatches(output);
  const url = matches.at(-1);
  if (!url) {
    throw new Error(`Could not parse ${label} URL from Vercel output.`);
  }
  return url;
}

function extractJsonDeploymentUrl(output: string): string | undefined {
  for (const jsonObject of topLevelJsonObjects(stripAnsi(output))) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonObject);
    } catch {
      continue;
    }

    const deployment = isRecord(parsed) ? parsed.deployment : undefined;
    const url = isRecord(deployment) ? deployment.url : undefined;
    if (typeof url === 'string' && isVercelDeploymentUrl(url)) {
      return url;
    }
  }
  return undefined;
}

function extractProductionLineDeploymentUrl(output: string): string | undefined {
  for (const line of stripAnsi(output).split(/\r?\n/u)) {
    if (!line.toLowerCase().includes('production')) continue;
    const matches = deploymentUrlMatches(line);
    const url = matches.at(-1);
    if (url) {
      return url;
    }
  }
  return undefined;
}

function deploymentUrlMatches(output: string): string[] {
  return [...stripAnsi(output).matchAll(/https:\/\/[^\s]+?\.vercel\.app\b/giu)]
    .map((match) => match[0]);
}

function topLevelJsonObjects(output: string): string[] {
  const objects: string[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < output.length; index += 1) {
    const char = output[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '{') {
      if (depth === 0) {
        start = index;
      }
      depth += 1;
      continue;
    }
    if (char === '}' && depth > 0) {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        objects.push(output.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return objects;
}

function stripAnsi(value: string): string {
  return value.replace(/\u001b\[[0-9;]*m/gu, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isVercelDeploymentUrl(value: string): boolean {
  return /^https:\/\/[^\s]+?\.vercel\.app$/iu.test(value);
}
