import type { ColorPickerProps, GetProp } from "antd";
import { ColorPicker } from "antd";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import "./color.scss";

type Color = GetProp<ColorPickerProps, "value">;

function Color({
  name,
  color,
  description,
}: {
  name: string;
  color: string;
  description: string;
}) {
  const [currentColor, setCurrentColor] = useState<Color>("");

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <div className="color">
      <h4>{name}</h4>
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
          <span>
            {typeof currentColor === "string"
              ? currentColor
              : currentColor?.toHexString()}
          </span>
        </Button>
      </ColorPicker>
      <p>{description}</p>
    </div>
  );
}

export default Color;
