import { mcpServers } from '../data/mcp-servers.js';

export function buildSettings(ctx) {
  const settings = {
    permissions: {
      allow: buildAllowList(ctx),
    },
  };

  // Add MCP servers if any selected
  if (ctx.mcpServers && ctx.mcpServers.length > 0) {
    settings.mcpServers = {};
    for (const serverId of ctx.mcpServers) {
      const server = mcpServers[serverId];
      if (server) {
        settings.mcpServers[serverId] = server.config;
      }
    }
  }

  return JSON.stringify(settings, null, 2) + '\n';
}

function buildAllowList(ctx) {
  const allow = [];

  // Common git commands
  allow.push('Bash(git status:*)');
  allow.push('Bash(git diff:*)');
  allow.push('Bash(git log:*)');
  allow.push('Bash(git add:*)');
  allow.push('Bash(git commit:*)');
  allow.push('Bash(git branch:*)');
  allow.push('Bash(git checkout:*)');
  allow.push('Bash(git switch:*)');

  // Build commands from language
  for (const cmd of Object.values(ctx.buildCommands)) {
    allow.push(`Bash(${cmd}:*)`);
  }

  // Platform-specific CLI tools
  if (ctx.gitPlatform === 'github') {
    allow.push('Bash(gh:*)');
  } else if (ctx.gitPlatform === 'gitlab') {
    allow.push('Bash(glab:*)');
  }

  // Package manager commands
  if (ctx.packageManager === 'npm') {
    allow.push('Bash(npm list:*)');
    allow.push('Bash(npx:*)');
  } else if (ctx.packageManager === 'pip') {
    allow.push('Bash(pip list:*)');
    allow.push('Bash(python:*)');
  } else if (ctx.packageManager === 'Cargo') {
    allow.push('Bash(cargo:*)');
  } else if (ctx.packageManager === 'go modules') {
    allow.push('Bash(go:*)');
  }

  return allow;
}
