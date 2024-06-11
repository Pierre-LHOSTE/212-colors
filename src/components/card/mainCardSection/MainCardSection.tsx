import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  IconDotsVertical,
  IconGripVertical,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Popconfirm, Popover } from "antd";
import React from "react";
import "./main-card-section.scss";

const iconSize = 16;

function MainCardSection({
  title,
  children,
  createAction,
  showOptionAction,
  dndAction,
}: {
  title?: string;
  children: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
  dndAction?: SyntheticListenerMap;
}) {
  const [open, setOpen] = React.useState(false);

  function handleEditFunc() {
    if (showOptionAction) {
      showOptionAction();
    }
    setOpen(false);
  }

  function handleDelete() {}

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
  }

  return (
    <section className="main-card-section">
      <header className="card-header">
        <h3>{title ? title : ""}</h3>
        <div className={`card-actions${open ? " open" : ""}`}>
          {dndAction ? (
            <Button
              style={{ opacity: 0.5 }}
              type="text"
              icon={<IconGripVertical />}
              {...dndAction}
            />
          ) : null}
          {showOptionAction ? (
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
              <Button
                style={{ opacity: 0.5 }}
                type="text"
                icon={<IconDotsVertical />}
              />
            </Popover>
          ) : null}
          {createAction ? (
            <Button
              icon={<IconPlus size={iconSize} />}
              type="text"
              onClick={() => createAction()}
            />
          ) : null}
        </div>
      </header>
      <div className="main-card-section-content">{children}</div>
    </section>
  );
}

export default MainCardSection;
