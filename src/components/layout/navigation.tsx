"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useIntl } from "react-intl";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { ModeToggle } from "@/components/theme/mode-togger";
import type { LocaleSupport } from "@/enums";

interface INavigationProps {
	locale: LocaleSupport;
}

export const Navigation = ({ locale }: INavigationProps) => {
	const intl = useIntl();
	const { status } = useSession();

	return (
		<header className="border-b bg-card py-4">
			<div className="container mx-auto flex items-center justify-between">
				<Link href="/">
					<h1 className="font-semibold text-2xl">
						{intl.formatMessage({ id: "navigation.title" })}
					</h1>
				</Link>
				<nav className="flex items-center space-x-6">
					{status !== "authenticated" ? (
						<div className="flex items-center space-x-6 text-muted-foreground">
							<Link href={`/${locale}/login`} className="transition-colors hover:text-foreground">
								{intl.formatMessage({ id: "navigation.login" })}
							</Link>
							<Link
								href={`/${locale}/register`}
								className="transition-colors hover:text-foreground"
							>
								{intl.formatMessage({ id: "navigation.register" })}
							</Link>
						</div>
					) : null}
					<div className="flex items-center space-x-2">
						<LocaleSwitcher currentLocale={locale} />
						<ModeToggle />
					</div>
				</nav>
			</div>
		</header>
	);
};
