import type { Meta, StoryObj } from "@storybook/react";
import Color from "./Color";

const meta = {
  title: "Components/Color",
  component: Color,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "275px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Color>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
};
