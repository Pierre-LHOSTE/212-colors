"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./theme-colors-card.scss";

type ThemeTypeType = "light" | "dark";

interface colorType {
  name?: string;
  description?: string;
  color: string;
  type?: string;
}

function ThemeColorsCard({
  colors,
  name,
  type,
}: {
  colors: colorType[];
  name: string;
  type: ThemeTypeType;
}) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="theme-card" direction="horizontal">
        {(provided) => (
          <MainCard
            className="theme-color-card"
            title={name}
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

export default ThemeColorsCard;
