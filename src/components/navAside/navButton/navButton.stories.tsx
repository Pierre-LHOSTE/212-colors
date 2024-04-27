import type { Meta, StoryObj } from "@storybook/react";
import { IconInfoCircle } from "@tabler/icons-react";
import NavButton from "./NavButton";

const meta = {
  title: "NavAside/ButtonList/NavButton",
  component: NavButton,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Informations",
    icon: <IconInfoCircle />,
  },
};

export const Active: Story = {
  args: {
    text: "Informations",
    icon: <IconInfoCircle />,
    active: true,
  },
};
