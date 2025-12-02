"use client";

import { useIntl } from "react-intl";

export const HomeView = () => {
	const intl = useIntl();

	return (
		<main className="container mx-auto flex-grow py-16">
			<div className="text-center">
				<h1 className="font-bold text-4xl">{intl.formatMessage({ id: "common.welcome" })}</h1>
			</div>
		</main>
	);
};
