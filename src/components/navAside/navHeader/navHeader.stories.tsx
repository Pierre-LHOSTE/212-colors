import type { Meta, StoryObj } from "@storybook/react";
import NavHeader from "./NavHeader";

const meta = {
  title: "NavAside/NavHeader/NavHeader",
  component: NavHeader,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "256px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof NavHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Lorem Ipsum",
  },
};
