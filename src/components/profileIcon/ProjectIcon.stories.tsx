import type { Meta, StoryObj } from "@storybook/react";
import ProfileIcon from "./ProfileIcon";

const meta = {
  title: "Project/Profile",
  component: ProfileIcon,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProfileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
