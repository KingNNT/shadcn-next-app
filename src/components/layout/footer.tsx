"use client";

import { useIntl } from "react-intl";

export const Footer = () => {
	const intl = useIntl();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t bg-card py-6">
			<div className="container mx-auto">
				<div className="flex flex-col items-center space-y-2 text-center md:space-y-0">
					<p className="font-semibold">{intl.formatMessage({ id: "navigation.title" })}</p>
					<p className="text-muted-foreground text-sm">
						&copy; {currentYear} {intl.formatMessage({ id: "common.copyright" })}
					</p>
				</div>
			</div>
		</footer>
	);
};
