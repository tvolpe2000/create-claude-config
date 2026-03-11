export function buildReviewPrSkill(ctx) {
  if (ctx.gitPlatform !== 'github') return null;

  return `---
name: review-pr
description: Review a pull request for quality and correctness
---
Review the pull request: $ARGUMENTS

1. Use \`gh pr view $ARGUMENTS\` to get PR details
2. Use \`gh pr diff $ARGUMENTS\` to see all changes
3. Review each changed file for:
   - Correctness and potential bugs
   - Code style consistency with project conventions
   - Security concerns
   - Test coverage for new functionality
   - Clear naming and documentation for non-obvious logic
4. Provide a structured review with:
   - Summary of what the PR does
   - Issues found (if any), with specific file and line references
   - Suggestions for improvement
   - Overall assessment (approve, request changes, or needs discussion)
`;
}
