import { collectAnswers, resolveContext } from './prompts.js';
import { generate } from './generator.js';

export async function run(outputDir) {
  console.log('\n  Welcome to create-claude-config!\n');
  console.log('  This wizard will set up an optimized Claude Code');
  console.log('  configuration tailored to your development environment.\n');

  const answers = await collectAnswers();
  const context = resolveContext(answers);

  console.log('\n  Generating your Claude Code configuration...\n');

  const result = await generate(context, outputDir);

  console.log('  Done! Your Claude Code configuration has been created:\n');
  for (const file of result.filesCreated) {
    console.log(`    ${file}`);
  }

  console.log('\n  Next steps:');
  console.log('  1. Review the generated .claude/CLAUDE.md file');
  console.log('  2. Read .claude/SETUP-GUIDE.md to learn how Claude Code');
  console.log('     will maintain and evolve your configuration');
  console.log('  3. Start Claude Code in your project directory\n');
}
