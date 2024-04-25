import type { Meta, StoryObj } from "@storybook/react";
import ProfileButton from "./ProfileButton";

const meta = {
  title: "MainAside/Profile/ProfileButton",
  component: ProfileButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "86px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof ProfileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
