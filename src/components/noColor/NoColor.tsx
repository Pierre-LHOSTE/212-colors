"use client";
import { Button } from "antd";
import "./no-color.scss";

import { useModalStore } from "@/src/store/modal";
import { ThemeColorType } from "@/src/types/color";
import { IconPlus } from "@tabler/icons-react";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";

interface ColorPropsType {
  columnName: string;
  id: string;
  deleteLocalColor?: (colorId: string) => void;
  themeId: string;
  themeColumnId: string;
  setLocalThemeColor: (arg: any) => void;
  localThemeColors: ThemeColorType[];
}

function NoColor({
  themeId,
  themeColumnId,
  setLocalThemeColor,
  localThemeColors,
}: ColorPropsType) {
  const setModalState = useModalStore((state) => state.setModalState);

  async function createThemeColor() {
    setModalState({
      id: "theme-color",
      data: {
        themeId,
        themeColumnId,
      },
      mode: "add",
      updateLocalState: (color: ThemeColorType) =>
        setLocalThemeColor([...localThemeColors, color]),
    });
  }

  return (
    <div className="no-color header-hover">
      <HeaderWithOptions name={""} />
      <Button type="text" icon={<IconPlus />} onClick={createThemeColor}>
        New color
      </Button>
    </div>
  );
}

export default NoColor;
