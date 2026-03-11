export const languages = {
  javascript: {
    name: 'JavaScript',
    ext: ['.js', '.jsx', '.mjs', '.cjs'],
    packageManager: 'npm',
    style: {
      rules: [
        'Use ES modules (import/export) over CommonJS (require) where possible',
        'Prefer `const` over `let`, never use `var`',
        'Use template literals for string interpolation',
        'Destructure objects and arrays when accessing multiple properties',
        'Use arrow functions for callbacks and short functions',
        'Use async/await over raw Promises or callbacks',
      ],
    },
    buildCommands: {
      build: 'npm run build',
      test: 'npm test',
      lint: 'npm run lint',
      dev: 'npm run dev',
    },
    testRunner: 'Jest or Vitest',
    claudeMdExtras: [
      'Prefer running single test files: `npx jest path/to/file.test.js`',
    ],
  },

  typescript: {
    name: 'TypeScript',
    ext: ['.ts', '.tsx'],
    packageManager: 'npm',
    style: {
      rules: [
        'Use ES modules (import/export), not CommonJS (require)',
        'Prefer `const` over `let`, never use `var`',
        'Use strict TypeScript — avoid `any` type',
        'Prefer interfaces over type aliases for object shapes',
        'Use template literals for string interpolation',
        'Destructure objects and arrays when accessing multiple properties',
        'Use async/await over raw Promises',
      ],
    },
    buildCommands: {
      build: 'npm run build',
      test: 'npm test',
      lint: 'npm run lint',
      typecheck: 'npx tsc --noEmit',
      dev: 'npm run dev',
    },
    testRunner: 'Jest or Vitest',
    claudeMdExtras: [
      'Run `npx tsc --noEmit` to typecheck after making changes',
      'Prefer running single test files over the full suite',
    ],
  },

  python: {
    name: 'Python',
    ext: ['.py'],
    packageManager: 'pip',
    style: {
      rules: [
        'Follow PEP 8 style guidelines',
        'Use type hints for function signatures',
        'Prefer f-strings over .format() or % formatting',
        'Use pathlib.Path instead of os.path for file operations',
        'Use list/dict/set comprehensions where readable',
        'Prefer `with` statements for resource management',
      ],
    },
    buildCommands: {
      test: 'pytest',
      lint: 'ruff check .',
      format: 'ruff format .',
      typecheck: 'mypy .',
    },
    testRunner: 'pytest',
    claudeMdExtras: [
      'Run single test files: `pytest path/to/test_file.py -v`',
      'Use virtual environments — check for venv/ or .venv/ before installing packages',
    ],
  },

  java: {
    name: 'Java',
    ext: ['.java'],
    packageManager: 'Maven or Gradle',
    style: {
      rules: [
        'Follow Google Java Style Guide conventions',
        'Use meaningful variable and method names',
        'Prefer records for simple data carriers (Java 16+)',
        'Use Optional instead of returning null',
        'Prefer streams for collection transformations',
      ],
    },
    buildCommands: {
      build: './mvnw compile',
      test: './mvnw test',
      lint: './mvnw checkstyle:check',
    },
    testRunner: 'JUnit 5',
    claudeMdExtras: [
      'Run single test class: `./mvnw test -Dtest=ClassName`',
    ],
  },

  csharp: {
    name: 'C#',
    ext: ['.cs'],
    packageManager: 'NuGet',
    style: {
      rules: [
        'Follow Microsoft C# coding conventions',
        'Use PascalCase for public members, camelCase for private',
        'Use `var` when the type is obvious from the right side',
        'Prefer string interpolation ($"") over concatenation',
        'Use async/await for asynchronous operations',
        'Use pattern matching where it improves readability',
      ],
    },
    buildCommands: {
      build: 'dotnet build',
      test: 'dotnet test',
      run: 'dotnet run',
    },
    testRunner: 'xUnit or NUnit',
    claudeMdExtras: [
      'Run single test: `dotnet test --filter FullyQualifiedName~TestName`',
    ],
  },

  go: {
    name: 'Go',
    ext: ['.go'],
    packageManager: 'go modules',
    style: {
      rules: [
        'Follow Effective Go guidelines',
        'Run `gofmt` or `goimports` on all code',
        'Keep functions short and focused',
        'Return errors instead of panicking',
        'Use table-driven tests',
        'Prefer composition over inheritance via embedding',
      ],
    },
    buildCommands: {
      build: 'go build ./...',
      test: 'go test ./...',
      lint: 'golangci-lint run',
      vet: 'go vet ./...',
    },
    testRunner: 'go test',
    claudeMdExtras: [
      'Run single test: `go test -run TestName ./path/to/package`',
    ],
  },

  rust: {
    name: 'Rust',
    ext: ['.rs'],
    packageManager: 'Cargo',
    style: {
      rules: [
        'Follow Rust API Guidelines and clippy lints',
        'Run `cargo clippy` to catch common mistakes',
        'Prefer `Result` and `Option` over panicking',
        'Use `?` operator for error propagation',
        'Derive common traits (Debug, Clone, PartialEq) on structs',
        'Prefer iterators and combinators over manual loops',
      ],
    },
    buildCommands: {
      build: 'cargo build',
      test: 'cargo test',
      lint: 'cargo clippy',
      format: 'cargo fmt',
    },
    testRunner: 'cargo test',
    claudeMdExtras: [
      'Run single test: `cargo test test_name`',
      'Run `cargo fmt --check` to verify formatting',
    ],
  },

  ruby: {
    name: 'Ruby',
    ext: ['.rb'],
    packageManager: 'Bundler',
    style: {
      rules: [
        'Follow the Ruby Style Guide',
        'Use 2-space indentation',
        'Prefer `do...end` for multi-line blocks, `{...}` for single-line',
        'Use symbols instead of strings for hash keys',
        'Prefer string interpolation over concatenation',
      ],
    },
    buildCommands: {
      test: 'bundle exec rspec',
      lint: 'bundle exec rubocop',
    },
    testRunner: 'RSpec',
    claudeMdExtras: [
      'Run single test: `bundle exec rspec path/to/spec.rb`',
    ],
  },

  php: {
    name: 'PHP',
    ext: ['.php'],
    packageManager: 'Composer',
    style: {
      rules: [
        'Follow PSR-12 coding standard',
        'Use type declarations for parameters and return types',
        'Use `strict_types=1` declaration',
        'Prefer named arguments for clarity in function calls',
        'Use match expressions over switch where appropriate (PHP 8+)',
      ],
    },
    buildCommands: {
      test: 'vendor/bin/phpunit',
      lint: 'vendor/bin/phpcs',
      format: 'vendor/bin/phpcbf',
    },
    testRunner: 'PHPUnit',
    claudeMdExtras: [
      'Run single test: `vendor/bin/phpunit --filter TestName`',
    ],
  },

  swift: {
    name: 'Swift',
    ext: ['.swift'],
    packageManager: 'Swift Package Manager',
    style: {
      rules: [
        'Follow Swift API Design Guidelines',
        'Use `guard` for early returns',
        'Prefer `let` over `var` when the value does not change',
        'Use trailing closure syntax for the last closure argument',
        'Use optional chaining and nil-coalescing over force-unwrapping',
      ],
    },
    buildCommands: {
      build: 'swift build',
      test: 'swift test',
    },
    testRunner: 'XCTest',
    claudeMdExtras: [],
  },

  kotlin: {
    name: 'Kotlin',
    ext: ['.kt', '.kts'],
    packageManager: 'Gradle',
    style: {
      rules: [
        'Follow Kotlin Coding Conventions',
        'Use `val` over `var` when the value does not change',
        'Use data classes for simple data holders',
        'Prefer extension functions for utility operations',
        'Use scope functions (let, apply, run, also, with) appropriately',
        'Use coroutines for asynchronous operations',
      ],
    },
    buildCommands: {
      build: './gradlew build',
      test: './gradlew test',
      lint: './gradlew ktlintCheck',
    },
    testRunner: 'JUnit 5 or Kotest',
    claudeMdExtras: [
      'Run single test: `./gradlew test --tests "com.example.TestName"`',
    ],
  },
};

// For display order in the prompt
export const languageChoices = [
  { value: 'javascript', name: 'JavaScript' },
  { value: 'typescript', name: 'TypeScript' },
  { value: 'python', name: 'Python' },
  { value: 'java', name: 'Java' },
  { value: 'csharp', name: 'C#' },
  { value: 'go', name: 'Go' },
  { value: 'rust', name: 'Rust' },
  { value: 'ruby', name: 'Ruby' },
  { value: 'php', name: 'PHP' },
  { value: 'swift', name: 'Swift' },
  { value: 'kotlin', name: 'Kotlin' },
];
