"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntl } from "react-intl";

export function HomeContent() {
	const intl = useIntl();

	return (
		<main className="flex-grow container mx-auto py-16">
			<Card className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 shadow-md">
				<CardHeader>
					<CardTitle className="text-center text-3xl font-medium text-gray-100">
						{intl.formatMessage({ id: "pages.home.title" })}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-6 text-lg text-gray-300">
						{intl.formatMessage({ id: "pages.home.description" })}
					</p>
					<p className="text-gray-300">
						{intl.formatMessage({ id: "pages.home.fullDescription" })}
					</p>
				</CardContent>
			</Card>
		</main>
	);
}