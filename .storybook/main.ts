import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-themes",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../public"],
	viteFinal(config) {
		config.resolve = {
			...config.resolve,
			alias: {
				...((config.resolve?.alias as Record<string, string>) ?? {}),
				"@": path.resolve(__dirname, "../src"),
			},
		};
		return config;
	},
};

export default config;
