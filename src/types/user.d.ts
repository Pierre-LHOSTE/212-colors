import type { ColorType, ThemeColorType } from "./color";
import type { ProjectType } from "./project";
import type { ThemeColumnType, ThemeType } from "./theme";

export interface UserType {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
  projects: ProjectType[];
  colors: ColorType[];
  themeColumns: ThemeColumnType[];
  themes: ThemeType[];
  themeColors: ThemeColorType[];
}
