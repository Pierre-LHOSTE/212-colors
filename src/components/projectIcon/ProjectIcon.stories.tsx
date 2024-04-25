import type { Meta, StoryObj } from "@storybook/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProjectIcon from "./ProjectIcon";

const meta = {
  title: "Project/Icon",
  component: ProjectIcon,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "100px" }}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="projects-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Story />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProjectIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    name: "Default icon",
    active: false,
    color: "#ff1818",
    index: 0,
  },
};

export const Active: Story = {
  args: {
    id: "1",
    name: "Active icon",
    active: true,
    color: "#ff1818",
    index: 0,
  },
};
