import type { ProjectType } from "@/src/types/project";
import MainCard from "../card/MainCard";
import { Descriptions, Typography } from "antd";
import type PropsType from "./props";
import Color from "../color/Color";
import "./overview.scss";
import ColorPreview from "../colorPreview/ColorPreview";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function Overview(props: PropsType) {
  const { project, colors, themes, themeColors, themeColumns } = props;
  console.log("🚀 ~ colors:", colors);
  console.log(project);

  return (
    <>
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
                items={[
                  {
                    key: "created-at",
                    label: "Created at",
                    children: <>{project.createdAt.toLocaleDateString()}</>,
                  },
                  {
                    key: "updated-at",
                    label: "Updated at",
                    children: <>{project.updatedAt?.toLocaleDateString()}</>,
                  },
                  {
                    key: "colors-count",
                    label: "Colors",
                    children: <>{colors.length}</>,
                  },
                  {
                    key: "themes-count",
                    label: "Themes",
                    children: <>{themes.length}</>,
                  },
                  {
                    key: "theme-colors-count",
                    label: "Theme colors",
                    children: <>{themeColors.length}</>,
                  },
                  {
                    key: "theme-columns-count",
                    label: "Theme color types",
                    children: <>{themeColumns.length}</>,
                  },
                ]}
              />
            ),
          },
        ]}
      />
      <MainCard title={"Colors"}>
        <div className="overview-colors flex-vertical">
          <div className="flex-horizontal">
            {colors.filter((c) => c.type === "primary").length > 0 ? (
              <div className="primary-div flex-horizontal">
                {colors
                  .filter((c) => c.type === "primary")
                  .map((color) => (
                    <ColorPreview key={color.id} color={color} />
                  ))}
              </div>
            ) : null}
            {colors.filter((c) => c.type === "secondary").length > 0 ? (
              <OverlayScrollbarsComponent className="" defer={true}>
                <div className="secondary-div flex-horizontal">
                  {colors
                    .filter((c) => c.type === "secondary")
                    .map((color) => (
                      <ColorPreview key={color.id} color={color} />
                    ))}
                </div>
              </OverlayScrollbarsComponent>
            ) : null}
          </div>
          <div className="overview-colors flex-horizontal">
            {colors.filter((c) => c.type === "special").length > 0 ? (
              <div className="special-div flex-horizontal">
                {colors
                  .filter((c) => c.type === "special")
                  .map((color) => (
                    <ColorPreview key={color.id} color={color} />
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </MainCard>
      <MainCard title={"Themes"} />
    </>
  );
}
