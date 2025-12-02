"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AuthErrorCode } from "@/constants";
import { AUTH_ERROR_CODES, AUTH_ERROR_MESSAGE_IDS } from "@/constants";

export const LoginForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const intl = useIntl();
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	// Get callback URL from query params (where user was trying to go)
	const callbackUrl = searchParams.get("callback-url");

	const isAuthErrorCode = (code: unknown): code is AuthErrorCode =>
		typeof code === "string" && code in AUTH_ERROR_MESSAGE_IDS;

	const loginSchema = z.object({
		email: z.string().email(intl.formatMessage({ id: "pages.login.validation.invalidEmail" })),
		password: z
			.string()
			.min(6, intl.formatMessage({ id: "pages.login.validation.passwordMinLength" })),
	});

	type LoginFormData = z.infer<typeof loginSchema>;

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError("");

		try {
			const signInResult = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
				callbackUrl: callbackUrl ?? undefined,
			});

			if (!signInResult || signInResult.error) {
				const rawErrorCode = signInResult?.error;
				const errorCode = isAuthErrorCode(rawErrorCode)
					? rawErrorCode
					: AUTH_ERROR_CODES.INVALID_CREDENTIALS;
				const messageId = AUTH_ERROR_MESSAGE_IDS[errorCode];

				setError(intl.formatMessage({ id: messageId }));
				return;
			}

			const locale = intl.locale;
			const redirectUrl = signInResult.url || callbackUrl || `/${locale}/dashboard`;
			router.push(redirectUrl);
			router.refresh();
		} catch {
			setError(intl.formatMessage({ id: "pages.login.generalError" }));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>{intl.formatMessage({ id: "pages.login.title" })}</CardTitle>
				<CardDescription>{intl.formatMessage({ id: "pages.login.description" })}</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{intl.formatMessage({ id: "pages.login.email" })}</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={intl.formatMessage({ id: "pages.login.emailPlaceholder" })}
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{intl.formatMessage({ id: "pages.login.password" })}</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder={intl.formatMessage({ id: "pages.login.passwordPlaceholder" })}
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{error && (
							<div className="rounded-md bg-red-50 p-3 text-red-500 text-sm dark:bg-red-950">
								{error}
							</div>
						)}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading
								? intl.formatMessage({ id: "pages.login.signingIn" })
								: intl.formatMessage({ id: "pages.login.signIn" })}
						</Button>

						<div className="mt-4 text-center text-muted-foreground text-sm">
							{intl.formatMessage({ id: "pages.login.demoCredentials" })}
						</div>

						<div className="mt-4 text-center text-muted-foreground text-sm">
							{intl.formatMessage({ id: "pages.login.noAccount" })}{" "}
							<Link href={`/${intl.locale}/register`} className="text-primary hover:underline">
								{intl.formatMessage({ id: "pages.login.registerLink" })}
							</Link>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
