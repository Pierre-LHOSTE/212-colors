"use client";
import { deleteColor, deleteThemeColor, updateColorHex } from "@/src/api/color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError, isVeryLightColor } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  ColorPicker,
  type ColorPickerProps,
  type GetProp,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";
import "./color.scss";
import type { PropsType } from "./props";

type Color = GetProp<ColorPickerProps, "value">;

export default function Color(props: PropsType) {
  const { color, isThemeColor, noDnd, updateState } = props;
  const { id, name, description, color: colorHex } = color;
  const { LL } = useI18nContext();

  const setModalState = useModalStore((state) => state.setModalState);
  const setColors = useDataStore((state) => state.setColors);
  const setThemeColors = useDataStore((state) => state.setThemeColors);
  const setMessage = useSettingsStore((state) => state.setMessage);

  const [currentColor, setCurrentColor] = useState<Color>(colorHex as Color);
  const [initColor, setInitColor] = useState<Color>(colorHex as Color);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: color.id,
  });

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

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  async function handleDelete() {
    if (isThemeColor) {
      const res = await deleteThemeColor(id);
      if ("error" in res) {
        return handleError(res, "Failed to delete theme color");
      }
      setThemeColors((themeColors) =>
        themeColors.filter((item) => item.id !== id)
      );
      setMessage({
        type: "success",
        content: "Theme color deleted successfully",
      });
    } else {
      const res = await deleteColor(id);
      if ("error" in res) {
        return handleError(res, "Failed to delete color");
      }
      setMessage({
        type: "success",
        content: "Color deleted successfully",
      });
      setColors((colors) => colors.filter((item) => item.id !== id));
    }
  }

  function getColorHex() {
    return typeof currentColor === "string"
      ? currentColor
      : currentColor?.toHexString();
  }

  async function updateColor() {
    const newColor = getColorHex();
    const res = await updateColorHex({
      color: newColor,
      id,
      isThemeColor,
    });
    if ("error" in res) {
      setCurrentColor(initColor);
      return handleError(res, "Failed to update color");
    }
    setMessage({
      type: "success",
      content: "Color updated successfully",
    });
    if (updateState) {
      updateState({ ...color, color: newColor } as ColorType | ThemeColorType);
    }
    setInitColor(newColor);
    setIsPickerVisible(false);
  }

  function handleEdit() {
    setModalState({
      id: isThemeColor ? "theme-color" : "color",
      mode: "edit",
      editItem: {
        id,
        name,
        description,
        color: getColorHex(),
      },
      updateStateCallBack: (color: ColorType) => {
        if (updateState) updateState(color);
      },
    });
  }

  useEffect(() => {
    if (getColorHex() !== colorHex) setCurrentColor(initColor);
  }, [color, initColor, colorHex]);

  useEffect(() => {
    if (!isPickerVisible) setCurrentColor(initColor);
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
        listeners={noDnd ? null : listeners}
        handleEdit={handleEdit}
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
                    {LL.project.color.picker.save()}
                  </Button>
                </>
              ) : (
                LL.project.color.picker.title()
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
        <Typography.Paragraph>{description}</Typography.Paragraph>
      ) : null}
    </div>
  );
}
