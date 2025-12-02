# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with TypeScript, built with the App Router architecture. The project uses a `src/` directory structure and implements internationalization (i18n) with locale-based routing, NextAuth.js for authentication, and uses shadcn/ui components for the UI layer. All development and commands are run within Docker containers.

## Key Technologies

- **Next.js 16.0.6** with App Router and TypeScript
- **React 19.2.0** and **React DOM 19.2.0**
- **Node.js 24.11.1 LTS** with **Yarn (stable)** for package management
- **TailwindCSS v4.1.17** with PostCSS for styling
- **shadcn/ui** components (New York style, neutral base color)
- **next-themes v0.4.6** for dark/light mode theming
- **Radix UI** primitives for accessible components
- **NextAuth.js v5.0.0-beta.30** for authentication
- **React Hook Form v7.67.0** with **Zod v4.1.13** for form validation
- **React Intl v7.1.14** for internationalization
- **Zustand v5.0.9** for state management
- **Husky v9.1.7** + **lint-staged v16.2.7** for pre-commit hooks
- **commitlint v20** for conventional commit enforcement
- **Docker** for containerized development and production
- **Lucide React v0.555.0** for icons
- **ky v1.14.0** for HTTP client requests
- **npm-run-all v4.1.5** for running multiple scripts

## Development Workflow

**IMPORTANT: All commands must be run inside Docker containers.**

### Docker Environment Commands

```bash
# Container lifecycle (via Make)
make up          # Start development containers (docker compose up -d)
make down        # Stop and remove development containers
make start       # Start stopped containers
make stop        # Stop running containers
make restart     # Restart containers (quick, no rebuild)
make rebuild     # Rebuild images and restart containers

# View all available commands
make help        # Show all available Make commands
```

**When to use which command:**
- **`make restart`** - Quick restart when you changed environment variables or need to refresh containers (5-10 seconds)
- **`make rebuild`** - Full rebuild when you changed Dockerfile, package.json dependencies, or migrated to new runtime (2-5 minutes)
  - Use after: Updating Dockerfile, changing base image version, major dependency changes
  - Rebuilds Docker images from scratch and reinstalls all dependencies

### Application Commands (run in Docker container)

```bash
# Development (all commands auto-start containers if needed)
make dev         # Start containers + Next.js dev server
make shell       # Start containers + connect to bash shell
make install     # Start containers + install/update dependencies

# Code Quality (auto-starts containers)
make lint        # Start containers + run Biome check
make build       # Start containers + build production bundle

# Direct container execution (requires containers to be running)
docker compose -f docker-compose.development.yaml exec -it app yarn dev
docker compose -f docker-compose.development.yaml exec -it app yarn lint
docker compose -f docker-compose.development.yaml exec -it app yarn build
```

### Package Scripts (run via yarn in container)

```bash
yarn dev          # Start dev server (next dev)
yarn dev:turbo    # Start dev server with Turbopack
yarn build        # Production build
yarn start        # Start production server
yarn lint         # Run Biome check (lint + format check)
yarn lint:fix     # Run Biome check and auto-fix issues
yarn format       # Format code with Biome
yarn prepare      # Setup Husky hooks
yarn scan         # Run security scans (gitleaks)
yarn scan:gitleaks # Run gitleaks to detect secrets
yarn precommit    # Run format, lint, and scan
```

## Project Structure

### App Router Architecture
- Uses Next.js 16 App Router with TypeScript in `src/` directory structure
- Internationalization implemented with dynamic `[locale]` segments
- Route structure:
  - `src/app/[locale]/(unauthenticated)/[page]/page.tsx` - Public pages (home, login)
  - `src/app/[locale]/(authenticated)/[page]/page.tsx` - Protected pages (require auth)
- Middleware (`src/proxy.ts`) handles:
  - Locale detection and redirection
  - Authentication via NextAuth.js
  - Cookie-based locale persistence

