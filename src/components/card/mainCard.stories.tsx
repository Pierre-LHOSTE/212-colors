import type { Meta, StoryObj } from "@storybook/react";
import MainCard from "./MainCard";

const meta = {
  title: "Components/MainCard",
  component: MainCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "600px", height: "600px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof MainCard>;

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

export const WithLotOfSection: Story = {
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
      {
        title: "test 3",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 4",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 5",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 6",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 7",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 8",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 9",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
      {
        title: "test 10",
        children: (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        ),
        createAction: () => console.log("create action"),
        showOptionAction: () => console.log("show option action"),
      },
    ],
  },
};
