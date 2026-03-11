export function buildFixIssueSkill(ctx) {
  const hasGh = ctx.gitPlatform === 'github';

  let steps;
  if (hasGh) {
    steps = `1. Use \`gh issue view\` to get the full issue details
2. Analyze the issue description and any linked context
3. Search the codebase for relevant files and understand the current behavior
4. Implement the necessary changes to fix the issue
5. Write or update tests to verify the fix
6. Run the test suite to ensure nothing is broken${ctx.buildCommands.test ? `: \`${ctx.buildCommands.test}\`` : ''}${ctx.buildCommands.lint ? `\n7. Run the linter: \`${ctx.buildCommands.lint}\`` : ''}
8. Create a descriptive commit
9. Push the branch and create a PR linking the issue`;
  } else {
    steps = `1. Analyze the issue description provided in $ARGUMENTS
2. Search the codebase for relevant files and understand the current behavior
3. Implement the necessary changes
4. Write or update tests to verify the fix
5. Run the test suite${ctx.buildCommands.test ? `: \`${ctx.buildCommands.test}\`` : ''}${ctx.buildCommands.lint ? `\n6. Run the linter: \`${ctx.buildCommands.lint}\`` : ''}
7. Create a descriptive commit`;
  }

  return `---
name: fix-issue
description: Analyze and fix an issue end-to-end
---
Fix the following issue: $ARGUMENTS

${steps}
`;
}
