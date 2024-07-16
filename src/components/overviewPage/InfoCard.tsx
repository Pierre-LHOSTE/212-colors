import { useI18nContext } from "@/src/i18n/i18n-react";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import type { ProjectType } from "@/src/types/project";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { Descriptions, Skeleton, Typography } from "antd";
import MainCard from "../card/MainCard";

export default function InfoCard({
  project,
  colors,
  themeColors,
  themeColumns,
  themes,
  loading,
}: {
  project: ProjectType;
  themes: ThemeType[];
  colors: ColorType[];
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
  loading: boolean;
}) {
  const { LL } = useI18nContext();

  if (loading) {
    return (
      <MainCard title={LL.project.overview.info.title()}>
        <Skeleton
          active
          paragraph={{
            rows: 4,
          }}
        />
      </MainCard>
    );
  }

  return (
    <MainCard
      sections={[
        {
          title: LL.project.overview.info.title(),
          children: (
            <>
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {project.name}
              </Typography.Title>
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
