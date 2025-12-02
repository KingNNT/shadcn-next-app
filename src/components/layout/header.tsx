import { Navigation } from "@/components/layout/navigation";
import type { LocaleSupport } from "@/enums";

interface IHeaderProps {
	locale: LocaleSupport;
}

export const Header = ({ locale }: IHeaderProps) => {
	return <Navigation locale={locale} />;
};
