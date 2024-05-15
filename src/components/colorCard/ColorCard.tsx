"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useSettingsStore } from "@/src/store/settings";
import { ColorType, ColorTypeType } from "@/src/types/color";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./color-card.scss";

type DirectionType = "horizontal" | "vertical";

function ColorCard({
  colors,
  name,
  direction,
}: {
  colors: ColorType[];
  name: string;
  direction: DirectionType;
}) {
  const setCreateColorModalState = useSettingsStore(
    (state) => state.setCreateColorModalState
  );

  function handleDragEnd(params: any) {
    console.log(params);
  }
  console.log("🚀 ~ colors:", colors);

  const id = name.toLowerCase() as ColorTypeType;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="special-card" direction={direction}>
        {(provided) => (
          <MainCard
            className={`color-card ${direction}`}
            id={`${id}-card`}
            title={name}
            direction={direction}
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
            createAction={() =>
              setCreateColorModalState({
                colorType: id,
                show: true,
              })
            }
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

export default ColorCard;
