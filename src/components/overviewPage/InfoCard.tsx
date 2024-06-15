import { Descriptions, Typography } from "antd";
import MainCard from "../card/MainCard";
import type { ProjectType } from "@/src/types/project";
import type { ColorType, ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";

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
  return (
    <MainCard
      sections={[
        {
          title: "Project",
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
                  label: "Created at",
                  children: <>{project.createdAt.toLocaleDateString()}</>,
                },
                // {
                //   key: "colors-count",
                //   label: "Colors",
                //   children: <>{colors.length}</>,
                // },
                // {
                //   key: "themes-count",
                //   label: "Themes",
                //   children: <>{themes.length}</>,
                // },
                {
                  key: "updated-at",
                  label: "Updated at",
                  children: <>{project.updatedAt?.toLocaleDateString()}</>,
                },
                // {
                //   key: "theme-colors-count",
                //   label: "Theme colors",
                //   children: <>{themeColors.length}</>,
                // },
                // {
                //   key: "theme-columns-count",
                //   label: "Theme color types",
                //   children: <>{themeColumns.length}</>,
                // },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
