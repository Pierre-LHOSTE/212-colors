import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta = {
  title: "App/App",
  component: App,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: "900px", width: "900px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof App>;

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

export const Overflow: Story = {
  args: {
    projects: [
      {
        id: "1",
        name: "Project 1",
        position: 1,
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
      {
        id: "4",
        name: "Project 4",
        position: 4,
        active: false,
        color: "#f77a",
      },
      {
        id: "5",
        name: "Project 5",
        position: 5,
        active: false,
        color: "#8e44ad",
      },
      {
        id: "6",
        name: "Project 6",
        position: 6,
        active: false,
        color: "#1da1f2",
      },
      {
        id: "7",
        name: "Project 7",
        position: 7,
        active: false,
        color: "#008000",
      },
      {
        id: "8",
        name: "Project 8",
        position: 8,
        active: false,
        color: "#800080",
      },
      {
        id: "9",
        name: "Project 9",
        position: 9,
        active: false,
        color: "#ffd700",
      },
      {
        id: "10",
        name: "Project 10",
        position: 10,
        active: false,
        color: "#00ffff",
      },
      {
        id: "11",
        name: "Project 11",
        position: 11,
        active: false,
        color: "#808000",
      },
      {
        id: "12",
        name: "Project 12",
        position: 12,
        active: false,
        color: "#ff69b4",
      },
      {
        id: "13",
        name: "Project 13",
        position: 13,
        active: false,
        color: "#cd5c5c",
      },
      {
        id: "14",
        name: "Project 14",
        position: 14,
        active: false,
        color: "#4b0082",
      },
    ],
  },
};
