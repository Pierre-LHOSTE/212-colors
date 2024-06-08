import { Button, Modal } from "antd";

interface FormModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  submitForm: () => void;
  title: string;
}

function FormModal({
  children,
  isOpen,
  closeModal,
  submitForm,
  title,
}: FormModalProps) {
  return (
    <>
      <Modal
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

export default FormModal;
