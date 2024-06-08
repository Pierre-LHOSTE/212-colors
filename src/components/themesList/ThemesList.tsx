"use client";
import { useModalStore } from "@/src/store/modal";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType, ThemeType, ThemeTypeType } from "@/src/types/theme";
import { UniqueIdentifier } from "@dnd-kit/core";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import { useState } from "react";
import MainCard from "../card/MainCard";
import ThemeColorsCard from "../themeColorsCard/ThemeColorsCard";
import ThemeColumnList from "./ThemeColumnList";

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
  const [localThemeColor, setLocalThemeColor] = useState(themeColors);
  const [localThemeColumns, setLocalThemeColumns] = useState(themeColumns);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <ThemeColumnList
        localThemeColumns={localThemeColumns}
        setLocalThemeColumns={setLocalThemeColumns}
      />
      {localThemes.map((theme, index) => (
        <ThemeColorsCard
          key={index}
          colors={localThemeColor.filter((color) => color.themeId === theme.id)}
          themeColumn={localThemeColumns}
          name={theme.name}
          type={theme.type as ThemeTypeType}
        />
      ))}
      <MainCard className="theme-color-card" title={""} direction="horizontal">
        <Button
          type="text"
          icon={<IconPlus />}
          onClick={() =>
            setModalState({
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

export default ThemesList;
