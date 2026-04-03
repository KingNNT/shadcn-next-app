import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
		variant: "default",
		size: "default",
	},
};

export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			{(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((v) => (
				<Button key={v} variant={v}>
					{v}
				</Button>
			))}
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			{(["sm", "default", "lg"] as const).map((s) => (
				<Button key={s} size={s}>
					{s}
				</Button>
			))}
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled",
		disabled: true,
	},
};
