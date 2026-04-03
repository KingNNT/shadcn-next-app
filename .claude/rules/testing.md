---
paths:
  - "src/**/*.test.ts"
  - "src/**/*.test.tsx"
  - "src/**/*.stories.tsx"
  - "src/**/*.spec.ts"
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "tests/**"
  - "e2e/**"
  - ".storybook/**"
---

# Testing (Vitest + Playwright + Storybook)

## Test Types & Location

| Type        | Location                            | Naming              | Runner         |
| ----------- | ----------------------------------- | ------------------- | -------------- |
| Unit        | Co-located in `src/`                | `{name}.test.tsx`   | Vitest (jsdom) |
| Integration | `tests/integration/`                | `{name}.test.ts`    | Vitest (node)  |
| E2E         | `e2e/tests/{domain}/`              | `{name}.spec.ts`    | Playwright     |
| Stories     | Co-located in `src/`                | `{name}.stories.tsx` | Storybook      |

## Unit Tests

- Wrap components with mocked providers (next-intl, next-auth, next/navigation)
- Use `userEvent.setup()` for interactions, not `fireEvent`
- Test domain logic in isolation — services, utilities, validators

## Service Tests

- Assert exceptions by `error.name` — not `instanceof`
- Reason: `Object.setPrototypeOf` in custom exceptions breaks `instanceof` across module boundaries

## E2E Tests (Playwright)

- **Page Object pattern** — every page gets a class in `e2e/pages/`
- Use semantic locators: `getByRole()`, `getByLabel()`, `getByText()` — avoid CSS selectors
- Test both happy path and auth redirects (unauthenticated → login with callback URL)
- Test both locales: `/en/` and `/vi/` paths

## Storybook Stories

- Co-locate stories next to their component: `button.stories.tsx` alongside `button.tsx`
- Use CSF3 format: `Meta<typeof Component>` default export + named `StoryObj<typeof meta>` exports
- Add `tags: ["autodocs"]` to generate automatic documentation
- Use `play` functions with `@storybook/test` (`userEvent`, `expect`, `within`) for interaction stories
- Global decorators (`withTheme`, `withIntl`) are applied automatically via `.storybook/preview.ts`
- For components needing auth context, add `withSession` decorator per-story via `decorators` array
- Storybook framework is `@storybook/react-vite` (not `nextjs-vite` — incompatible with Next.js 16)

## General Rules

- One assertion concept per test (multiple `expect` calls fine if they assert one logical thing)
- Test names describe behavior: `it("should reject invalid email")` not `it("test email validation")`
- When adding new components, create mock factories before writing tests
- All test commands run inside Docker: `make exec CMD="yarn test"`
