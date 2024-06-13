import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import MainCard from "../card/MainCard";
import { Typography } from "antd";
import type { ThemeColor } from "@prisma/client";
import Color from "../color/Color";
import type { ThemeColorType } from "@/src/types/color";
import ColorPreview from "../colorPreview/ColorPreview";
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
  return (
    <MainCard title={"Themes"}>
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
