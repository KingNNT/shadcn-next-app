import type { Preview } from "@storybook/react";
import { withIntl, withTheme } from "./decorators";
import "../src/app/globals.css";

const preview: Preview = {
	decorators: [withTheme, withIntl],
	parameters: {
		backgrounds: { disable: true },
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /date/i,
			},
		},
	},
	globalTypes: {
		theme: {
			description: "Theme for components",
			toolbar: {
				title: "Theme",
				icon: "circlehollow",
				items: [
					{ value: "light", icon: "sun", title: "Light" },
					{ value: "dark", icon: "moon", title: "Dark" },
				],
				dynamicTitle: true,
			},
		},
		locale: {
			description: "Locale for i18n",
			toolbar: {
				title: "Locale",
				icon: "globe",
				items: [
					{ value: "en", title: "English" },
					{ value: "vi", title: "Vietnamese" },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		locale: "en",
		theme: "light",
	},
};

export default preview;
