import type { ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";

export interface PropsType {
  themes: ThemeType[];
  themeColumns: ThemeColumnType[];
  themeColors: ThemeColorType[];
}
