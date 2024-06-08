"use client";
import { createColor } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ColorType } from "@/src/types/color";
import { ColorPicker, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ColorFormSchema";

const rule = createSchemaFieldRule(ColorFormSchema);

function CreateColorModal({ params }: { params: { id: string } }) {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();

  function onSubmit(values: ColorType) {
    const newColor = { ...values, type: modalState.data as ColorType["type"] };
    const formValues = {
      color: newColor,
      projectId: params.id,
    };
    startTransition(async () => {
      const res = await createColor(formValues);
      if ("id" in res) {
        if (modalState.updateLocalState) {
          const { id, name, description, color, type, position } = res;
          modalState.updateLocalState({
            id,
            name,
            description,
            color,
            type: type as ColorType["type"],
            position,
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
      title="Create new color"
      isOpen={modalState.id === "color"}
      closeModal={() =>
        setModalState({
          id: "",
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

export default CreateColorModal;
