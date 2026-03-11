import { select, input, checkbox } from '@inquirer/prompts';
import { languageChoices, languages } from './data/languages.js';
import { getFrameworkChoices } from './data/frameworks.js';
import { ideChoices } from './data/ide.js';
import { mcpChoices } from './data/mcp-servers.js';

export async function collectAnswers() {
  // Q1: Operating System
  const os = await select({
    message: 'What operating system are you using?',
    choices: [
      { value: 'windows', name: 'Windows' },
      { value: 'mac', name: 'macOS' },
      { value: 'linux', name: 'Linux' },
    ],
  });

  // Q2: Primary Language
  const languageOptions = [
    ...languageChoices,
    { value: 'other', name: 'Not listed — I\'ll type it in' },
  ];

  let language = await select({
    message: 'What is your primary coding language?',
    choices: languageOptions,
  });

  let customLanguage = null;
  if (language === 'other') {
    customLanguage = await input({
      message: 'Enter your primary coding language:',
      validate: (val) => val.trim().length > 0 || 'Please enter a language name',
    });
  }

  // Q3: Experience Level
  const experience = await select({
    message: 'What is your experience level with Claude Code?',
    choices: [
      { value: 'beginner', name: 'Beginner — just getting started' },
      { value: 'intermediate', name: 'Intermediate — used it a few times' },
      { value: 'advanced', name: 'Advanced — use it regularly' },
    ],
  });

  // Q4: IDE
  const ideOptions = [
    ...ideChoices,
    { value: 'other', name: 'Other' },
  ];

  let ide = await select({
    message: 'What is your primary IDE or editor?',
    choices: ideOptions,
  });

  let customIde = null;
  if (ide === 'other') {
    customIde = await input({
      message: 'Enter your IDE or editor name:',
    });
  }

  // Q5: Project Type
  const projectType = await select({
    message: 'What type of project are you working on?',
    choices: [
      { value: 'webapp', name: 'Web Application' },
      { value: 'mobile', name: 'Mobile Application' },
      { value: 'api', name: 'API / Backend Service' },
      { value: 'cli', name: 'CLI Tool' },
      { value: 'library', name: 'Library / Package' },
      { value: 'fullstack', name: 'Full-stack Application' },
      { value: 'other', name: 'Other' },
    ],
  });

  // Q6: Frameworks (conditional on language)
  let selectedFrameworks = [];
  if (language !== 'other') {
    const frameworkOptions = getFrameworkChoices(language);
    if (frameworkOptions.length > 0) {
      selectedFrameworks = await checkbox({
        message: 'Which frameworks or libraries are you using? (space to select, enter to continue)',
        choices: [
          ...frameworkOptions,
          { value: 'none', name: 'None / Other' },
        ],
      });
      // Remove 'none' if other selections were made
      if (selectedFrameworks.length > 1) {
        selectedFrameworks = selectedFrameworks.filter((f) => f !== 'none');
      }
    }
  }

  // Q7: Team Size
  const teamSize = await select({
    message: 'What is your team size?',
    choices: [
      { value: 'solo', name: 'Solo developer' },
      { value: 'small', name: 'Small team (2-5)' },
      { value: 'medium', name: 'Medium team (6-15)' },
      { value: 'large', name: 'Large team (15+)' },
    ],
  });

  // Q8: Git Platform
  const gitPlatform = await select({
    message: 'What git platform do you use?',
    choices: [
      { value: 'github', name: 'GitHub' },
      { value: 'gitlab', name: 'GitLab' },
      { value: 'bitbucket', name: 'Bitbucket' },
      { value: 'other', name: 'Other' },
    ],
  });

  // Q9: AI Interaction Style
  const interactionStyle = await select({
    message: 'How do you prefer Claude Code to interact with you?',
    choices: [
      { value: 'detailed', name: 'Detailed — explain reasoning and decisions' },
      { value: 'concise', name: 'Concise — just the code and key info' },
      { value: 'pair', name: 'Pair programming — think out loud as you work' },
    ],
  });

  // Q10: MCP Servers
  let mcpSelections = await checkbox({
    message: 'Which MCP (Model Context Protocol) servers would you like to configure? (space to select)',
    choices: mcpChoices,
  });
  // If 'none' selected, clear selections
  if (mcpSelections.includes('none')) {
    mcpSelections = [];
  }

  return {
    os,
    language,
    customLanguage,
    experience,
    ide,
    customIde,
    projectType,
    frameworks: selectedFrameworks.filter((f) => f !== 'none'),
    teamSize,
    gitPlatform,
    interactionStyle,
    mcpServers: mcpSelections,
  };
}

/**
 * Transform raw answers into a structured context object used by templates
 */
export function resolveContext(answers) {
  const langData = languages[answers.language] || null;

  const ctx = {
    os: answers.os,
    language: {
      id: answers.language,
      name: langData?.name || answers.customLanguage || answers.language,
      ext: langData?.ext || [],
      style: langData?.style || { rules: [] },
      custom: answers.language === 'other',
    },
    experience: answers.experience,
    ide: {
      id: answers.ide,
      name: answers.customIde || answers.ide,
      custom: answers.ide === 'other',
    },
    projectType: answers.projectType,
    frameworks: answers.frameworks,
    teamSize: answers.teamSize,
    gitPlatform: answers.gitPlatform,
    interactionStyle: answers.interactionStyle,
    mcpServers: answers.mcpServers,

    // Derived fields
    buildCommands: langData?.buildCommands || {},
    testRunner: langData?.testRunner || null,
    packageManager: langData?.packageManager || null,
    claudeMdExtras: langData?.claudeMdExtras || [],

    // Feature flags based on experience
    generateAgents: answers.experience !== 'beginner',
    generateSkills: answers.experience !== 'beginner',
    generateRules: answers.experience !== 'beginner',
  };

  return ctx;
}
