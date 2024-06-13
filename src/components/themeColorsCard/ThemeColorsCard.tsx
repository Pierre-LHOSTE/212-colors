"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useModalStore } from "@/src/store/modal";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NoColor from "../noColor/NoColor";
import "./theme-colors-card.scss";
import { deleteTheme } from "@/src/api/theme";
import { handleError } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";

function ThemeColorsCard({
  colors,
  theme,
  setThemeColors,
  themeColumns,
  setThemes,
  themes,
}: {
  theme: ThemeType;
  colors: (ThemeColorType | null)[];
  themeColumns: ThemeColumnType[];
  setThemeColors: (
    arg: ThemeColorType[] | ((arg: ThemeColorType[]) => ThemeColorType[])
  ) => void;
  setThemes: (arg: ThemeType[] | ((arg: ThemeType[]) => ThemeType[])) => void;
  themes: ThemeType[];
}) {
  const setModalState = useModalStore((state) => state.setModalState);
  const setMessage = useSettingsStore((state) => state.setMessage);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: theme.id,
  });

  function updateState(color: ThemeColorType) {
    setThemeColors((themeColors: ThemeColorType[]) =>
      themeColors.map((item) =>
        item.id === color.id ? Object.assign({}, item, color) : item
      )
    );
  }

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  function handleEdit() {
    setModalState({
      mode: "edit",
      id: "theme",
      updateStateCallBack: (theme: ThemeType) => {
        setThemes(
          themes.map((item) =>
            item.id === theme.id ? Object.assign({}, item, theme) : item
          )
        );
      },
      editItem: theme,
    });
  }

  async function handleDelete() {
    const res = await deleteTheme(theme.id);
    if ("error" in res) {
      handleError(res, "Failed to delete theme");
    }
    setThemes((themes: ThemeType[]) =>
      themes.filter((item) => item.id !== theme.id)
    );
    setMessage({
      type: "success",
      content: "Theme deleted successfully",
    });
  }

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <MainCard
        className="theme-color-card"
        title={theme.name}
        direction="horizontal"
        dndAction={listeners}
        showEditAction={handleEdit}
        deleteAction={handleDelete}
      >
        {themeColumns.map((column, index) => {
          const color = colors
            ? colors.find((c) => c?.themeColumnId === column.id)
            : null;
          if (color) {
            return (
              <Color
                noDnd
                key={color.id}
                color={color}
                isThemeColor
                updateState={
                  updateState as (color: ThemeColorType | ColorType) => void
                }
              />
            );
          }
          return (
            <NoColor
              themeId={theme.id}
              themeColumnId={column.id}
              key={column.id}
            />
          );
        })}
      </MainCard>
    </div>
  );
}

export default ThemeColorsCard;
