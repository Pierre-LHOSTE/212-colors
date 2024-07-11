import { Button, Modal } from "antd";
import type { PropsType } from "./props";
import { useI18nContext } from "@/src/i18n/i18n-react";

export default function FormModal(props: PropsType) {
  const { title, isOpen, closeModal, submitForm, children } = props;
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
              {LL.global.button.submit()}
            </Button>
          </>
        }
      >
        {children}
      </Modal>
    </>
  );
}
