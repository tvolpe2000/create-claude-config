import { select } from '@inquirer/prompts';
import { collectAnswers, resolveContext } from './prompts.js';
import { generate, detectExistingConfig, backupExistingConfig } from './generator.js';

export async function run(outputDir) {
  console.log('\n  Welcome to create-claude-config!\n');
  console.log('  This wizard will set up an optimized Claude Code');
  console.log('  configuration tailored to your development environment.\n');

  // Check for existing config before asking all the questions
  const existingFiles = await detectExistingConfig(outputDir);

  if (existingFiles.length > 0) {
    console.log('  Existing Claude Code configuration detected:');
    for (const file of existingFiles) {
      console.log(`    - ${file}`);
    }
    console.log('');

    const action = await select({
      message: 'What would you like to do?',
      choices: [
        {
          value: 'backup',
          name: 'Back up existing config, then generate fresh',
        },
        {
          value: 'overwrite',
          name: 'Overwrite existing files (no backup)',
        },
        {
          value: 'cancel',
          name: 'Cancel — keep my existing configuration',
        },
      ],
    });

    if (action === 'cancel') {
      console.log('\n  No changes made. Your existing configuration is untouched.\n');
      return;
    }

    if (action === 'backup') {
      const backupPath = await backupExistingConfig(outputDir);
      if (backupPath) {
        console.log(`\n  Backed up to: ${backupPath}\n`);
      }
    }
  }

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
