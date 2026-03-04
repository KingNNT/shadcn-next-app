import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		setupFiles: ["./tests/setup/vitest.setup.ts"],
		exclude: ["**/node_modules/**", "**/.next/**", "e2e/**"],
		projects: [
			{
				extends: true,
				test: {
					name: "unit",
					include: ["src/**/*.test.{ts,tsx}"],
					environment: "jsdom",
				},
			},
			{
				extends: true,
				test: {
					name: "integration",
					include: ["tests/integration/**/*.test.{ts,tsx}"],
					environment: "node",
				},
			},
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
