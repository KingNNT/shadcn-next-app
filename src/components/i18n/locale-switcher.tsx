"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocaleSupport } from "@/enums";

interface ILocaleSwitcherProps {
	currentLocale: LocaleSupport;
}

export const LocaleSwitcher = ({ currentLocale }: ILocaleSwitcherProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = (newLocale: LocaleSupport) => {
		// Remove current locale from pathname
		const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

		// Build new path with new locale
		const newPath = `/${newLocale}${pathWithoutLocale}`;

		// Set cookie for future visits
		// eslint-disable-next-line react-hooks/immutability
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`;

		// Navigate to new path
		router.push(newPath);
	};

	const localeNames = {
		[LocaleSupport.EN]: "English",
		[LocaleSupport.VI]: "Tiếng Việt",
	};

	const localeFlags = {
		[LocaleSupport.EN]: "🇺🇸",
		[LocaleSupport.VI]: "🇻🇳",
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<Globe className="h-4 w-4" />
					<span className="hidden sm:inline">{localeNames[currentLocale]}</span>
					<span className="sm:hidden">{localeFlags[currentLocale]}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.values(LocaleSupport).map((locale) => (
					<DropdownMenuItem
						key={locale}
						onClick={() => switchLocale(locale)}
						className={currentLocale === locale ? "bg-accent" : ""}
					>
						<span className="mr-2">{localeFlags[locale]}</span>
						{localeNames[locale]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
