"use client";

import { IntlProvider as ReactIntlProvider } from "react-intl";
import { LocaleSupport } from "@/enums";
import { getLocaleDirection, getMessages } from "@/lib/intl";

interface IIntlProviderProps {
	locale: LocaleSupport;
	children: React.ReactNode;
}

export const IntlProvider = ({ locale, children }: IIntlProviderProps) => {
	const messages = getMessages(locale);
	const textDirection = getLocaleDirection(locale);

	return (
		<ReactIntlProvider
			locale={locale}
			messages={messages}
			defaultLocale={LocaleSupport.EN}
			textComponent="span"
		>
			<div dir={textDirection}>{children}</div>
		</ReactIntlProvider>
	);
};
