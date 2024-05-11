import type { Meta, StoryObj } from "@storybook/react";
import SecondaryCard from "./SecondaryCard";

const meta = {
  title: "Section/Color/Secondary",
  component: SecondaryCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ maxHeight: "800px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof SecondaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
