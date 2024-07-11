import { useI18nContext } from "@/src/i18n/i18n-react";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import type { ProjectType } from "@/src/types/project";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { Descriptions, Typography } from "antd";
import MainCard from "../card/MainCard";

export default function InfoCard({
  project,
  colors,
  themeColors,
  themeColumns,
  themes,
}: {
  project: ProjectType;
  themes: ThemeType[];
  colors: ColorType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
}) {
  const { LL } = useI18nContext();

  return (
    <MainCard
      sections={[
        {
          title: LL.project.overview.info.title(),
          children: (
            <>
              <Typography.Title level={2}>{project.name}</Typography.Title>
              <Typography.Text>{project.description}</Typography.Text>
            </>
          ),
        },
        {
          title: "",
          children: (
            <Descriptions
              column={1}
              items={[
                {
                  key: "created-at",
                  label: LL.project.overview.info.createdAt(),
                  children: <>{project.createdAt.toLocaleDateString()}</>,
                },
                {
                  key: "updated-at",
                  label: LL.project.overview.info.updatedAt(),
                  children: <>{project.updatedAt?.toLocaleDateString()}</>,
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
