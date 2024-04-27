import type { Meta, StoryObj } from "@storybook/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProjectButton from "./ProjectButton";

const meta = {
  title: "MainAside/ProjectList/ProjectButton",
  component: ProjectButton,
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof ProjectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: "1",
      name: "Default icon",
      active: false,
      color: "#ff1818",
      position: 0,
    },
    index: 0,
  },
};

export const Active: Story = {
  args: {
    project: {
      id: "1",
      name: "Active icon",
      active: true,
      color: "#ff1818",
      position: 0,
    },
    index: 0,
  },
};

export const LightColored: Story = {
  args: {
    project: {
      id: "1",
      name: "LightColored icon",
      active: false,
      color: "#b7c2ff",
      position: 0,
    },
    index: 0,
  },
};

export const ActiveLightColored: Story = {
  args: {
    project: {
      id: "1",
      name: "Active LightColored icon",
      active: true,
      color: "#b7c2ff",
      position: 0,
    },
    index: 0,
  },
};
