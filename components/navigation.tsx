"use client";

import { LocaleSupport } from "@/enums";
import { useIntl } from "react-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { ModeToggle } from "./mode-togger";

interface NavigationProps {
	locale: LocaleSupport;
}

export function Navigation({ locale }: NavigationProps) {
	const intl = useIntl();

	return (
		<header className="bg-gray-800 border-b border-gray-700 py-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-semibold text-gray-100">
					{intl.formatMessage({ id: "navigation.title" })}
				</h1>
				<nav className="flex items-center space-x-6">
					<ul className="flex space-x-6 text-gray-400">
						<li>
							<a
								href={`/${locale}/home`}
								className="hover:text-gray-100 transition-colors"
							>
								{intl.formatMessage({ id: "navigation.home" })}
							</a>
						</li>
						<li>
							<a
								href={`/${locale}/about`}
								className="hover:text-gray-100 transition-colors"
							>
								{intl.formatMessage({ id: "navigation.about" })}
							</a>
						</li>
						<li>
							<a
								href={`/${locale}/contact`}
								className="hover:text-gray-100 transition-colors"
							>
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
}