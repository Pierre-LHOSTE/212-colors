"use client";
import { ThemeColumnType } from "@/src/types/theme";
import { Typography } from "antd";
import "./theme-column.scss";

function ThemeColumn({ themeColumn }: { themeColumn: ThemeColumnType }) {
  return (
    <div className="theme-column">
      <Typography.Title
        level={4}
        editable={{
          triggerType: ["text"],
        }}
      >
        {themeColumn.name}
      </Typography.Title>
      {themeColumn.description ? (
        <Typography.Paragraph
          editable={{
            triggerType: ["text"],
          }}
        >
          {themeColumn.description}
        </Typography.Paragraph>
      ) : null}
    </div>
  );
}

export default ThemeColumn;
