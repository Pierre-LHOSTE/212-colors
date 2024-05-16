"use client";
import { isVeryLightColor } from "@/src/lib/utils";
import { ColorType } from "@/src/types/color";
import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import {
  Button,
  ColorPicker,
  ColorPickerProps,
  GetProp,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import "./color.scss";

import { CSS } from "@dnd-kit/utilities";

type Color = GetProp<ColorPickerProps, "value">;

function Color({ name, color, description, id }: ColorType) {
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

  return (
    <div className="color" ref={setNodeRef} {...attributes} style={style}>
      <header>
        <Typography.Title
          level={4}
          editable={{
            triggerType: ["text"],
          }}
        >
          {name}
        </Typography.Title>
        <div className="color-actions">
          <Button
            type="text"
            icon={<IconGripVertical />}
            onClick={() => {
              console.log("Move color");
            }}
            {...listeners}
          />
          <Button
            type="text"
            icon={<IconTrash />}
            onClick={() => {
              console.log("Delete color");
            }}
          />
        </div>
      </header>
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
