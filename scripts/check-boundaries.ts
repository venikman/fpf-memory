import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

import ts from 'typescript';

export interface BoundaryViolation {
  file: string;
  importPath: string;
  targetFile: string;
  rule: string;
}

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.mts', '.cts']);

export function scanBoundaryViolations(rootDir = process.cwd()): BoundaryViolation[] {
  const srcDir = resolve(rootDir, 'src');
  if (!existsSync(srcDir)) {
    return [];
  }

  const files = walkSourceFiles(srcDir);
  const violations: BoundaryViolation[] = [];

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      ts.sys.readFile(file) ?? '',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    const importPaths = collectLocalImports(source);
    for (const importPath of importPaths) {
      const targetFile = resolveImportTarget(file, importPath);
      if (!targetFile) {
        continue;
      }

      const rule = evaluateBoundaryRule(rootDir, file, targetFile);
      if (rule) {
        violations.push({
          file,
          importPath,
          targetFile,
          rule,
        });
      }
    }
  }

  return violations;
}

export function runBoundaryCheck(rootDir = process.cwd()): void {
  const violations = scanBoundaryViolations(rootDir);
  if (violations.length === 0) {
    process.stdout.write('Boundary check passed.\n');
    return;
  }

  const lines = violations.map((violation) => {
    const file = relative(rootDir, violation.file);
    const target = relative(rootDir, violation.targetFile);
    return `- ${violation.rule}: ${file} -> ${violation.importPath} (${target})`;
  });

  throw new Error(`Boundary violations detected:\n${lines.join('\n')}`);
}

function collectLocalImports(sourceFile: ts.SourceFile): string[] {
  const imports: string[] = [];

  function visit(node: ts.Node): void {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
      && node.moduleSpecifier
      && ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const importPath = node.moduleSpecifier.text;
      if (importPath.startsWith('.')) {
        imports.push(importPath);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return imports;
}

function resolveImportTarget(fromFile: string, importPath: string): string | undefined {
  const fromDir = dirname(fromFile);
  const resolvedBase = resolve(fromDir, importPath);
  const candidates = [
    resolvedBase,
    `${resolvedBase}.ts`,
    `${resolvedBase}.tsx`,
    resolvedBase.replace(/\.js$/u, '.ts'),
    resolvedBase.replace(/\.js$/u, '.tsx'),
    join(resolvedBase, 'index.ts'),
    join(resolvedBase, 'index.tsx'),
  ];

  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function evaluateBoundaryRule(
  rootDir: string,
  sourceFile: string,
  targetFile: string,
): string | undefined {
  const source = normalizePath(relative(rootDir, sourceFile));
  const target = normalizePath(relative(rootDir, targetFile));

  if (source.startsWith('src/core/') && !target.startsWith('src/core/')) {
    return 'Ctx.Core may import only Ctx.Core';
  }

  if (
    source.startsWith('src/app/')
    && (target.startsWith('src/entrypoints/')
      || target.startsWith('src/adapters/')
      || target.startsWith('src/build/')
      || target.startsWith('src/composition/'))
  ) {
    return 'Ctx.App may depend only on Ctx.Core and Ctx.App';
  }

  if (source.startsWith('src/adapters/mcp/') && target.startsWith('src/adapters/hosted/')) {
    return 'Ctx.Run.MCP may not depend on Ctx.Run.Hosted';
  }

  if (source.startsWith('src/adapters/hosted/') && target.startsWith('src/adapters/mcp/')) {
    return 'Ctx.Run.Hosted may not depend on Ctx.Run.MCP';
  }

  if (
    (source.startsWith('src/adapters/docs/') || source.startsWith('src/build/'))
    && (target.startsWith('src/adapters/mcp/')
      || target.startsWith('src/adapters/hosted/')
      || target.startsWith('src/entrypoints/'))
  ) {
    return 'Ctx.Docs/Ctx.Build may not depend on runtime adapters or entrypoints';
  }

  if (source.startsWith('src/entrypoints/') && !target.startsWith('src/composition/')) {
    return 'Ctx.EntryPoint may import only Ctx.Composition';
  }

  return undefined;
}

function walkSourceFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walkSourceFiles(fullPath));
      continue;
    }

    if (SOURCE_EXTENSIONS.has(extname(fullPath)) && !fullPath.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, '/');
}

if (import.meta.main) {
  runBoundaryCheck();
}
