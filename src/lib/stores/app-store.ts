import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LocaleSupport } from "@/enums";

type Theme = "light" | "dark" | "system";

interface IAppState {
	language: LocaleSupport;
	timezone: string;
	theme: Theme;
	setLanguage: (language: LocaleSupport) => void;
	setTimezone: (timezone: string) => void;
	setTheme: (theme: Theme) => void;
	reset: () => void;
}

const initialState = {
	language: LocaleSupport.EN,
	timezone: "UTC",
	theme: "system" as Theme,
};

export const useAppStore = create<IAppState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				setLanguage: (language: LocaleSupport) => set({ language }),
				setTimezone: (timezone: string) => set({ timezone }),
				setTheme: (theme: Theme) => set({ theme }),
				reset: () => set(initialState),
			}),
			{
				name: "app-store",
			},
		),
	),
);
