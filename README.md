# shadcn-next-app

A production-ready Next.js 16 application with TypeScript, internationalization, authentication, and shadcn/ui components. Built with best practices for modern web development using a clean `src/` directory structure.

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.2.1** - App Router with TypeScript 5.9
- **React 19.2.4** - Latest React with Server Components
- **Node.js 24.12.0 LTS** with **Yarn 4.12.0** for package management

### Styling & UI
- **TailwindCSS v4.2.2** - Modern utility-first CSS with PostCSS
- **shadcn/ui** - Accessible and customizable component library (New York style)
- **next-themes v0.4.6** - Dark/light mode theming
- **Radix UI** - Accessible component primitives
- **Lucide React v0.555.0** - Icon library

### Authentication & API
- **NextAuth.js v5.0.0-beta.30** - Secure authentication with JWT sessions
- **ky v1.14.3** - HTTP client with retry logic and interceptors

### Internationalization & State
- **next-intl v4.x** - Full i18n support (English, Vietnamese)
- **Zustand v5.0.12** - Lightweight state management

### Forms & Validation
- **React Hook Form v7.72.0** - Form state management
- **Zod v4.3.6** - Type-safe schema validation
- **@hookform/resolvers v5.2.2** - Zod integration

### Development & Quality
- **Docker** - Complete containerization for dev and production
- **Storybook v8.6** - Component development and documentation
- **Biome v2.4.9** - Fast linter and formatter
- **Husky v9.1.7** - Git hooks management
- **lint-staged v16.4.0** - Pre-commit linting
- **commitlint v20** - Conventional commit enforcement
- **gitleaks** - Secret detection tool

## ⚡ Quick Start

### One-Line Installation (Recommended)

Create a new project from this template with a single command:

```bash
curl -fsSL https://raw.githubusercontent.com/KingNNT/shadcn-next-app/develop/install.sh | bash
```

Or specify a project name directly:

```bash
curl -fsSL https://raw.githubusercontent.com/KingNNT/shadcn-next-app/develop/install.sh | bash -s my-project
```

The installer will:
1. Check prerequisites (Git, Docker, Make)
2. Prompt for project name, description, and author info
3. Clone the template and customize all configuration files
4. Remove template history and initialize a fresh git repository
5. Create an initial commit ready for development

After installation:

```bash
cd my-project
make dev
```

**Access the application**: http://localhost:3333
**Access Storybook**: http://localhost:6006

### Manual Setup

If you prefer to set up manually:

**Prerequisites**: Docker Desktop and Make installed.

```bash
# 1. Clone the repository
git clone https://github.com/KingNNT/shadcn-next-app.git my-project
cd my-project

# 2. Create environment file
cp .env.example .env

# 3. Start development (auto-starts containers)
make dev
```

**Access the application**: http://localhost:3333

### Available Make Commands

```bash
make help        # Show all available commands
make dev         # Start containers + dev server
make shell       # Start containers + connect to shell
make build       # Start containers + build app
make lint        # Start containers + run Biome
make install     # Start containers + install deps
make up          # Start containers only
make down        # Stop and remove containers
make restart     # Quick restart (no rebuild)
make rebuild     # Rebuild images + restart
make storybook   # Start Storybook dev server (port 6006)
```

## 📁 Project Structure

