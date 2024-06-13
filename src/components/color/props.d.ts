import type { ColorType, ThemeColorType } from "@/src/types/color";

export interface PropsType {
  color: Omit<ColorType, "type" | "position">;
  isThemeColor?: boolean;
  updateState?: (color: ColorType | ThemeColorType) => void;
  noDnd?: boolean;
}
