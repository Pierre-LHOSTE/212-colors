import { ThemeColorType } from "./color";
import { ProjectType } from "./project";
import { UserType } from "./user";

export type ThemeTypeType = "light" | "dark";

export interface ThemeColumnType {
  id: string;
  name: string;
  description: string | null;
  colors: ThemeColorType[];
  position: number;
}

export interface ThemeType {
  id: string;
  type: string;
  name: string;
  description: string | null;
  colors: ThemeColorType[];
  position: number;
}

export interface ThemeFullType extends ThemeType {
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
}

export interface ThemeColumnFullType extends ThemeColumnType {
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
}
