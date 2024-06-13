import { Button, Modal } from "antd";
import type { PropsType } from "./props";

export default function FormModal(props: PropsType) {
  const { title, isOpen, closeModal, submitForm, children } = props;

  return (
    <>
      <Modal
        getContainer={false}
        title={title}
        open={isOpen}
        onCancel={() => closeModal()}
        footer={
          <>
            <Button onClick={() => closeModal()}>Cancel</Button>
            <Button type="primary" onClick={submitForm}>
              Create
            </Button>
          </>
        }
      >
        {children}
      </Modal>
    </>
  );
}
