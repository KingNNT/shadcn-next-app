import type { LocaleSupport } from "@/enums";

/**
 * Common props for pages under [locale] route
 */
export interface LocalePageProps {
	params: Promise<{
		locale: LocaleSupport;
	}>;
}

/**
 * Common props for layouts under [locale] route
 */
export interface LocaleLayoutProps {
	params: Promise<{
		locale: LocaleSupport;
	}>;
	children: React.ReactNode;
}
