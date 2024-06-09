"use client";
import { deleteColor, deleteThemeColor } from "@/src/api/color";
import { isVeryLightColor } from "@/src/lib/utils";
import { ColorCompType } from "@/src/types/color";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  ColorPicker,
  ColorPickerProps,
  GetProp,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";
import "./color.scss";

type Color = GetProp<ColorPickerProps, "value">;

interface ColorPropsType extends ColorCompType {
  deleteLocalColor?: (colorId: string) => void;
  isThemeColor?: boolean;
}

function Color({
  name,
  color,
  description,
  id,
  deleteLocalColor,
  isThemeColor,
}: ColorPropsType) {
  const [currentColor, setCurrentColor] = useState<Color>(color as Color);

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

  const elementColor = isVeryLightColor(
    typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString()
  )
    ? "dark"
    : "light";

  useEffect(() => {
    setCurrentColor(color as Color);
  }, [color]);

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  async function handleDelete() {
    if (isThemeColor) {
      const res = await deleteThemeColor(id);
      if (res.error) return console.error(res.message);
      if (deleteLocalColor) deleteLocalColor(id);
    } else {
      const res = await deleteColor(id);
      if (res.error) return console.error(res.message);
      if (deleteLocalColor) deleteLocalColor(id);
    }
  }

  return (
    <div
      className="color header-hover"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <HeaderWithOptions
        name={name}
        handleDelete={handleDelete}
        listeners={listeners}
      />
      <ColorPicker value={currentColor} onChange={setCurrentColor}>
        <Button
          type="primary"
          className="color-preview"
          style={{
            backgroundColor:
              typeof currentColor === "string"
                ? currentColor
                : currentColor?.toHexString(),
          }}
        >
          <span className={elementColor}>
            {typeof currentColor === "string"
              ? currentColor
              : currentColor?.toHexString()}
          </span>
        </Button>
      </ColorPicker>
      {description ? (
        <Typography.Paragraph
          editable={{
            triggerType: ["text"],
          }}
        >
          {description}
        </Typography.Paragraph>
      ) : null}
    </div>
  );
}

export default Color;
