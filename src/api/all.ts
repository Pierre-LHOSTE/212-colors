import { getThemeColors, getThemeColumns, getThemes } from "@/src/api/theme";
import { handleError } from "../lib/utils";
import { ColorType, ThemeColorType } from "../types/color";
import { ProjectType } from "../types/project";
import { ThemeColumnType, ThemeType } from "../types/theme";
import { getColors } from "./color";
import { getProjectById } from "./project";

export async function fetchAllData(projectId: string): Promise<
  | {
      project: ProjectType;
      colors: ColorType[];
      themes: ThemeType[];
      themeColors: ThemeColorType[];
      themeColumns: ThemeColumnType[];
    }
  | { error: true; message: string }
> {
  try {
    const [project, colors, themes, themeColors, themeColumns] =
      await Promise.all([
        getProjectById(projectId),
        getColors(projectId),
        getThemes(projectId),
        getThemeColors(projectId),
        getThemeColumns(projectId),
      ]);

    if (!project || "error" in project)
      return { error: true, message: "Project not found" };

    if (!colors || "error" in colors)
      return { error: true, message: "Colors not found" };

    if (!themes || "error" in themes)
      return { error: true, message: "Themes not found" };

    if (!themeColors || "error" in themeColors)
      return { error: true, message: "Theme colors not found" };

    if (!themeColumns || "error" in themeColumns)
      return { error: true, message: "Theme columns not found" };

    return { project, colors, themes, themeColors, themeColumns };
  } catch (error) {
    handleError({ error: true, message: "Failed to fetch all data" });
    return { error: true, message: "Failed to fetch all data" };
  }
}
