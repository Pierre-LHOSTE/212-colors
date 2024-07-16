import type { ColorType, ThemeColorType } from "@/src/types/color";
import type { ProjectType } from "@/src/types/project";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";

export default interface PropsType {
  project: ProjectType;
  colors: ColorType[];
  themes: ThemeType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
  loading: boolean;
}
