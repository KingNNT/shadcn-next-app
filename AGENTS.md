# Agent Guide (Next.js 16 App)

## Environment & Development
1. Always operate inside Docker: `make dev` or `make shell`.
2. Build via `make build`; lint with `make lint`; scan secrets with `yarn scan`.
3. Apply formatting using `yarn lint:fix`; avoid external Biome runs.
4. Run security scans before commits: `yarn precommit` (format, lint, scan).
5. Tests are not configured, so single-test execution is currently unavailable.
6. When tests arrive, prefer focused commands like `yarn test path --watch`.
7. Use Yarn 4 zero-install; never switch package managers.

## TypeScript & Code Quality
8. TypeScript strict mode is on—declare explicit prop, param, and return types.
9. Favor `readonly`, literal unions, and avoid `any` or implicit `undefined`.
10. Import order: Node/third-party, absolute `@/` aliases, then relative modules.
11. Keep React server components synchronous; mark as `async` only when awaiting data.
12. Prefer arrow-function components; memoize client hooks when performance-sensitive.

## Styling & UI
13. Styling relies on Tailwind v4; compose classes with `cn` rather than inline styles.
14. Follow shadcn/ui patterns; reuse `src/components/ui` variants before adding new ones.
15. Add messaging to both `src/lang/en.json` and `src/lang/vi.json`; access via `react-intl`.

## Naming & Organization
16. Naming: kebab-case files/routes, PascalCase components, camelCase utilities.
17. Directory structure:
    - `src/apis/` - HTTP clients (extend BaseApi, use ky)
    - `src/services/` - Business logic (throw exceptions, no HTTP)
    - `src/app/api/` - Route handlers (use createApiRoute wrapper)
    - `src/exceptions/` - Custom exceptions (extend AuthException base)
    - `src/configs/` - Configuration files (API config, env vars)
    - `src/utils/` - Pure utilities (logger, error handlers, helpers)
    - `src/lib/stores/` - Zustand stores (re-export via index.ts)

## Architecture Patterns
18. Three-layer architecture:
    - **API Clients** (`src/apis/`): HTTP communication via ky with retry logic
    - **Services** (`src/services/`): Business logic throwing typed exceptions
    - **API Routes** (`src/app/api/`): Route handlers using createApiRoute wrapper
19. Error handling flow:
    - Services throw typed exceptions (e.g., `InvalidEmailException`)
    - API routes use `createApiRoute` to catch and convert exceptions to responses
    - Use `handleApiError` for manual error handling
20. API responses follow standardized format:
    - Success: `ISuccessResponse<T>` with `status_code`, `success`, `message`, `data`
    - Error: `IErrorResponse<T>` with `status_code`, `success`, `message`, `error`

## Forms & Validation
21. Validate forms with React Hook Form + Zod; surface user-friendly errors.
22. Map error codes to i18n messages via `AUTH_ERROR_MESSAGE_IDS`.

## Security & Logging
23. Log via `logger` from `src/utils/logger.ts` for consistent formatting.
24. Log sensitive details server-side only; keep secrets in env vars with NextAuth.
25. Use gitleaks to detect secrets; run `yarn scan` before commits.

## Best Practices
26. API clients auto-inject auth tokens from NextAuth sessions.
27. Configure retry logic, timeouts in `src/configs/api.config.ts`.
28. Centralize error codes in `src/constants/error-codes.ts`.
29. Use `_200`, `_201`, `_400`, `_401` response helpers in API routes.
30. No Cursor or Copilot rule files exist; treat this document as authoritative.
