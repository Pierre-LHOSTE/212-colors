import { useI18nContext } from "@/src/i18n/i18n-react";
import type { ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import MainCard from "../card/MainCard";
import ThemeCard from "./ThemeCard";

export default function ThemeCardsList({
  themes,
  themeColors,
  themeColumns,
}: {
  themes: ThemeType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
}) {
  const { LL } = useI18nContext();
  return (
    <MainCard title={LL.project.overview.theme.title()}>
      <div className="overview-themes flex-vertical">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            themeColors={themeColors}
            themeColumns={themeColumns}
          />
        ))}
      </div>
    </MainCard>
  );
}
