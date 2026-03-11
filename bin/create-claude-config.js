#!/usr/bin/env node

import { run } from '../src/index.js';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  create-claude-config

  Interactive CLI wizard to scaffold an optimized Claude Code
  configuration for your project.

  Usage:
    npx create-claude-config [options]

  Options:
    -h, --help      Show this help message
    -v, --version   Show version number
    -o, --output    Output directory (default: current directory)

  Examples:
    npx create-claude-config
    npx create-claude-config --output ./my-project
    npm init claude-config
  `);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const { readFile } = await import('node:fs/promises');
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf-8'));
  console.log(pkg.version);
  process.exit(0);
}

let outputDir = process.cwd();
const outputIndex = args.indexOf('--output') !== -1 ? args.indexOf('--output') : args.indexOf('-o');
if (outputIndex !== -1 && args[outputIndex + 1]) {
  outputDir = args[outputIndex + 1];
}

run(outputDir).catch((err) => {
  if (err.name === 'ExitPromptError') {
    console.log('\nSetup cancelled. No files were created.');
    process.exit(0);
  }
  console.error('\nError:', err.message);
  process.exit(1);
});
