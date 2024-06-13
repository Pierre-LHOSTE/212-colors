"use client";
import { getThemeColors, getThemeColumns, getThemes } from "@/src/api/theme";
import ThemesList from "@/src/components/themesList/ThemesPage";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useEffect } from "react";

function ThemesPage({ params }: { params: { id: string } }) {
  const themes = useDataStore((state) => state.themes);
  const themeColumns = useDataStore((state) => state.themeColumns);
  const themeColors = useDataStore((state) => state.themeColors);

  const setThemes = useDataStore((state) => state.setThemes);
  const setThemeColumns = useDataStore((state) => state.setThemeColumns);
  const setThemeColors = useDataStore((state) => state.setThemeColors);

  useEffect(() => {
    fetchData(getThemeColors, setThemeColors, "ThemeColors");
    fetchData(getThemeColumns, setThemeColumns, "ThemeColumns");
    fetchData(getThemes, setThemes, "Themes");
  }, [params.id]);

  async function fetchData(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fetchFunction: (id: string) => Promise<any>,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setData: (data: any) => void,
    errorMessage: string
  ) {
    const data = await fetchFunction(params.id);
    if (!data) {
      return handleError({
        error: true,
        message: `${errorMessage} not found`,
      });
    }
    if ("error" in data) {
      return handleError(data, `Failed to fetch ${errorMessage}`);
    }
    setData(data);
  }

  if (
    !themes ||
    !Array.isArray(themes) ||
    !themeColumns ||
    !Array.isArray(themeColumns) ||
    !themeColors ||
    !Array.isArray(themeColors)
  ) {
    return null;
  }

  return (
    <div className="flex-vertical">
      <ThemesList
        themes={themes}
        themeColumns={themeColumns}
        themeColors={themeColors}
      />
    </div>
  );
}

export default ThemesPage;
