"use client";
import { createColor } from "@/src/api/color";
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
  const setCreateColorModalState = useSettingsStore(
    (state) => state.setCreateColorModalState
  );
  const createColorModalState = useSettingsStore(
    (state) => state.createColorModalState
  );
  const [form] = Form.useForm();

  function onSubmit(values: ColorType) {
    const newColor = { ...values, type: createColorModalState.colorType };
    const formValues = {
      color: newColor,
      projectId: params.id,
    };
    startTransition(async () => {
      const res = await createColor(formValues);
      if ("id" in res) {
        if (createColorModalState.addColor) {
          const { id, name, description, color, type, position } = res;
          createColorModalState.addColor({
            id,
            name,
            description,
            color,
            type: type as ColorType["type"],
            position,
          });
        }
        setCreateColorModalState({
          show: false,
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
      isOpen={createColorModalState.show}
      closeModal={() =>
        setCreateColorModalState({
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