### Key Directories
- `src/`: Source code directory (all application code)
  - `src/app/`: Next.js App Router pages and layouts
    - `src/app/[locale]/`: Locale-based routing
    - `src/app/[locale]/(unauthenticated)/`: Public routes (home, login, register)
    - `src/app/[locale]/(authenticated)/`: Protected routes (dashboard)
    - `src/app/api/`: API routes (NextAuth handlers, REST API endpoints)
      - `src/app/api/auth/[...nextauth]/`: NextAuth.js route handler
      - `src/app/api/v1/`: Versioned API endpoints (e.g., auth/register)
    - `src/app/globals.css`: Global styles with TailwindCSS v4
  - `src/apis/`: API client layer for backend communication
    - `src/apis/base-http-client.ts`: Base HTTP client using ky with retry logic, auth injection
    - `src/apis/base-api.ts`: Abstract base class for domain-specific API services
    - `src/apis/auth-api.ts`: Authentication API endpoints (login, register, logout, refresh)
    - `src/apis/user-api.ts`: User API endpoints (profile, update)
    - `src/apis/errors/`: API client exception classes
  - `src/components/`: Reusable React components
    - `src/components/ui/`: shadcn/ui components (button, card, input, form, label, dropdown-menu)
    - `src/components/auth/`: Authentication components (login-form, register-form)
    - `src/components/home/`: Home page components (home-view)
    - `src/components/dashboard/`: Dashboard components (dashboard-view)
    - `src/components/i18n/`: Internationalization components (locale-switcher)
    - `src/components/layout/`: Layout components (navigation, header, footer, sidebar)
    - `src/components/providers/`: React context providers (theme, intl, session)
    - `src/components/theme/`: Theme toggle components (mode-togger)
  - `src/services/`: Service layer for business logic
    - `src/services/next-auth.ts`: NextAuth configuration
    - `src/services/auth.service.ts`: Authentication service (login, register, validation)
  - `src/configs/`: Configuration files
    - `src/configs/api.config.ts`: API client configuration (baseUrl, timeout, retry settings)
  - `src/exceptions/`: Custom exception classes
    - `src/exceptions/auth.exception.ts`: Authentication exceptions (MissingCredentials, InvalidEmail, etc.)
  - `src/utils/`: Application utilities
    - `src/utils/routes.ts`: Route protection utilities (isPrivateRoute, isPublicRoute)
    - `src/utils/api-routes.ts`: API route helpers (createApiRoute, _200, _201, _400, _401)
    - `src/utils/api-error-handler.ts`: Centralized API error handler
    - `src/utils/logger.ts`: Logging utility
  - `src/constants/`: Application constants
    - `src/constants/routes.ts`: Route definitions (PRIVATE_ROUTES, PUBLIC_ROUTES)
    - `src/constants/error-codes.ts`: Error code constants (AUTH_ERROR_CODES, AUTH_SERVICE_ERROR_CODES)
  - `src/types/`: TypeScript type definitions
    - `src/types/auth.d.ts`: Authentication types (ILoginRequest, ILoginData, IRegisterRequest, etc.)
    - `src/types/user.d.ts`: User types (IUser)
    - `src/types/api.d.ts`: API response types (ISuccessResponse, IErrorResponse, IListResponse)
    - `src/types/page.d.ts`: Page component types
  - `src/enums/`: TypeScript enumerations
    - `src/enums/locale.enum.ts`: LocaleSupport enum (EN, VI)
  - `src/lang/`: Translation files (`en.json`, `vi.json`)
  - `src/lib/`: Utility functions and configurations
    - `src/lib/stores/`: Zustand state management stores
    - `src/lib/intl/`: Internationalization utilities
    - `src/lib/utils.ts`: Utility functions (cn, etc.)
  - `src/proxy.ts`: Next.js middleware for locale and auth handling
