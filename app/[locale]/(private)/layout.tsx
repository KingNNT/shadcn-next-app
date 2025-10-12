import { PrivateLayoutWrapper } from "@/components/layout/private-layout-wrapper";
import type { LocaleLayoutProps } from "@/types/page";

const PrivateLayout = async ({ children, params }: LocaleLayoutProps) => {
	const { locale } = await params;

	return <PrivateLayoutWrapper locale={locale}>{children}</PrivateLayoutWrapper>;
};

export default PrivateLayout;
