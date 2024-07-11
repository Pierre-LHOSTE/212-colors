import type { ThemeColorType } from "@/src/types/color";
import type { ThemeColumnType, ThemeType } from "@/src/types/theme";
import { Typography } from "antd";
import ColorPreview from "../colorPreview/ColorPreview";
import type { ThemeColor } from "@prisma/client";
import "./theme-card.scss";

export default function ThemeCard({
  theme,
  themeColors,
  themeColumns,
}: {
  theme: ThemeType;
  themeColors: ThemeColorType[];
  themeColumns: ThemeColumnType[];
}) {
  return (
    <div className={`overview-theme-card ${theme.type}`}>
      <Typography.Title level={4}>{theme.name}</Typography.Title>
      <Typography.Text>{theme.description}</Typography.Text>
      <div className="flex-horizontal">
        {themeColumns.map((column) => {
          const color = themeColors
            .filter((c) => c.themeId === theme.id)
            .find((c) => c?.themeColumnId === column.id);
          if (color) {
            return <ColorPreview key={column.id} color={color as ThemeColor} />;
          }
          return (
            <div className="color empty" key={column.id}>
              No color
            </div>
          );
        })}
      </div>
    </div>
  );
}
