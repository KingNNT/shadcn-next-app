import { PrivateLayoutWrapper } from "@/components/layout/private-layout-wrapper";
import type { ILocaleLayoutProps } from "@/types/page";

const PrivateLayout = async ({ children, params }: ILocaleLayoutProps) => {
	const { locale } = await params;

	return <PrivateLayoutWrapper locale={locale}>{children}</PrivateLayoutWrapper>;
};

export default PrivateLayout;
