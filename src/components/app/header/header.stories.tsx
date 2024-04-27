import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "App/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: "900px", width: "900px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
