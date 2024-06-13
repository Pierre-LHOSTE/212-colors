import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { useSettingsStore } from "../store/settings";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
extend([a11yPlugin]);

export function isVeryLightColor(color: string): boolean {
  const c = colord(color);

  if (c.luminance() >= 0.5) {
    return true;
  }

  return false;
}

export function handleError(
  res: { error?: boolean; message: string; success?: undefined },
  message?: string
) {
  const setMessage = useSettingsStore.getState().setMessage;
  const setNotification = useSettingsStore.getState().setNotification;

  setMessage({
    type: "error",
    content: message || "An error occurred",
  });
  setNotification({
    type: "error",
    message: "Error",
    description: <>{res.message || message || "An error occurred"}</>,
  });

  console.error(message, res);
}

export function handleServerError(error: unknown) {
  console.error(error);
  if (error instanceof Error) {
    return { error: true, message: error.message };
  }
  if (typeof error === "string") {
    return { error: true, message: error };
  }
  return { error: true, message: "Unknown error" };
}

export function useCustomSensors() {
  return useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
}
