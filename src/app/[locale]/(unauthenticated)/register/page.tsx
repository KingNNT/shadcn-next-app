import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { getMessage } from "@/lib/intl";
import type { ILocalePageProps } from "@/types/page";

export async function generateMetadata({ params }: ILocalePageProps): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: getMessage(locale, "pages.register.title"),
		description: getMessage(locale, "pages.register.description"),
		alternates: {
			canonical: `/${locale}/register`,
			languages: {
				en: "/en/register",
				vi: "/vi/register",
			},
		},
	};
}

const RegisterPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
