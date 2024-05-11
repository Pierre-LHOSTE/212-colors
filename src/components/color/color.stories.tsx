import type { Meta, StoryObj } from "@storybook/react";
import ContentCard from "../card/ContentCard";
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
  },
};

export const IntoHorizontalCard: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
  decorators: [
    (Story: any) => (
      <ContentCard title="Test" direction="horizontal">
        <Story />
        <Story />
        <Story />
        <Story />
      </ContentCard>
    ),
  ],
};

export const IntoVerticalCard: Story = {
  args: {
    name: "Lorem Ipsum Red",
    color: "#FF1818",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
  decorators: [
    (Story: any) => (
      <ContentCard title="Test" direction="vertical">
        <Story />
        <Story />
        <Story />
        <Story />
      </ContentCard>
    ),
  ],
};
