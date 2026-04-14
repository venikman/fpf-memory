import {
  normalizeLmStudioApiStyle,
  runLmStudioHealthCheck,
} from './lm-studio-synthesizer.js';

const args = process.argv.slice(2);

try {
  const timeoutMsRaw = value(args, '--timeout-ms');
  const timeoutMs = timeoutMsRaw ? Number(timeoutMsRaw) : undefined;
  const apiStyle = normalizeLmStudioApiStyle(value(args, '--api-style'));

  const result = await runLmStudioHealthCheck({
    baseUrl: value(args, '--base-url'),
    model: value(args, '--model'),
    apiStyle,
    apiKey: value(args, '--api-key') ?? process.env.FPF_LOCAL_LLM_API_KEY,
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : undefined,
    systemPrompt: value(args, '--system-prompt'),
    input: value(args, '--input'),
  });

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`lm-check failed: ${message}\n`);
  process.exitCode = 1;
}

function value(argsList: string[], flagName: string): string | undefined {
  const index = argsList.indexOf(flagName);
  if (index < 0) {
    return undefined;
  }
  return argsList[index + 1];
}
