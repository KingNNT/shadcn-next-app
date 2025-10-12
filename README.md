# shadcn-next-app

A production-ready Next.js 16 application with TypeScript, internationalization, authentication, and shadcn/ui components. Built with best practices for modern web development.

## 🚀 Tech Stack

- **Next.js 16.0.6** - App Router with TypeScript 5.9
- **React 19.2.0** - Latest React with Server Components
- **Node.js 24.11.1 LTS** with **Yarn (stable)** for package management
- **TailwindCSS v4.1.17** - Modern utility-first CSS with PostCSS
- **shadcn/ui** - Accessible and customizable component library
- **NextAuth.js v5.0.0-beta.30** - Secure authentication with JWT sessions
- **React Intl v7.1.14** - Full internationalization support (English, Vietnamese)
- **Zustand v5.0.9** - Lightweight state management
- **React Hook Form v7.67.0 + Zod v4.1.13** - Type-safe form validation
- **Docker** - Complete containerization for dev and production
- **Lucide React v0.555.0** - Icon library

## ⚡ Quick Start

**IMPORTANT: All development is done inside Docker containers.**

### Prerequisites
- Docker Desktop installed and running
- Make (comes with macOS/Linux, install via chocolatey on Windows)

### Getting Started

```bash
# 1. Clone the repository
git clone <repository-url>
cd shadcn-next-app

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
```

## 📁 Project Structure

```
app/
├── [locale]/              # Locale-based routing
│   ├── (public)/          # Public pages (home, login)
│   ├── (private)/         # Protected pages (dashboard, settings)
│   └── layout.tsx         # Locale layout with IntlProvider
└── api/auth/              # NextAuth API routes

components/
├── ui/                    # shadcn/ui components (button, card, form, etc.)
├── auth/                  # Authentication components (login form)
├── home/                  # Home page components
├── dashboard/             # Dashboard components
├── layout/                # Layout components (navigation, headers)
├── providers/             # React providers (theme, intl)
├── theme/                 # Theme toggle components
└── i18n/                  # Internationalization components

lib/
├── stores/                # Zustand state stores (app store)
├── intl/                  # i18n utilities (getMessages, getMessage)
└── utils.ts               # Utility functions (cn, etc.)

utils/
├── auth.ts                # NextAuth configuration
└── routes.ts              # Route protection config (PRIVATE_ROUTES, PUBLIC_ROUTES)

lang/
├── en.json                # English translations
└── vi.json                # Vietnamese translations

enums/
└── locale.enum.ts         # Locale enumeration (EN, VI)

proxy.ts                   # Auth + locale proxy
```

## ✨ Key Features

### 🌍 Internationalization (i18n)
- **Multi-language support**: English and Vietnamese
- **Locale-based routing**: `/en/home`, `/vi/home`
- **Automatic locale detection**: Browser preferences, cookies
- **Persistent locale**: Saved in cookies for 1 year
- **React Intl**: Full message formatting support

### 🔐 Authentication & Authorization
- **NextAuth.js v5**: Secure JWT-based sessions
- **Credentials provider**: Email/password authentication
- **Protected routes**: Automatic proxy-based protection
- **Smart redirects**: Returns users to intended page after login
- **Scalable route config**: Manage private/public routes in `utils/routes.ts`
- **Demo credentials**: `demo@example.com` / `demo123`

**Adding Protected Routes:**
```typescript
// In utils/routes.ts
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/your-new-route",  // Just add here!
];
```

### 🎨 Theming & UI
- **Dark/light mode**: System-aware theme switching with next-themes
- **shadcn/ui**: Accessible, customizable component library (New York style)
- **TailwindCSS v4**: Modern utility-first styling
- **Responsive design**: Mobile-first approach

### 🏗️ Architecture
- **App Router**: Next.js 16 with Server Components
- **Type-safe**: Full TypeScript coverage
- **Form validation**: React Hook Form + Zod schemas
- **State management**: Zustand stores for global state
- **Proxy**: Handles auth + locale in one place

### 🐳 Docker
- **Containerized development**: Consistent environment for all developers
- **Hot reload**: Changes reflect immediately
- **Pre-commit hooks**: Automatic linting via Husky
- **Production ready**: Separate production Dockerfile

## 🔑 Authentication Flow

1. User tries to access protected route (e.g., `/en/dashboard`)
2. Proxy checks if user is authenticated
3. If not authenticated, redirects to `/en/login?callback-url=/en/dashboard`
4. User logs in with credentials
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

## 🛠️ Development

### Adding a New Page

1. **Public page** (no authentication required):
   ```bash
   # Create at: app/[locale]/(public)/your-page/page.tsx
   ```

2. **Protected page** (requires authentication):
   ```bash
   # Create at: app/[locale]/(private)/your-page/page.tsx
   # Add route to utils/routes.ts PRIVATE_ROUTES array
   ```

### Adding Translations

Edit both language files:
- `lang/en.json` - English translations
- `lang/vi.json` - Vietnamese translations

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
npx shadcn@latest add [component-name]

# Example: Add dialog component
npx shadcn@latest add dialog
```

## 📚 Documentation

For detailed documentation, see:
- [CLAUDE.md](CLAUDE.md) - Full project guide for Claude Code

## 🤝 Contributing

1. Follow conventional commit format (enforced by commitlint)
2. Code will be auto-formatted and linted on commit via Biome pre-commit hook
3. Add translations for both EN and VI locales
4. Test in both light and dark themes
5. Ensure Docker build succeeds

## 📝 License

© 2025 shadcn-next-app. All rights reserved.
