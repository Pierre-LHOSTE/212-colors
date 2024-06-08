"use client";
import { reOrder as reOrderApi } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { ThemeColumnType } from "@/src/types/theme";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
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

  const handleDragMove = (event: DragMoveEvent) => {
    updateThemeColumnPosition(event);
  };

  function handleDragEnd(event: DragEndEvent) {
    updateThemeColumnPosition(event);
    setActiveId(null);
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
        className="theme-color-card"
        title={"Colors informations"}
        direction="horizontal"
        createAction={createThemeColumn}
      >
        <SortableContext items={localThemeColumns.map((i) => i.id)}>
          {localThemeColumns.map((themeColumn, index) => (
            <ThemeColumn
              key={index}
              themeColumn={themeColumn}
              deleteLocalThemeColumn={deleteLocalThemeColumn}
            />
          ))}
        </SortableContext>
      </MainCard>
    </DndContext>
  );
}

export default ThemeColumnList;