- `public/`: Static assets
- `.docker/`: Docker configuration files
  - `.docker/development/node/`: Development Dockerfile (Node 24.11.1, Yarn 4.12.0)
  - `.docker/production/node/`: Production Dockerfile
- `make/`: Modular Makefile components
  - `make/variables.mk`: Environment variables
  - `make/docker.mk`: Docker commands
  - `make/app.mk`: Application commands

### Internationalization (i18n)
- **Supported locales**: English (`en`), Vietnamese (`vi`)
- **Default locale**: English (`en`)
- **Implementation**:
  - `react-intl` for message formatting
  - Messages stored in `src/lang/en.json` and `src/lang/vi.json`
  - `src/lib/intl/index.ts` provides helper functions (`getMessages`, `getMessage`)
  - Middleware (`src/proxy.ts`) handles automatic locale detection:
    1. Check `NEXT_LOCALE` cookie
    2. Check `Accept-Language` header
    3. Fallback to default locale (`en`)
- **Locale persistence**: Stored in `NEXT_LOCALE` cookie (1 year expiry)
- **URL structure**: `/{locale}/{page}` (e.g., `/en/home`, `/vi/home`)
- **Redirection**: Root path (`/`) redirects to `/{locale}/home`

## Authentication

### NextAuth.js Setup
- **Version**: 5.0.0-beta.30
- **Configuration**: `src/services/next-auth.ts`
- **Authentication Service**: `src/services/auth.service.ts`
- **Provider**: Credentials provider (email/password)
- **Session strategy**: JWT-based
- **Custom pages**: Login page at `/{locale}/login`
- **Protected routes**: Managed via middleware (`src/proxy.ts`) using route utilities
- **Demo credentials** (for testing):
  - Email: `demo@example.com`
  - Password: `demo123`

**TODO**: Replace hardcoded credentials with actual database authentication logic.

### Route Protection Configuration
- **Route constants**: `src/constants/routes.ts` - Define PRIVATE_ROUTES and PUBLIC_ROUTES arrays
- **Route utilities**: `src/utils/routes.ts` - Helper functions (isPrivateRoute, isPublicRoute)
- **Middleware enforcement**: `src/proxy.ts` - Checks authentication and redirects
- **Scalable approach**: Simply add new routes to the arrays in `src/constants/routes.ts` - no middleware changes needed

Example of adding a new protected route:
```typescript
// In src/constants/routes.ts
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/admin",  // New protected route - just add here!
] as const;
```

### Authentication Flow
1. User accesses protected route (e.g., `/en/dashboard`)
2. Middleware (`src/proxy.ts`) extracts route path and checks if it's in `PRIVATE_ROUTES` using `isPrivateRoute()` utility
3. If not authenticated, redirect to `/en/login?callback-url=/en/dashboard`
4. Login page uses NextAuth credentials provider via `src/services/auth.service.ts`
5. On successful auth, JWT session is created
6. User redirected to `callback-url` (original page) or dashboard if no `callback-url`

**Note**: The callback URL parameter uses kebab-case (`callback-url`) for consistency with URL conventions.

### Login Redirect Behavior
- **After successful login**: User redirected to `/dashboard` (default)
- **After login from protected route**: User redirected back to original route via `callback-url` parameter
- **Logged-in user accessing login page**: Automatically redirected to `/dashboard`
- **All redirects are locale-aware**: Maintains user's current locale (e.g., `/en/dashboard`, `/vi/dashboard`)

## Code Quality and Git Hooks

**IMPORTANT: All linting and formatting commands run automatically in Docker on pre-commit.**

### Pre-commit Hooks
- **Husky v9.1.7**: Manages git hooks (`.husky/pre-commit`)
- **lint-staged v16.2.7**: Automatically runs `yarn lint:fix` on staged files before commit
- **commitlint v20**: Enforces conventional commit message format
- **Hook behavior**:
  - Runs inside Docker container
  - Executes `yarn lint:fix` on commit (auto-fixes issues)
  - Blocks commit if linting/formatting fails
  - Must pass before changes are committed

