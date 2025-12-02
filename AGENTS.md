# Agent Guide (Next.js 16 App)
1. Always operate inside Docker: `make dev` or `make shell`.
2. Build via `make build`; lint with `make lint`; restart containers with `make restart` after env tweaks.
3. Apply formatting using `yarn lint:fix`; avoid external Biome runs.
4. Tests are not configured, so single-test execution is currently unavailable.
5. When tests arrive, prefer focused commands like `yarn test path --watch`.
6. Use Yarn 4 zero-install; never switch package managers.
7. TypeScript strict mode is on—declare explicit prop, param, and return types.
8. Favor `readonly`, literal unions, and avoid `any` or implicit `undefined`.
9. Import order: Node/third-party, absolute `@/` aliases, then relative modules.
10. Keep React server components synchronous; mark as `async` only when awaiting data.
11. Prefer arrow-function components; memoize client hooks when performance-sensitive.
12. Styling relies on Tailwind v4; compose classes with `cn` rather than inline styles.
13. Add messaging to both `lang/en.json` and `lang/vi.json`; access via `react-intl`.
14. Follow shadcn/ui patterns; reuse `components/ui` variants before adding new ones.
15. Naming: kebab-case files/routes, PascalCase components, camelCase utilities.
16. Keep Zustand stores under `lib/stores` and re-export hooks via `lib/stores/index.ts`.
17. Validate forms with React Hook Form + Zod; surface user-friendly errors.
18. Log sensitive details server-side only; keep secrets in env vars with NextAuth.
19. No Cursor or Copilot rule files exist; treat this document as authoritative.
