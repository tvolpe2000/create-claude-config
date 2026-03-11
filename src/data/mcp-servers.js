export const mcpServers = {
  github: {
    name: 'GitHub',
    description: 'Access GitHub repos, issues, PRs, and more',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: '<your-github-token>',
      },
    },
    setupNote: 'Create a GitHub Personal Access Token at https://github.com/settings/tokens',
  },
  databases: {
    name: 'Databases',
    description: 'Query and inspect databases (PostgreSQL, MySQL, SQLite)',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres'],
      env: {
        POSTGRES_CONNECTION_STRING: '<your-connection-string>',
      },
    },
    setupNote: 'Update the connection string in .claude/settings.json',
  },
  filesystem: {
    name: 'File System',
    description: 'Extended file system operations beyond built-in tools',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '.'],
    },
    setupNote: 'The "." argument scopes access to the current directory',
  },
  fetch: {
    name: 'Fetch / API Testing',
    description: 'Make HTTP requests and test APIs',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-fetch'],
    },
    setupNote: 'Allows Claude to fetch URLs and test API endpoints',
  },
};

export const mcpChoices = [
  { value: 'github', name: 'GitHub' },
  { value: 'databases', name: 'Databases (PostgreSQL, MySQL, etc.)' },
  { value: 'filesystem', name: 'File System' },
  { value: 'fetch', name: 'Fetch / API Testing' },
  { value: 'none', name: 'None — skip for now' },
];
