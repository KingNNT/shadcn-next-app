"use client";

import { useState } from "react";
import { PrivateHeader } from "@/components/layout/private-header";
import { PrivateSidebar } from "@/components/layout/private-sidebar";
import type { LocaleSupport } from "@/enums";

interface IPrivateLayoutWrapperProps {
	locale: LocaleSupport;
	children: React.ReactNode;
}

export const PrivateLayoutWrapper = ({ locale, children }: IPrivateLayoutWrapperProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	return (
		<div className="flex min-h-screen bg-background">
			<PrivateSidebar locale={locale} isOpen={isSidebarOpen} onClose={closeSidebar} />
			<div className="flex flex-1 flex-col lg:ml-0">
				<PrivateHeader locale={locale} onMenuClick={toggleSidebar} />
				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
};
