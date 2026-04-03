import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
	title: "UI/Card",
	component: Card,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description text goes here.</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">
					This is the card content area. You can place any content here.
				</p>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button variant="outline">Cancel</Button>
				<Button>Confirm</Button>
			</CardFooter>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardContent>
				<p className="text-sm">Simple card with content only.</p>
			</CardContent>
		</Card>
	),
};

export const WithAction: Story = {
	render: () => (
		<Card className="w-[360px]">
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						Mark all read
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">Review your notifications and take action.</p>
			</CardContent>
		</Card>
	),
};
