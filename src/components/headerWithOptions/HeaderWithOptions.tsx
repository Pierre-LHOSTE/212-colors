import {
  IconDotsVertical,
  IconGripVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Popconfirm, Popover, Typography } from "antd";
import { useState } from "react";
import "./header-with-options.scss";

function HeaderWithOptions({
  name,
  isConfirmOpen,
  setIsConfirmOpen,
  handleDelete,
  listeners,
}: {
  name: string | null;
  isConfirmOpen: boolean;
  setIsConfirmOpen: (open: boolean) => void;
  handleDelete: () => void;
  listeners: any;
}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

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
        <Button type="text" icon={<IconGripVertical />} {...listeners} />
        <Popover
          content={
            <>
              <Button type="text" icon={<IconPencil />}>
                Edit
              </Button>
              <Popconfirm
                title="Delete the color"
                description="Are you sure to delete this color?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDelete}
                onOpenChange={(open) => {
                  setIsConfirmOpen(open);
                }}
              >
                <Button type="primary" icon={<IconTrash />}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          }
          title=""
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button type="text" icon={<IconDotsVertical />} />
        </Popover>
      </div>
    </header>
  );
}

export default HeaderWithOptions;