### Linting and Formatting
- **Biome v2.3.8**: Fast all-in-one linter and formatter
- **Features**: Linting, formatting, import sorting, and more
- **Configuration**: `biome.json`
- **Run manually**: `make lint` (inside Docker container)
- **Auto-fix**: `yarn lint:fix` - fixes linting and formatting issues
- **Format only**: `yarn format` - formats code without linting

### Security Scanning
- **gitleaks**: Secret detection tool to prevent credential leaks
- **Binary location**: `bin/gitleaks`
- **Run manually**: `yarn scan` or `yarn scan:gitleaks`
- **Pre-commit hook**: Runs automatically with `yarn precommit` (format, lint, scan)

## UI Components

### shadcn/ui Configuration
- **Style**: New York variant
- **Base color**: Neutral
- **CSS variables**: Enabled for theming
- **TypeScript**: Full support with RSC (React Server Components)
- **Components location**: `@/components/ui/`
- **Icon library**: Lucide React v0.555.0
- **Configuration file**: `components.json`
- **Installed components**:
  - `button` - Button component with variants
  - `card` - Card container component
  - `input` - Form input component
  - `form` - Form wrapper with React Hook Form integration
  - `label` - Form label component
  - `dropdown-menu` - Dropdown menu component

### Adding New shadcn/ui Components
```bash
# Run inside Docker container
make shell
npx shadcn@latest add [component-name]

# Or directly
docker compose -f docker-compose.development.yaml exec -it app npx shadcn@latest add [component-name]
```

### Path Aliases (defined in components.json)
- `@/components` → components directory
- `@/lib` → lib directory
- `@/utils` → lib/utils
- `@/ui` → components/ui
- `@/hooks` → hooks directory

### Theming
- **Library**: next-themes v0.4.6
- **Modes**: system, light, dark
- **Theme provider**: Located in `components/providers/`
- **Theme toggle**: Available in `components/theme/`
- **Storage**: Uses localStorage and `theme` cookie
- **Implementation**: ThemeProvider wraps the entire application in root layout

## State Management

### Zustand Stores
- **Version**: 5.0.9
- **Location**: `src/lib/stores/`
- **Global state management** with Zustand
- **Features**: DevTools and persistence middleware support

#### App Store (`src/lib/stores/app-store.ts`)
Manages application-level settings:
- **language**: User's preferred language (`en` | `vi`)
- **timezone**: User's timezone setting
- **theme**: UI theme (`light` | `dark` | `system`)
- **Actions**: `setLanguage`, `setTimezone`, `setTheme`

Usage example:
```typescript
import { useAppStore } from '@/lib/stores';

// In a component
const language = useAppStore((state) => state.language);
const setLanguage = useAppStore((state) => state.setLanguage);

// Update language
setLanguage('vi');
```

#### Creating New Stores
Follow the pattern in `src/lib/stores/app-store.ts`:
1. Define state interface
2. Use `create` from `zustand`
3. Export store hook
4. Re-export from `src/lib/stores/index.ts`

## Form Handling

### React Hook Form + Zod
- **React Hook Form**: v7.67.0 for form state management
- **Zod**: v4.1.13 for schema validation
- **@hookform/resolvers**: v5.2.2 for Zod integration
- **Integration**: shadcn/ui Form component wraps React Hook Form
- **Usage**: Forms combine shadcn/ui components with Zod validation schemas

Example pattern:
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## API Layer Architecture

### Overview
The project implements a clean three-layer architecture:

1. **API Client Layer** (`src/apis/`): HTTP client for communicating with backend
2. **Service Layer** (`src/services/`): Business logic and data processing
3. **API Routes Layer** (`src/app/api/`): Next.js API route handlers

### API Client Layer (`src/apis/`)

