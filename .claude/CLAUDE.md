# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 application with TypeScript, App Router, `src/` directory structure, i18n with locale-based routing, NextAuth.js authentication, and shadcn/ui components. All development runs in Docker containers.

**IMPORTANT: All commands must be run inside Docker containers. Use Yarn only — never npm, npx, or pnpm.**

## Key Technologies

- **Next.js 16.0.6** with App Router and TypeScript
- **React 19.2.0** / **React DOM 19.2.0**
- **Node.js 24.11.1 LTS** with **Yarn (stable)**
- **TailwindCSS v4.1.17** / **shadcn/ui** (New York style, neutral base color)
- **NextAuth.js v5.0.0-beta.30** (JWT-based, credentials provider)
- **next-intl v4.x** for i18n (en, vi)
- **React Hook Form v7.67.0** + **Zod v4.1.13**
- **Zustand v5.0.9** for state management
- **Biome v2.3.8** for linting/formatting
- **ky v1.14.0** for HTTP client
- **Docker** for containerized development and production

## Common Commands

```bash
# Container lifecycle
make up / make down / make restart / make rebuild
make prod-up / make prod-down / make prod-restart / make prod-rebuild

# Application (auto-starts containers)
make dev         # Next.js dev server
make shell       # Bash shell in container
make install     # Install/update dependencies
make lint        # Run Biome check
make build       # Production build
make exec CMD="..." # Run arbitrary command

# Yarn scripts (inside container)
yarn dev / yarn build / yarn start
yarn lint / yarn lint:fix / yarn format
yarn scan         # gitleaks secret detection
yarn precommit    # format + lint + scan
```

**`make restart`** — quick refresh (env changes, 5-10s)
**`make rebuild`** — full rebuild (Dockerfile/dependency changes, 2-5min)

## Project Structure

```
src/
  app/                    # Next.js App Router
    [locale]/             # Locale-based routing (en, vi)
      (unauthenticated)/  # Public routes (home, login, register)
      (authenticated)/    # Protected routes (dashboard)
    api/                  # API routes (NextAuth, v1 endpoints)
    globals.css           # Global styles (TailwindCSS v4)
  apis/                   # HTTP client layer (ky, retry, auth injection)
  components/             # React components by feature
    ui/                   # shadcn/ui primitives (do not modify directly)
    auth/ layout/ home/ dashboard/ i18n/ theme/ providers/
  services/               # Business logic (auth.service, next-auth)
  configs/                # Configuration (api.config)
  exceptions/             # Custom exception classes
  utils/                  # Utilities (routes, api-routes, api-error-handler, logger)
  constants/              # Constants (routes, error-codes)
  types/                  # TypeScript type definitions
  enums/                  # TypeScript enumerations
  i18n/                   # next-intl config (config, request, navigation)
  langs/                  # Translation files (en.json, vi.json)
  libs/                   # Utilities (stores/, intl/, utils.ts)
  proxy.ts                # Middleware (locale detection + auth)
.docker/                  # Dockerfiles (development, production)
makefiles/                # Modular Makefile components
```

## Authentication

- **NextAuth.js v5** — JWT session, credentials provider
- **Config**: `src/services/next-auth.ts` + `src/services/auth.service.ts`
- **Route protection**: `src/constants/routes.ts` (PRIVATE_ROUTES, PUBLIC_ROUTES) + `src/proxy.ts`
- **Demo credentials**: `demo@example.com` / `demo123`
- **Callback URL**: `/{locale}/login?callback-url=...` (kebab-case param)

Add new protected routes to `PRIVATE_ROUTES` array — no middleware changes needed.

## i18n

- **Locales**: English (`en`), Vietnamese (`vi`) — default: `en`
- **Messages**: `src/langs/en.json`, `src/langs/vi.json` (nested JSON)
- **URL**: `/{locale}/{page}` — root `/` redirects to `/{locale}/home`
- **Client**: `useTranslations(namespace)` / `useLocale()`
- **Server**: `getTranslations({ locale, namespace })`
- **Navigation**: `useRouter()`, `usePathname()` from `@/i18n`
- **Cookie**: `NEXT_LOCALE` (1 year expiry)

## Docker

- **Compose**: `docker-compose.yml` (base) + `docker-compose.override.yml` (local, auto-loaded) + `docker-compose.production.yml` (prod, `-f` flag)
- **Port**: `3333:3000` (host:container)
- **Volume**: `.:/app` (bind mount for hot reload)
- **Env files**: `.env` + `.env.local`

## Code Quality

- **Biome**: Linting + formatting (`biome.json`)
- **Husky + lint-staged**: Auto-runs `yarn lint:fix` on staged files before commit
- **commitlint**: Enforces conventional commit format
- **gitleaks**: Secret detection (`yarn scan`)

## Adding shadcn/ui Components

```bash
make shell
yarn dlx shadcn@latest add [component-name]
```
