"use client";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType, ThemeType, ThemeTypeType } from "@/src/types/theme";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import { useState } from "react";
import MainCard from "../card/MainCard";
import ThemeColorsCard from "../sections/colorSection/themeColorsCard/ThemeColorsCard";
import ThemeColumn from "./themColumn/ThemeColumn";

function ThemesList({
  themes,
  themeColumns,
  themeColors,
}: {
  themes: ThemeType[];
  themeColumns: ThemeColumnType[];
  themeColors: ThemeColorType[];
}) {
  const [localThemes, setLocalThemes] = useState(themes);
  const [localThemeColumns, setLocalThemeColumns] = useState(themeColumns);
  const [localThemeColor, setLocalThemeColor] = useState(themeColors);

  const setCreateThemeModalState = useSettingsStore(
    (state) => state.setCreateThemeModalState
  );

  const setCreateThemeColumnModalState = useSettingsStore(
    (state) => state.setCreateThemeColumnModalState
  );

  function createThemeColumn() {
    setCreateThemeColumnModalState({
      show: true,
      addThemeColumn: (themeColumn: ThemeColumnType) =>
        setLocalThemeColumns([...localThemeColumns, themeColumn]),
    });
  }

  return (
    <>
      <MainCard
        className="theme-color-card"
        title={"Colors informations"}
        direction="horizontal"
        createAction={createThemeColumn}
      >
        {localThemeColumns.map((themeColumn, index) => (
          <ThemeColumn key={index} themeColumn={themeColumn} />
        ))}
      </MainCard>
      {localThemes.map((theme, index) => (
        <ThemeColorsCard
          key={index}
          colors={localThemeColor.map((color) =>
            color.themeId === theme.id
              ? {
                  name: color.name,
                  description: color.description,
                  color: color.color,
                }
              : null
          )}
          name={theme.name}
          type={theme.type as ThemeTypeType}
        />
      ))}
      <MainCard className="theme-color-card" title={""} direction="horizontal">
        <Button
          type="text"
          icon={<IconPlus />}
          onClick={() =>
            setCreateThemeModalState({
              show: true,

              addTheme: (theme: ThemeType) =>
                setLocalThemes([...localThemes, theme]),
            })
          }
        >
          New theme
        </Button>
      </MainCard>
    </>
  );
}

export default ThemesList;
