import { createUser, updateUser } from "@/src/api/user";
import { handleError } from "@/src/lib/utils";
import { useModalStore } from "@/src/store/modal";
import { UserType } from "@/src/types/user";
import { Form, Input, Select } from "antd";
import { useEffect, useTransition } from "react";
import FormModal from "../FormModal";

export default function UserModal() {
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const editItem = modalState?.editItem;

    if (editItem) {
      if (editItem.name) form.setFieldValue("name", editItem.name);
      if (editItem.email) form.setFieldValue("email", editItem.email);
      if (editItem.role) form.setFieldValue("role", editItem.role);
      if (editItem.premium)
        form.setFieldValue("premium", editItem.premium ? true : false);
    } else {
      form.resetFields();
    }
  }, [modalState, form]);

  function onSubmit(values: UserType) {
    if (modalState.mode === "add") {
      const newUser = {
        ...values,
        premium: values.premium ? true : false,
      };
      startTransition(async () => {
        const res = await createUser(newUser);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            modalState.updateStateCallBack(res);
          }
          setModalState({
            id: "",
          });
          form.resetFields();
        } else {
          handleError(res, "Failed to create user");
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateUser(values);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            modalState.updateStateCallBack(res);
          }
          setModalState({
            id: "",
          });
          form.resetFields();
        } else {
          handleError(res, "Failed to update user");
        }
      });
    }
  }

  return (
    <FormModal
      title={modalState.mode === "add" ? "Create User" : "Edit User"}
      isOpen={modalState.id === "user"}
      mode={modalState.mode}
      closeModal={() =>
        setModalState({
          id: "",
          editItem: null,
        })
      }
      submitForm={() => form.submit()}
      loading={isPending}
    >
      <Form
        layout="vertical"
        name="new-user-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
            defaultValue={"user"}
          />
        </Form.Item>

        <Form.Item label="Type" name="premium">
          <Select
            defaultValue={false}
            options={[
              { label: "Premium", value: true },
              { label: "Free", value: false },
            ]}
          />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
      </Form>
    </FormModal>
  );
}
