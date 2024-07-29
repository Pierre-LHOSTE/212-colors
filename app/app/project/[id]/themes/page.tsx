"use client";
import ThemesList from "@/src/components/themesPage/ThemesPage";
import { useDataStore } from "@/src/store/data";

function ThemesPage({ params }: { params: { id: string } }) {
  const themes = useDataStore((state) => state.themes);
  const themeColumns = useDataStore((state) => state.themeColumns);
  const themeColors = useDataStore((state) => state.themeColors);
  const loading = useDataStore((state) => state.loading);

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
        loading={loading}
      />
    </div>
  );
}

export default ThemesPage;
