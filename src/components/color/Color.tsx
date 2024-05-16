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
  Popconfirm,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import "./color.scss";

import { deleteColor } from "@/src/api/color";
import { CSS } from "@dnd-kit/utilities";

type Color = GetProp<ColorPickerProps, "value">;

interface ColorPropsType extends ColorType {
  deleteLocalColor?: (colorId: string) => void;
}

function Color({
  name,
  color,
  description,
  id,
  deleteLocalColor,
}: ColorPropsType) {
  const [currentColor, setCurrentColor] = useState<Color>(color as Color);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
    const res = await deleteColor(id);
    if (res.error) return console.error(res.message);
    if (deleteLocalColor) deleteLocalColor(id);
  }

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
        <div className={`color-actions${isConfirmOpen ? " open" : ""}`}>
          <Button type="text" icon={<IconGripVertical />} {...listeners} />
          <Popconfirm
            title="Delete the color"
            description="Are you sure to delete this color?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDelete}
            onOpenChange={(open) => {
              setIsConfirmOpen(open);
            }}
          >
            <Button type="text" icon={<IconTrash />} />
          </Popconfirm>
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
