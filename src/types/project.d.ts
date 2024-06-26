import type { ColorType, ThemeColorType } from "./color";
import type { ThemeColumnType, ThemeType } from "./theme";
import type { UserType } from "./user";

export interface ProjectLiteType {
  id: string;
  name: string;
  position: number;
}

export interface ProjectButtonType extends ProjectLiteType {
  colors: {
    color: string;
  }[];
}

export interface ProjectType extends ProjectLiteType {
  description: string | null;
  hiddenSections: string[];
  createdAt: Date;
  updatedAt: Date | null;
  ownerId: string;
}
