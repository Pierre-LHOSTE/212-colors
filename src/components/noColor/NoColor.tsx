"use client";
import { useSortable } from "@dnd-kit/sortable";
import { Button, ColorPickerProps, GetProp } from "antd";
import "./no-color.scss";

import { useModalStore } from "@/src/store/modal";
import { ThemeColorType } from "@/src/types/color";
import { CSS } from "@dnd-kit/utilities";
import { IconPlus } from "@tabler/icons-react";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";

type Color = GetProp<ColorPickerProps, "value">;

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
  columnName,
  id,
  deleteLocalColor,
  themeId,
  themeColumnId,
  setLocalThemeColor,
  localThemeColors,
}: ColorPropsType) {
  const modalState = useModalStore((state) => state.modalState);
  const setModalState = useModalStore((state) => state.setModalState);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

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
    <div
      className="no-color header-hover"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <HeaderWithOptions name={""} listeners={listeners} />
      <Button type="text" icon={<IconPlus />} onClick={createThemeColor}>
        New color
      </Button>
    </div>
  );
}

export default NoColor;
