import { ColorType, ThemeColorType } from "./color";
import { ThemeColumnType, ThemeType } from "./theme";
import { UserType } from "./user";

export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  colors: ColorType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
  themes: ThemeType[];
  position: number;
}
