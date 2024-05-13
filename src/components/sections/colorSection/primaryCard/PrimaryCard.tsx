"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./primary-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
}

function PrimaryCard() {
  const colors = [
    {
      color: "#FF1818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
  ];

  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="primary-card" direction="horizontal">
        {(provided) => (
          <MainCard
            direction="horizontal"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
            id="primary-card"
            title="Primary"
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
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PrimaryCard;
