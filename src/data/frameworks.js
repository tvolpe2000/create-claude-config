export const frameworks = {
  // JavaScript / TypeScript frameworks
  react: {
    languages: ['javascript', 'typescript'],
    name: 'React',
    conventions: [
      'Use functional components with hooks (no class components)',
      'Prefer named exports for components',
      'Co-locate component files: Component.jsx, Component.test.jsx, Component.module.css',
      'Keep components small and focused — extract when a component exceeds ~100 lines',
      'Use React.memo() only when profiling shows a performance issue',
    ],
    devCommand: 'npm run dev',
  },

  nextjs: {
    languages: ['javascript', 'typescript'],
    name: 'Next.js',
    conventions: [
      'Use App Router (app/ directory) — not Pages Router unless migrating',
      'Server Components by default, add "use client" only when needed',
      'Use Next.js Image component instead of plain <img>',
      'API routes go in app/api/ directory',
      'Use loading.tsx and error.tsx for route-level loading/error states',
      'Prefer Server Actions for form handling over API routes',
    ],
    devCommand: 'npm run dev',
  },

  express: {
    languages: ['javascript', 'typescript'],
    name: 'Express',
    conventions: [
      'Use Router for modular route organization',
      'Apply middleware in order: parsing, auth, routes, error handling',
      'Use async/await with express-async-errors or try-catch wrappers',
      'Validate request input at the controller layer',
      'Keep route handlers thin — delegate to service layer',
    ],
    devCommand: 'npm run dev',
  },

  vue: {
    languages: ['javascript', 'typescript'],
    name: 'Vue',
    conventions: [
      'Use Composition API with <script setup> (not Options API for new code)',
      'Use single-file components (.vue)',
      'Prefer ref() and reactive() for state management',
      'Use composables (use*.js) for shared stateful logic',
      'Follow Vue style guide priority rules (essential and recommended)',
    ],
    devCommand: 'npm run dev',
  },

  angular: {
    languages: ['typescript'],
    name: 'Angular',
    conventions: [
      'Follow Angular style guide for file naming and structure',
      'Use standalone components (Angular 14+)',
      'Use signals for reactive state (Angular 16+)',
      'Use Angular CLI for generating components, services, etc.',
      'Keep components focused — extract services for business logic',
    ],
    devCommand: 'ng serve',
  },

  svelte: {
    languages: ['javascript', 'typescript'],
    name: 'Svelte',
    conventions: [
      'Use SvelteKit for full applications, plain Svelte for widgets',
      'Use runes for reactivity ($state, $derived, $effect) in Svelte 5+',
      'Keep components small and focused',
      'Use +page.svelte, +layout.svelte conventions in SvelteKit',
      'Use form actions for server-side form handling in SvelteKit',
    ],
    devCommand: 'npm run dev',
  },

  nestjs: {
    languages: ['typescript'],
    name: 'NestJS',
    conventions: [
      'Follow NestJS module structure: controllers, services, modules',
      'Use dependency injection via constructor parameters',
      'Use DTOs with class-validator for request validation',
      'Use Guards for authorization, Interceptors for cross-cutting concerns',
      'Use the Nest CLI for generating resources: `nest g resource`',
    ],
    devCommand: 'npm run start:dev',
  },

  // Python frameworks
  django: {
    languages: ['python'],
    name: 'Django',
    conventions: [
      'Follow Django project structure: apps, models, views, urls',
      'Use class-based views for CRUD, function views for simple endpoints',
      'Use Django ORM for database queries — avoid raw SQL',
      'Use Django forms or serializers for input validation',
      'Run migrations after model changes: `python manage.py makemigrations && python manage.py migrate`',
    ],
    devCommand: 'python manage.py runserver',
  },

  fastapi: {
    languages: ['python'],
    name: 'FastAPI',
    conventions: [
      'Use Pydantic models for request/response validation',
      'Use dependency injection for shared services',
      'Use async def for I/O-bound endpoints',
      'Organize routes with APIRouter',
      'Use lifespan events for startup/shutdown logic',
    ],
    devCommand: 'uvicorn main:app --reload',
  },

  flask: {
    languages: ['python'],
    name: 'Flask',
    conventions: [
      'Use Blueprints for modular route organization',
      'Use Flask-SQLAlchemy for ORM if using a database',
      'Use application factory pattern (create_app)',
      'Use flask.g and flask.current_app instead of global state',
    ],
    devCommand: 'flask run --debug',
  },

  // Java frameworks
  spring: {
    languages: ['java', 'kotlin'],
    name: 'Spring Boot',
    conventions: [
      'Follow layered architecture: Controller -> Service -> Repository',
      'Use constructor injection over field injection',
      'Use @RestController for REST endpoints',
      'Use application.properties or application.yml for configuration',
      'Use Spring Data JPA repositories for database access',
    ],
    devCommand: './mvnw spring-boot:run',
  },

  // C# frameworks
  aspnet: {
    languages: ['csharp'],
    name: 'ASP.NET Core',
    conventions: [
      'Use minimal APIs for simple endpoints, controllers for complex ones',
      'Use dependency injection via constructor parameters',
      'Use middleware pipeline for cross-cutting concerns',
      'Use Entity Framework Core for database access',
      'Use IOptions<T> pattern for configuration',
    ],
    devCommand: 'dotnet watch run',
  },

  blazor: {
    languages: ['csharp'],
    name: 'Blazor',
    conventions: [
      'Use Blazor Server for low-latency, Blazor WASM for offline support',
      'Use component parameters for parent-child communication',
      'Use cascading parameters for deep prop drilling',
      'Use EventCallback for child-to-parent communication',
    ],
    devCommand: 'dotnet watch run',
  },

  // Go frameworks
  gin: {
    languages: ['go'],
    name: 'Gin',
    conventions: [
      'Use router groups for API versioning',
      'Use middleware for auth, logging, CORS',
      'Use c.ShouldBindJSON for request binding',
      'Return structured error responses with appropriate status codes',
    ],
    devCommand: 'go run .',
  },

  // Rust frameworks
  axum: {
    languages: ['rust'],
    name: 'Axum',
    conventions: [
      'Use extractors for parsing request data',
      'Use Tower middleware and layers for cross-cutting concerns',
      'Use State extractor for shared application state',
      'Return impl IntoResponse for flexible response types',
    ],
    devCommand: 'cargo watch -x run',
  },

  actix: {
    languages: ['rust'],
    name: 'Actix Web',
    conventions: [
      'Use extractors (web::Json, web::Path, web::Query) for request data',
      'Use App::app_data for shared state',
      'Use middleware for logging, auth, CORS',
      'Configure workers based on available CPUs',
    ],
    devCommand: 'cargo watch -x run',
  },

  // Ruby frameworks
  rails: {
    languages: ['ruby'],
    name: 'Ruby on Rails',
    conventions: [
      'Follow Rails conventions: MVC, RESTful routes, Active Record',
      'Use generators for scaffolding: `rails generate`',
      'Use migrations for schema changes — never edit schema.rb directly',
      'Use strong parameters for mass assignment protection',
      'Use concerns for shared model/controller behavior',
    ],
    devCommand: 'rails server',
  },

  // PHP frameworks
  laravel: {
    languages: ['php'],
    name: 'Laravel',
    conventions: [
      'Follow Laravel project structure: routes, controllers, models, views',
      'Use Eloquent ORM for database access',
      'Use Form Requests for validation',
      'Use Artisan CLI for generating code: `php artisan make:`',
      'Use Laravel migrations for schema changes',
    ],
    devCommand: 'php artisan serve',
  },

  // Swift frameworks
  swiftui: {
    languages: ['swift'],
    name: 'SwiftUI',
    conventions: [
      'Use @State for local view state, @Binding for parent-child',
      'Use @Observable (Observation framework) for shared state',
      'Keep views small — extract subviews for reuse',
      'Use environment values for dependency injection',
    ],
    devCommand: null,
  },

  // Kotlin frameworks
  jetpackcompose: {
    languages: ['kotlin'],
    name: 'Jetpack Compose',
    conventions: [
      'Use remember and mutableStateOf for local UI state',
      'Use ViewModel for business logic and screen-level state',
      'Keep composables small and focused',
      'Use Modifier parameter as the first optional parameter',
    ],
    devCommand: null,
  },
};

/**
 * Returns framework choices filtered by language
 */
export function getFrameworkChoices(languageId) {
  return Object.entries(frameworks)
    .filter(([, fw]) => fw.languages.includes(languageId))
    .map(([key, fw]) => ({ value: key, name: fw.name }));
}
