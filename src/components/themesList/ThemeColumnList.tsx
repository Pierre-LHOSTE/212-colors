"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { ThemeColumnType } from "@/src/types/theme";
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
import { useState } from "react";
import MainCard from "../card/MainCard";
import ThemeColumn from "../themColumn/ThemeColumn";

function ThemeColumnList({
  localThemeColumns,
  setLocalThemeColumns,
}: {
  localThemeColumns: ThemeColumnType[];
  setLocalThemeColumns: (themeColumns: ThemeColumnType[]) => void;
}) {
  const setModalState = useModalStore((state) => state.setModalState);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function createThemeColumn() {
    setModalState({
      mode: "add",
      id: "theme-column",
      updateLocalState: (themeColumn: ThemeColumnType) =>
        setLocalThemeColumns([...localThemeColumns, themeColumn]),
    });
  }

  function deleteLocalThemeColumn(id: string) {
    setLocalThemeColumns(localThemeColumns.filter((item) => item.id !== id));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function updateThemeColumnPosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = localThemeColumns.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = localThemeColumns.findIndex(
        (item) => item.id === over.id
      );

      const newArray = arrayMove(
        localThemeColumns,
        activeItemIndex,
        overItemIndex
      );

      reOrderApi(newArray, "themeColumn");
      setLocalThemeColumns(newArray);
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
    const item = localThemeColumns.find((item) => item.id === id);
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
        title={"Colors informations"}
        direction="horizontal"
        createAction={createThemeColumn}
      >
        <SortableContext items={localThemeColumns.map((i) => i.id)}>
          {localThemeColumns.map((themeColumn, index) => (
            <ThemeColumn
              key={themeColumn.id}
              themeColumn={themeColumn}
              deleteLocalThemeColumn={deleteLocalThemeColumn}
            />
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

export default ThemeColumnList;
