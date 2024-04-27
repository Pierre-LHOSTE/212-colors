import type { Meta, StoryObj } from "@storybook/react";
import RegisterCard from "./RegisterCard";

const meta = {
  title: "Auth/RegisterCard",
  component: RegisterCard,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof RegisterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
