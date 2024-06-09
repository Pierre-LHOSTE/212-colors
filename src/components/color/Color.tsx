"use client";
import { deleteColor, deleteThemeColor, updateColorHex } from "@/src/api/color";
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
  const [initColor, setInitColor] = useState<Color>(color as Color);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

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

  function getColorHex() {
    return typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString();
  }

  async function updateColor() {
    const res = await updateColorHex({ color: getColorHex(), id });
    if (res.error) return console.error(res.message);
    setInitColor(getColorHex());
    setIsPickerVisible(false);
  }

  useEffect(() => {
    if (getColorHex() !== initColor) setCurrentColor(initColor);
  }, [isPickerVisible]);

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
      <ColorPicker
        value={currentColor}
        onChange={setCurrentColor}
        open={isPickerVisible}
        onOpenChange={setIsPickerVisible}
        panelRender={(panel) => (
          <div className="custom-panel">
            <div
              style={{
                marginBottom: 8,
              }}
            >
              {getColorHex() !== initColor ? (
                <>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: getColorHex(),
                    }}
                    onClick={updateColor}
                  >
                    Save color
                  </Button>
                </>
              ) : (
                "Current color"
              )}
            </div>
            {panel}
          </div>
        )}
      >
        <Button
          type="primary"
          className="color-preview"
          style={{
            backgroundColor: getColorHex(),
          }}
        >
          <span className={elementColor}>{getColorHex()}</span>
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
