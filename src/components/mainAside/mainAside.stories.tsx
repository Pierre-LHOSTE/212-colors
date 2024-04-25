import type { Meta, StoryObj } from "@storybook/react";
import MainAside from "./MainAside";

const meta = {
  title: "MainAside/Aside",
  component: MainAside,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof MainAside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: [
      {
        id: "1",
        name: "Project 1",
        position: 4,
        active: false,
        color: "#2487f2",
      },
      {
        id: "2",
        name: "Project 2",
        position: 2,
        active: false,
        color: "#ff1818",
      },
      {
        id: "3",
        name: "Project 3",
        position: 3,
        active: true,
        color: "#f77a00",
      },
    ],
  },
};
