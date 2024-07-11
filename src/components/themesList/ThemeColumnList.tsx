"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import useDndSensors from "@/src/lib/hooks";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ThemeColumnType } from "@/src/types/theme";
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
import MainCard from "../card/MainCard";
import ThemeColumn from "../themColumn/ThemeColumn";

export default function ThemeColumnList({
  themeColumns,
}: {
  themeColumns: ThemeColumnType[];
}) {
  const setModalState = useModalStore((state) => state.setModalState);
  const setThemeColumns = useDataStore((state) => state.setThemeColumns);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useDndSensors();

  const { LL } = useI18nContext();

  function createThemeColumn() {
    setModalState({
      mode: "add",
      id: "theme-column",
      updateStateCallBack: (themeColumn: ThemeColumnType) =>
        setThemeColumns((themeColumns) => [...themeColumns, themeColumn]),
    });
  }

  function updateThemeColumnPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const activeItemIndex = themeColumns.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = themeColumns.findIndex(
        (item) => item.id === over.id
      );
      const newArray = arrayMove(themeColumns, activeItemIndex, overItemIndex);
      reOrderApi(newArray, "themeColumn");
      setThemeColumns(newArray);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function handleDragEnd(event: DragEndEvent) {
    updateThemeColumnPosition(event);
    setActiveId(null);
  }

  function findThemeColumnData(
    id: UniqueIdentifier | undefined
  ): ThemeColumnType {
    const item = themeColumns.find((item) => item.id === id);
    if (!item)
      return {
        name: "",
        id: "",
        description: "",
        colors: [],
        position: 0,
      };
    return item;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <MainCard
        className="theme-color-card"
        title={LL.project.theme.infoColorsTheme()}
        direction="horizontal"
        createAction={createThemeColumn}
      >
        <SortableContext items={themeColumns.map((i) => i.id)}>
          {themeColumns.map((themeColumn, index) => (
            <ThemeColumn key={themeColumn.id} themeColumn={themeColumn} />
          ))}
        </SortableContext>
      </MainCard>
      <DragOverlay adjustScale={false}>
        {activeId ? (
          <>{<ThemeColumn themeColumn={findThemeColumnData(activeId)} />}</>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