#### BaseHttpClient (`src/apis/base-http-client.ts`)
Core HTTP client built on **ky v1.14.0** with advanced features:
- **Automatic auth token injection**: Injects NextAuth session tokens in Authorization header
- **Retry logic with exponential backoff**: Configurable retry attempts for failed requests
- **Timeout support**: Configurable request timeouts
- **Request cancellation**: AbortController support
- **Error mapping**: Maps HTTP errors to custom exceptions
- **Response unwrapping**: Automatically unwraps `ISuccessResponse<T>` to return just the data

Configuration via `src/configs/api.config.ts`:
```typescript
export const apiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 30_000,  // 30 seconds
  maxRetries: 3,
  retryDelay: 1000,  // 1 second
  retryBackoffMultiplier: 2,
  headers: { "Content-Type": "application/json" }
};
```

Environment variables:
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API requests
- `NEXT_PUBLIC_API_TIMEOUT`: Request timeout (default: 30000ms)
- `NEXT_PUBLIC_API_MAX_RETRIES`: Max retry attempts (default: 3)
- `NEXT_PUBLIC_API_RETRY_DELAY`: Initial retry delay (default: 1000ms)
- `NEXT_PUBLIC_API_RETRY_BACKOFF`: Backoff multiplier (default: 2)

#### BaseApi (`src/apis/base-api.ts`)
Abstract base class for domain-specific API services:
- Extends BaseHttpClient
- Provides URL building utilities
- Manages domain-specific base paths

#### Domain-Specific APIs
- **AuthApi** (`src/apis/auth-api.ts`): Authentication endpoints (login, register, logout, refreshToken)
- **UserApi** (`src/apis/user-api.ts`): User management endpoints (getProfile, updateProfile)

Usage example:
```typescript
import { authApi } from '@/apis';

// Login request
const loginData = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register request
const registerData = await authApi.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});
```

#### API Client Exceptions (`src/apis/errors/`)
- **HttpStatusError**: HTTP error with status code and error data
- **NetworkError**: Network connectivity errors
- **TimeoutError**: Request timeout errors

### Service Layer (`src/services/`)

#### AuthService (`src/services/auth.service.ts`)
Handles authentication business logic:
- **Validation**: Email format, password requirements, name validation
- **Authentication**: Credential validation, user lookup
- **Registration**: User creation, email uniqueness check
- **Exception-based error handling**: Throws specific exceptions for different error cases

Methods:
- `login(email, password)`: Authenticate user and return user data
- `register(name, email, password)`: Create new user account
- `validateCredentials(email, password)`: Check if credentials are valid
- `emailExists(email)`: Check if email is already registered
- `validateEmailFormat(email)`: Validate email format
- `validatePasswordFormat(password)`: Validate password requirements

**Note**: Currently uses in-memory user storage. Replace with database in production.

### Custom Exceptions (`src/exceptions/`)

#### Authentication Exceptions (`src/exceptions/auth.exception.ts`)
Service layer throws typed exceptions for better error handling:
- `MissingCredentialsException`: Required credentials missing (400)
- `InvalidEmailException`: Invalid email format (400)
- `InvalidPasswordException`: Invalid password format (400)
- `InvalidCredentialsException`: Wrong email/password (401)
- `EmailExistsException`: Email already registered (409)
- `InvalidNameException`: Invalid name format (400)
- `InternalAuthException`: Internal server error (500)

### API Routes Layer (`src/app/api/`)

#### API Route Utilities (`src/utils/api-routes.ts`)

**createApiRoute(handler)**: Wrapper for API route handlers
- Automatic error handling and logging
- Converts service exceptions to API responses
- Generates error trace IDs
- Logs request/response details

**Response helpers**:
- `_200(data)`: Success response with gzip compression
- `_201(data, message)`: Created response (201)
- `_400(error)`: Bad request (400)
- `_401(error)`: Unauthorized (401)

