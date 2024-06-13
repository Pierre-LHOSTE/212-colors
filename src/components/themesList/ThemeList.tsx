import { reOrder } from "@/src/api/color";
import { useDataStore } from "@/src/store/data";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
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
import ThemeColorsCard from "../themeColorsCard/ThemeColorsCard";
import type { ThemeColorType } from "@/src/types/color";

function ThemesList({
  themes,
  themeColumns,
  themeColors,
}: {
  themes: ThemeType[];
  themeColumns: ThemeColumnType[];
  themeColors: ThemeColorType[];
}) {
  const setThemeColors = useDataStore((state) => state.setThemeColors);
  const setThemes = useDataStore((state) => state.setThemes);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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

  function handleDragEnd(event: DragEndEvent) {
    updateThemePosition(event);
    setActiveId(null);
  }

  function updateThemePosition(event: DragMoveEvent | DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeItemIndex = themes.findIndex((item) => item.id === active.id);
      const overItemIndex = themes.findIndex((item) => item.id === over.id);

      const newArray = arrayMove(themes, activeItemIndex, overItemIndex);

      reOrder(newArray, "theme");
      setThemes(newArray);
    }
  }

  function findThemesData(id: UniqueIdentifier | undefined): ThemeType {
    const item = themes.find((item) => item.id === id);
    if (!item)
      return {
        id: "",
        name: "",
        type: "dark",
        description: "",
        colors: [],
        position: 0,
      };
    return item;
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={themes.map((i) => i.id)}>
          {themes.map((theme) => (
            <ThemeColorsCard
              key={theme.id}
              colors={themeColors.filter((color) => color.themeId === theme.id)}
              themeColumns={themeColumns}
              theme={theme}
              setThemeColors={setThemeColors}
              setThemes={setThemes}
              themes={themes}
            />
          ))}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeId ? (
            <>
              {
                <ThemeColorsCard
                  theme={findThemesData(activeId)}
                  colors={themeColors.filter(
                    (color) => color.themeId === activeId
                  )}
                  themeColumns={themeColumns}
                  setThemeColors={setThemeColors}
                  setThemes={setThemes}
                  themes={themes}
                />
              }
            </>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default ThemesList;
