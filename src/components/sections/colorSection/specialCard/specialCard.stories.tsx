import type { Meta, StoryObj } from "@storybook/react";
import SpecialCard from "./SpecialCard";

const meta = {
  title: "Section/Color/Special",
  component: SpecialCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div
        style={{
          maxWidth: "1000px",
          display: "flex",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof SpecialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
