# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with TypeScript, built with the App Router architecture. The project implements internationalization (i18n) with locale-based routing, NextAuth.js for authentication, and uses shadcn/ui components for the UI layer. All development and commands are run within Docker containers.

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
```

## Project Structure

### App Router Architecture
- Uses Next.js 16 App Router with TypeScript
- Internationalization implemented with dynamic `[locale]` segments
- Route structure:
  - `app/[locale]/(public)/[page]/page.tsx` - Public pages (home, login)
  - `app/[locale]/(private)/[page]/page.tsx` - Protected pages (require auth)
- Proxy (`proxy.ts`) handles:
  - Locale detection and redirection
  - Authentication via NextAuth.js
  - Cookie-based locale persistence

### Key Directories
- `app/`: Next.js App Router pages and layouts
  - `app/[locale]/`: Locale-based routing
  - `app/[locale]/(public)/`: Public routes (home, login)
  - `app/[locale]/(private)/`: Protected routes
  - `app/api/`: API routes (NextAuth handlers)
- `components/`: Reusable React components
  - `components/ui/`: shadcn/ui components (button, card, input, form, label, dropdown-menu)
  - `components/auth/`: Authentication-related components
  - `components/home/`: Home page components
  - `components/i18n/`: Internationalization components
  - `components/layout/`: Layout components (navigation, headers)
  - `components/providers/`: React context providers (theme, intl)
  - `components/theme/`: Theme toggle components
- `lib/`: Utility functions and configurations
  - `lib/stores/`: Zustand state management stores
  - `lib/intl/`: Internationalization utilities
  - `lib/utils.ts`: Utility functions (cn, etc.)
- `utils/`: Application utilities and configuration
  - `utils/auth.ts`: NextAuth configuration
  - `utils/routes.ts`: Route protection configuration (private/public routes)
- `enums/`: TypeScript enumerations
  - `enums/locale.enum.ts`: LocaleSupport enum (EN, VI)
- `lang/`: Translation files (`en.json`, `vi.json`)
- `public/`: Static assets
- `docs/`: Documentation files
- `.docker/`: Docker configuration files
  - `.docker/development/node/`: Development Dockerfile
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
  - Messages stored in `lang/en.json` and `lang/vi.json`
  - `lib/intl/index.ts` provides helper functions (`getMessages`, `getMessage`)
  - Proxy handles automatic locale detection:
    1. Check `NEXT_LOCALE` cookie
    2. Check `Accept-Language` header
    3. Fallback to default locale (`en`)
- **Locale persistence**: Stored in `NEXT_LOCALE` cookie (1 year expiry)
- **URL structure**: `/{locale}/{page}` (e.g., `/en/home`, `/vi/home`)
- **Redirection**: Root path (`/`) redirects to `/{locale}/home`

## Authentication

### NextAuth.js Setup
- **Version**: 5.0.0-beta.30
- **Configuration**: `utils/auth.ts`
- **Provider**: Credentials provider (email/password)
- **Session strategy**: JWT-based
- **Custom pages**: Login page at `/{locale}/login`
- **Protected routes**: Managed via `utils/routes.ts` and enforced by middleware
- **Demo credentials** (for testing):
  - Email: `demo@example.com`
  - Password: `demo123`

**TODO**: Replace hardcoded credentials with actual database authentication logic.

### Route Protection Configuration
- **Configuration file**: `utils/routes.ts`
- **Private routes**: Define routes requiring authentication in `PRIVATE_ROUTES` array
- **Public routes**: Define public routes in `PUBLIC_ROUTES` array
- **Scalable approach**: Simply add new routes to the arrays - no proxy changes needed

Example of adding a new protected route:
```typescript
// In utils/routes.ts
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/admin",  // New protected route - just add here!
];
```

### Authentication Flow
1. User accesses protected route (e.g., `/en/dashboard`)
2. Proxy extracts route path and checks if it's in `PRIVATE_ROUTES`
3. If not authenticated, redirect to `/en/login?callback-url=/en/dashboard`
4. Login page uses NextAuth credentials provider
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
- **Location**: `lib/stores/`
- **Global state management** with Zustand
- **Features**: DevTools and persistence middleware support

#### App Store (`lib/stores/app-store.ts`)
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
Follow the pattern in `lib/stores/app-store.ts`:
1. Define state interface
2. Use `create` from `zustand`
3. Export store hook
4. Re-export from `lib/stores/index.ts`

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
- **CSS file**: `app/globals.css`
- **Plugin**: `tw-animate-css` v1.4.0 for animations
- **Utilities**: `tailwind-merge` (v3.4.0) for conditional classes
- **CVA**: `class-variance-authority` (v0.7.1) for component variants
- **Helper**: `clsx` (v2.1.1) for conditional classNames
- **cn utility**: Combines clsx + tailwind-merge in `lib/utils.ts`

## Important Guidelines

### Development Workflow
1. **All commands must run in Docker** - Use `make` commands or direct docker compose commands
2. **Hot reload enabled** - Changes to code reflect immediately (volume bind mount)
3. **Linting and formatting run automatically** - Pre-commit hook runs `yarn lint:fix` in container
4. **Port**: Development server runs on http://localhost:3333

### Code Standards
1. **Internationalization** - Always add translations for new text/messages to both `lang/en.json` and `lang/vi.json`
2. **Locale routing** - New pages must follow `app/[locale]/(public|private)/[page]/page.tsx` structure
3. **UI components** - Follow shadcn/ui patterns; prefer existing components before creating new ones
4. **State management** - Use Zustand stores in `lib/stores/` for global state
5. **Forms** - Use React Hook Form + Zod + shadcn/ui Form components
6. **Styling** - Use TailwindCSS classes; use `cn()` utility for conditional classes
7. **Authentication** - Protected routes go in `app/[locale]/(private)/`, public in `(public)/`
8. **Commits** - Follow conventional commit format (enforced by commitlint)

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

## Additional Documentation
- `docs/architecture.md` - Architecture documentation
- `docs/development.md` - Development guide
- `docs/deployment.md` - Deployment instructions
- `docs/components.md` - Component documentation