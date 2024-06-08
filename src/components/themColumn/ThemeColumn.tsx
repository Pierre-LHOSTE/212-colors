"use client";
import { deleteThemeColumn } from "@/src/api/theme";
import { ThemeColumnType } from "@/src/types/theme";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Typography } from "antd";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";
import "./theme-column.scss";

function ThemeColumn({
  themeColumn,
  deleteLocalThemeColumn,
}: {
  themeColumn: ThemeColumnType;
  deleteLocalThemeColumn: (id: string) => void;
}) {
  const { name, id, description } = themeColumn;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  async function handleDelete() {
    const res = await deleteThemeColumn(id);
    if (res.error) return console.error(res.message);
    if (deleteLocalThemeColumn) deleteLocalThemeColumn(id);
  }

  return (
    <div
      className="theme-column header-hover"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <HeaderWithOptions
        name={name}
        listeners={listeners}
        handleDelete={handleDelete}
      />
      {description ? (
        <Typography.Paragraph
          editable={{
            triggerType: ["text"],
          }}
        >
          {description}
        </Typography.Paragraph>
      ) : null}
    </div>
  );
}

export default ThemeColumn;
