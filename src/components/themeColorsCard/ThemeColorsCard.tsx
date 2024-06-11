"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { useModalStore } from "@/src/store/modal";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NoColor from "../noColor/NoColor";
import "./theme-colors-card.scss";

type ThemeTypeType = "light" | "dark";

interface colorType {
  name?: string;
  description?: string;
  color: string;
}

function ThemeColorsCard({
  colors,
  themeColumn,
  theme,
  setLocalThemeColor,
  localThemeColors,
  setLocalThemes,
  localThemes,
}: {
  theme: ThemeType;
  colors: (ThemeColorType | null)[];
  themeColumn: ThemeColumnType[];
  setLocalThemeColor: (arg: any) => void;
  localThemeColors: ThemeColorType[];
  setLocalThemes: (arg: any) => void;
  localThemes: ThemeType[];
}) {
  console.log(theme);

  const setModalState = useModalStore((state) => state.setModalState);

  function updateLocalState(color: ThemeColorType) {
    setLocalThemeColor(
      localThemeColors.map((item) =>
        item.id === color.id ? Object.assign({}, item, color) : item
      )
    );
  }
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

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  function handleEdit() {
    setModalState({
      mode: "edit",
      id: "theme",
      updateLocalState: (theme: ThemeType) => {
        setLocalThemes(
          localThemes.map((item) =>
            item.id === theme.id ? Object.assign({}, item, theme) : item
          )
        );
      },
      editItem: theme,
    });
  }

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <MainCard
        className="theme-color-card"
        title={theme.name}
        direction="horizontal"
        dndAction={listeners}
        showOptionAction={handleEdit}
      >
        {themeColumn.map((column, index) => {
          const color = colors
            ? colors.find((c) => c?.themeColumnId === column.id)
            : null;
          if (color) {
            return (
              <Color
                noDnd
                key={color.id}
                color={color.color}
                name={color.name}
                description={color.description}
                position={index}
                id={color.id}
                isThemeColor
                deleteLocalColor={() =>
                  setLocalThemeColor(
                    localThemeColors.filter((c) => c.id !== color.id)
                  )
                }
                updateLocalState={updateLocalState}
              />
            );
          } else {
            return (
              <NoColor
                key={index}
                columnName={column.name}
                id={column.id}
                themeId={theme.id}
                themeColumnId={column.id}
                setLocalThemeColor={setLocalThemeColor}
                localThemeColors={localThemeColors}
              />
            );
          }
        })}
      </MainCard>
    </div>
  );
}

export default ThemeColorsCard;
