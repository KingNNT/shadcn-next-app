"use client";

import { LayoutDashboard, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import type { LocaleSupport } from "@/enums";
import { cn } from "@/lib/utils";

interface PrivateSidebarProps {
	locale: LocaleSupport;
	isOpen?: boolean;
	onClose?: () => void;
}

export const PrivateSidebar = ({ locale, isOpen = true, onClose }: PrivateSidebarProps) => {
	const intl = useIntl();
	const pathname = usePathname();

	const menuItems = [
		{
			icon: LayoutDashboard,
			label: intl.formatMessage({ id: "navigation.dashboard" }),
			href: `/${locale}/dashboard`,
		},
		{
			icon: User,
			label: intl.formatMessage({ id: "navigation.profile" }),
			href: `/${locale}/profile`,
		},
		{
			icon: Settings,
			label: intl.formatMessage({ id: "navigation.settings" }),
			href: `/${locale}/settings`,
		},
	];

	return (
		<>
			{/* Overlay for mobile */}
			{isOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} />}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed top-0 left-0 z-30 flex h-screen flex-col border-r bg-card transition-transform duration-300 lg:sticky",
					"lg:translate-x-0",
					isOpen ? "translate-x-0" : "-translate-x-full",
				)}
				style={{ width: "250px" }}
			>
				{/* Close button for mobile */}
				<div className="flex items-center justify-between border-b p-4 lg:hidden">
					<h2 className="font-semibold text-lg">{intl.formatMessage({ id: "navigation.menu" })}</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Navigation menu */}
				<nav className="flex-1 overflow-y-auto p-4">
					<ul className="space-y-2">
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<li key={item.href}>
									<Link
										href={item.href}
										className={cn(
											"flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors",
											isActive
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground",
										)}
										onClick={onClose}
									>
										<Icon className="h-5 w-5" />
										<span>{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>
		</>
	);
};