```
.storybook/                        # Storybook configuration
├── decorators/                    # Global decorators (theme, intl, session)
├── mocks/                         # Mock data (messages, sessions)
├── main.ts                        # Storybook config (framework, addons)
└── preview.ts                     # Global decorators and toolbar controls

src/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── (unauthenticated)/ # Public pages (home, login, register)
│   │   ├── (authenticated)/   # Protected pages (dashboard)
│   │   └── layout.tsx         # Locale layout with IntlProvider
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth API routes
│   │   └── v1/                # Versioned API endpoints (auth/register)
│   └── globals.css            # Global styles with TailwindCSS v4
│
├── apis/                      # API Client Layer (HTTP communication)
│   ├── base-http-client.ts    # Base HTTP client using ky
│   ├── base-api.ts            # Abstract base for domain APIs
│   ├── auth-api.ts            # Authentication API client
│   ├── user-api.ts            # User API client
│   ├── errors/                # API client exceptions
│   └── index.ts               # API exports
│
├── services/                  # Service Layer (business logic)
│   ├── next-auth.ts           # NextAuth configuration
│   ├── auth.service.ts        # Authentication service
│   └── index.ts               # Service exports
│
├── configs/                   # Configuration files
│   └── api.config.ts          # API client configuration
│
├── exceptions/                # Custom exception classes
│   ├── auth.exception.ts      # Authentication exceptions
│   └── index.ts               # Exception exports
│
├── components/
│   ├── ui/                    # shadcn/ui components (button, card, form, etc.)
│   ├── auth/                  # Authentication components (login-form, register-form)
│   ├── home/                  # Home page components (home-view)
│   ├── dashboard/             # Dashboard components (dashboard-view)
│   ├── layout/                # Layout components (navigation, header, footer, sidebar)
│   ├── providers/             # React providers (theme, intl, session)
│   ├── theme/                 # Theme toggle components (mode-togger)
│   └── i18n/                  # i18n components (locale-switcher)
│
├── lib/
│   ├── stores/                # Zustand state stores (app-store)
│   ├── intl/                  # i18n utilities (getMessages, getMessage)
│   └── utils.ts               # Utility functions (cn, etc.)
│
├── utils/                     # Application utilities
│   ├── routes.ts              # Route protection utilities
│   ├── api-routes.ts          # API route helpers (createApiRoute, _200, _201)
│   ├── api-error-handler.ts   # Centralized error handling
│   └── logger.ts              # Logging utility
│
├── constants/
│   ├── routes.ts              # Route definitions (PRIVATE_ROUTES, PUBLIC_ROUTES)
│   ├── error-codes.ts         # Error code constants
│   └── index.ts               # Constants exports
│
├── types/
│   ├── auth.d.ts              # Authentication types
│   ├── user.d.ts              # User types
│   ├── api.d.ts               # API response types
│   ├── page.d.ts              # Page component types
│   └── index.d.ts             # Type exports
│
├── enums/
│   ├── locale.enum.ts         # Locale enumeration (EN, VI)
│   └── index.ts               # Enum exports
│
├── langs/
│   ├── en.json                # English translations
│   └── vi.json                # Vietnamese translations
│
└── proxy.ts                   # Next.js middleware (auth + locale)
```

## ✨ Key Features

### 🌍 Internationalization (i18n)
- **Multi-language support**: English and Vietnamese
- **Locale-based routing**: `/en/home`, `/vi/home`
- **Automatic locale detection**: Browser preferences, cookies
- **Persistent locale**: Saved in cookies for 1 year
- **next-intl**: Full message formatting support

### 🔐 Authentication & Authorization
- **NextAuth.js v5**: Secure JWT-based sessions
- **Credentials provider**: Email/password authentication
- **Service layer**: Separated auth logic in `src/services/auth.service.ts`
- **Protected routes**: Automatic middleware-based protection
- **Smart redirects**: Returns users to intended page after login
- **Scalable route config**: Manage routes in `src/constants/routes.ts`
- **Demo credentials**: `demo@example.com` / `demo123`

**Adding Protected Routes:**
```typescript
// In src/constants/routes.ts
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/your-new-route",  // Just add here!
] as const;
```

### 🎨 Theming & UI
- **Dark/light mode**: System-aware theme switching with next-themes
- **shadcn/ui**: Accessible, customizable component library (New York style)
- **TailwindCSS v4**: Modern utility-first styling
- **Responsive design**: Mobile-first approach

### 🏗️ Architecture
- **App Router**: Next.js 16 with Server Components
- **Three-layer architecture**:
  - **API Client Layer** (`src/apis/`): HTTP communication using ky with retry logic
  - **Service Layer** (`src/services/`): Business logic with exception-based error handling
  - **API Routes Layer** (`src/app/api/`): Next.js route handlers with centralized error handling
- **Clean structure**: Organized `src/` directory with clear separation of concerns
- **Type-safe**: Full TypeScript coverage with strict mode
- **Exception-driven errors**: Services throw typed exceptions, converted to API responses
- **Form validation**: React Hook Form + Zod schemas
- **State management**: Zustand stores for global state
- **Middleware**: Handles auth + locale in `src/proxy.ts`
- **Centralized config**: API settings, error codes, and constants in dedicated files

