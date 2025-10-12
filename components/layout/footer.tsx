"use client";

import { useIntl } from "react-intl";

export const Footer = () => {
	const intl = useIntl();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t bg-card py-6">
			<div className="container mx-auto">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					{/* Company Info */}
					<div className="text-center md:text-left">
						<p className="font-semibold">{intl.formatMessage({ id: "navigation.title" })}</p>
						<p className="text-muted-foreground text-sm">
							&copy; {currentYear} {intl.formatMessage({ id: "common.copyright" })}
						</p>
					</div>

					{/* Quick Links */}
					<nav className="flex space-x-6 text-muted-foreground text-sm">
						<a href="#" className="transition-colors hover:text-foreground">
							{intl.formatMessage({ id: "navigation.home" })}
						</a>
						<a href="#" className="transition-colors hover:text-foreground">
							{intl.formatMessage({ id: "navigation.about" })}
						</a>
						<a href="#" className="transition-colors hover:text-foreground">
							{intl.formatMessage({ id: "navigation.contact" })}
						</a>
					</nav>
				</div>
			</div>
		</footer>
	);
};
