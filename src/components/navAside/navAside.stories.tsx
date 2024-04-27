import type { Meta, StoryObj } from "@storybook/react";
import NavAside from "./NavAside";

const meta = {
  title: "NavAside/NavAside",
  component: NavAside,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: "700px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof NavAside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
