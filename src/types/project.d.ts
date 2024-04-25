import { ColorType, ThemeColorType } from "./color";
import { ThemeColumnType, ThemeType } from "./theme";
import { UserType } from "./user";

export interface ProjectLiteType {
  id: string;
  name: string;
}

export interface ProjectIconType extends ProjectLiteType {
  color: string;
  active: boolean;
}

export interface ProjectIconsType extends ProjectIconType {
  position: number;
}

export interface ProjectType extends ProjectLiteType {
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
  colorSection: boolean;
  themeSection: boolean;
}
