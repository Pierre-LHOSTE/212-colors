"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { ColorType } from "@/src/types/color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./special-card.scss";

function SpecialCard({ colors }: { colors: ColorType[] }) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="special-card" direction="horizontal">
        {(provided) => (
          <MainCard
            id="special-card"
            title="Special"
            direction="horizontal"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
          >
            {colors && colors.length > 0
              ? colors.map((color, index) => (
                  <Color key={index} {...color} index={index} />
                ))
              : null}
            {provided.placeholder}
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SpecialCard;
