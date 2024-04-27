import type { Meta, StoryObj } from "@storybook/react";
import ContentCardContent from "./ContentCardContent";

const meta = {
  title: "Components/ContentCardContent",
  component: ContentCardContent,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof ContentCardContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "test",
    children: <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>,
  },
};
