import { ColorType } from "../types/color";

export default function generatePrimaryColor(colors: ColorType[]) {
  const firstPrimaryColor = colors.find((color) => color.type === "primary");
  if (firstPrimaryColor) return firstPrimaryColor.color;

  const firstSecondaryColor = colors.find(
    (color) => color.type === "secondary"
  );
  if (firstSecondaryColor) return firstSecondaryColor.color;

  const firstSpecialColor = colors.find((color) => color.type === "special");
  if (firstSpecialColor) return firstSpecialColor.color;

  return null;
}
