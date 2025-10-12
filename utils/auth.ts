import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "user@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// TODO: Replace this with your actual authentication logic
				// This is a simple example - you should validate against your database
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				// Example: Simple hardcoded user for demo purposes
				// In production, verify credentials against your database
				if (credentials.email === "demo@example.com" && credentials.password === "demo123") {
					return {
						id: "1",
						name: "Demo User",
						email: "demo@example.com",
					};
				}

				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized() {
			// Let middleware handle all authentication logic
			return true;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
