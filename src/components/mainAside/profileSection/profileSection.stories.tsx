import type { Meta, StoryObj } from "@storybook/react";
import ProfileSection from "./ProfileSection";

const meta = {
  title: "MainAside/Profile/ProfileSection",
  component: ProfileSection,
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
} satisfies Meta<typeof ProfileSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
