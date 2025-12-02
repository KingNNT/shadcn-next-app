import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import { getMessage } from "@/lib/intl";
import type { ILocalePageProps } from "@/types/page";

export async function generateMetadata({ params }: ILocalePageProps): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: getMessage(locale, "pages.home.title"),
		description: getMessage(locale, "pages.home.description"),
		alternates: {
			canonical: `/${locale}/home`,
			languages: {
				en: "/en/home",
				vi: "/vi/home",
			},
		},
	};
}

const HomePage = () => {
	return <HomeView />;
};

export default HomePage;
