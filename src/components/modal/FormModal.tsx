import { Button, Modal } from "antd";
import type { PropsType } from "./props";
import { useI18nContext } from "@/src/i18n/i18n-react";

export default function FormModal(props: PropsType) {
  const { title, isOpen, closeModal, submitForm, children, mode } = props;
  const { LL } = useI18nContext();

  return (
    <>
      <Modal
        getContainer={false}
        title={title}
        open={isOpen}
        onCancel={() => closeModal()}
        footer={
          <>
            <Button onClick={() => closeModal()}>
              {LL.global.button.cancel()}
            </Button>
            <Button type="primary" onClick={submitForm}>
              {mode === "edit"
                ? LL.global.button.edit()
                : LL.global.button.create()}
            </Button>
          </>
        }
      >
        {children}
      </Modal>
    </>
  );
}
