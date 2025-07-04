# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with TypeScript, built with the App Router architecture. The project implements internationalization (i18n) with locale-based routing and uses shadcn/ui components for the UI layer.

## Key Technologies

- **Next.js 15** with App Router and TypeScript
- **TailwindCSS v4** for styling
- **shadcn/ui** components (New York style)
- **next-themes** for dark/light mode theming
- **Radix UI** primitives for accessible components
- **Husky** + **lint-staged** for pre-commit hooks
- **Docker** for containerized development and production

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Prepare Husky hooks
npm run prepare
```

## Docker Development Commands

```bash
# Development environment
make dev_env_up          # Start development containers
make dev_env_restart     # Restart with rebuild
make dev_env_down        # Stop containers
make dev_app_connect     # Connect to development container
make dev_app_dev         # Start dev server in container

# Production environment
make prod_env_up         # Start production containers
make prod_env_restart    # Restart with rebuild
make prod_env_down       # Stop containers
```

## Project Structure

### App Router Architecture
- Uses Next.js 15 App Router with TypeScript
- Internationalization implemented with dynamic `[locale]` segments
- Route structure: `app/[locale]/(public)/[page]/page.tsx`
- Middleware handles locale detection and redirection

### Key Directories
- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `components/ui/`: shadcn/ui components
- `lib/`: Utility functions and configurations
- `enums/`: TypeScript enumerations (e.g., LocaleSupport)
- `public/`: Static assets

### Internationalization
- Supports English (`en`) and Vietnamese (`vi`) locales
- Default locale: English (`en`)
- Middleware handles automatic locale detection and routing
- Locale stored in `NEXT_LOCALE` cookie

## Code Quality and Git Hooks

### Pre-commit Hooks
- **Husky**: Manages git hooks
- **lint-staged**: Runs `yarn fix:all` on staged TypeScript files
- **commitlint**: Enforces conventional commit messages

### Linting and Formatting
- ESLint with Next.js TypeScript configuration
- Configured to use `next/core-web-vitals` and `next/typescript` rules

## UI Components

### shadcn/ui Configuration
- Style: New York variant
- Base color: Neutral
- CSS variables enabled
- Components stored in `@/components/ui/`
- Lucide React for icons

### Theming
- **next-themes** for system/light/dark mode support
- ThemeProvider wraps the entire application
- Custom theme toggle component available

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Path aliases configured (`@/*` maps to project root)
- Incremental compilation enabled

## Important Notes

- The application uses locale-based routing - always consider internationalization when adding new pages
- All UI components should follow the shadcn/ui patterns established in the codebase
- Docker is set up for both development and production environments
- Pre-commit hooks will run automatically and must pass before commits