import type { LocaleSupport } from "@/enums";

/**
 * Common props for pages under [locale] route
 */
export interface ILocalePageProps {
	params: Promise<{
		locale: LocaleSupport;
	}>;
}

/**
 * Common props for layouts under [locale] route
 */
export interface ILocaleLayoutProps {
	params: Promise<{
		locale: LocaleSupport;
	}>;
	children: React.ReactNode;
}

export type LocalePageProps = ILocalePageProps;
export type LocaleLayoutProps = ILocaleLayoutProps;
