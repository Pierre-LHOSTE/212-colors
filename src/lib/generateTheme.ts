import { colord } from "colord";
import { ThemeColorType } from "../types/color";

const mainTheme = {
  background: "",
  content: "",
  extra: "",
};

export default function generateTheme(
  colors: ThemeColorType[],
  themeType: "dark" | "light"
) {
  const sortedColors = colors
    .map((c) => {
      return {
        ...c,
        brightness: colord(c.color).brightness(),
      };
    })
    .sort((c) => c.brightness);

  mainTheme.background =
    themeType === "light"
      ? sortedColors[0].color
      : sortedColors[sortedColors.length - 1].color;

  if (sortedColors.length < 2) return mainTheme;
  mainTheme.content =
    themeType === "dark"
      ? sortedColors[0].color
      : sortedColors[sortedColors.length - 1].color;

  if (sortedColors.length < 3) return mainTheme;

  mainTheme.extra = sortedColors[(sortedColors.length - 1) / 2].color;

  return mainTheme;
}
