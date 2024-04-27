import type { Meta, StoryObj } from "@storybook/react";
import NavButtonList from "./NavButtonList";

const meta = {
  title: "NavAside/NavButtonList/ButtonList",
  component: NavButtonList,
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
} satisfies Meta<typeof NavButtonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
