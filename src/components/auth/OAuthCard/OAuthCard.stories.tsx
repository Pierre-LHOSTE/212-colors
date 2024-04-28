import type { Meta, StoryObj } from "@storybook/react";
import OAuthCard from "./OAuthCard";

const meta = {
  title: "Auth/OAuthCard",
  component: OAuthCard,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof OAuthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authType: "login",
  },
};
