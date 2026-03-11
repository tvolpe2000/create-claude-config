export function headerSection(ctx) {
  const cmds = ctx.buildCommands;
  const lines = ['# Project Configuration\n'];

  if (Object.keys(cmds).length > 0) {
    lines.push('## Build & Development Commands');
    for (const [key, value] of Object.entries(cmds)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      lines.push(`- ${label}: \`${value}\``);
    }
    lines.push('');
  }

  if (ctx.packageManager) {
    lines.push(`Package manager: ${ctx.packageManager}`);
    lines.push('');
  }

  return lines.join('\n');
}
