import { ThemeColorType } from "./color";
import { ProjectType } from "./project";
import { UserType } from "./user";

export interface ThemeColumnType {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
  colors: ThemeColorType[];
  position: number;
}

export interface ThemeType {
  id: string;
  type: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: UserType;
  ownerId: string;
  project: ProjectType;
  projectId: string;
  colors: ThemeColorType[];
  position: number;
}
