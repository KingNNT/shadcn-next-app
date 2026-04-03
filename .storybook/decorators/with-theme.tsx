import type { Decorator } from "@storybook/react";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeSync = ({ theme, children }: { theme: string; children: React.ReactNode }) => {
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme(theme);
	}, [theme, setTheme]);

	return <>{children}</>;
};

export const withTheme: Decorator = (Story, context) => {
	const theme = (context.globals?.theme as string) ?? "light";

	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
			<ThemeSync theme={theme}>
				<div className="min-h-screen bg-background p-4 text-foreground">
					<Story />
				</div>
			</ThemeSync>
		</ThemeProvider>
	);
};
