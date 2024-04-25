import type { Meta, StoryObj } from "@storybook/react";
import NewProjectButton from "./NewProjectButton";

const meta = {
  title: "MainAside/ProjectList/NewProject",
  component: NewProjectButton,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof NewProjectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
