"use client";
import { deleteThemeColumn } from "@/src/api/theme";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ThemeColumnType } from "@/src/types/theme";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Typography } from "antd";
import HeaderWithOptions from "../headerWithOptions/HeaderWithOptions";
import "./theme-column.scss";
import { useSettingsStore } from "@/src/store/settings";
import { handleError } from "@/src/lib/utils";

export default function ThemeColumn({
  themeColumn,
}: {
  themeColumn: ThemeColumnType;
}) {
  const setModalState = useModalStore((state) => state.setModalState);
  const setThemeColumns = useDataStore((state) => state.setThemeColumns);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: themeColumn.id,
  });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.2 : undefined,
  };

  async function handleDelete() {
    const res = await deleteThemeColumn(themeColumn.id);
    if ("error" in res) {
      return handleError(res, "Failed to delete theme column");
    }
    setMessage({
      type: "success",
      content: "Theme column deleted successfully",
    });
    setThemeColumns((themeColumns) =>
      themeColumns.filter((item) => item.id !== themeColumn.id)
    );
  }

  function handleEdit() {
    setModalState({
      id: "theme-column",
      mode: "edit",
      editItem: {
        id: themeColumn.id,
        name: themeColumn.name,
        description: themeColumn.description,
      },
      updateStateCallBack: (themeColumn: ThemeColumnType) => {
        setThemeColumns((themeColumns) =>
          themeColumns.map((item) =>
            item.id === themeColumn.id
              ? Object.assign({}, item, themeColumn)
              : item
          )
        );
      },
    });
  }

  return (
    <div
      className="theme-column header-hover"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <HeaderWithOptions
        name={themeColumn.name}
        listeners={listeners}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
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
