import { useI18nContext } from "@/src/i18n/i18n-react";
import {
  IconDotsVertical,
  IconGripVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Popconfirm, Popover, Typography } from "antd";
import { useState } from "react";
import "./header-with-options.scss";
import type { PropsType } from "./props";

export default function HeaderWithOptions(props: PropsType) {
  const { name, handleDelete, handleEdit, listeners } = props;
  const { LL } = useI18nContext();

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  function handleEditFunc() {
    if (handleEdit) {
      handleEdit();
    }
    setOpen(false);
  }

  return (
    <header className="header-with-options">
      <Typography.Title level={4}>{name}</Typography.Title>
      <div className={`color-actions${open ? " open" : ""}`}>
        {listeners ? (
          <Button type="text" icon={<IconGripVertical />} {...listeners} />
        ) : null}
        {handleDelete ? (
          <Popover
            content={
              <>
                <Button
                  type="text"
                  icon={<IconPencil />}
                  onClick={handleEditFunc}
                >
                  {LL.global.button.edit()}
                </Button>
                {handleDelete ? (
                  <Popconfirm
                    title={LL.project.color.modal.delete.title()}
                    description={LL.project.color.modal.delete.message()}
                    okText={LL.global.button.yes()}
                    cancelText={LL.global.button.no()}
                    onConfirm={handleDelete}
                  >
                    <Button type="primary" icon={<IconTrash />}>
                      {LL.global.button.delete()}
                    </Button>
                  </Popconfirm>
                ) : null}
              </>
            }
            title=""
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button type="text" icon={<IconDotsVertical />} />
          </Popover>
        ) : null}
      </div>
    </header>
  );
}
