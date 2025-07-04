# Development Guide

This guide covers the development workflow, best practices, and tooling for the Kingnnt.org Next.js application.

## Development Environment Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Docker** (optional, for containerized development)
- **Git** with proper configuration

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd shadcn-next-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Install Husky hooks
npm run prepare

# Start development server
npm run dev
```

## Development Workflow

### 1. Code Quality Pipeline

The project enforces code quality through automated tools:

```bash
# Pre-commit hooks automatically run:
# 1. ESLint on TypeScript files
# 2. Prettier formatting
# 3. TypeScript type checking
```

### 2. Git Workflow

#### Commit Message Format

The project uses conventional commits:

```bash
# Format: <type>(<scope>): <description>
feat(auth): add user authentication
fix(ui): resolve button hover state
docs(readme): update installation instructions
style(components): format card component
refactor(utils): optimize string utilities
test(api): add user endpoint tests
```

#### Branch Strategy

```bash
# Feature branches
git checkout -b feature/add-user-dashboard
git checkout -b fix/navigation-bug
git checkout -b docs/api-documentation
```

### 3. Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## Docker Development

### Local Development with Docker

```bash
# Start development environment
make dev_env_up

# Connect to development container
make dev_app_connect

# Inside container - start dev server
make dev_app_dev

# Stop development environment
make dev_env_down
```

### Docker Commands Reference

```bash
# Development Environment
make dev_env_up          # Start containers
make dev_env_restart     # Restart with rebuild
make dev_env_down        # Stop containers
make dev_env_rm          # Remove containers and images
make dev_env_start       # Start stopped containers
make dev_env_stop        # Stop running containers

# Development App
make dev_app_connect     # Connect to container bash
make dev_app_dev         # Run dev server in container

# Production Environment
make prod_env_up         # Start production containers
make prod_env_restart    # Restart with rebuild
make prod_env_down       # Stop production containers
```

## Code Organization

### File Structure Best Practices

```
app/
├── [locale]/           # Internationalization
│   └── (public)/      # Route groups
│       └── [page]/    # Dynamic routes
components/
├── ui/                # shadcn/ui components
├── [feature]/         # Feature-specific components
└── shared/            # Shared components
lib/
├── utils.ts           # Utility functions
├── constants.ts       # Application constants
└── types.ts           # Type definitions
```

### Component Development

#### Creating New Components

```bash
# Add new shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Example
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

#### Component Structure

```typescript
// components/feature/user-profile.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}
```

## Internationalization Development

### Adding New Locales

1. **Update locale enum**:
```typescript
// enums/locale.enum.ts
export enum LocaleSupport {
  EN = "en",
  VI = "vi",
  FR = "fr", // New locale
}
```

2. **Update middleware**:
```typescript
// middleware.ts
const SUPPORTED_LOCALES = [
  LocaleSupport.EN, 
  LocaleSupport.VI,
  LocaleSupport.FR // Add new locale
];
```

3. **Add locale-specific content**:
```
app/
├── [locale]/
│   └── (public)/
│       └── home/
│           └── page.tsx  # Handle locale in component
```

### Locale-Aware Components

```typescript
// app/[locale]/(public)/home/page.tsx
interface HomePageProps {
  params: {
    locale: LocaleSupport;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  
  return (
    <div>
      <h1>{locale === LocaleSupport.EN ? "Welcome" : "Chào mừng"}</h1>
    </div>
  );
}
```

## Styling Development

### TailwindCSS Best Practices

```typescript
// Use semantic class names
const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
};

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Theme Development

```typescript
// Accessing theme values
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md border"
    >
      Toggle Theme
    </button>
  );
}
```

## Testing Strategy

### Unit Testing

```typescript
// __tests__/components/user-profile.test.tsx
import { render, screen } from "@testing-library/react";
import { UserProfile } from "@/components/feature/user-profile";

describe("UserProfile", () => {
  it("renders user information", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    render(<UserProfile user={user} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// __tests__/pages/home.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/[locale]/(public)/home/page";
import { LocaleSupport } from "@/enums";

describe("HomePage", () => {
  it("renders welcome message in English", () => {
    render(<HomePage params={{ locale: LocaleSupport.EN }} />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### Code Splitting

```typescript
// Dynamic imports for large components
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("@/components/heavy-component"));

export function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Debugging

### Development Tools

```bash
# Enable debug mode
DEBUG=* npm run dev

# TypeScript compiler watch mode
npx tsc --watch

# ESLint with auto-fix
npx eslint . --fix
```

### Common Issues and Solutions

1. **Build Errors**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

2. **TypeScript Errors**:
```bash
# Check TypeScript configuration
npx tsc --showConfig

# Strict type checking
npx tsc --noEmit --strict
```

3. **Styling Issues**:
```bash
# Rebuild TailwindCSS
npm run build:css

# Check TailwindCSS configuration
npx tailwindcss --help
```

## Deployment Preparation

### Pre-deployment Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Docker images build successfully
- [ ] Database migrations applied (if applicable)

### Build Commands

```bash
# Production build
npm run build

# Test production build locally
npm run start

# Docker production build
make prod_env_up
```