Usage example:
```typescript
import { createApiRoute, _201, _400 } from '@/utils/api-routes';
import { authService } from '@/services/auth.service';

const handler = createApiRoute(async (request) => {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return _400("Required fields missing");
  }

  // Service throws exceptions on errors (handled by createApiRoute)
  const user = await authService.register(name, email, password);

  return _201({ user }, "Account created successfully");
});

export const POST = handler;
```

#### Error Handling (`src/utils/api-error-handler.ts`)

**handleApiError(error, includeTraceId)**: Centralized error handler
- Converts AuthException to structured error responses
- Maps exception status codes to HTTP responses
- Includes error trace IDs for debugging
- Logs all errors with context

Error response format:
```typescript
interface IErrorResponse<TError> {
  status_code: number;
  success: false;
  message: string;
  error?: TError;
  errorTraceId?: string;  // Only included if requested
}
```

### Error Codes (`src/constants/error-codes.ts`)
Centralized error code constants:
- `AUTH_ERROR_CODES`: All authentication error codes
- `AUTH_SERVICE_ERROR_CODES`: Service-specific error codes
- `AUTH_ERROR_MESSAGE_IDS`: Maps error codes to i18n message IDs

### Logging (`src/utils/logger.ts`)
Simple logging utility:
- Methods: `log`, `info`, `warn`, `error`
- Automatically stringifies objects
- Used throughout API layer for debugging

### Type Definitions (`src/types/api.d.ts`)
Standard API response types:
```typescript
interface ISuccessResponse<TData> {
  status_code: number;
  success: true;
  message: string;
  data: TData;
}

interface IErrorResponse<TError> {
  status_code: number;
  success: false;
  message: string;
  error?: TError;
}

interface IListResponse<TObject> extends ISuccessResponse<TObject[]> {}
```

## Docker Configuration

### Development Environment
- **Compose file**: `docker-compose.development.yaml`
- **Container name**: `shadcn-next-app_app` (from APP_NAME env var)
- **Port mapping**: `3333:3000` (host:container)
- **Volume**: `.:/app` (bind mount for hot reload)
- **Network**: `network_app` (bridge driver)
- **Restart policy**: `unless-stopped`
- **Environment variables**: UID_HOST_USER, GID_HOST_USER for permission management
- **Dockerfile**: `.docker/development/node/Dockerfile`

### Environment Variables (`.env`)
```bash
NODE_ENV=development
UID_HOST_USER=501        # Host user ID for file permissions
GID_HOST_USER=20         # Host group ID for file permissions
APP_NAME=shadcn-next-app # Used for container naming
```

### Accessing the Application
- **Local URL**: http://localhost:3333
- **Container shell**: `make shell` or `docker compose -f docker-compose.development.yaml exec -it app bash`

## TypeScript Configuration

- **Version**: TypeScript 5
- **Target**: ES2017
- **Strict mode**: Enabled
- **Path aliases**: `@/*` maps to project root
- **Incremental compilation**: Enabled
- **Config file**: `tsconfig.json`
- **Types**: `@types/node`, `@types/react`, `@types/react-dom`

## Styling

### TailwindCSS v4
- **Version**: 4.1.17
- **PostCSS**: Uses `@tailwindcss/postcss`
- **CSS file**: `src/app/globals.css`
- **Plugin**: `tw-animate-css` v1.4.0 for animations
- **Utilities**: `tailwind-merge` (v3.4.0) for conditional classes
- **CVA**: `class-variance-authority` (v0.7.1) for component variants
- **Helper**: `clsx` (v2.1.1) for conditional classNames
- **cn utility**: Combines clsx + tailwind-merge in `src/lib/utils.ts`

## Important Guidelines

### Development Workflow
1. **All commands must run in Docker** - Use `make` commands or direct docker compose commands
2. **Hot reload enabled** - Changes to code reflect immediately (volume bind mount)
3. **Linting and formatting run automatically** - Pre-commit hook runs `yarn lint:fix` in container
4. **Port**: Development server runs on http://localhost:3333

