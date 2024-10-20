import { deleteColor, getAllColors } from "@/src/api/color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { useModalStore } from "@/src/store/modal";
import { ColorType } from "@/src/types/color";
import {
  Button,
  ColorPicker,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState, useTransition } from "react";
import MainCard from "../../card/MainCard";
import CreateColorModal from "../../modal/createColor/CreateColorModal";

export default function ColorsTable() {
  const [colors, setColors] = useState<ColorType[]>([]);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const { LL } = useI18nContext();

  useEffect(() => {
    startTransition(async () => {
      const res = await getAllColors();
      if (!res || "error" in res) return;
      setColors(res);
    });
  }, []);

  function handleEdit(color: ColorType) {
    setModalState({
      id: "color",
      mode: "edit",
      editItem: {
        id: color.id,
        name: color.name,
        description: color.description,
        color: color.color,
      },
      updateStateCallBack: (color: ColorType) => {
        setColors(
          colors.map((c) => (c.id === color.id ? { ...c, ...color } : c))
        );
      },
    });
  }

  async function handleDelete(color: ColorType) {
    const res = await deleteColor(color.id);
    if (!res || "error" in res) return;
    setColors(colors.filter((c) => c.id !== color.id));
  }

  const columns: TableProps<ColorType>["columns"] = [
    {
      title: LL.project.color.modal.display.name(),
      dataIndex: "name",
      key: "name",
    },
    {
      title: LL.project.color.modal.display.color(),
      dataIndex: "color",
      key: "color",
      render: (hex) => <ReadOnlyColorPicker key={hex} hex={hex} />,
    },
    {
      title: LL.project.color.modal.display.description(),
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          color={
            type === "primary"
              ? "blue"
              : type === "secondary"
                ? "cyan"
                : "purple"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (project) => project.name,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => owner.name,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (color) => (
        <Space>
          <Button type="default" onClick={() => handleEdit(color)}>
            {LL.global.button.edit()}
          </Button>
          <Popconfirm
            title={LL.global.button.confirm()}
            okText={LL.global.button.yes()}
            cancelText={LL.global.button.no()}
            onConfirm={() => handleDelete(color)}
          >
            <Button type="primary" danger>
              {LL.global.button.delete()}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MainCard title={LL.profile.dashboard.colors()}>
        <Table loading={isPending} columns={columns} dataSource={colors} />
      </MainCard>
      <CreateColorModal />
    </>
  );
}

function ReadOnlyColorPicker({ hex }: { hex: string }) {
  const [color, setColor] = useState(hex);

  return (
    <ColorPicker
      showText
      onOpenChange={() => setColor(hex)}
      value={color}
      onChange={(c) => setColor(c.toHex())}
    />
  );
}