### 📖 Storybook
- **Component development**: Isolated development environment for UI components
- **Dark mode toggle**: Toolbar control to switch between light/dark themes
- **Locale switching**: Toolbar control to switch between en/vi locales
- **Interaction testing**: Visual interaction tests with `@storybook/addon-interactions`
- **Auto-generated docs**: `autodocs` tag generates documentation from component props
- **Co-located stories**: Story files live next to their components (`button.stories.tsx`)

### 🐳 Docker & Development
- **Containerized development**: Consistent environment for all developers
- **Hot reload**: Changes reflect immediately
- **Pre-commit hooks**: Automatic linting and security scanning via Husky
- **Security scanning**: gitleaks detects secrets before commit
- **Code quality**: Biome for fast linting and formatting
- **Production ready**: Separate production Dockerfile

## 🔑 Authentication Flow

1. User tries to access protected route (e.g., `/en/dashboard`)
2. Middleware (`src/proxy.ts`) checks if route requires authentication using `isPrivateRoute()`
3. If not authenticated, redirects to `/en/login?callback-url=/en/dashboard`
4. User logs in with credentials via `src/services/auth.service.ts`
5. After successful authentication, redirected back to original page
6. If already logged in and accessing login page, redirects to dashboard

## 🌐 URL Structure

```
/                          → Redirects to /{locale}/home
/{locale}/home             → Public home page
/{locale}/login            → Login page
/{locale}/dashboard        → Protected dashboard (requires auth)
/{locale}/settings         → Protected settings (requires auth)
```

**Supported locales**: `en`, `vi`

## 🔌 API Architecture

The project implements a clean **three-layer architecture** for API communication:

### 1️⃣ API Client Layer (`src/apis/`)
HTTP client using **ky** with advanced features:
- ✅ Automatic auth token injection from NextAuth sessions
- ✅ Retry logic with exponential backoff
- ✅ Request timeout and cancellation support
- ✅ Error mapping to custom exceptions

**Configuration** (`src/configs/api.config.ts`):
```typescript
{
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30_000,        // 30 seconds
  maxRetries: 3,          // Retry failed requests 3 times
  retryDelay: 1000,       // Initial delay: 1 second
  retryBackoffMultiplier: 2  // Exponential backoff
}
```

**Usage Example**:
```typescript
import { authApi } from '@/apis';

const loginData = await authApi.login({ email, password });
```

### 2️⃣ Service Layer (`src/services/`)
Business logic with **exception-based error handling**:
- ✅ Input validation (email format, password strength, etc.)
- ✅ Business rule enforcement
- ✅ Throws typed exceptions for different error cases
- ✅ Currently uses in-memory storage (replace with database)

**Usage Example**:
```typescript
import { authService } from '@/services';

try {
  const user = await authService.register(name, email, password);
} catch (error) {
  if (error instanceof EmailExistsException) {
    // Handle duplicate email
  }
}
```

### 3️⃣ API Routes Layer (`src/app/api/`)
Next.js route handlers with **centralized error handling**:
- ✅ `createApiRoute` wrapper for automatic error handling
- ✅ Converts service exceptions to API responses
- ✅ Error logging with trace IDs
- ✅ Standardized response format

**Usage Example**:
```typescript
import { createApiRoute, _201, _400 } from '@/utils/api-routes';
import { authService } from '@/services';

const handler = createApiRoute(async (request) => {
  const { name, email, password } = await request.json();

  // Service throws exceptions on errors (handled automatically)
  const user = await authService.register(name, email, password);

  return _201({ user }, "Account created successfully");
});

export const POST = handler;
```

### API Response Format

**Success Response**:
```json
{
  "status_code": 200,
  "success": true,
  "message": "Operation successful",
  "data": { /* your data */ }
}
```

**Error Response**:
```json
{
  "status_code": 400,
  "success": false,
  "message": "Invalid email format",
  "error": "INVALID_EMAIL",
  "errorTraceId": "uuid-here"  // For debugging
}
```

### Custom Exceptions

Services throw typed exceptions that map to HTTP status codes:
- `MissingCredentialsException` → 400
- `InvalidEmailException` → 400
- `InvalidPasswordException` → 400
- `InvalidCredentialsException` → 401
- `EmailExistsException` → 409
- `InternalAuthException` → 500

