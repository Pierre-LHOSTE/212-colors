"use client";
import { isVeryLightColor } from "@/src/lib/utils";
import type { ColorType } from "@/src/types/color";
import type { ThemeColor } from "@prisma/client";
import { Button, type ColorPickerProps, type GetProp } from "antd";
import { useEffect, useState } from "react";
import "./color-preview.scss";
type Color = GetProp<ColorPickerProps, "value">;

export default function ColorPreview({
  color,
}: {
  color: ColorType | ThemeColor;
}) {
  const { id, name, description, color: colorHex } = color;

  const [currentColor, setCurrentColor] = useState<Color>(colorHex as Color);
  const [initColor, setInitColor] = useState<Color>(colorHex as Color);

  const elementColor = isVeryLightColor(
    typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString()
  )
    ? "dark"
    : "light";

  useEffect(() => {
    setCurrentColor(colorHex as Color);
    setInitColor(colorHex as Color);
  }, [colorHex]);

  function getColorHex() {
    return typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString();
  }

  useEffect(() => {
    if (getColorHex() !== colorHex) setCurrentColor(initColor);
  }, [color, initColor, colorHex]);

  return (
    <div className="color header-hover">
      <Button
        type="primary"
        className="color-preview"
        style={{
          backgroundColor: getColorHex(),
        }}
      >
        <span className={elementColor}>{getColorHex()}</span>
      </Button>
    </div>
  );
}
