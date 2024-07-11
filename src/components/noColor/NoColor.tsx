"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ThemeColorType } from "@/src/types/color";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";
import "./no-color.scss";
import type { PropsType } from "./props";

export default function NoColor(props: PropsType) {
  const { themeId, themeColumnId } = props;
  const setModalState = useModalStore((state) => state.setModalState);
  const setThemeColors = useDataStore((state) => state.setThemeColors);
  const { LL } = useI18nContext();

  async function createThemeColor() {
    setModalState({
      id: "theme-color",
      data: {
        themeId,
        themeColumnId,
      },
      mode: "add",
      updateStateCallBack: (color: ThemeColorType) =>
        setThemeColors((themeColors) => [...themeColors, color]),
    });
  }

  return (
    <div className="no-color header-hover">
      <HeaderWithOptions name={""} />
      <Button type="text" icon={<IconPlus />} onClick={createThemeColor}>
        {LL.global.button.newColor()}
      </Button>
    </div>
  );
}
