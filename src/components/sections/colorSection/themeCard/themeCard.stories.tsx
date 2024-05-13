import type { Meta, StoryObj } from "@storybook/react";
import ThemeCard from "./ThemeCard";

const meta = {
  title: "Section/Color/Theme",
  component: ThemeCard,
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
} satisfies Meta<typeof ThemeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
