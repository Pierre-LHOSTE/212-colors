"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useSettingsStore } from "@/src/store/settings";
import { ColorType } from "@/src/types/color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./primary-card.scss";

function PrimaryCard({ colors }: { colors: ColorType[] }) {
  const setCreateColorModalState = useSettingsStore(
    (state) => state.setCreateColorModalState
  );

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
            createAction={() =>
              setCreateColorModalState({
                colorType: "primary",
                show: true,
              })
            }
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

export default PrimaryCard;
