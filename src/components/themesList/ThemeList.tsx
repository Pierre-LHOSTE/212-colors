import { reOrder } from "@/src/api/color";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType, ThemeType } from "@/src/types/theme";
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
import ThemeColorsCard from "../themeColorsCard/ThemeColorsCard";

function ThemesList({
  localThemes,
  themeColors,
  localThemeColumns,
  setLocalThemes,
}: {
  localThemes: ThemeType[];
  themeColors: ThemeColorType[];
  localThemeColumns: ThemeColumnType[];
  setLocalThemes: (themes: ThemeType[]) => void;
}) {
  const [localThemeColor, setLocalThemeColor] = useState(themeColors);
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
      const activeItemIndex = localThemes.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = localThemes.findIndex(
        (item) => item.id === over.id
      );

      const newArray = arrayMove(localThemes, activeItemIndex, overItemIndex);

      reOrder(newArray, "theme");
      setLocalThemes(newArray);
    }
  }

  function findThemesData(id: UniqueIdentifier | undefined): ThemeType {
    const item = localThemes.find((item) => item.id === id);
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
        <SortableContext items={localThemes.map((i) => i.id)}>
          {localThemes.map((theme) => (
            <ThemeColorsCard
              key={theme.id}
              colors={localThemeColor.filter(
                (color) => color.themeId === theme.id
              )}
              themeColumn={localThemeColumns}
              theme={theme}
              setLocalThemeColor={setLocalThemeColor}
              localThemeColors={localThemeColor}
              setLocalThemes={setLocalThemes}
              localThemes={localThemes}
            />
          ))}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeId ? (
            <>
              {
                <ThemeColorsCard
                  theme={findThemesData(activeId)}
                  colors={localThemeColor.filter(
                    (color) => color.themeId === activeId
                  )}
                  themeColumn={localThemeColumns}
                  setLocalThemeColor={setLocalThemeColor}
                  localThemeColors={localThemeColor}
                  setLocalThemes={setLocalThemes}
                  localThemes={localThemes}
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
