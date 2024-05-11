import type { Meta, StoryObj } from "@storybook/react";
import MainCard from "../card/MainCard";
import Color from "./Color";

const meta = {
  title: "Components/Color",
  component: Color,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: "400px", maxHeight: "400px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Color>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    id: "color-1",
    index: 1,
  },
};

export const WithoutName: Story = {
  args: {
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    id: "color-1",
    index: 1,
  },
};

export const WithoutDescription: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    id: "color-1",
    index: 1,
  },
};

export const WithoutAnyText: Story = {
  args: {
    color: "#FF1818",
    id: "color-1",
    index: 1,
  },
};

export const IntoCard: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    id: "color-1",
    index: 1,
  },
  decorators: [
    (Story: any) => (
      <MainCard title="Test">
        <Story />
      </MainCard>
    ),
  ],
};

export const IntoHorizontalCard: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    id: "color-1",
    index: 1,
  },
  decorators: [
    (Story: any) => (
      <MainCard title="Test" direction="horizontal">
        <Story />
        <Story />
        <Story />
        <Story />
      </MainCard>
    ),
  ],
};

export const IntoVerticalCard: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    id: "color-1",
    index: 1,
  },
  decorators: [
    (Story: any) => (
      <MainCard title="Test" direction="vertical">
        <Story />
        <Story />
        <Story />
        <Story />
      </MainCard>
    ),
  ],
};
