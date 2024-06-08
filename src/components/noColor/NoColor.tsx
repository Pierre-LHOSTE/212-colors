"use client";
import { useSortable } from "@dnd-kit/sortable";
import { Button, ColorPickerProps, GetProp } from "antd";
import "./no-color.scss";

import { CSS } from "@dnd-kit/utilities";
import { IconPlus } from "@tabler/icons-react";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";

type Color = GetProp<ColorPickerProps, "value">;

interface ColorPropsType {
  columnName: string;
  id: string;
  deleteLocalColor?: (colorId: string) => void;
}

function NoColor({ columnName, id, deleteLocalColor }: ColorPropsType) {
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

  return (
    <div
      className="no-color header-hover"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <HeaderWithOptions name={""} listeners={listeners} />
      <Button type="text" icon={<IconPlus />}>
        New color
      </Button>
    </div>
  );
}

export default NoColor;
