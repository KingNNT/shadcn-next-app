import type { Decorator } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

export const withSession: Decorator = (Story, context) => {
	const session = context.parameters?.session ?? null;

	return (
		<SessionProvider session={session}>
			<Story />
		</SessionProvider>
	);
};
