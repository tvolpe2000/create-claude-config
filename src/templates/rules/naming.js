export function buildNamingRules(ctx) {
  const conventions = getNamingConventions(ctx);
  if (!conventions) return null;

  const lines = [
    '---',
    `paths: [${conventions.patterns.map((p) => `"${p}"`).join(', ')}]`,
    '---',
    '# Naming Conventions',
    '',
  ];

  for (const rule of conventions.rules) {
    lines.push(`- ${rule}`);
  }

  lines.push('');
  return lines.join('\n');
}

function getNamingConventions(ctx) {
  switch (ctx.language.id) {
    case 'javascript':
    case 'typescript':
      return {
        patterns: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        rules: [
          'Files: camelCase for utilities (formatDate.js), PascalCase for components (UserCard.tsx)',
          'Variables and functions: camelCase (getUserName, isActive)',
          'Classes and components: PascalCase (UserProfile, DataService)',
          'Constants: UPPER_SNAKE_CASE for true constants (MAX_RETRIES, API_BASE_URL)',
          'Interfaces/Types: PascalCase, no "I" prefix (UserProfile, not IUserProfile)',
          'Boolean variables: use is/has/can/should prefix (isLoading, hasAccess)',
        ],
      };

    case 'python':
      return {
        patterns: ['**/*.py'],
        rules: [
          'Files and modules: snake_case (user_service.py)',
          'Variables and functions: snake_case (get_user_name, is_active)',
          'Classes: PascalCase (UserProfile, DataService)',
          'Constants: UPPER_SNAKE_CASE (MAX_RETRIES, API_BASE_URL)',
          'Private members: single underscore prefix (_internal_method)',
          'Boolean variables: use is_/has_/can_ prefix (is_loading, has_access)',
        ],
      };

    case 'go':
      return {
        patterns: ['**/*.go'],
        rules: [
          'Files: snake_case (user_service.go)',
          'Exported names: PascalCase (GetUser, UserProfile)',
          'Unexported names: camelCase (getUserByID, parseConfig)',
          'Interfaces: -er suffix for single-method (Reader, Writer), descriptive for others',
          'Packages: short, lowercase, single-word (user, config, http)',
          'Acronyms: all caps (HTTP, ID, URL) — not Http, Id, Url',
        ],
      };

    case 'rust':
      return {
        patterns: ['**/*.rs'],
        rules: [
          'Files and modules: snake_case (user_service.rs)',
          'Variables and functions: snake_case (get_user_name)',
          'Types (structs, enums, traits): PascalCase (UserProfile)',
          'Constants: UPPER_SNAKE_CASE (MAX_RETRIES)',
          'Lifetimes: short, lowercase (\'a, \'b)',
        ],
      };

    case 'java':
    case 'kotlin':
      return {
        patterns: ctx.language.id === 'java' ? ['**/*.java'] : ['**/*.kt', '**/*.kts'],
        rules: [
          'Files/Classes: PascalCase matching class name (UserService.java)',
          'Variables and methods: camelCase (getUserName, isActive)',
          'Constants: UPPER_SNAKE_CASE (MAX_RETRIES)',
          'Packages: lowercase, dot-separated (com.example.users)',
          'Interfaces: PascalCase, no "I" prefix (UserRepository, not IUserRepository)',
        ],
      };

    case 'csharp':
      return {
        patterns: ['**/*.cs'],
        rules: [
          'Files/Classes: PascalCase (UserService.cs)',
          'Public members: PascalCase (GetUserName, IsActive)',
          'Private fields: _camelCase with underscore prefix (_userName)',
          'Local variables and parameters: camelCase (userName, isActive)',
          'Constants: PascalCase (MaxRetries)',
          'Interfaces: PascalCase with "I" prefix (IUserRepository)',
        ],
      };

    case 'ruby':
      return {
        patterns: ['**/*.rb'],
        rules: [
          'Files: snake_case (user_service.rb)',
          'Variables and methods: snake_case (get_user_name)',
          'Classes and modules: PascalCase (UserProfile)',
          'Constants: UPPER_SNAKE_CASE (MAX_RETRIES) or PascalCase for classes',
          'Predicate methods: end with ? (active?, valid?)',
          'Dangerous methods: end with ! (save!, delete!)',
        ],
      };

    case 'php':
      return {
        patterns: ['**/*.php'],
        rules: [
          'Files/Classes: PascalCase (UserService.php)',
          'Methods and variables: camelCase (getUserName, $isActive)',
          'Constants: UPPER_SNAKE_CASE (MAX_RETRIES)',
          'Namespaces: PascalCase (App\\Services\\UserService)',
        ],
      };

    default:
      return null;
  }
}
