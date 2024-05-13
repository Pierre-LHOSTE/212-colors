"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./theme-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
  type?: string;
}

function ThemeCard() {
  const colors = [
    {
      color: "#1FBF55",
      name: "Success",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "success",
    },
    {
      color: "#FF1818",
      name: "Error",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "error",
    },
    {
      color: "#C88400",
      name: "Warning",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "warning",
    },
    {
      color: "#D6A3FF",
      name: "Info",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "info",
    },
    {
      color: "#222222",
      name: "Dark",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
    {
      color: "#808080",
      name: "Neutral",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
    {
      color: "#F2F2F2",
      name: "Light",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
  ];

  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="theme-card" direction="horizontal">
        {(provided) => (
          <MainCard
            id="theme-card"
            title="Theme"
            direction="horizontal"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
          >
            {colors.map((color, index) => (
              <Color
                key={index}
                name={color.name}
                color={color.color}
                description={color.description}
                id={`color-${index}`}
                index={index}
              />
            ))}
            {provided.placeholder}
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ThemeCard;
