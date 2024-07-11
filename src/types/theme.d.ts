import type { ThemeColorType } from "./color";

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
  type: ThemeTypeType;
  name: string;
  description: string | null;
  colors: ThemeColorType[];
  position: number;
}
