"use client";

import { useIntl } from "react-intl";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { ModeToggle } from "@/components/theme/mode-togger";
import type { LocaleSupport } from "@/enums";

interface NavigationProps {
	locale: LocaleSupport;
}

export const Navigation = ({ locale }: NavigationProps) => {
	const intl = useIntl();

	return (
		<header className="border-b bg-card py-4">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="font-semibold text-2xl">{intl.formatMessage({ id: "navigation.title" })}</h1>
				<nav className="flex items-center space-x-6">
					<ul className="flex space-x-6 text-muted-foreground">
						<li>
							<a href={`/${locale}/home`} className="transition-colors hover:text-foreground">
								{intl.formatMessage({ id: "navigation.home" })}
							</a>
						</li>
						<li>
							<a href={`/${locale}/about`} className="transition-colors hover:text-foreground">
								{intl.formatMessage({ id: "navigation.about" })}
							</a>
						</li>
						<li>
							<a href={`/${locale}/contact`} className="transition-colors hover:text-foreground">
								{intl.formatMessage({ id: "navigation.contact" })}
							</a>
						</li>
					</ul>
					<div className="flex items-center space-x-2">
						<LocaleSwitcher currentLocale={locale} />
						<ModeToggle />
					</div>
				</nav>
			</div>
		</header>
	);
};
