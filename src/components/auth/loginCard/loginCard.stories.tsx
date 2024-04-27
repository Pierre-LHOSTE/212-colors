import type { Meta, StoryObj } from "@storybook/react";
import LoginCard from "./LoginCard";

const meta = {
  title: "Auth/LoginCard",
  component: LoginCard,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
