import { ProjectType } from "./project";

export interface ColorType {
  id: string;
  color: string;
  name: string | null;
  description: string | null;
  position: number;
  type: "primary" | "secondary" | "special";
}

export interface ThemeColorType {
  id: string;
  color: string;
  name: string | null;
  description: string | null;
  themeColumnId: string;
  themeId: string;
}
