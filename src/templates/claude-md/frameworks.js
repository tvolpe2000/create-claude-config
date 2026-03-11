import { frameworks } from '../../data/frameworks.js';

export function frameworksSection(ctx) {
  if (!ctx.frameworks || ctx.frameworks.length === 0) return '';

  const lines = ['## Framework Conventions'];

  for (const fwKey of ctx.frameworks) {
    const fw = frameworks[fwKey];
    if (!fw) continue;

    lines.push(`\n### ${fw.name}`);
    for (const convention of fw.conventions) {
      lines.push(`- ${convention}`);
    }
  }

  lines.push('');
  return lines.join('\n');
}
