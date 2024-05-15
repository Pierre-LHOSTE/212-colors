import { Button, Modal } from "antd";

interface FormModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  submitForm: () => void;
}

function FormModal({
  children,
  isOpen,
  closeModal,
  submitForm,
}: FormModalProps) {
  return (
    <>
      <Modal
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
