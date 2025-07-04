import type { Metadata } from "next";
import { LocaleSupport } from "@/enums";
import { IntlProvider } from "@/components/intl-provider";

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: {
		locale: LocaleSupport;
	};
}

export async function generateMetadata({
	params,
}: LocaleLayoutProps): Promise<Metadata> {
	const { locale } = params;

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

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = params;

	return (
		<IntlProvider locale={locale}>
			<div data-locale={locale}>
				{children}
			</div>
		</IntlProvider>
	);
}