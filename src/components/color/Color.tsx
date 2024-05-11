import { isVeryLightColor } from "@/src/lib/utils";
import type { ColorPickerProps, GetProp } from "antd";
import { ColorPicker, Typography } from "antd";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Button from "../button/Button";
import "./color.scss";

type Color = GetProp<ColorPickerProps, "value">;

function Color({
  name,
  color,
  description,
  id,
  index,
}: {
  name?: string;
  color: string;
  description?: string;
  id: string;
  index: number;
}) {
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
          <Typography.Title
            level={4}
            editable={{
              triggerType: ["text"],
            }}
          >
            {name}
          </Typography.Title>
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
          <Typography.Paragraph
            editable={{
              triggerType: ["text"],
            }}
          >
            {description}
          </Typography.Paragraph>
        </div>
      )}
    </Draggable>
  );
}

export default Color;
