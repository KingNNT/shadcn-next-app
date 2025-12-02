import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getMessage } from "@/lib/intl";
import type { ILocalePageProps } from "@/types/page";

export async function generateMetadata({ params }: ILocalePageProps): Promise<Metadata> {
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
