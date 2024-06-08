import type { Meta, StoryObj } from "@storybook/react";
import ThemeColorsCard from "./ThemeColorsCard";

const meta = {
  title: "Section/Color/Theme",
  component: ThemeColorsCard,
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
} satisfies Meta<typeof ThemeColorsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colors: [
      {
        color: "#FF0000",
        name: "Danger",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
        type: "danger",
      },
      {
        color: "#FFA500",
        name: "Warning",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
        type: "warning",
      },
      {
        color: "#D6A3FF",
        name: "Info",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
        type: "info",
      },
      {
        color: "#222222",
        name: "Dark",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
      {
        color: "#808080",
        name: "Neutral",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
      {
        color: "#F2F2F2",
        name: "Light",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
    ],
    name: "Light",
    type: "light",
  },
};
