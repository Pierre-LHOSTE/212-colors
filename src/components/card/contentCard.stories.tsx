import type { Meta, StoryObj } from "@storybook/react";
import ContentCard from "./ContentCard";
import ContentCardContent from "./contentCardContent/ContentCardContent";

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
    children: (
      <>
        <ContentCardContent title="test 1">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        </ContentCardContent>
        <ContentCardContent title="test 2">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
        </ContentCardContent>
      </>
    ),
  },
};
