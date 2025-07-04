# Architecture

This document outlines the architecture and design patterns used in the Kingnnt.org Next.js application.

## Application Architecture

### Next.js 15 App Router

The application uses the modern Next.js 15 App Router with the following key architectural decisions:

- **Server Components by default** - All components are server-rendered unless explicitly marked as client components
- **File-based routing** - Routes are defined by the file system structure
- **Nested layouts** - Shared UI components across different routes
- **Route groups** - Logical grouping of routes without affecting URL structure

### Project Structure

```
app/
├── [locale]/              # Dynamic locale segment
│   └── (public)/         # Route group for public pages
│       └── home/         # Home page route
│           └── page.tsx  # Page component
├── globals.css           # Global styles
├── layout.tsx           # Root layout
└── favicon.ico          # Favicon
```

## Design Patterns

### 1. Internationalization Pattern

The application implements a locale-based routing pattern:

```typescript
// Route structure
/[locale]/[page]

// Examples
/en/home
/vi/home
```

**Key Components:**
- `middleware.ts` - Handles locale detection and redirection
- `enums/locale.enum.ts` - Defines supported locales
- Dynamic `[locale]` segment in app directory

### 2. Component Architecture

#### UI Components (shadcn/ui)
- **Base components** in `components/ui/`
- **Composed components** in `components/`
- **Page-specific components** co-located with pages

#### Component Hierarchy
```
RootLayout
├── ThemeProvider
│   ├── Header/Navigation
│   ├── Main Content
│   └── Footer
```

### 3. Theming Pattern

The application uses a provider-based theming system:

```typescript
// Theme Provider wraps the entire app
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

**Features:**
- System theme detection
- Light/dark mode toggle
- CSS variable-based theming
- Smooth transitions

## Data Flow

### Server-Side Rendering (SSR)

1. **Request arrives** at middleware
2. **Locale detection** and redirection if needed
3. **Server component rendering** with locale context
4. **HTML sent to client** with hydration data

### Client-Side Interactions

1. **Theme switching** via next-themes
2. **Navigation** handled by Next.js router
3. **State management** using React state (no external state library)

## Styling Architecture

### TailwindCSS Configuration

```typescript
// tailwind.config.ts
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

### CSS Organization

1. **Global styles** in `app/globals.css`
2. **Component styles** using Tailwind classes
3. **CSS variables** for theme customization
4. **Responsive design** with Tailwind breakpoints

## Performance Considerations

### Optimization Strategies

1. **Turbopack** for faster development builds
2. **Server Components** for reduced JavaScript bundle
3. **Font optimization** with next/font
4. **Image optimization** with next/image (when used)

### Bundle Analysis

- TypeScript compilation with strict mode
- Tree shaking for unused code elimination
- Dynamic imports for code splitting (when needed)

## Security Considerations

### Content Security

- **TypeScript strict mode** for type safety
- **ESLint rules** for code quality
- **Pre-commit hooks** for code validation

### Environment Variables

- Sensitive data stored in environment variables
- Client-side variables prefixed with `NEXT_PUBLIC_`

## Scalability Patterns

### Code Organization

- **Feature-based structure** for larger applications
- **Shared components** in dedicated directories
- **Utility functions** in lib/ directory
- **Type definitions** co-located with components

### Future Considerations

- **State management** (Redux Toolkit, Zustand) for complex state
- **API routes** for backend functionality
- **Database integration** (Prisma, Drizzle) for data persistence
- **Authentication** (NextAuth.js, Auth0) for user management

## Error Handling

### Error Boundaries

- **Layout-level error boundaries** for graceful degradation
- **Page-level error handling** with error.tsx files
- **Loading states** with loading.tsx files

### Development vs Production

- **Detailed error messages** in development
- **User-friendly errors** in production
- **Error logging** for monitoring and debugging