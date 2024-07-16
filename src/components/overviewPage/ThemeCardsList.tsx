import { useI18nContext } from "@/src/i18n/i18n-react";
import type { ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import MainCard from "../card/MainCard";
import ThemeCard from "./ThemeCard";

export default function ThemeCardsList({
  themes,
  themeColors,
  themeColumns,
  loading,
}: {
  themes: ThemeType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
  loading: boolean;
}) {
  const { LL } = useI18nContext();

  if (loading) {
    return (
      <MainCard title={LL.project.overview.theme.title()}>
        <Spin indicator={<LoadingOutlined spin />} />
      </MainCard>
    );
  }

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
