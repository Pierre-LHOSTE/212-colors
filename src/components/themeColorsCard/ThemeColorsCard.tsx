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

function ThemeColorsCard({
  colors,
  themeColors,
  theme,
  setThemeColors,
  themeColumns,
  setThemes,
  themes,
}: {
  theme: ThemeType;
  colors: (ThemeColorType | null)[];
  themeColumns: ThemeColumnType[];
  setThemeColors: (arg: any) => void;
  themeColors: ThemeColorType[];
  setThemes: (arg: any) => void;
  themes: ThemeType[];
}) {
  const setModalState = useModalStore((state) => state.setModalState);

  function updateState(color: ThemeColorType) {
    setThemeColors(
      themeColors.map((item) =>
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

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <MainCard
        className="theme-color-card"
        title={theme.name}
        direction="horizontal"
        dndAction={listeners}
        showOptionAction={handleEdit}
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
                color={color.color}
                name={color.name}
                description={color.description}
                position={index}
                id={color.id}
                isThemeColor
                updateState={updateState}
              />
            );
          } else {
            return (
              <NoColor
                key={index}
                themeId={theme.id}
                themeColumnId={column.id}
              />
            );
          }
        })}
      </MainCard>
    </div>
  );
}

export default ThemeColorsCard;
