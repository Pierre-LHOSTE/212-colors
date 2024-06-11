"use client";
import { useModalStore } from "@/src/store/modal";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import { useState } from "react";
import MainCard from "../card/MainCard";
import ThemeColumnList from "./ThemeColumnList";
import ThemesList from "./ThemeList";

function ThemesPage({
  themes,
  themeColumns,
  themeColors,
}: {
  themes: ThemeType[];
  themeColumns: ThemeColumnType[];
  themeColors: ThemeColorType[];
}) {
  const [localThemes, setLocalThemes] = useState(themes);
  const [localThemeColor, setLocalThemeColor] = useState(themeColors);
  const [localThemeColumns, setLocalThemeColumns] = useState(themeColumns);

  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <ThemeColumnList
        localThemeColumns={localThemeColumns}
        setLocalThemeColumns={setLocalThemeColumns}
      />
      <ThemesList
        localThemes={localThemes}
        themeColors={localThemeColor}
        localThemeColumns={localThemeColumns}
        setLocalThemes={setLocalThemes}
      />
      <MainCard className="theme-color-card" title={""} direction="horizontal">
        <Button
          type="text"
          icon={<IconPlus />}
          onClick={() =>
            setModalState({
              mode: "add",
              id: "theme",
              updateLocalState: (theme: ThemeType) =>
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

export default ThemesPage;
