import { ProjectType } from "./project";
import { ThemeColumnType } from "./theme";
import { UserType } from "./user";

export interface ColorType {
  id: string;
  type: string;
  color: string;
  name?: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
  position: number;
}

export interface ThemeColorType {
  id: string;
  color: string;
  name?: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
  themeColumn: ThemeColumnType;
  themeColumnId: string;
  theme: ThemeType;
  themeId: string;
}
