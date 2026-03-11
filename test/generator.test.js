import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { generate } from '../src/generator.js';
import { resolveContext } from '../src/prompts.js';

// Helper to check if a file exists
async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

describe('generator', () => {
  let tmpDir;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'claude-config-test-'));
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('generates full structure for JS beginner (no agents/skills/rules)', async () => {
    const ctx = resolveContext({
      os: 'windows',
      language: 'javascript',
      customLanguage: null,
      experience: 'beginner',
      ide: 'vscode',
      customIde: null,
      projectType: 'webapp',
      frameworks: ['react'],
      teamSize: 'solo',
      gitPlatform: 'github',
      interactionStyle: 'detailed',
      mcpServers: ['github'],
    });

    const result = await generate(ctx, tmpDir);

    // Core files should exist
    assert.ok(result.filesCreated.includes('.claude/CLAUDE.md'));
    assert.ok(result.filesCreated.includes('.claude/settings.json'));
    assert.ok(result.filesCreated.includes('.claude/SETUP-GUIDE.md'));
    assert.ok(result.filesCreated.includes('CLAUDE.md'));

    // Beginner should NOT have agents, skills, or rules
    assert.ok(!result.filesCreated.some((f) => f.includes('agents/')));
    assert.ok(!result.filesCreated.some((f) => f.includes('skills/')));
    assert.ok(!result.filesCreated.some((f) => f.includes('rules/')));

    // Verify CLAUDE.md content
    const claudeMd = await readFile(join(tmpDir, '.claude', 'CLAUDE.md'), 'utf-8');
    assert.ok(claudeMd.includes('npm test'));
    assert.ok(claudeMd.includes('JavaScript'));
    assert.ok(claudeMd.includes('React'));

    // Verify CLAUDE.md is under 200 lines
    const lineCount = claudeMd.split('\n').length;
    assert.ok(lineCount < 200, `CLAUDE.md has ${lineCount} lines, should be under 200`);

    // Verify settings.json is valid JSON
    const settingsContent = await readFile(join(tmpDir, '.claude', 'settings.json'), 'utf-8');
    const settings = JSON.parse(settingsContent);
    assert.ok(settings.permissions.allow.length > 0);
    assert.ok(settings.mcpServers.github);

    // Verify root CLAUDE.md
    const rootClaudeMd = await readFile(join(tmpDir, 'CLAUDE.md'), 'utf-8');
    assert.ok(rootClaudeMd.includes('JavaScript'));
    assert.ok(rootClaudeMd.includes('.claude/CLAUDE.md'));
  });

  it('generates full structure for TS advanced (with agents/skills/rules)', async () => {
    const ctx = resolveContext({
      os: 'mac',
      language: 'typescript',
      customLanguage: null,
      experience: 'advanced',
      ide: 'terminal',
      customIde: null,
      projectType: 'fullstack',
      frameworks: ['nextjs'],
      teamSize: 'small',
      gitPlatform: 'github',
      interactionStyle: 'concise',
      mcpServers: [],
    });

    const result = await generate(ctx, tmpDir);

    // Should have agents
    assert.ok(result.filesCreated.includes('.claude/agents/code-reviewer.md'));
    assert.ok(result.filesCreated.includes('.claude/agents/security-reviewer.md'));

    // Should have skills
    assert.ok(result.filesCreated.includes('.claude/skills/fix-issue/SKILL.md'));
    assert.ok(result.filesCreated.includes('.claude/skills/review-pr/SKILL.md'));

    // Should have rules
    assert.ok(result.filesCreated.includes('.claude/rules/testing.md'));
    assert.ok(result.filesCreated.includes('.claude/rules/naming.md'));

    // Verify agent content
    const codeReviewer = await readFile(
      join(tmpDir, '.claude', 'agents', 'code-reviewer.md'),
      'utf-8'
    );
    assert.ok(codeReviewer.includes('TypeScript'));
    assert.ok(codeReviewer.includes('tools: Read, Glob, Grep'));

    // Verify CLAUDE.md includes Next.js
    const claudeMd = await readFile(join(tmpDir, '.claude', 'CLAUDE.md'), 'utf-8');
    assert.ok(claudeMd.includes('Next.js'));
    assert.ok(claudeMd.includes('tsc --noEmit'));

    // Verify concise interaction style
    assert.ok(claudeMd.includes('concise'));
  });

  it('generates for Python with FastAPI (no review-pr skill for non-GitHub)', async () => {
    const ctx = resolveContext({
      os: 'linux',
      language: 'python',
      customLanguage: null,
      experience: 'intermediate',
      ide: 'vscode',
      customIde: null,
      projectType: 'api',
      frameworks: ['fastapi'],
      teamSize: 'medium',
      gitPlatform: 'gitlab',
      interactionStyle: 'pair',
      mcpServers: [],
    });

    const result = await generate(ctx, tmpDir);

    // Should have fix-issue but NOT review-pr (GitLab, not GitHub)
    assert.ok(result.filesCreated.includes('.claude/skills/fix-issue/SKILL.md'));
    assert.ok(!result.filesCreated.includes('.claude/skills/review-pr/SKILL.md'));

    // Verify Python content
    const claudeMd = await readFile(join(tmpDir, '.claude', 'CLAUDE.md'), 'utf-8');
    assert.ok(claudeMd.includes('Python'));
    assert.ok(claudeMd.includes('pytest'));
    assert.ok(claudeMd.includes('FastAPI'));

    // Verify settings doesn't have gh CLI
    const settingsContent = await readFile(join(tmpDir, '.claude', 'settings.json'), 'utf-8');
    const settings = JSON.parse(settingsContent);
    assert.ok(!settings.permissions.allow.includes('Bash(gh:*)'));
    assert.ok(settings.permissions.allow.some((a) => a.includes('glab')));
  });

  it('handles custom language gracefully', async () => {
    const ctx = resolveContext({
      os: 'linux',
      language: 'other',
      customLanguage: 'Elixir',
      experience: 'advanced',
      ide: 'terminal',
      customIde: null,
      projectType: 'api',
      frameworks: [],
      teamSize: 'solo',
      gitPlatform: 'github',
      interactionStyle: 'pair',
      mcpServers: [],
    });

    const result = await generate(ctx, tmpDir);

    // Should still generate core files
    assert.ok(result.filesCreated.includes('.claude/CLAUDE.md'));
    assert.ok(result.filesCreated.includes('.claude/settings.json'));

    // Root CLAUDE.md should reference the custom language
    const rootClaudeMd = await readFile(join(tmpDir, 'CLAUDE.md'), 'utf-8');
    assert.ok(rootClaudeMd.includes('Elixir'));

    // CLAUDE.md should not have empty code style section
    const claudeMd = await readFile(join(tmpDir, '.claude', 'CLAUDE.md'), 'utf-8');
    assert.ok(!claudeMd.includes('## Code Style'));
  });
});
