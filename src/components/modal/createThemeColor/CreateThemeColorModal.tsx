"use client";
import { createThemeColor } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeColorType } from "@/src/types/color";
import { ColorPicker, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ThemeColorFormSchema";

const rule = createSchemaFieldRule(ColorFormSchema);

function CreateThemeColorModal({ params }: { params: { id: string } }) {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();

  function onSubmit(values: ThemeColorType) {
    const newColor = {
      ...values,
      themeId: modalState.data?.themeId as string,
      themeColumnId: modalState.data?.themeColumnId as string,
    };
    const formValues = {
      color: newColor,
      projectId: params.id,
    };
    startTransition(async () => {
      const res = await createThemeColor(formValues);
      if ("id" in res) {
        if (modalState.updateLocalState) {
          const { id, name, description, color, themeColumnId, themeId } = res;
          modalState.updateLocalState({
            id,
            name,
            description,
            color,
            themeColumnId,
            themeId,
          });
        }
        setModalState({
          id: "",
        });
        setMessage({
          type: "success",
          content: "Color created",
        });
        form.resetFields();
      } else {
        setMessage({
          type: "error",
          content: "Failed to create color",
        });
        setNotification({
          type: "error",
          message: "Error",
          description: <>{res.message || "An error occurred"}</>,
        });
      }
    });
  }

  function updateColor(e: any) {
    const hex = e.toHexString();
    form.setFieldsValue({ color: hex });
  }

  return (
    <FormModal
      title={"Create new theme color"}
      isOpen={modalState.id === "theme-color"}
      closeModal={() =>
        setModalState({
          id: "",
        })
      }
      submitForm={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="new-theme-color-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Nom" name="name" rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item label="Couleur" name="color" rules={[rule]}>
          <ColorPicker onChange={updateColor} />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[rule]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </FormModal>
  );
}

export default CreateThemeColorModal;
