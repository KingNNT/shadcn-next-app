import { Navigation } from "@/components/layout/navigation";
import type { LocaleSupport } from "@/enums";

interface HeaderProps {
	locale: LocaleSupport;
}

export const Header = ({ locale }: HeaderProps) => {
	return <Navigation locale={locale} />;
};
