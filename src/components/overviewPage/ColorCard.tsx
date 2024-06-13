import type { ColorType } from "@/src/types/color";
import MainCard from "../card/MainCard";
import ColorPreview from "../colorPreview/ColorPreview";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function ColorCard({ colors }: { colors: ColorType[] }) {
  const primaryColors = colors.filter((c) => c.type === "primary");
  const primaryList =
    primaryColors.length > 0 ? (
      <>
        {primaryColors.length > 0 ? (
          <OverlayScrollbarsComponent className="primary-div" defer={true}>
            {colors
              .filter((c) => c.type === "primary")
              .map((color) => (
                <ColorPreview key={color.id} color={color} />
              ))}
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
    <MainCard title={"Colors"}>
      <div className="overview-colors flex-vertical">
        {primaryList}
        {secondaryList}
        {specialList}
      </div>
    </MainCard>
  );
}
