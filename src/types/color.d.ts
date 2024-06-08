import { ProjectType } from "./project";
import { ThemeColumnType } from "./theme";
import { UserType } from "./user";

export type ColorTypeType = "primary" | "secondary" | "special";

export interface ColorCompType {
  id: string;
  color: string;
  name: string | null;
  description: string | null;
  position: number;
}

export interface ColorType extends ColorCompType {
  type: ColorTypeType;
}

export interface ColorFullType extends ColorType {
  createdAt: Date;
  updatedAt: Date | null;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
}

export interface ThemeColorType {
  id: string;
  color: string;
  name: string | null;
  description: string | null;
  themeColumn: ThemeColumnType;
  themeColumnId: string;
  theme: ThemeType;
  themeId: string;
}

export interface ThemeColorFullType extends ThemeColorType {
  createdAt: Date;
  updatedAt: Date | null;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
}
