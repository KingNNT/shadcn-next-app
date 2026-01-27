import { LocaleSupport } from "@/enums";

export const locales = [LocaleSupport.EN, LocaleSupport.VI] as const;
export const defaultLocale = LocaleSupport.EN;
export type Locale = (typeof locales)[number];
