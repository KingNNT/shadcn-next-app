---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - ".storybook/**/*.ts"
  - ".storybook/**/*.tsx"
---

# Code Styles

## Package Manager

- **Yarn (stable)** only — never use npm, npx, or pnpm. Use `yarn` / `yarn dlx` instead.
- All commands must run inside Docker containers via `make` commands.

## Formatting

- Double quotes, tab indentation (see `biome.json`)
- **Biome v2.4.9**: All-in-one linter and formatter
- Use `import type` for type-only imports

## Naming

| Concept              | Pattern                  | Example                                     |
| -------------------- | ------------------------ | ------------------------------------------- |
| Type (union/result)  | `T` prefix               | `TLoginResult`, `TRegisterResult`           |
| Type (derived/util)  | PascalCase, no prefix    | `AuthErrorCode`, `Locale`, `LocalePageProps`|
| Interface (domain)   | `I` prefix               | `IUser`, `ILoginRequest`, `ISuccessResponse`|
| Interface (internal) | PascalCase, no prefix    | `ApiConfig`, `FetchOptions`                 |
| Component            | PascalCase with suffix   | `HomeView`, `RegisterForm`                  |
| API client class     | PascalCase + `Api`       | `AuthApi`, `UserApi`                        |
| API client instance  | camelCase + `Api`        | `authApi`, `userApi`                        |
| Service class        | PascalCase + `Service`   | `AuthService`                               |
| Service instance     | camelCase + `Service`    | `authService`                               |
| Store                | `use{Name}Store`         | `useAppStore`                               |
| Exception (service)  | `{Name}Exception`        | `AuthException`, `InvalidEmailException`    |
| Exception (API client) | `{Name}Error`          | `NetworkError`, `TimeoutError`, `HttpStatusError` |
| Constants            | UPPER_SNAKE_CASE         | `AUTH_ERROR_CODES`, `PRIVATE_ROUTES`        |
| Enum                 | PascalCase               | `LocaleSupport`                             |

## File Naming

- Components: `kebab-case.tsx` — `login-form.tsx`, `home-view.tsx`
- Services: `kebab-case.service.ts` — `auth.service.ts`
- Exceptions: `kebab-case.exception.ts` — `auth.exception.ts`, `api-client.exception.ts`
- Enums: `kebab-case.enum.ts` — `locale.enum.ts`
- Type definitions: `{name}.d.ts` in `src/types/`
- Unit tests: co-located as `{name}.test.tsx` or `{name}.test.ts` (NOT `.spec.ts`)
- Stories: co-located as `{name}.stories.tsx` — `button.stories.tsx`, `password-input.stories.tsx`
- E2E tests: `{name}.spec.ts` in `e2e/`
- Barrel exports (`index.ts`) for `apis/`, `exceptions/`, `services/`, `constants/`, `enums/`, `types/`, `i18n/`, `libs/stores/`
- No barrel exports in `src/components/` — import components directly by path

## Component Organization

- Pages under `src/app/[locale]/` — server components by default
- Route groups: `(authenticated)/` for protected, `(unauthenticated)/` for public
- Components by feature: `src/components/{auth|layout|dashboard|home|common}/`
- UI primitives (shadcn/ui): `src/components/ui/` — Radix wrappers, do not modify directly
- Mark interactive components with `"use client"` — keep it as narrow as possible

## Import Paths

- Use `@/*` alias (maps to `src/*`) for cross-directory imports — never use `../../` relative paths
- Use `./` relative imports only within the same directory
- Group: standard library → third-party → `@/` aliases

## Forms

- Schema-first: define Zod schema → `useForm()` + `zodResolver()` → `FormField` + `FormControl`
- Validation messages use i18n keys via `t()` from `useTranslations()`
- Error display: catch API errors in `onSubmit`, map to user-facing messages

## State Management

- Zustand stores with `devtools` + `persist` middleware stack
- Store files in `src/libs/stores/`
- Include a `reset()` action in every store

## i18n

- All user-facing strings go through `next-intl` — no hardcoded text
- Translation files in `src/langs/{locale}.json` (en, vi)
- Use `useTranslations(namespace)` in client components, `getTranslations(namespace)` in server components
- Always add translations to **both** `en.json` and `vi.json`

## Layered Architecture

Every feature follows three layers — do not flatten or merge:

```
src/
  ├── apis/           # HTTP client layer (ky-based, retry logic, auth injection)
  ├── services/       # Business logic, validation, exception-based error handling
  ├── app/api/        # Next.js API route handlers (createApiRoute wrapper)
  ├── exceptions/     # Custom exception classes
  ├── configs/        # Configuration files
  ├── constants/      # Application-wide constants
  ├── types/          # TypeScript type definitions
  └── enums/          # TypeScript enumerations
```

## Styling

- TailwindCSS v4 classes only — no inline styles
- Use `cn()` utility from `src/libs/utils.ts` for conditional classes
- `class-variance-authority` for component variants
- shadcn/ui New York style with neutral base color
