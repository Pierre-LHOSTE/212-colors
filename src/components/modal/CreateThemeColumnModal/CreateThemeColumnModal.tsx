"use client";

import { createThemeColumn } from "@/src/api/theme";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeColumnType } from "@/src/types/theme";
import { Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ThemeColumnFormSchema } from "./ThemeColumnFormSchema";

const rule = createSchemaFieldRule(ThemeColumnFormSchema);

function CreateThemeColumnModal({ params }: { params: { id: string } }) {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();

  function onSubmit(values: ThemeColumnType) {
    const newThemeColumn = values;
    const formValues = {
      themeColumn: newThemeColumn,
      projectId: params.id,
    };
    startTransition(async () => {
      const res = await createThemeColumn(formValues);
      if ("id" in res) {
        if (modalState.updateLocalState) {
          const { id, name, description, position } = res;
          modalState.updateLocalState({
            id,
            name,
            description,
            position,
            colors: [],
          });
        }
        setModalState({
          id: "",
        });
        setMessage({
          type: "success",
          content: "ThemeColumn created",
        });
        form.resetFields();
      } else {
        setMessage({
          type: "error",
          content: "Failed to create ThemeColumn",
        });
        setNotification({
          type: "error",
          message: "Error",
          description: <>{res.message || "An error occurred"}</>,
        });
      }
    });
  }

  return (
    <FormModal
      title="Create new color type"
      isOpen={modalState.id === "theme-column"}
      closeModal={() =>
        setModalState({
          id: "",
        })
      }
      submitForm={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="new-theme-column-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Nom" name="name" rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[rule]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </FormModal>
  );
}

export default CreateThemeColumnModal;
