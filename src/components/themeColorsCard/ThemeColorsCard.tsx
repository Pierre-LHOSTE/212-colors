"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType } from "@/src/types/theme";
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
  name,
  themeColumn,
  id,
  setLocalThemeColor,
  localThemeColors,
}: {
  colors: (ThemeColorType | null)[];
  name: string;
  type: ThemeTypeType;
  themeColumn: ThemeColumnType[];
  id: string;
  setLocalThemeColor: (arg: any) => void;
  localThemeColors: ThemeColorType[];
}) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  function updateLocalState(color: ThemeColorType) {
    setLocalThemeColor(
      localThemeColors.map((item) =>
        item.id === color.id ? Object.assign({}, item, color) : item
      )
    );
  }

  return (
    <MainCard className="theme-color-card" title={name} direction="horizontal">
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
              themeId={id}
              themeColumnId={column.id}
              setLocalThemeColor={setLocalThemeColor}
              localThemeColors={localThemeColors}
            />
          );
        }
      })}
    </MainCard>
  );
}

export default ThemeColorsCard;
