"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as z from "zod";
import { authApi, HttpStatusError } from "@/apis";
import { PasswordInput } from "@/components/common/password-input";
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

export const RegisterForm = () => {
	const router = useRouter();
	const intl = useIntl();
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const registerSchema = z
		.object({
			name: z
				.string()
				.min(1, intl.formatMessage({ id: "pages.register.validation.nameRequired" }))
				.min(2, intl.formatMessage({ id: "pages.register.validation.nameMinLength" })),
			email: z.string().email(intl.formatMessage({ id: "pages.register.validation.invalidEmail" })),
			password: z
				.string()
				.min(6, intl.formatMessage({ id: "pages.register.validation.passwordMinLength" })),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: intl.formatMessage({ id: "pages.register.validation.passwordsNotMatch" }),
			path: ["confirmPassword"],
		});

	type RegisterFormData = z.infer<typeof registerSchema>;

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		setError("");

		try {
			// Call the registration API using authApi
			await authApi.register({
				name: data.name,
				email: data.email,
				password: data.password,
			});

			// Registration successful - redirect to login
			const locale = intl.locale;
			router.push(`/${locale}/login`);
		} catch (error) {
			// Handle specific error cases
			if (error instanceof HttpStatusError) {
				if (error.statusCode === 409) {
					setError(intl.formatMessage({ id: "pages.register.emailExists" }));
				} else {
					setError(intl.formatMessage({ id: "pages.register.generalError" }));
				}
			} else {
				setError(intl.formatMessage({ id: "pages.register.generalError" }));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>{intl.formatMessage({ id: "pages.register.title" })}</CardTitle>
				<CardDescription>
					{intl.formatMessage({ id: "pages.register.description" })}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{intl.formatMessage({ id: "pages.register.name" })}</FormLabel>
									<FormControl>
										<Input
											type="text"
											autoComplete="name"
											placeholder={intl.formatMessage({ id: "pages.register.namePlaceholder" })}
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{intl.formatMessage({ id: "pages.register.email" })}</FormLabel>
									<FormControl>
										<Input
											type="email"
											autoComplete="email"
											placeholder={intl.formatMessage({ id: "pages.register.emailPlaceholder" })}
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
									<FormLabel>{intl.formatMessage({ id: "pages.register.password" })}</FormLabel>
									<FormControl>
										<PasswordInput
											autoComplete="new-password"
											placeholder={intl.formatMessage({ id: "pages.register.passwordPlaceholder" })}
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
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{intl.formatMessage({ id: "pages.register.confirmPassword" })}
									</FormLabel>
									<FormControl>
										<PasswordInput
											autoComplete="new-password"
											placeholder={intl.formatMessage({
												id: "pages.register.confirmPasswordPlaceholder",
											})}
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
								? intl.formatMessage({ id: "pages.register.signingUp" })
								: intl.formatMessage({ id: "pages.register.signUp" })}
						</Button>

						<div className="mt-4 text-center text-muted-foreground text-sm">
							{intl.formatMessage({ id: "pages.register.haveAccount" })}{" "}
							<Link href={`/${intl.locale}/login`} className="text-primary hover:underline">
								{intl.formatMessage({ id: "pages.register.loginLink" })}
							</Link>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
