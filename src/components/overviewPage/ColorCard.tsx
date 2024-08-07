import { useI18nContext } from "@/src/i18n/i18n-react";
import type { ColorType } from "@/src/types/color";
import { LoadingOutlined } from "@ant-design/icons";
import { IconCircleHalf2 } from "@tabler/icons-react";
import { Spin } from "antd";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import MainCard from "../card/MainCard";
import ColorPreview from "../colorPreview/ColorPreview";
import Empty from "../empty/Empty";

export default function ColorCard({
  colors,
  loading,
}: {
  colors: ColorType[];
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

  const primaryColors = colors.filter((c) => c.type === "primary");
  const primaryList =
    primaryColors.length > 0 ? (
      <>
        {primaryColors.length > 0 ? (
          <OverlayScrollbarsComponent className="primary-div" defer={true}>
            <div className="primary-div flex-horizontal">
              {colors
                .filter((c) => c.type === "primary")
                .map((color) => (
                  <ColorPreview key={color.id} color={color} />
                ))}
            </div>
          </OverlayScrollbarsComponent>
        ) : null}
      </>
    ) : null;

  const secondaryColors = colors.filter((c) => c.type === "secondary");
  const secondaryList =
    secondaryColors.length > 0 ? (
      <>
        {secondaryColors.length > 0 ? (
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
      </>
    ) : null;

  const specialColors = colors.filter((c) => c.type === "special");
  const specialList =
    specialColors.length > 0 ? (
      <>
        {specialColors.length > 0 ? (
          <OverlayScrollbarsComponent className="" defer={true}>
            <div className="special-div flex-horizontal">
              {colors
                .filter((c) => c.type === "special")
                .map((color) => (
                  <ColorPreview key={color.id} color={color} />
                ))}
            </div>
          </OverlayScrollbarsComponent>
        ) : null}
      </>
    ) : null;

  return (
    <MainCard title={LL.project.overview.color.title()}>
      {primaryList && secondaryList && specialList ? (
        <div className="overview-colors flex-vertical">
          {primaryList}
          {secondaryList}
          {specialList}
        </div>
      ) : (
        <Empty
          name={LL.project.color.empty()}
          icon={<IconCircleHalf2 size={16} />}
        />
      )}
    </MainCard>
  );
}
