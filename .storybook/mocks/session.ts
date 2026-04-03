import type { Session } from "next-auth";

export const mockAuthenticatedSession: Session = {
	user: {
		id: "1",
		name: "Demo User",
		email: "demo@example.com",
	},
	expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockUnauthenticatedSession: Session | null = null;
