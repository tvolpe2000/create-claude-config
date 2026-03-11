import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveContext } from '../src/prompts.js';

describe('resolveContext', () => {
  it('resolves JavaScript answers into a complete context', () => {
    const answers = {
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
    };

    const ctx = resolveContext(answers);

    assert.equal(ctx.os, 'windows');
    assert.equal(ctx.language.id, 'javascript');
    assert.equal(ctx.language.name, 'JavaScript');
    assert.equal(ctx.language.custom, false);
    assert.ok(ctx.language.style.rules.length > 0);
    assert.equal(ctx.experience, 'beginner');
    assert.equal(ctx.ide.id, 'vscode');
    assert.equal(ctx.packageManager, 'npm');
    assert.equal(ctx.buildCommands.test, 'npm test');
    assert.equal(ctx.generateAgents, false); // beginner
    assert.equal(ctx.generateSkills, false); // beginner
    assert.equal(ctx.generateRules, false); // beginner
  });

  it('resolves TypeScript advanced answers with full generation', () => {
    const answers = {
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
      mcpServers: ['github', 'databases'],
    };

    const ctx = resolveContext(answers);

    assert.equal(ctx.language.name, 'TypeScript');
    assert.equal(ctx.experience, 'advanced');
    assert.equal(ctx.generateAgents, true);
    assert.equal(ctx.generateSkills, true);
    assert.equal(ctx.generateRules, true);
    assert.ok(ctx.buildCommands.typecheck);
    assert.deepEqual(ctx.mcpServers, ['github', 'databases']);
  });

  it('handles custom language input', () => {
    const answers = {
      os: 'linux',
      language: 'other',
      customLanguage: 'Elixir',
      experience: 'intermediate',
      ide: 'other',
      customIde: 'Neovim',
      projectType: 'api',
      frameworks: [],
      teamSize: 'solo',
      gitPlatform: 'github',
      interactionStyle: 'pair',
      mcpServers: [],
    };

    const ctx = resolveContext(answers);

    assert.equal(ctx.language.id, 'other');
    assert.equal(ctx.language.name, 'Elixir');
    assert.equal(ctx.language.custom, true);
    assert.deepEqual(ctx.language.style.rules, []);
    assert.equal(ctx.ide.id, 'other');
    assert.equal(ctx.ide.name, 'Neovim');
    assert.equal(ctx.packageManager, null);
    assert.deepEqual(ctx.buildCommands, {});
  });

  it('resolves Python intermediate with conditional features', () => {
    const answers = {
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
    };

    const ctx = resolveContext(answers);

    assert.equal(ctx.language.name, 'Python');
    assert.equal(ctx.packageManager, 'pip');
    assert.equal(ctx.testRunner, 'pytest');
    assert.equal(ctx.generateAgents, true);
    assert.equal(ctx.generateSkills, true);
    assert.equal(ctx.gitPlatform, 'gitlab');
  });
});
