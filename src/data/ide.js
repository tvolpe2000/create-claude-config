export const ides = {
  vscode: {
    name: 'VS Code',
    tips: [
      'Claude Code integrates directly with VS Code — install the Claude Code extension',
      'Use the built-in terminal for Claude Code CLI access',
      'Claude Code can open and navigate to files in your editor',
    ],
  },
  jetbrains: {
    name: 'JetBrains (IntelliJ, WebStorm, PyCharm, etc.)',
    tips: [
      'Claude Code integrates with JetBrains IDEs — install the Claude Code plugin',
      'Use the built-in terminal for Claude Code CLI access',
    ],
  },
  terminal: {
    name: 'Terminal / CLI',
    tips: [
      'Run `claude` in your project directory to start Claude Code',
      'Use `claude --help` to see all available CLI options',
      'Use `claude -p "prompt"` for single-shot commands',
    ],
  },
  cursor: {
    name: 'Cursor',
    tips: [
      'Claude Code can run alongside Cursor — use the integrated terminal',
      'Claude Code provides different capabilities than Cursor\'s built-in AI',
    ],
  },
};

export const ideChoices = [
  { value: 'vscode', name: 'VS Code' },
  { value: 'jetbrains', name: 'JetBrains (IntelliJ, WebStorm, PyCharm, etc.)' },
  { value: 'terminal', name: 'Terminal / CLI' },
  { value: 'cursor', name: 'Cursor' },
];
