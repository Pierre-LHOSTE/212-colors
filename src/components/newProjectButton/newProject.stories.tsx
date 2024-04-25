import type { Meta, StoryObj } from "@storybook/react";
import NewProjectButton from "./NewProjectButton";

const meta = {
  title: "Project/NewProject",
  component: NewProjectButton,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NewProjectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
