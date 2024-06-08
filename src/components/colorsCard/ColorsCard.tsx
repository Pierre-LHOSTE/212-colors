"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useSettingsStore } from "@/src/store/settings";
import { ColorType, ColorTypeType } from "@/src/types/color";
import { useState } from "react";
import "./color-card.scss";

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

type DirectionType = "horizontal" | "vertical";

function ColorsCard({
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
  const [localColors, setLocalColors] = useState(colors);
  const cardId = name.toLowerCase() as ColorTypeType;
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function findColorData(id: UniqueIdentifier | undefined): ColorType {
    const item = localColors.find((item) => item.id === id);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function updateColorPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = localColors.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = localColors.findIndex(
        (item) => item.id === over.id
      );

      const newArray = arrayMove(localColors, activeItemIndex, overItemIndex);

      reOrderApi(newArray);
      setLocalColors(newArray);
    }
  }

  const handleDragMove = (event: DragMoveEvent) => {
    updateColorPosition(event);
  };

  function handleDragEnd(event: DragEndEvent) {
    updateColorPosition(event);
    setActiveId(null);
  }

  function deleteColor(colorId: string) {
    setLocalColors(localColors.filter((item) => item.id !== colorId));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <MainCard
        className={`color-card ${direction}`}
        id={`${cardId}-card`}
        title={name}
        direction={direction}
        createAction={() =>
          setCreateColorModalState({
            colorType: cardId,
            show: true,
            addColor: (color: ColorType) =>
              setLocalColors([...localColors, color]),
          })
        }
      >
        <SortableContext items={localColors.map((i) => i.id)}>
          {localColors && localColors.length > 0
            ? localColors.map((color, index) => (
                <Color key={index} {...color} deleteLocalColor={deleteColor} />
              ))
            : null}
        </SortableContext>
      </MainCard>
      <DragOverlay adjustScale={false}>
        {activeId ? (
          <>{<Color {...findColorData(activeId)} id={activeId.toString()} />}</>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default ColorsCard;
