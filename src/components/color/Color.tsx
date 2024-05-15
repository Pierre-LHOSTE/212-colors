"use client";
import { isVeryLightColor } from "@/src/lib/utils";
import { ColorType } from "@/src/types/color";
import { Draggable } from "@hello-pangea/dnd";
import {
  Button,
  ColorPicker,
  ColorPickerProps,
  GetProp,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import "./color.scss";

type Color = GetProp<ColorPickerProps, "value">;

interface propsType extends ColorType {
  index: number;
}

function Color({ name, color, description, id, index }: propsType) {
  const [currentColor, setCurrentColor] = useState<Color>("");

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const elementColor = isVeryLightColor(
    typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString()
  )
    ? "dark"
    : "light";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="color"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {name ? (
            <Typography.Title
              level={4}
              editable={{
                triggerType: ["text"],
              }}
            >
              {name}
            </Typography.Title>
          ) : null}
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
      )}
    </Draggable>
  );
}

export default Color;
