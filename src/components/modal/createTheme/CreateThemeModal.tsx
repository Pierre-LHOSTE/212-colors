"use client";
import { createTheme } from "@/src/api/theme";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeType } from "@/src/types/theme";
import { Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ThemeFormSchema } from "./ThemeFormSchema";

const rule = createSchemaFieldRule(ThemeFormSchema);

function CreateThemeModal({ params }: { params: { id: string } }) {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setCreateThemeModalState = useSettingsStore(
    (state) => state.setCreateThemeModalState
  );
  const createThemeModalState = useSettingsStore(
    (state) => state.createThemeModalState
  );
  const [form] = Form.useForm();

  function onSubmit(values: ThemeType) {
    const newTheme = values;
    const formValues = {
      theme: newTheme,
      projectId: params.id,
    };
    startTransition(async () => {
      const res = await createTheme(formValues);
      if ("id" in res) {
        if (createThemeModalState.addTheme) {
          const { id, name, description, type, position } = res;
          createThemeModalState.addTheme({
            id,
            name,
            description,
            type,
            position,
            colors: [],
          });
        }
        setCreateThemeModalState({
          show: false,
        });
        setMessage({
          type: "success",
          content: "Theme created",
        });
        form.resetFields();
      } else {
        setMessage({
          type: "error",
          content: "Failed to create theme",
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
      isOpen={createThemeModalState.show}
      closeModal={() =>
        setCreateThemeModalState({
          show: false,
        })
      }
      submitForm={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="new-collection"
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

export default CreateThemeModal;
