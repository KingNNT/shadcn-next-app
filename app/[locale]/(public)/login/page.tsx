import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { getMessage } from "@/lib/intl";
import type { LocalePageProps } from "@/types/page";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: getMessage(locale, "pages.login.title"),
		description: getMessage(locale, "pages.login.description"),
		alternates: {
			canonical: `/${locale}/login`,
			languages: {
				en: "/en/login",
				vi: "/vi/login",
			},
		},
	};
}

const LoginPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
