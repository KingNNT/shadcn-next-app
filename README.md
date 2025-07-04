# Kingnnt.org - Next.js Application

A modern, internationalized Next.js 15 application built with TypeScript, shadcn/ui components, and TailwindCSS. This project serves as the main website for Kingnnt Organization, providing coding services.

## Features

- **Next.js 15** with App Router and TypeScript
- **Internationalization (i18n)** - Support for English and Vietnamese locales
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Dark/Light Mode** - Theme switching with next-themes
- **TailwindCSS v4** - Modern utility-first CSS framework
- **Docker Support** - Containerized development and production environments
- **Code Quality** - ESLint, Husky, lint-staged, and commitlint setup

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Development

```bash
# Start development environment
make dev_env_up

# Connect to development container
make dev_app_connect

# Start dev server in container
make dev_app_dev

# Stop development environment
make dev_env_down
```

## Project Structure

```
shadcn-next-app/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalization routes
│   │   └── (public)/      # Public pages group
│   │       └── home/      # Home page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── mode-toggler.tsx  # Theme toggle
│   └── theme-provider.tsx # Theme provider
├── lib/                  # Utility functions
├── enums/               # TypeScript enumerations
├── docs/                # Documentation
└── public/              # Static assets
```

## Internationalization

The application supports multiple locales with automatic detection:

- **English** (`en`) - Default locale
- **Vietnamese** (`vi`)

Routes are structured as `/[locale]/[page]` with middleware handling locale detection and redirection.

## Documentation

Detailed documentation is available in the `/docs` folder:

- [Architecture](docs/architecture.md) - Application architecture and design patterns
- [Development](docs/development.md) - Development workflow and best practices
- [Deployment](docs/deployment.md) - Deployment guides and configurations
- [Components](docs/components.md) - UI components and usage examples
- [Internationalization](docs/internationalization.md) - i18n implementation details

## Development Workflow

1. **Code Quality**: Pre-commit hooks run ESLint and formatting
2. **Commit Messages**: Conventional commits enforced by commitlint
3. **TypeScript**: Strict mode enabled with path aliases
4. **Testing**: Built-in Next.js testing setup

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Theming**: next-themes
- **Linting**: ESLint with Next.js configuration
- **Git Hooks**: Husky + lint-staged
- **Containerization**: Docker with multi-stage builds

## Contributing

1. Follow the conventional commit format
2. Ensure all pre-commit hooks pass
3. Add tests for new features
4. Update documentation as needed

## License

© 2025 Kingnnt.org. All rights reserved.
