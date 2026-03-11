export function workflowSection(ctx) {
  const lines = ['## Workflow'];

  // Git workflow based on team size
  if (ctx.teamSize === 'solo') {
    lines.push('- Commit directly to main for small changes');
    lines.push('- Use feature branches for larger work');
  } else {
    lines.push('- Create feature branches from main: `feature/description`');
    lines.push('- Use descriptive branch names that reference the work being done');
    if (ctx.teamSize === 'medium' || ctx.teamSize === 'large') {
      lines.push('- All changes require a pull request and code review');
      lines.push('- Keep PRs focused and small — one feature or fix per PR');
    } else {
      lines.push('- Create pull requests for review before merging');
    }
  }

  // Git platform specific
  if (ctx.gitPlatform === 'github') {
    lines.push('- Use `gh` CLI for GitHub operations (PRs, issues, etc.)');
  } else if (ctx.gitPlatform === 'gitlab') {
    lines.push('- Use `glab` CLI for GitLab operations (MRs, issues, etc.)');
  }

  // Testing workflow
  if (ctx.buildCommands.test) {
    lines.push(`- Run tests before committing: \`${ctx.buildCommands.test}\``);
  }
  if (ctx.buildCommands.lint) {
    lines.push(`- Run linter before committing: \`${ctx.buildCommands.lint}\``);
  }
  if (ctx.buildCommands.typecheck) {
    lines.push(`- Run typecheck after changes: \`${ctx.buildCommands.typecheck}\``);
  }

  // Extra tips from language data
  for (const extra of ctx.claudeMdExtras) {
    lines.push(`- ${extra}`);
  }

  lines.push('');
  return lines.join('\n');
}
