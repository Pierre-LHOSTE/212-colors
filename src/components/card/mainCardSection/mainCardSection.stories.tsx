import type { Meta, StoryObj } from "@storybook/react";
import MainCardContent from "./MainCardSection";

const meta = {
  title: "Components/MainCard/MainCardContent",
  component: MainCardContent,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof MainCardContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "test",
    children: <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>,
  },
};
