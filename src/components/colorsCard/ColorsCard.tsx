"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import { useEffect, useState } from "react";
import "./colors-card.scss";

import { useModalStore } from "@/src/store/modal";
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  DragOverlay,
  type DragStartEvent,
  type UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useCustomSensors } from "@/src/lib/utils";

type DirectionType = "horizontal" | "vertical";

function ColorsCard({
  colors,
  name,
  direction,
  setColors,
}: {
  colors: ColorType[];
  name: string;
  direction: DirectionType;
  setColors: (
    colors: ColorType[] | ((colors: ColorType[]) => ColorType[])
  ) => void;
}) {
  const setModalState = useModalStore((state) => state.setModalState);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useCustomSensors();

  const cardId = name.toLowerCase() as ColorType["type"];

  function findColorData(id: UniqueIdentifier | undefined): ColorType {
    const item = colors.find((item) => item.id === id);
    if (!item)
      return {
        id: "",
        color: "",
        description: "",
        name: "",
        type: "primary",
        position: 0,
      };
    return item;
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function updateColorPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = colors.findIndex((item) => item.id === active.id);
      const overItemIndex = colors.findIndex((item) => item.id === over.id);

      const newArray = arrayMove(colors, activeItemIndex, overItemIndex);

      reOrderApi(newArray, "color");
      setColors(newArray);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    updateColorPosition(event);
    setActiveId(null);
  }

  function updateState(color: ColorType | ThemeColorType) {
    setColors((colors: ColorType[]) =>
      colors.map((item) =>
        item.id === color.id ? Object.assign({}, item, color) : item
      )
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <MainCard
        className={`color-card ${direction}`}
        id={`${cardId}-card`}
        title={name}
        direction={direction}
        createAction={() =>
          setModalState({
            mode: "add",
            data: { colorType: cardId },
            id: "color",
            updateStateCallBack: (color: ColorType) =>
              setColors([...colors, color]),
          })
        }
      >
        <SortableContext items={colors.map((i) => i.id)}>
          {colors && colors.length > 0
            ? colors.map((color) => (
                <Color key={color.id} color={color} updateState={updateState} />
              ))
            : null}
        </SortableContext>
      </MainCard>
      <DragOverlay adjustScale={false}>
        {activeId ? <>{<Color color={findColorData(activeId)} />}</> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default ColorsCard;
