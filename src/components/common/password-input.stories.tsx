import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { PasswordInput } from "./password-input";

const meta: Meta<typeof PasswordInput> = {
	title: "Common/PasswordInput",
	component: PasswordInput,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter password",
	},
};

export const WithValue: Story = {
	args: {
		placeholder: "Enter password",
		defaultValue: "secret123",
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "Enter password",
		disabled: true,
	},
};

export const ToggleVisibility: Story = {
	args: {
		placeholder: "Enter password",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Enter password");
		const toggle = canvas.getByRole("button");

		await expect(input).toHaveAttribute("type", "password");
		await userEvent.click(toggle);
		await expect(input).toHaveAttribute("type", "text");
		await userEvent.click(toggle);
		await expect(input).toHaveAttribute("type", "password");
	},
};
