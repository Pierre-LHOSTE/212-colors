"use client";
import { getColors } from "@/src/api/color";
import { getThemeColors, getThemeColumns, getThemes } from "@/src/api/theme";
import Overview from "@/src/components/overviewPage/Overview";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useEffect, useTransition } from "react";

export default function OverviewPage({ params }: { params: { id: string } }) {
  const project = useDataStore((state) => state.project);
  const colors = useDataStore((state) => state.colors);
  const themes = useDataStore((state) => state.themes);
  const themeColors = useDataStore((state) => state.themeColors);
  const themeColumns = useDataStore((state) => state.themeColumns);

  const setColors = useDataStore((state) => state.setColors);
  const setThemes = useDataStore((state) => state.setThemes);
  const setThemeColors = useDataStore((state) => state.setThemeColors);
  const setThemeColumns = useDataStore((state) => state.setThemeColumns);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setColors([]);
      setThemes([]);
      setThemeColors([]);
      setThemeColumns([]);
      fetchData(getColors, setColors, "Colors", params.id);
      fetchData(getThemes, setThemes, "Themes", params.id);
      fetchData(getThemeColors, setThemeColors, "ThemeColors", params.id);
      fetchData(getThemeColumns, setThemeColumns, "ThemeColumns", params.id);
    });
  }, [params.id]);

  return (
    <div id="overview" className="flex-vertical">
      <Overview
        project={project}
        colors={colors}
        themes={themes}
        themeColors={themeColors}
        themeColumns={themeColumns}
        loading={isPending}
      />
    </div>
  );
}

async function fetchData(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fetchFunction: (id: string) => Promise<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setData: (data: any) => void,
  errorMessage: string,
  projectId: string
) {
  const data = await fetchFunction(projectId);
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
