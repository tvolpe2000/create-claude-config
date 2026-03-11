export function codeStyleSection(ctx) {
  const rules = ctx.language.style.rules;
  if (!rules || rules.length === 0) return '';

  const lines = [`## Code Style (${ctx.language.name})`];
  for (const rule of rules) {
    lines.push(`- ${rule}`);
  }
  lines.push('');

  return lines.join('\n');
}
