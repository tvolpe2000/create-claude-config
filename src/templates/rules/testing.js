export function buildTestingRules(ctx) {
  const testPatterns = getTestPatterns(ctx);

  const lines = [
    '---',
    `paths: [${testPatterns.map((p) => `"${p}"`).join(', ')}]`,
    '---',
    '# Testing Rules',
    '',
  ];

  // General testing rules
  lines.push('- Use descriptive test names that explain the expected behavior');
  lines.push('- Each test should verify one specific behavior');
  lines.push('- Prefer integration tests over mocking everything');
  lines.push('- Test edge cases: empty inputs, null values, error conditions');

  // Language-specific
  if (ctx.testRunner) {
    lines.push(`- Test runner: ${ctx.testRunner}`);
  }

  if (['javascript', 'typescript'].includes(ctx.language.id)) {
    lines.push('- Co-locate test files next to source: `Component.test.tsx`');
    lines.push('- Use `describe` blocks to group related tests');
    lines.push('- Prefer `toEqual` for objects, `toBe` for primitives');
  } else if (ctx.language.id === 'python') {
    lines.push('- Place tests in a `tests/` directory mirroring the source structure');
    lines.push('- Use pytest fixtures for shared test setup');
    lines.push('- Use parametrize for testing multiple inputs');
  } else if (ctx.language.id === 'go') {
    lines.push('- Place tests in the same package as the code being tested');
    lines.push('- Use table-driven tests for multiple test cases');
    lines.push('- Use `testify/assert` or standard library assertions');
  } else if (ctx.language.id === 'rust') {
    lines.push('- Use `#[cfg(test)]` module in the same file for unit tests');
    lines.push('- Place integration tests in `tests/` directory');
  }

  lines.push('');
  return lines.join('\n');
}

function getTestPatterns(ctx) {
  const patterns = [];

  if (['javascript', 'typescript'].includes(ctx.language.id)) {
    patterns.push('**/*.test.*', '**/*.spec.*', '**/__tests__/**');
  } else if (ctx.language.id === 'python') {
    patterns.push('**/test_*.py', '**/*_test.py', 'tests/**');
  } else if (ctx.language.id === 'java' || ctx.language.id === 'kotlin') {
    patterns.push('**/src/test/**');
  } else if (ctx.language.id === 'csharp') {
    patterns.push('**/*.Tests/**', '**/*Test.cs');
  } else if (ctx.language.id === 'go') {
    patterns.push('**/*_test.go');
  } else if (ctx.language.id === 'rust') {
    patterns.push('tests/**', '**/*_test.rs');
  } else if (ctx.language.id === 'ruby') {
    patterns.push('spec/**', '**/*_spec.rb');
  } else if (ctx.language.id === 'php') {
    patterns.push('tests/**', '**/*Test.php');
  } else {
    patterns.push('**/test/**', '**/*.test.*');
  }

  return patterns;
}
