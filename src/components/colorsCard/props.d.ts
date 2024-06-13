import type { ColorType } from "@/src/types/color";
import type { Dispatch, SetStateAction } from "react";

type DirectionType = "horizontal" | "vertical";

export interface PropsType {
  colors: ColorType[];
  name: string;
  direction: DirectionType;
  setColors: Dispatch<SetStateAction<ColorType[]>>;
}
