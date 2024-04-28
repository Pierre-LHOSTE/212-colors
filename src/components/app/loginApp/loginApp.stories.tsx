import type { Meta, StoryObj } from "@storybook/react";
import LoginApp from "./LoginApp";

const meta = {
  title: "App/LoginApp",
  component: LoginApp,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: "900px", width: "1200px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof LoginApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
