"use client";
import { createThemeColumn, updateThemeColumn } from "@/src/api/theme";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ThemeColumnType } from "@/src/types/theme";
import { Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useTransition } from "react";
import FormModal from "../FormModal";
import { ThemeColumnFormSchema } from "./ThemeColumnFormSchema";

const rule = createSchemaFieldRule(ThemeColumnFormSchema);

export default function CreateThemeColumnModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const project = useDataStore((state) => state.project);
  const { LL } = useI18nContext();

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
        projectId: project.id,
      };
      startTransition(async () => {
        const res = await createThemeColumn(formValues);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description } = res;
            modalState.updateStateCallBack({
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
            content: "Color type created successfully",
          });
          form.resetFields();
        } else {
          handleError(res, "Failed to create color type");
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateThemeColumn(values);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description } = res;
            modalState.updateStateCallBack({
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
      title={
        modalState.mode === "add"
          ? LL.project.theme.modal.colorType.create.title()
          : LL.project.theme.modal.colorType.edit.title()
      }
      isOpen={modalState.id === "theme-column"}
      mode={modalState.mode}
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
        <Form.Item
          label={LL.project.theme.modal.colorType.display.name()}
          name="name"
          rules={[rule]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={LL.project.theme.modal.colorType.display.description()}
          name="description"
          rules={[rule]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </FormModal>
  );
}
