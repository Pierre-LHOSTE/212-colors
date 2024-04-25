import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta = {
  title: "Auth/Register",
  component: RegisterForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
