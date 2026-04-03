import type { Decorator } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "../mocks/messages";

export const withIntl: Decorator = (Story, context) => {
	const locale = (context.globals?.locale as string) ?? "en";
	const localeMessages = messages[locale as keyof typeof messages] ?? messages.en;

	return (
		<NextIntlClientProvider locale={locale} messages={localeMessages} timeZone="Asia/Ho_Chi_Minh">
			<Story />
		</NextIntlClientProvider>
	);
};
