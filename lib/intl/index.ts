import { LocaleSupport } from "@/enums";

// Import message files
import enMessages from "@/lang/en.json";
import viMessages from "@/lang/vi.json";

export const messages = {
	[LocaleSupport.EN]: enMessages,
	[LocaleSupport.VI]: viMessages,
};

// Flatten nested object for react-intl
function flattenMessages(
	nestedMessages: Record<string, unknown>,
	prefix = "",
): Record<string, string> {
	const flattened: Record<string, string> = {};

	Object.keys(nestedMessages).forEach((key) => {
		const value = nestedMessages[key];
		const newKey = prefix ? `${prefix}.${key}` : key;

		if (typeof value === "object" && value !== null) {
			Object.assign(flattened, flattenMessages(value, newKey));
		} else {
			flattened[newKey] = value;
		}
	});

	return flattened;
}

export function getMessages(locale: LocaleSupport) {
	const nestedMessages = messages[locale] || messages[LocaleSupport.EN];
	return flattenMessages(nestedMessages);
}

// Helper function to get nested message for metadata
export function getMessage(locale: LocaleSupport, path: string): string {
	const msgs = getMessages(locale);
	return msgs[path] || "";
}

export function getLocaleDirection(locale: LocaleSupport): "ltr" | "rtl" {
	// Currently all supported locales are left-to-right
	// Add logic here if you support RTL languages like Arabic or Hebrew
	// The locale parameter is reserved for future RTL language support
	void locale;
	return "ltr";
}

export const defaultLocale = LocaleSupport.EN;
export const supportedLocales = Object.values(LocaleSupport);
