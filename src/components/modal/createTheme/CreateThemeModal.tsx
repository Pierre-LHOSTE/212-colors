"use client";
import { createTheme, updateTheme } from "@/src/api/theme";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ThemeType } from "@/src/types/theme";
import { Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useTransition } from "react";
import FormModal from "../FormModal";
import { ThemeFormSchema } from "./ThemeFormSchema";
import { handleError } from "@/src/lib/utils";

const rule = createSchemaFieldRule(ThemeFormSchema);

export default function CreateThemeModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const project = useDataStore((state) => state.project);

  useEffect(() => {
    const editItem = modalState?.editItem;
    if (editItem) {
      if (editItem.name) form.setFieldValue("name", editItem.name);
      if (editItem.description)
        form.setFieldValue("description", editItem.description);

      if (editItem.type) form.setFieldValue("type", editItem.type);
    } else {
      form.resetFields();
    }
  }, [modalState.editItem, form]);

  function onSubmit(values: ThemeType) {
    if (modalState.mode === "add") {
      const newTheme = values;
      const formValues = {
        theme: newTheme,
        projectId: project.id,
      };
      startTransition(async () => {
        const res = await createTheme(formValues);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description, type, position } = res;
            modalState.updateStateCallBack({
              id,
              name,
              description,
              type,
              position,
              colors: [],
            });
          }
          setModalState({
            id: "",
          });
          setMessage({
            type: "success",
            content: "Theme created",
          });
          form.resetFields();
        } else {
          handleError(res, "Failed to create theme");
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateTheme(values);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description, type, position } = res;
            modalState.updateStateCallBack({
              id,
              name,
              description,
              type,
              position,
              colors: [],
            });
          }
          setModalState({
            id: "",
          });
          setMessage({
            type: "success",
            content: "Theme updated",
          });
          form.resetFields();
        } else {
          setMessage({
            type: "error",
            content: "Failed to update theme",
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
      title="Create new theme"
      isOpen={modalState.id === "theme"}
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
        name="new-theme-form"
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
        <Form.Item label="Type" name="type" rules={[rule]}>
          <Select
            placeholder="Select a type"
            allowClear
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
            ]}
          />
        </Form.Item>
      </Form>
    </FormModal>
  );
}
