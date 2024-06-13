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
      <Typography.Title
        level={4}
        editable={{
          triggerType: ["text"],
        }}
      >
        {name}
      </Typography.Title>
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
                  Edit
                </Button>
                {handleDelete ? (
                  <Popconfirm
                    title="Delete the color"
                    description="Are you sure to delete this color?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleDelete}
                  >
                    <Button type="primary" icon={<IconTrash />}>
                      Delete
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
