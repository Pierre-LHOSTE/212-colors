import { ProjectType } from "./project";
import { ThemeColumnType } from "./theme";
import { UserType } from "./user";

export type ColorTypeType = "primary" | "secondary" | "special";

export interface ColorType {
  id: string;
  type: ColorTypeType;
  color: string;
  name: string | null;
  description: string | null;
  position: number;
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
  createdAt: Date;
  updatedAt: Date | null;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
  themeColumn: ThemeColumnType;
  themeColumnId: string;
  theme: ThemeType;
  themeId: string;
}
