import type { ColorType, ThemeColorType } from "./color";
import type { ProjectType } from "./project";
import type { ThemeColumnType, ThemeType } from "./theme";

export interface UserType {
  id: string;
  email: string | null;
  name: string;
  image?: string;
  role: string;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  projects: ProjectType[] | null;
  colors: ColorType[] | null;
  themeColumns: ThemeColumnType[] | null;
  themes: ThemeType[] | null;
  themeColors: ThemeColorType[] | null;
}
