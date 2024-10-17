import { colord } from "colord";
import { ThemeColorType } from "../types/color";

const mainTheme = {
  background: "",
  content: "",
  highlight: "",
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
    .sort((a, b) => b.brightness - a.brightness);

  console.log("🚀 ~ sortedColors:", sortedColors);
  if (sortedColors.length >= 3) {
    mainTheme.highlight = sortedColors[0].color;
    mainTheme.content =
      sortedColors[Math.round((sortedColors.length - 1) / 2)].color;
    mainTheme.background = sortedColors[sortedColors.length - 1].color;
    return mainTheme;
  }

  if (sortedColors.length === 2) {
    mainTheme.content = sortedColors[0].color;
    mainTheme.background = sortedColors[1].color;
    mainTheme.highlight = colord(sortedColors[0].color).lighten(0.2).toHex();
    return mainTheme;
  }

  if (sortedColors.length === 1) {
    const baseColor = colord(sortedColors[0].color);
    console.log("🚀 ~ baseColor:", baseColor.brightness());
    let lightBaseColor = baseColor.lighten(0.01);
    console.log("🚀 ~ lightBaseColor:", lightBaseColor.brightness());

    let safety = 0;

    while (lightBaseColor.brightness() < 0.8 && safety < 1000) {
      lightBaseColor = lightBaseColor.lighten(0.1);
      console.log("🚀 ~ lightBaseColor!!!:", lightBaseColor.brightness());
      safety++;
    }

    // while (baseColor.brightness() > 0.5) {
    //   console.log("🚀 ~ baseColor.brightness():", baseColor.brightness());

    //   baseColor.lighten(0.1);
    // }
    mainTheme.background = lightBaseColor.toHex();
    mainTheme.content = lightBaseColor.lighten(0.04).toHex();
    mainTheme.highlight = lightBaseColor.lighten(0.08).toHex();
    return mainTheme;
  }

  return mainTheme;
}
