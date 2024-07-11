"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import useDndSensors from "@/src/lib/hooks";
import { useModalStore } from "@/src/store/modal";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import "./colors-card.scss";
import type { PropsType } from "./props";

export default function ColorsCard(props: PropsType) {
  const { colors, name, direction, setColors } = props;
  const { LL } = useI18nContext();

  const setModalState = useModalStore((state) => state.setModalState);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useDndSensors();

  const cardId = name as ColorType["type"];

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
        title={LL.project.color[name as "primary" | "secondary" | "special"]()}
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
