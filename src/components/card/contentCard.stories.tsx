import type { Meta, StoryObj } from "@storybook/react";
import ContentCard from "./ContentCard";

const meta = {
  title: "Components/ContentCard",
  component: ContentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sections: [
      {
        title: "test 1",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
      },
      {
        title: "test 2",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
      },
    ],
  },
};

export const WithCreateAction: Story = {
  args: {
    sections: [
      {
        title: "test 1",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
      },
      {
        title: "test 2",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
    ],
  },
};
