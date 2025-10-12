import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getMessage } from "@/lib/intl";
import type { LocalePageProps } from "@/types/page";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: getMessage(locale, "pages.dashboard.title"),
		description: getMessage(locale, "pages.dashboard.description"),
		alternates: {
			canonical: `/${locale}/dashboard`,
			languages: {
				en: "/en/dashboard",
				vi: "/vi/dashboard",
			},
		},
	};
}

const DashboardPage = () => {
	return <DashboardView />;
};

export default DashboardPage;
