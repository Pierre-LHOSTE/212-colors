import type { Meta, StoryObj } from "@storybook/react";
import ButtonList from "./ButtonList";

const meta = {
  title: "NavAside/ButtonList",
  component: ButtonList,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div
        style={{ width: "256px", height: "256px", backgroundColor: "#13161C" }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof ButtonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
