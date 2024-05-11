import type { Meta, StoryObj } from "@storybook/react";
import ColorApp from "./ColorApp";

const meta = {
  title: "App/ColorApp",
  component: ColorApp,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{}}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof ColorApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
