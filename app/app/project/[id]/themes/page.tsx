import { getThemeColors, getThemeColumns, getThemes } from "@/src/api/theme";
import ThemesList from "@/src/components/themesList/ThemesList";

async function ThemesPage({ params }: { params: { id: string } }) {
  const themes = await getThemes(params.id);
  const themeColumns = await getThemeColumns(params.id);
  const themeColors = await getThemeColors(params.id);

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