## 🛠️ Development

### Adding a New Page

1. **Public page** (no authentication required):
   ```bash
   # Create at: src/app/[locale]/(unauthenticated)/your-page/page.tsx
   ```

2. **Protected page** (requires authentication):
   ```bash
   # Create at: src/app/[locale]/(authenticated)/your-page/page.tsx
   # Add route to src/constants/routes.ts PRIVATE_ROUTES array
   ```

### Adding API Endpoints

1. **Create API client** in `src/apis/`:
   ```typescript
   // src/apis/your-api.ts
   import { BaseApi } from './base-api';

   export class YourApi extends BaseApi {
     constructor() {
       super('/api/v1/your-resource');
     }

     async getData(): Promise<YourData> {
       return this.get<YourData>(this.buildUrl('/data'));
     }
   }
   ```

2. **Create service** in `src/services/`:
   ```typescript
   // src/services/your.service.ts
   export class YourService {
     async processData(data: unknown): Promise<Result> {
       // Validate and throw exceptions on errors
       if (!data) {
         throw new YourException('Invalid data');
       }
       return { /* processed result */ };
     }
   }
   ```

3. **Create API route** in `src/app/api/v1/`:
   ```typescript
   // src/app/api/v1/your-resource/route.ts
   import { createApiRoute, _200, _400 } from '@/utils/api-routes';
   import { yourService } from '@/services/your.service';

   const handler = createApiRoute(async (request) => {
     const body = await request.json();
     const result = await yourService.processData(body);
     return _200({ result });
   });

   export const POST = handler;
   ```

### Adding Translations

Edit both language files:
- `src/langs/en.json` - English translations
- `src/langs/vi.json` - Vietnamese translations

```json
{
  "pages.yourPage.title": "Your Page Title",
  "pages.yourPage.description": "Description here"
}
```

### Adding shadcn/ui Components

```bash
# Inside container
make shell
yarn dlx shadcn@latest add [component-name]

# Example: Add dialog component
yarn dlx shadcn@latest add dialog
```

### Adding Storybook Stories

Create a story file co-located with the component:

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button" },
};
```

For interaction testing, use `play` functions:

```tsx
import { expect, userEvent, within } from "@storybook/test";

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByRole("button")).toBeVisible();
  },
};
```

### Project Organization

- **Pages**: `src/app/[locale]/(unauthenticated|authenticated)/[page]/page.tsx`
- **API Clients**: `src/apis/[domain]-api.ts` (HTTP communication)
- **Services**: `src/services/[service-name].ts` (business logic)
- **API Routes**: `src/app/api/v1/[resource]/route.ts` (route handlers)
- **Exceptions**: `src/exceptions/[domain].exception.ts` (custom errors)
- **Components**: `src/components/[feature]/[component].tsx`
- **Utils**: `src/utils/[util-name].ts` (pure functions)
- **Types**: `src/types/[type-name].d.ts`
- **Constants**: `src/constants/[constant-name].ts`
- **Configs**: `src/configs/[config-name].ts`

## 📚 Documentation

For detailed documentation, see:
- [CLAUDE.md](.claude/CLAUDE.md) - Full project guide for Claude Code

## 🤝 Contributing

1. Follow conventional commit format (enforced by commitlint)
2. Code will be auto-formatted and linted on commit via Biome pre-commit hook
3. Security scanning runs automatically via gitleaks pre-commit hook
4. Add translations for both EN and VI locales
5. Test in both light and dark themes
6. Add Storybook stories for new UI components
7. Follow the three-layer architecture pattern (API Client → Service → API Route)
8. Use typed exceptions for error handling in services
9. Ensure Docker build succeeds

### Commit Format Examples
```bash
feat: add user profile page
fix: resolve authentication redirect loop
refactor: extract validation logic to service layer
docs: update API documentation
chore: update dependencies
```

### Code Quality Checks
```bash
yarn lint:fix    # Fix linting issues
yarn format      # Format code
yarn scan        # Scan for secrets
yarn precommit   # Run all checks (format + lint + scan)
```

## 📝 License

© 2025-2026 shadcn-next-app. All rights reserved.
