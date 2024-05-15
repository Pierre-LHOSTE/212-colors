"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { ColorType } from "@/src/types/color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./secondary-card.scss";

function SecondaryCard({ colors }: { colors: ColorType[] }) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="secondary-card" direction="vertical">
        {(provided) => (
          <MainCard
            direction="vertical"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
            id="secondary-card"
            title="Secondary"
          >
            {colors && colors.length > 0
              ? colors.map((color, index) => (
                  <Color key={index} {...color} index={index} />
                ))
              : null}
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SecondaryCard;
