import { LocaleSupport } from "@/enums";
import { Navigation } from "@/components/navigation";
import { HomeContent } from "@/components/home-content";
import { Metadata } from "next";
import { getMessage } from "@/lib/intl";

interface HomePageProps {
	params: {
		locale: LocaleSupport;
	};
}

export async function generateMetadata({
	params,
}: HomePageProps): Promise<Metadata> {
	const { locale } = params;

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

export default function HomePage({ params }: HomePageProps) {
	const { locale } = params;

	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
			{/* Navigator */}
			<Navigation locale={locale} />

			{/* Main Content */}
			<HomeContent />

			{/* Footer */}
			<footer className="bg-gray-800 border-t border-gray-700 py-4">
				<div className="container mx-auto text-center text-gray-400">
					<p>&copy; 2025 Kingnnt.org.</p>
				</div>
			</footer>
		</div>
	);
}
