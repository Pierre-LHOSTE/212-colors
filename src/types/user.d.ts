import { ColorType, ThemeColorType } from "./color";
import { ProjectType } from "./project";
import { ThemeColumnType, ThemeType } from "./theme";

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
