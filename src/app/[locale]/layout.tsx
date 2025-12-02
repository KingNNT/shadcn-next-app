import type { Metadata } from "next";
import { IntlProvider } from "@/components/providers/intl-provider";
import type { ILocaleLayoutProps } from "@/types/page";

export async function generateMetadata({ params }: ILocaleLayoutProps): Promise<Metadata> {
	const { locale } = await params;

	// Basic metadata that will be enhanced per page
	return {
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: "/en",
				vi: "/vi",
			},
		},
	};
}

const LocaleLayout = async ({ children, params }: ILocaleLayoutProps) => {
	const { locale } = await params;

	return (
		<IntlProvider locale={locale}>
			<div data-locale={locale}>{children}</div>
		</IntlProvider>
	);
};

export default LocaleLayout;
