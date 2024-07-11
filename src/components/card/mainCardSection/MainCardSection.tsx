import { useI18nContext } from "@/src/i18n/i18n-react";
import {
  IconDotsVertical,
  IconGripVertical,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Popconfirm, Popover, Typography } from "antd";
import React from "react";
import "./main-card-section.scss";
import type { PropsType } from "./props";

const iconSize = 16;

export default function MainCardSection(props: PropsType) {
  const {
    title,
    children,
    createAction,
    showEditAction,
    deleteAction,
    dndAction,
  } = props;
  const [open, setOpen] = React.useState(false);
  const { LL } = useI18nContext();

  function handleEditFunc() {
    if (showEditAction) {
      showEditAction();
    }
    setOpen(false);
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
  }

  return (
    <section className="main-card-section">
      {title || dndAction || showEditAction || deleteAction || createAction ? (
        <header className="card-header">
          {title ? (
            <Typography.Title level={3}>{title}</Typography.Title>
          ) : null}
          <div className={`card-actions${open ? " open" : ""}`}>
            {dndAction ? (
              <Button
                style={{ opacity: 0.5 }}
                type="text"
                icon={<IconGripVertical />}
                {...dndAction}
              />
            ) : null}
            {showEditAction || deleteAction ? (
              <Popover
                content={
                  <>
                    {showEditAction ? (
                      <Button
                        type="text"
                        icon={<IconPencil />}
                        onClick={handleEditFunc}
                      >
                        {LL.global.button.edit()}
                      </Button>
                    ) : null}
                    {deleteAction ? (
                      <Popconfirm
                        title={LL.project.theme.modal.theme.delete.title()}
                        description={LL.project.theme.modal.theme.delete.message()}
                        okText={LL.global.button.yes()}
                        cancelText={LL.global.button.no()}
                        onConfirm={deleteAction}
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
      ) : null}
      <div className="main-card-section-content">{children}</div>
    </section>
  );
}
