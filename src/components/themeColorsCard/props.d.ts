import type { ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import type { Dispatch, SetStateAction } from "react";

export interface PropsType {
  theme: ThemeType;
  colors: (ThemeColorType | null)[];
  themeColumns: ThemeColumnType[];
  setThemeColors: Dispatch<SetStateAction<ThemeColorType[]>>;
  setThemes: Dispatch<SetStateAction<ThemeType[]>>;
  themes: ThemeType[];
}
