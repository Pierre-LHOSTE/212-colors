"use client";

import { createThemeColumn, updateThemeColumn } from "@/src/api/theme";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeColumnType } from "@/src/types/theme";
import { Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useTransition } from "react";
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

  useEffect(() => {
    const editItem = modalState?.editItem;
    if (editItem) {
      if (editItem.name) form.setFieldValue("name", editItem.name);
      if (editItem.description)
        form.setFieldValue("description", editItem.description);
    } else {
      form.resetFields();
    }
  }, [modalState.editItem, form]);

  function onSubmit(values: ThemeColumnType) {
    if (modalState.mode === "add") {
      const newThemeColumn = values;
      const formValues = {
        themeColumn: newThemeColumn,
        projectId: params.id,
      };
      startTransition(async () => {
        const res = await createThemeColumn(formValues);
        if ("id" in res) {
          if (modalState.updateLocalState) {
            const { id, name, description } = res;
            modalState.updateLocalState({
              id,
              name,
              description,
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
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateThemeColumn(values);
        if ("id" in res) {
          if (modalState.updateLocalState) {
            const { id, name, description } = res;
            modalState.updateLocalState({
              id,
              name,
              description,
            });
          }
          setModalState({
            id: "",
          });
          setMessage({
            type: "success",
            content: "ThemeColumn updated",
          });
          form.resetFields();
        } else {
          setMessage({
            type: "error",
            content: "Failed to update ThemeColumn",
          });
          setNotification({
            type: "error",
            message: "Error",
            description: <>{res.message || "An error occurred"}</>,
          });
        }
      });
    }
  }

  return (
    <FormModal
      title="Create new color type"
      isOpen={modalState.id === "theme-column"}
      closeModal={() =>
        setModalState({
          id: "",
          editItem: null,
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
