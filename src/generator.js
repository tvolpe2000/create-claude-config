import { join } from 'node:path';
import { stat, rename } from 'node:fs/promises';
import { writeFileSafe, ensureDir } from './utils/fs.js';

// CLAUDE.md section templates
import { headerSection } from './templates/claude-md/header.js';
import { codeStyleSection } from './templates/claude-md/code-style.js';
import { workflowSection } from './templates/claude-md/workflow.js';
import { interactionSection } from './templates/claude-md/interaction.js';
import { frameworksSection } from './templates/claude-md/frameworks.js';

// Other templates
import { buildSettings } from './templates/settings.js';
import { buildSetupGuide } from './templates/setup-guide.js';
import { buildCodeReviewerAgent } from './templates/agents/code-reviewer.js';
import { buildSecurityReviewerAgent } from './templates/agents/security-reviewer.js';
import { buildFixIssueSkill } from './templates/skills/fix-issue.js';
import { buildReviewPrSkill } from './templates/skills/review-pr.js';
import { buildTestingRules } from './templates/rules/testing.js';
import { buildNamingRules } from './templates/rules/naming.js';

/**
 * Check for existing Claude Code config files that would be overwritten
 */
export async function detectExistingConfig(outputDir) {
  const filesToCheck = [
    join(outputDir, '.claude', 'CLAUDE.md'),
    join(outputDir, '.claude', 'settings.json'),
    join(outputDir, '.claude', 'SETUP-GUIDE.md'),
    join(outputDir, 'CLAUDE.md'),
  ];

  const existing = [];
  for (const filePath of filesToCheck) {
    try {
      await stat(filePath);
      existing.push(filePath.replace(outputDir + '\\', '').replace(outputDir + '/', ''));
    } catch {
      // File doesn't exist — safe to create
    }
  }

  return existing;
}

/**
 * Back up existing .claude/ directory by renaming it with a timestamp
 */
export async function backupExistingConfig(outputDir) {
  const claudeDir = join(outputDir, '.claude');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = join(outputDir, `.claude-backup-${timestamp}`);

  try {
    await stat(claudeDir);
    await rename(claudeDir, backupDir);
    return backupDir;
  } catch {
    return null;
  }
}

export async function generate(ctx, outputDir) {
  const claudeDir = join(outputDir, '.claude');
  const filesCreated = [];

  // Ensure base directories exist
  await ensureDir(claudeDir);

  // 1. Generate .claude/CLAUDE.md
  const claudeMd = buildClaudeMd(ctx);
  await writeFileSafe(join(claudeDir, 'CLAUDE.md'), claudeMd);
  filesCreated.push('.claude/CLAUDE.md');

  // 2. Generate .claude/settings.json
  const settings = buildSettings(ctx);
  await writeFileSafe(join(claudeDir, 'settings.json'), settings);
  filesCreated.push('.claude/settings.json');

  // 3. Generate .claude/SETUP-GUIDE.md
  const setupGuide = buildSetupGuide(ctx);
  await writeFileSafe(join(claudeDir, 'SETUP-GUIDE.md'), setupGuide);
  filesCreated.push('.claude/SETUP-GUIDE.md');

  // 4. Generate agents (if experience >= intermediate)
  if (ctx.generateAgents) {
    await ensureDir(join(claudeDir, 'agents'));

    const codeReviewer = buildCodeReviewerAgent(ctx);
    await writeFileSafe(join(claudeDir, 'agents', 'code-reviewer.md'), codeReviewer);
    filesCreated.push('.claude/agents/code-reviewer.md');

    const securityReviewer = buildSecurityReviewerAgent(ctx);
    await writeFileSafe(join(claudeDir, 'agents', 'security-reviewer.md'), securityReviewer);
    filesCreated.push('.claude/agents/security-reviewer.md');
  }

  // 5. Generate skills (if experience >= intermediate)
  if (ctx.generateSkills) {
    const fixIssue = buildFixIssueSkill(ctx);
    await ensureDir(join(claudeDir, 'skills', 'fix-issue'));
    await writeFileSafe(join(claudeDir, 'skills', 'fix-issue', 'SKILL.md'), fixIssue);
    filesCreated.push('.claude/skills/fix-issue/SKILL.md');

    const reviewPr = buildReviewPrSkill(ctx);
    if (reviewPr) {
      await ensureDir(join(claudeDir, 'skills', 'review-pr'));
      await writeFileSafe(join(claudeDir, 'skills', 'review-pr', 'SKILL.md'), reviewPr);
      filesCreated.push('.claude/skills/review-pr/SKILL.md');
    }
  }

  // 6. Generate rules (if experience >= intermediate)
  if (ctx.generateRules) {
    await ensureDir(join(claudeDir, 'rules'));

    const testingRules = buildTestingRules(ctx);
    await writeFileSafe(join(claudeDir, 'rules', 'testing.md'), testingRules);
    filesCreated.push('.claude/rules/testing.md');

    const namingRules = buildNamingRules(ctx);
    if (namingRules) {
      await writeFileSafe(join(claudeDir, 'rules', 'naming.md'), namingRules);
      filesCreated.push('.claude/rules/naming.md');
    }
  }

  // 7. Generate root CLAUDE.md (short reference file)
  const rootClaudeMd = buildRootClaudeMd(ctx);
  await writeFileSafe(join(outputDir, 'CLAUDE.md'), rootClaudeMd);
  filesCreated.push('CLAUDE.md');

  return { filesCreated };
}

function buildClaudeMd(ctx) {
  const sections = [
    headerSection(ctx),
    codeStyleSection(ctx),
    frameworksSection(ctx),
    workflowSection(ctx),
    interactionSection(ctx),
  ].filter(Boolean);

  return sections.join('\n');
}

function buildRootClaudeMd(ctx) {
  const lines = [
    `# ${ctx.language.name} Project`,
    '',
    'See @.claude/CLAUDE.md for detailed project conventions and instructions.',
    '',
    '## Quick Reference',
  ];

  const cmds = ctx.buildCommands;
  if (cmds.build) lines.push(`- Build: \`${cmds.build}\``);
  if (cmds.test) lines.push(`- Test: \`${cmds.test}\``);
  if (cmds.lint) lines.push(`- Lint: \`${cmds.lint}\``);
  if (cmds.dev) lines.push(`- Dev: \`${cmds.dev}\``);
  if (cmds.typecheck) lines.push(`- Typecheck: \`${cmds.typecheck}\``);

  if (Object.keys(cmds).length === 0) {
    lines.push('- Add your build and test commands here');
  }

  lines.push('');
  return lines.join('\n');
}
