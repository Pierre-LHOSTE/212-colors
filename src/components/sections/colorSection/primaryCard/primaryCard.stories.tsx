import type { Meta, StoryObj } from "@storybook/react";
import PrimaryCard from "./PrimaryCard";

const meta = {
  title: "Section/Color/Primary",
  component: PrimaryCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: "700px", width: "900px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof PrimaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colors: [
      {
        color: "#FF1818",
      },
    ],
  },
};

export const WithName: Story = {
  args: {
    colors: [
      {
        color: "#FF1818",
        name: "Lorem Ipsum",
      },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    colors: [
      {
        color: "#FF1818",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
    ],
  },
};

export const WitNameAndDescription: Story = {
  args: {
    colors: [
      {
        name: "Lorem Ipsum",
        color: "#FF1818",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
    ],
  },
};

export const WithMultiple: Story = {
  args: {
    colors: [
      {
        name: "Lorem Ipsum",
        color: "#FF1818",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
      {
        name: "Lorem Ipsum",
        color: "#FF1818",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      },
    ],
  },
};
