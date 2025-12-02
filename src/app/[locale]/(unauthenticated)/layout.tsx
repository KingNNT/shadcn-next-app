import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { ILocaleLayoutProps } from "@/types/page";

const PublicLayout = async ({ children, params }: ILocaleLayoutProps) => {
	const { locale } = await params;

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<Header locale={locale} />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;