### Code Standards
1. **Internationalization** - Always add translations for new text/messages to both `src/lang/en.json` and `src/lang/vi.json`
2. **Locale routing** - New pages must follow `src/app/[locale]/(unauthenticated|authenticated)/[page]/page.tsx` structure
3. **UI components** - Follow shadcn/ui patterns; prefer existing components before creating new ones
4. **State management** - Use Zustand stores in `src/lib/stores/` for global state
5. **Forms** - Use React Hook Form + Zod + shadcn/ui Form components
6. **Styling** - Use TailwindCSS classes; use `cn()` utility for conditional classes
7. **Authentication** - Protected routes go in `src/app/[locale]/(authenticated)/`, public in `(unauthenticated)/`
8. **Route Protection** - Add new routes to `src/constants/routes.ts` (PRIVATE_ROUTES or PUBLIC_ROUTES)
9. **Layered Architecture**:
   - **API Clients** (`src/apis/`): HTTP communication with backend
   - **Services** (`src/services/`): Business logic and data processing
   - **API Routes** (`src/app/api/`): Next.js route handlers
   - **Exceptions** (`src/exceptions/`): Custom exception classes
   - **Configs** (`src/configs/`): Configuration files
10. **Error Handling**:
    - Services throw typed exceptions (e.g., `InvalidEmailException`)
    - Use `createApiRoute` wrapper for API routes
    - Use `handleApiError` for centralized error handling
11. **Type Definitions** - Place types in `src/types/`, enums in `src/enums/`, constants in `src/constants/`
12. **Logging** - Use `logger` from `src/utils/logger.ts` for consistent logging
13. **Commits** - Follow conventional commit format (enforced by commitlint)
14. **Security** - Run `yarn scan` before committing to detect secrets

### Before Making Changes
1. Start development: `make dev` (auto-starts containers)
   - Or enter shell: `make shell` (auto-starts containers)
2. Install dependencies if needed: `make install` (auto-starts containers)
3. Make your changes (hot reload active)
4. Biome will auto-fix and check on commit: `yarn lint:fix`

### Testing Changes
1. View in browser: http://localhost:3333
2. Test both locales: http://localhost:3333/en/home and http://localhost:3333/vi/home
3. Verify linting: `make lint`
4. Test build: `make build`

## Project Architecture Summary

### Directory Structure Philosophy
- **`src/`** - All application source code lives here
- **Separation of Concerns**:
  - `app/` - Next.js routing and page components
  - `apis/` - HTTP client layer for backend communication
  - `components/` - Reusable UI components organized by feature
  - `services/` - Business logic and data processing
  - `configs/` - Configuration files
  - `exceptions/` - Custom exception classes
  - `utils/` - Pure utility functions
  - `constants/` - Application-wide constants
  - `types/` - TypeScript type definitions
  - `enums/` - TypeScript enumerations
  - `lib/` - Third-party integrations and utilities

### Key Architecture Patterns
1. **Three-layer architecture**:
   - **API Client Layer** (`src/apis/`): HTTP communication using ky with retry logic
   - **Service Layer** (`src/services/`): Business logic with exception-based error handling
   - **API Routes Layer** (`src/app/api/`): Next.js route handlers with centralized error handling
2. **Middleware-based routing** - `src/proxy.ts` handles locale detection and authentication
3. **Route-based code splitting** - App Router automatically splits code by route
4. **Component composition** - Shadcn/ui components composed with application components
5. **Server/Client separation** - React Server Components by default, client components marked with 'use client'
6. **Type safety** - Full TypeScript coverage with strict mode
7. **Exception-driven errors** - Services throw typed exceptions, caught and converted to API responses
8. **Centralized configuration** - API config, error codes, and constants in dedicated files